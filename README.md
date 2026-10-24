# 🎮 Minecraft Server Full-Stack Website

Website modern, responsif, dan lengkap untuk server Minecraft Anda. Dibuat menggunakan **Node.js + Express (Backend)** dan **React + Vite + Tailwind CSS (Frontend)** dengan tema khas Minecraft (dark obsidian & neon accents).

---

## ✨ Fitur-Fitur Utama yang Tersedia:

1. **🔴 Live Server Status & Cek Pemain Online**:
   - Mendeteksi status server secara real-time (Online/Offline, jumlah pemain aktif, kapasitas server, versi Minecraft).
   - Indikator kapasitas dan kestabilan TPS.
   - Kotak MOTD (Message of the Day).

2. **📋 1-Klik Salin IP Server**:
   - Mendukung **Java Edition** (`play.aetheriacraft.net:30248`) dan **Bedrock / MCPE** (`bedrock.aetheriacraft.net:19132`).
   - Tombol salin instan dengan notifikasi umpan balik visual.

3. **💎 Halaman Ranks / Store / Donasi**:
   - Menampilkan paket rank: **VIP**, **MVP**, **LEGEND**, dan **TITAN**.
   - Daftar keuntungan dan hak istimewa (perks: `/fly`, `/sethome`, kit mingguan, vault).
   - Modal checkout interaktif dengan simulasi metode pembayaran (QRIS, DANA, GoPay, Transfer Bank) serta input Minecraft IGN.

4. **📰 Sistem Pengumuman & Berita (News)**:
   - Filter kategori: **UPDATE**, **EVENT**, dan **INFO**.
   - Modal membaca berita lengkap menggunakan standar modern `<dialog>`.

5. **🛡️ Tim Staff & Skin Avatar 3D**:
   - Menampilkan jajaran Owner, Lead Architect, Admin, dan Moderator.
   - Avatar kepala/skin terintegrasi otomatis dengan API skin Minecraft asli.

6. **📜 Peraturan Server (Rules) & FAQ**:
   - 3 Kategori aturan penting (Komunitas & Chat, Gameplay & Anti-Cheat, Klaim Tanah & Griefing).
   - Accordion FAQ untuk panduan pemain baru (cara join Bedrock, cara klaim tanah, dll).

7. **📝 Formulir Whitelist & Tiket Bantuan**:
   - Formulir pendaftaran pemain baru (Whitelist), laporan cheater/bug, atau bantuan umum.
   - Terhubung langsung ke database backend.

8. **🔒 Panel Admin Lengkap (Dashboard)**:
   - Akses via tombol gembok di pojok kanan atas dengan kata sandi (Default: `admin123`).
   - **Kelola Tiket**: Setujui (*Approve*) atau Tolak (*Reject*) pengajuan whitelist pemain.
   - **Buat Berita**: Terbitkan pengumuman baru langsung dari browser.
   - **Ubah Konfigurasi**: Ganti nama server, IP server, link Discord, dan MOTD kapan saja tanpa perlu mengubah kode.

---

## 🚀 Cara Menjalankan Website:

### Cara 1: Menggunakan Script Cepat (Windows)
Cukup buka folder proyek lalu **klik dua kali** file:
```
start.bat
```
Lalu buka browser Anda di:
👉 **http://localhost:5000**

---

### Cara 2: Melalui Terminal (Command Prompt / PowerShell)

Buka terminal di direktori proyek:
```bash
cd "C:\Users\xeon id\.gemini\antigravity\scratch\minecraft-server-website"
```

Jalankan perintah:
```bash
npm start
```
Buka **http://localhost:5000** di browser Anda.

---

### Untuk Mode Pengembangan (Hot Reload Frontend):
```bash
npm run dev
```
- Frontend (Vite): **http://localhost:3000**
- Backend (API): **http://localhost:5000**

---

## 🔑 Informasi Login Admin:
- **URL**: Klik ikon **Gembok (Lock)** di pojok kanan atas website.
- **Kata Sandi Default**: `admin123`
*(Kata sandi dapat diubah di file `server/data/db.json`)*.
