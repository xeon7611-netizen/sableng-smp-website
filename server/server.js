import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import net from 'node:net';
import { fileURLToPath } from 'node:url';
import { readDb, writeDb } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

// In-memory cache for live server status
let cachedStatus = null;
let lastStatusFetchTime = 0;
const CACHE_DURATION_MS = 2 * 1000; // Ultra-fast 2 seconds cache (instant live updates)

function encodeVarInt(val) {
  const bytes = [];
  while (true) {
    if ((val & ~0x7F) === 0) {
      bytes.push(val);
      return Buffer.from(bytes);
    }
    bytes.push((val & 0x7F) | 0x80);
    val >>>= 7;
  }
}

// Direct native TCP Minecraft Server List Ping (0 intermediate cache, 100% real-time)
function pingMinecraftDirect(host, port, timeoutMs = 3000) {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ host, port }, () => {
      try {
        const hostBuf = Buffer.from(host, 'utf8');
        const handshakeData = Buffer.concat([
          Buffer.from([0x00]), // Packet ID 0: Handshake
          encodeVarInt(765),   // Protocol version 1.20.4
          encodeVarInt(hostBuf.length),
          hostBuf,
          Buffer.from([(port >> 8) & 0xFF, port & 0xFF]),
          Buffer.from([0x01])  // Next state: status
        ]);
        socket.write(Buffer.concat([encodeVarInt(handshakeData.length), handshakeData]));
        socket.write(Buffer.from([0x01, 0x00])); // Status request packet
      } catch (err) {
        socket.destroy();
        reject(err);
      }
    });

    let buffer = Buffer.alloc(0);
    socket.on('data', (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      const str = buffer.toString('utf8');
      const start = str.indexOf('{');
      const end = str.lastIndexOf('}');
      if (start !== -1 && end > start) {
        try {
          const json = JSON.parse(str.slice(start, end + 1));
          socket.destroy();
          resolve(json);
        } catch (e) {
          // incomplete chunk, wait for more data
        }
      }
    });

    socket.setTimeout(timeoutMs, () => {
      socket.destroy();
      reject(new Error('Connection timed out'));
    });

    socket.on('error', (err) => {
      socket.destroy();
      reject(err);
    });
  });
}

