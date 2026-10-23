import React, { useState, useEffect, useRef } from 'react';
import { Lock, X, Check, Trash2, Plus, Settings, Newspaper, UserCheck, Shield, AlertCircle, Save, Loader2 } from 'lucide-react';

export default function AdminModal({
  isOpen,
  onClose,
  config,
  onConfigUpdated,
  announcements,
  onAnnouncementsUpdated,
  onNotification
}) {
  const dialogRef = useRef(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminTab, setAdminTab] = useState('tickets'); // 'tickets' | 'announcements' | 'config'
  
  // Data states
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);
  
  // Edit Config Form
  const [editConfig, setEditConfig] = useState(config);

  // New Announcement Form
  const [newNews, setNewNews] = useState({
    title: '',
    tag: 'UPDATE',
    author: 'Xeon (Owner)',
    image: '',
    content: ''
  });

  useEffect(() => {
    setEditConfig(config);
  }, [config]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Modern Web Guidance: Backdrop light-dismiss fallback
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInside) {
        onClose();
      }
    };

    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialog.addEventListener('click', handleBackdropClick);
    }
    return () => {
      dialog.removeEventListener('click', handleBackdropClick);
    };
  }, [onClose]);

  // Fetch tickets when authenticated
  const fetchTickets = async () => {
    setLoadingTickets(true);
    try {
      const res = await fetch('/api/tickets', {
        headers: { 'x-admin-password': password }
      });
      const data = await res.json();
      if (data.success) {
        setTickets(data.tickets);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingTickets(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTickets();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        if (onNotification) onNotification('success', 'Berhasil login ke Admin Panel!');
      } else {
        if (onNotification) onNotification('error', data.message || 'Password salah!');
      }
    } catch (err) {
      if (onNotification) onNotification('error', 'Gagal menghubungi server.');
    }
  };

  const handleUpdateConfig = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify(editConfig)
      });
      const data = await res.json();
      if (data.success) {
        if (onConfigUpdated) onConfigUpdated(data.config);
        if (onNotification) onNotification('success', 'Pengaturan server berhasil disimpan!');
      } else {
        if (onNotification) onNotification('error', data.message);
      }
    } catch (e) {
      if (onNotification) onNotification('error', 'Gagal memperbarui konfigurasi.');
    }
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify(newNews)
      });
      const data = await res.json();
      if (data.success) {
        if (onAnnouncementsUpdated) onAnnouncementsUpdated();
        setNewNews({
          title: '',
          tag: 'UPDATE',
          author: 'Xeon (Owner)',
          image: '',
          content: ''
        });
        if (onNotification) onNotification('success', 'Pengumuman baru berhasil diterbitkan!');
      } else {
        if (onNotification) onNotification('error', data.message);
      }
    } catch (e) {
      if (onNotification) onNotification('error', 'Gagal membuat pengumuman.');
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pengumuman ini?")) return;
    try {
      const res = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password }
      });
      const data = await res.json();
      if (data.success) {
        if (onAnnouncementsUpdated) onAnnouncementsUpdated();
        if (onNotification) onNotification('success', 'Pengumuman dihapus.');
      }
    } catch (e) {
      if (onNotification) onNotification('error', 'Gagal menghapus pengumuman.');
    }
  };

  const handleUpdateTicketStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setTickets(tickets.map(t => t.id === id ? { ...t, status } : t));
        if (onNotification) onNotification('success', `Status tiket diubah: ${status}`);
      }
    } catch (e) {
      if (onNotification) onNotification('error', 'Gagal mengubah status.');
    }
  };

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="adminDialogTitle"
      onClose={onClose}
      className="m-auto p-0 bg-transparent rounded-2xl max-w-4xl w-[95%] text-slate-100 shadow-2xl backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm"
    >
      <div className="bg-mc-card border border-mc-border rounded-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          aria-label="Tutup Panel Admin"
        >
          <X size={18} />
        </button>

        {!isAuthenticated ? (
          /* Login Form */
          <div className="max-w-md mx-auto py-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
              <Lock size={28} />
            </div>
            <h3 id="adminDialogTitle" className="text-2xl font-black text-white mb-2">
              Panel Pengelola Server
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Masukkan kata sandi admin untuk mengakses manajemen tiket, pengumuman, dan konfigurasi server. (Default: <code className="text-amber-400">admin123</code>)
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                required
                placeholder="Kata Sandi Admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-mc-border text-white text-center text-sm focus:outline-none focus:border-amber-400 font-mono"
              />
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm uppercase tracking-wide"
              >
                Masuk ke Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Admin Dashboard */
          <div>
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-mc-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 id="adminDialogTitle" className="font-bold text-lg text-white">
                    Admin Dashboard
                  </h3>
                  <span className="text-xs text-emerald-400 font-medium">● Terhubung sebagai Administrator</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex gap-2 p-1 bg-slate-900 rounded-xl border border-mc-border">
                <button
                  onClick={() => setAdminTab('tickets')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    adminTab === 'tickets' ? 'bg-emerald-500 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <UserCheck size={14} />
                  <span>Tiket & Whitelist ({tickets.length})</span>
                </button>

                <button
                  onClick={() => setAdminTab('announcements')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    adminTab === 'announcements' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Newspaper size={14} />
                  <span>Pengumuman</span>
                </button>

                <button
                  onClick={() => setAdminTab('config')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    adminTab === 'config' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Settings size={14} />
                  <span>Pengaturan</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Tickets */}
            {adminTab === 'tickets' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-300">Daftar Pengajuan Whitelist & Laporan Pemain</h4>
                  <button
                    onClick={fetchTickets}
                    className="text-xs text-emerald-400 hover:underline"
                  >
                    Segarkan Data
                  </button>
                </div>

                {loadingTickets ? (
                  <div className="py-12 text-center text-slate-400 flex items-center justify-center gap-2">
                    <Loader2 size={18} className="animate-spin" /> Memuat tiket...
                  </div>
                ) : tickets.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-sm">
                    Belum ada tiket atau pendaftaran yang masuk.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tickets.map((t) => (
                      <div
                        key={t.id}
                        className="p-4 rounded-xl bg-slate-900 border border-mc-border flex flex-col sm:flex-row justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-white text-sm">{t.playerName}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              t.type === 'whitelist' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                            }`}>
                              {t.type}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              t.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' :
                              t.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                            }`}>
                              {t.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">Discord: <span className="font-mono text-slate-300">{t.discord}</span></p>
                          <p className="text-xs text-slate-200 mt-2 whitespace-pre-line bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                            {t.message}
                          </p>
                        </div>

                        <div className="flex sm:flex-col gap-2 shrink-0 justify-center">
                          <button
                            onClick={() => handleUpdateTicketStatus(t.id, 'approved')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-colors"
                          >
                            Setujui (Approve)
                          </button>
                          <button
                            onClick={() => handleUpdateTicketStatus(t.id, 'rejected')}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold transition-colors"
                          >
                            Tolak (Reject)
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Announcements */}
            {adminTab === 'announcements' && (
              <div className="space-y-6">
                {/* Form Add News */}
                <form onSubmit={handleCreateAnnouncement} className="p-4 rounded-xl bg-slate-900 border border-mc-border space-y-4">
                  <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                    <Plus size={16} /> Buat Pengumuman Baru
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-xs text-slate-400 block mb-1">Judul Pengumuman</label>
                      <input
                        type="text"
                        required
                        value={newNews.title}
                        onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                        placeholder="Contoh: Jadwal Event PvP Mingguan"
                        className="w-full px-3 py-2 bg-slate-950 border border-mc-border rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Kategori Tag</label>
                      <select
                        value={newNews.tag}
                        onChange={(e) => setNewNews({ ...newNews, tag: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-mc-border rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="UPDATE">UPDATE</option>
                        <option value="EVENT">EVENT</option>
                        <option value="INFO">INFO</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">URL Gambar Banner (Opsional)</label>
                    <input
                      type="url"
                      value={newNews.image}
                      onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 bg-slate-950 border border-mc-border rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Isi Berita</label>
                    <textarea
                      required
                      rows={3}
                      value={newNews.content}
                      onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                      placeholder="Tuliskan detail pengumuman untuk pemain..."
                      className="w-full px-3 py-2 bg-slate-950 border border-mc-border rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase"
                  >
                    Terbitkan Pengumuman
                  </button>
                </form>

                {/* List Announcements */}
                <div>
                  <h4 className="text-sm font-bold text-slate-300 mb-3">Pengumuman Aktif</h4>
                  <div className="space-y-2">
                    {announcements.map((a) => (
                      <div
                        key={a.id}
                        className="p-3 rounded-lg bg-slate-900 border border-mc-border flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-bold">{a.tag}</span>
                            <span className="text-sm font-bold text-white">{a.title}</span>
                          </div>
                          <span className="text-[11px] text-slate-400">{a.date} • {a.author}</span>
                        </div>

                        <button
                          onClick={() => handleDeleteAnnouncement(a.id)}
                          className="p-2 rounded-lg text-red-400 hover:bg-red-500/20"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Configuration */}
            {adminTab === 'config' && (
              <form onSubmit={handleUpdateConfig} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Nama Server</label>
                    <input
                      type="text"
                      value={editConfig.serverName || ''}
                      onChange={(e) => setEditConfig({ ...editConfig, serverName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-mc-border rounded-lg text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Versi Minecraft</label>
                    <input
                      type="text"
                      value={editConfig.version || ''}
                      onChange={(e) => setEditConfig({ ...editConfig, version: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-mc-border rounded-lg text-sm text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">IP Server Java</label>
                    <input
                      type="text"
                      value={editConfig.ipAddress || ''}
                      onChange={(e) => setEditConfig({ ...editConfig, ipAddress: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-mc-border rounded-lg text-sm text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">IP Server Bedrock</label>
                    <input
                      type="text"
                      value={editConfig.bedrockIp || ''}
                      onChange={(e) => setEditConfig({ ...editConfig, bedrockIp: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-mc-border rounded-lg text-sm text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Port Bedrock</label>
                    <input
                      type="number"
                      value={editConfig.bedrockPort || 19132}
                      onChange={(e) => setEditConfig({ ...editConfig, bedrockPort: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-900 border border-mc-border rounded-lg text-sm text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Link Discord Komunitas</label>
                    <input
                      type="url"
                      value={editConfig.discordUrl || ''}
                      onChange={(e) => setEditConfig({ ...editConfig, discordUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-mc-border rounded-lg text-sm text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Link Grup WhatsApp</label>
                    <input
                      type="url"
                      placeholder="https://chat.whatsapp.com/..."
                      value={editConfig.whatsappUrl || ''}
                      onChange={(e) => setEditConfig({ ...editConfig, whatsappUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-mc-border rounded-lg text-sm text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">MOTD (Message of the Day)</label>
                  <input
                    type="text"
                    value={editConfig.motd || ''}
                    onChange={(e) => setEditConfig({ ...editConfig, motd: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-mc-border rounded-lg text-sm text-white font-mono"
                  />
                </div>

                <div className="pt-4 border-t border-mc-border flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2"
                  >
                    <Save size={16} /> Simpan Perubahan Konfigurasi
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </dialog>
  );
}
