import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const DEFAULT_DATA = {
  config: {
    serverName: "Sableng SMP",
    ipAddress: "kazuha.davinn.net:30248",
    javaIp: "kazuha.davinn.net:30248",
    bedrockIp: "kazuha.davinn.net",
    bedrockPort: 30248,
    version: "1.20.4 - 26.2",
    discordUrl: "https://discord.gg/zsfVXZ3GA",
    whatsappUrl: "https://chat.whatsapp.com/HpQZIcxnHrk3IWupTntclm?s=cl&p=a&mlu=0",
    motd: "★ Selamat Datang di Sableng SMP ★ Survival Kocak, Seru & Komunitas Anti-Toxic!",
    adminPassword: "RIZKY280109"
  },
  announcements: [
    {
      id: "ann-1",
      title: "Musim Baru Dibuka: Sableng SMP Grand Launching!",
      tag: "UPDATE",
      date: "2026-10-22",
      author: "Shenzukae (Owner)",
      content: "Halo warga Sableng! Server Sableng SMP resmi dibuka untuk Java & Bedrock (Port: 30248). Nikmati gameplay survival anti-lag, sistem ekonomi seimbang, proteksi tanah /lands, dan event mingguan seru!",
      image: "/sableng_hero.jpg"
    },
    {
      id: "ann-2",
      title: "Event Mancing Mania Sableng: Berhadiah Ikan Purba & Rank Titan!",
      tag: "EVENT",
      date: "2026-10-23",
      author: "Resonante (Moderator)",
      content: "Siapkan joran pancing terbaikmu dengan enchantment Lure & Luck of the Sea! Hari Sabtu malam ini pukul 20:00 WIB di Danau Spawn akan diadakan Event Mancing Akbar. Tangkap ikan paling langka dan bawa pulang Rank TITAN Permanent serta jutaan koin!",
      image: "/api/images/mancing"
    },
    {
      id: "ann-3",
      title: "Fitur Proteksi Klaim Tanah /lands & Anti-Griefing Aktif",
      tag: "INFO",
      date: "2026-10-18",
      author: "Shenzukae",
      content: "Rumah dan peti Anda 100% aman di Sableng SMP! Gunakan Golden Shovel atau ketik /lands create untuk membuat base impianmu. Maling dan griefer akan langsung ditindak tegas oleh staff.",
      image: "/api/images/claim"
    }
  ],
  ranks: [
    {
      id: "rank-vip",
      name: "VIP",
      price: "Rp 5.000",
      color: "#55FF55",
      popular: false,
      badge: "Pemula",
      perks: [
        "Kit Khusus VIP",
        "Akses Terbang /fly di Area Klaim",
        "Slot /sethome hingga 5 Lokasi",
        "Animasi Text Prefix [VIP] Hijau"
      ]
    },
    {
      id: "rank-mvp",
      name: "MVP",
      price: "Rp 10.000",
      color: "#55FFFF",
      popular: true,
      badge: "Paling Laris",
      perks: [
        "Kit Khusus MVP (Diamond Tier)",
        "Akses Terbang /fly di Overworld",
        "Slot /sethome hingga 15 Lokasi",
        "Animasi Text Prefix [MVP] Cyan Berkilau"
      ]
    },
    {
      id: "rank-legend",
      name: "LEGEND",
      price: "Rp 15.000",
      color: "#AA00AA",
      popular: false,
      badge: "Sultan",
      perks: [
        "Kit Khusus LEGEND (Netherite Tier)",
        "Akses Terbang /fly di Overworld & Nether",
        "Slot /sethome hingga 30 Lokasi",
        "Animasi Text Prefix [LEGEND] Gradasi Ungu"
      ]
    },
    {
      id: "rank-titan",
      name: "TITAN",
      price: "Rp 25.000",
      color: "#FFAA00",
      popular: false,
      badge: "Dewa Sableng",
      perks: [
        "Kit Dewa TITAN (Full Enchant Netherite)",
        "Akses Terbang /fly di Semua Dunia Bebas",
        "Slot /sethome Unlimited (Tanpa Batas)",
        "Animasi Text Rainbow [★ TITAN ★] Bergerak"
      ]
    }
  ],
  staff: [
    {
      id: "staff-1",
      name: "Shenzukae",
      role: "Server Owner / Staff",
      roleBadge: "bg-red-500/20 text-red-400 border-red-500/40",
      avatarSkin: "Shenzukae",
      discord: "shenzukae",
      bio: "Pendiri, pengembang sistem, dan pengelola utama Sableng SMP."
    },
    {
      id: "staff-2",
      name: "Resonante",
      role: "Community Moderator",
      roleBadge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      avatarSkin: "Resonante",
      discord: "resonante",
      bio: "Menjaga kenyamanan pemain, ketertiban komunitas chat, dan pengawas anti-cheat."
    }
  ],
  rules: [
    {
      category: "Perilaku & Komunitas",
      items: [
        "Boleh bercanda santai, tapi dilarang toxic berlebihan, SARA, atau berkata kotor yang menyinggung.",
        "Dilarang spamming chat, promosi server lain, atau mengganggu pemain dengan sengaja.",
        "Hormati sesama pemain dan keputusan tim Staff Sableng SMP."
      ]
    },
    {
      category: "Gameplay & Anti-Cheat",
      items: [
        "Dilarang menggunakan Cheat Client, X-Ray, Fly/Speed hack, Auto-clicker, atau modifikasi curang lainnya.",
        "Dilarang keras menduplikasi item (dupe bug exploit) — laporkan bug ke staff untuk hadiah coins!",
        "Dilarang membuat mesin lag atau redstone clock masif tanpa saklar otomatis mati."
      ]
    },
    {
      category: "Klaim Tanah & Anti-Griefing",
      items: [
        "Dilarang merusak bangunan (griefing) atau mencuri peti di wilayah yang sudah diklaim orang lain.",
        "Dilarang mengurung pemain baru dengan lava atau menjebak di portal Nether (portal trap)."
      ]
    }
  ],
  tickets: [
    {
      id: "ticket-101",
      type: "whitelist",
      playerName: "Ucup_Gamer",
      discord: "ucup#9999",
      message: "Halo min, mau daftar main di Sableng SMP bareng kawan tongkrongan. Janji patuh aturan!",
      status: "approved",
      createdAt: "2026-10-22T10:15:00.000Z"
    }
  ]
};

export function ensureDb() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DATA, null, 2), 'utf-8');
  } catch (e) {
    // Read-only environment fallback (e.g. Vercel)
  }
}

export function readDb() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error("Error reading database:", error);
    }
  }
  return DEFAULT_DATA;
}

export function writeDb(data) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn("Write to DB skipped (read-only environment):", err.message);
  }
}