// Fetch Minecraft Status with Direct TCP Ping First (Instant & Real-time)
async function fetchMinecraftStatus(serverIp, forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && cachedStatus && (now - lastStatusFetchTime < CACHE_DURATION_MS)) {
    return cachedStatus;
  }

  const db = readDb();
  const fallbackMax = 40;
  const parts = serverIp.split(':');
  const host = parts[0];
  const port = parts[1] ? parseInt(parts[1], 10) : 25565;

  // 1. Try DIRECT TCP Ping to the server
  try {
    const directResult = await pingMinecraftDirect(host, port, 3000);
    const onlineCount = directResult.players?.online ?? 0;
    const maxCount = directResult.players?.max ?? fallbackMax;
    // Map player sample (real online player names)
    const playerList = Array.isArray(directResult.players?.sample)
      ? directResult.players.sample.map(p => ({ name: p.name, uuid: p.id }))
      : [];

    let motdClean = db.config.motd;
    if (typeof directResult.description === 'string') {
      motdClean = directResult.description.replace(/§[0-9a-fk-or]/gi, '').trim();
    } else if (directResult.description?.text) {
      motdClean = directResult.description.text.replace(/§[0-9a-fk-or]/gi, '').trim();
    }

    cachedStatus = {
      online: true,
      players: {
        online: onlineCount,
        max: maxCount,
        list: playerList
      },
      version: directResult.version?.name ?? db.config.version ?? "1.20.4 - 1.21.x",
      motd: motdClean || db.config.motd,
      icon: null,
      hostname: host,
      source: 'direct-live'
    };
    lastStatusFetchTime = now;
    return cachedStatus;
  } catch (directErr) {
    console.warn(`Direct TCP ping to ${serverIp} failed (${directErr.message}). Checking via fallback API.`);
  }

  // 2. Fallback to mcsrvstat if direct TCP was blocked
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(serverIp)}`, {
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      const isOnline = !!data.online;
      cachedStatus = {
        online: isOnline,
        players: {
          online: isOnline ? (data.players?.online ?? 0) : 0,
          max: isOnline ? (data.players?.max ?? fallbackMax) : fallbackMax,
          list: isOnline ? (data.players?.list ?? []) : []
        },
        version: data.version ?? db.config.version ?? "1.20.4 - 1.21.x",
        motd: isOnline 
          ? (data.motd?.clean ? data.motd.clean.join(" ") : db.config.motd)
          : "Server sedang restart atau offline...",
        icon: data.icon || null,
        hostname: data.hostname || host,
        source: 'api-live'
      };
      lastStatusFetchTime = now;
      return cachedStatus;
    }
  } catch (apiErr) {
    console.warn(`Fallback API check also failed (${apiErr.message}).`);
  }

  // 3. True Offline/Restarting Status (0 players, empty list)
  cachedStatus = {
    online: false,
    players: {
      online: 0,
      max: fallbackMax,
      list: []
    },
    version: db.config.version ?? "1.20.4 - 1.21.x",
    motd: "Server sedang restart atau offline...",
    icon: null,
    hostname: host,
    source: 'offline'
  };
  lastStatusFetchTime = now;
  return cachedStatus;
}

// Authentication middleware
function authenticateAdmin(req, res, next) {
  const adminSecret = req.headers['x-admin-password'];
  const db = readDb();
  if (adminSecret && adminSecret === db.config.adminPassword) {
    return next();
  }
  return res.status(401).json({ success: false, message: "Kata sandi admin tidak valid!" });
}

// Serve Server Logo (User's uploaded logo)
app.get('/api/logo', (req, res) => {
  const customLogoPath = path.join(__dirname, 'data/custom_logo.png');
  if (fs.existsSync(customLogoPath)) {
    return res.sendFile(customLogoPath);
  }
  const userUploadPath1 = "C:/Users/xeon id/.gemini/antigravity/brain/c3a42cf0-f671-46d1-8b14-99274cdbae6e/.user_uploaded/media_1792680990744_beca47e2.jpg";
  const userUploadPath2 = "C:/Users/xeon id/.gemini/antigravity/brain/c3a42cf0-f671-46d1-8b14-99274cdbae6e/.user_uploaded/media_1792680889171_2878fbb3.jpg";
  if (fs.existsSync(userUploadPath1)) {
    return res.sendFile(path.resolve(userUploadPath1));
  }
  if (fs.existsSync(userUploadPath2)) {
    return res.sendFile(path.resolve(userUploadPath2));
  }
  res.sendFile(path.join(__dirname, '../client/public/sableng_hero.jpg'));
});

// Serve Fishing Event image (User's authentic Minecraft screenshot)
app.get('/api/images/mancing', (req, res) => {
  const candidates = [
    path.join(__dirname, 'data/mc_mancing.jpg'),
    path.join(__dirname, '../client/public/mc_mancing.jpg'),
    "C:/Users/xeon id/.gemini/antigravity/brain/c3a42cf0-f671-46d1-8b14-99274cdbae6e/.user_uploaded/media_1792752814946_bfff9c87.jpg",
    "C:/Users/xeon id/.gemini/antigravity/brain/c3a42cf0-f671-46d1-8b14-99274cdbae6e/mc_fishing_event_1792752785607.jpg"
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return res.sendFile(path.resolve(candidate));
    }
  }
  res.status(404).send('Image not found');
});

// Serve Claim Land image (User's authentic Minecraft screenshot)
app.get('/api/images/claim', (req, res) => {
  const candidates = [
    path.join(__dirname, 'data/mc_claim.jpg'),
    path.join(__dirname, '../client/public/mc_claim.jpg'),
    "C:/Users/xeon id/.gemini/antigravity/brain/c3a42cf0-f671-46d1-8b14-99274cdbae6e/.user_uploaded/media_1792752827978_d2aa644f.jpg",
    "C:/Users/xeon id/.gemini/antigravity/brain/c3a42cf0-f671-46d1-8b14-99274cdbae6e/mc_claim_land_1792752698609.jpg"
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return res.sendFile(path.resolve(candidate));
    }
  }
  res.status(404).send('Image not found');
});

// Auto-sync uploaded Minecraft images to public static folder on startup
try {
  const publicDir = path.join(__dirname, '../client/public');
  const mancingSrc = "C:/Users/xeon id/.gemini/antigravity/brain/c3a42cf0-f671-46d1-8b14-99274cdbae6e/.user_uploaded/media_1792752814946_bfff9c87.jpg";
  const claimSrc = "C:/Users/xeon id/.gemini/antigravity/brain/c3a42cf0-f671-46d1-8b14-99274cdbae6e/.user_uploaded/media_1792752827978_d2aa644f.jpg";
  if (fs.existsSync(mancingSrc)) {
    fs.copyFileSync(mancingSrc, path.join(publicDir, 'mc_mancing.jpg'));
    fs.copyFileSync(mancingSrc, path.join(__dirname, 'data/mc_mancing.jpg'));
  }
  if (fs.existsSync(claimSrc)) {
    fs.copyFileSync(claimSrc, path.join(publicDir, 'mc_claim.jpg'));
    fs.copyFileSync(claimSrc, path.join(__dirname, 'data/mc_claim.jpg'));
  }
} catch (e) {
  // ignore
}

// Upload and save custom logo directly from browser
app.post('/api/logo', (req, res) => {
  const { imageBase64 } = req.body;
  if (!imageBase64) {
    return res.status(400).json({ success: false, message: "Tidak ada data gambar." });
  }
  try {
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(cleanBase64, 'base64');
    fs.writeFileSync(path.join(dataDir, 'custom_logo.png'), buffer);
    res.json({ success: true, message: "Logo berhasil diperbarui dan disimpan!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Routes
// 1. Config
app.get('/api/config', (req, res) => {
  const db = readDb();
  const { adminPassword, ...publicConfig } = db.config;
  res.json({ success: true, config: publicConfig });
});

app.put('/api/config', authenticateAdmin, (req, res) => {
  const db = readDb();
  db.config = { ...db.config, ...req.body };
  writeDb(db);
  // Clear cache if IP was updated
  cachedStatus = null;
  res.json({ success: true, message: "Konfigurasi server berhasil diperbarui!", config: db.config });
});

app.get('/api/status', async (req, res) => {
  const db = readDb();
  const forceRefresh = !!(req.query.force || req.query.refresh || req.query.t);
  const status = await fetchMinecraftStatus(db.config.ipAddress, forceRefresh);
  res.json({ success: true, status });
});

// 3. Announcements
app.get('/api/announcements', (req, res) => {
  const db = readDb();
  res.json({ success: true, announcements: db.announcements });
});

app.post('/api/announcements', authenticateAdmin, (req, res) => {
  const { title, tag, content, author, image } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: "Judul dan konten wajib diisi." });
  }

  const db = readDb();
  const newAnnouncement = {
    id: `ann-${Date.now()}`,
    title,
    tag: tag || "UPDATE",
    date: new Date().toISOString().split('T')[0],
    author: author || "Admin",
    content,
    image: image || "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=800&q=80"
  };

  db.announcements.unshift(newAnnouncement);
  writeDb(db);
  res.status(201).json({ success: true, announcement: newAnnouncement });
});

app.delete('/api/announcements/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const initialLength = db.announcements.length;
  db.announcements = db.announcements.filter(a => a.id !== id);

  if (db.announcements.length === initialLength) {
    return res.status(404).json({ success: false, message: "Pengumuman tidak ditemukan." });
  }

  writeDb(db);
  res.json({ success: true, message: "Pengumuman berhasil dihapus." });
});

// 4. Ranks & Store
app.get('/api/ranks', (req, res) => {
  const db = readDb();
  res.json({ success: true, ranks: db.ranks });
});

// 5. Staff
app.get('/api/staff', (req, res) => {
  const db = readDb();
  res.json({ success: true, staff: db.staff });
});

// 6. Rules
app.get('/api/rules', (req, res) => {
  const db = readDb();
  res.json({ success: true, rules: db.rules });
});

// 7. Whitelist & Support Tickets
app.post('/api/tickets', (req, res) => {
  const { type, playerName, discord, message } = req.body;
  if (!playerName || !message) {
    return res.status(400).json({ success: false, message: "Nama pemain (IGN) dan pesan harus diisi." });
  }

  const db = readDb();
  const newTicket = {
    id: `ticket-${Date.now()}`,
    type: type || 'whitelist',
    playerName: playerName.trim(),
    discord: discord ? discord.trim() : '-',
    message: message.trim(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  db.tickets.unshift(newTicket);
  writeDb(db);
  res.status(201).json({ success: true, message: "Pengajuan berhasil dikirim! Staff kami akan segera meninjaunya.", ticket: newTicket });
});

app.get('/api/tickets', authenticateAdmin, (req, res) => {
  const db = readDb();
  res.json({ success: true, tickets: db.tickets });
});

app.patch('/api/tickets/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const db = readDb();
  const ticket = db.tickets.find(t => t.id === id);
  if (!ticket) {
    return res.status(404).json({ success: false, message: "Tiket tidak ditemukan." });
  }

  ticket.status = status || ticket.status;
  writeDb(db);
  res.json({ success: true, message: `Status tiket diubah menjadi ${ticket.status}`, ticket });
});

// 8. Admin login verification
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const db = readDb();
  if (password === db.config.adminPassword) {
    return res.json({ success: true, message: "Login berhasil!" });
  }
  return res.status(401).json({ success: false, message: "Password salah!" });
});

// Serve frontend static build in production
const clientDist = path.join(__dirname, '../client/dist');
app.use(express.static(clientDist));
app.get('*', (req, res) => {
  const indexHtml = path.join(clientDist, 'index.html');
  res.sendFile(indexHtml, (err) => {
    if (err) {
      res.status(200).send("API Server is running. Client is in development mode or not yet built.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`🎮 Minecraft Server Website API running at http://localhost:${PORT}`);
});
