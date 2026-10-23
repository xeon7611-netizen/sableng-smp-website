import React, { useState } from 'react';
import { UserCheck, Send, CheckCircle2, AlertCircle, ShieldAlert, FileText, Loader2 } from 'lucide-react';

export default function TicketsWhitelist({ onTicketSubmitted }) {
  const [formData, setFormData] = useState({
    type: 'whitelist',
    playerName: '',
    discord: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.playerName.trim() || !formData.message.trim()) {
      setFeedback({ type: 'error', message: 'Harap isi Minecraft IGN dan Pesan!' });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setFeedback({
          type: 'success',
          message: data.message || 'Pengajuan berhasil dikirim! Staff kami akan meninjaunya.'
        });
        setFormData({
          type: 'whitelist',
          playerName: '',
          discord: '',
          message: ''
        });
        if (onTicketSubmitted) onTicketSubmitted();
      } else {
        setFeedback({ type: 'error', message: data.message || 'Gagal mengirim formulir.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Terjadi kesalahan koneksi ke server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="whitelist" className="py-20 relative mc-grid-pattern border-t border-mc-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 border border-mc-border text-xs text-emerald-400 font-semibold mb-3">
            <UserCheck size={14} />
            <span>Pendaftaran & Dukungan</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Formulir Whitelist & Tiket Bantuan
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            Kirim pengajuan pendaftaran whitelist server, laporkan cheater/bug, atau ajukan pertanyaan langsung ke tim admin.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-mc-card/90 rounded-2xl p-6 sm:p-10 border border-mc-border shadow-2xl relative">
          
          {feedback && (
            <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-sm ${
              feedback.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/10 border border-red-500/30 text-red-300'
            }`}>
              {feedback.type === 'success' ? (
                <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-400" />
              ) : (
                <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Ticket Type Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Jenis Pengajuan
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'whitelist' })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    formData.type === 'whitelist'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                      : 'border-mc-border bg-slate-900 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <UserCheck size={18} className="mb-1 text-emerald-400" />
                  <div className="text-sm font-semibold">Daftar Whitelist</div>
                  <div className="text-[11px] text-slate-400 font-normal">Akses pemain baru</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'report' })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    formData.type === 'report'
                      ? 'border-red-500 bg-red-500/10 text-red-300 font-bold'
                      : 'border-mc-border bg-slate-900 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <ShieldAlert size={18} className="mb-1 text-red-400" />
                  <div className="text-sm font-semibold">Lapor Pemain / Bug</div>
                  <div className="text-[11px] text-slate-400 font-normal">X-Ray, grief, cheat</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'contact' })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    formData.type === 'contact'
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 font-bold'
                      : 'border-mc-border bg-slate-900 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <FileText size={18} className="mb-1 text-cyan-400" />
                  <div className="text-sm font-semibold">Bantuan / Staff Apply</div>
                  <div className="text-[11px] text-slate-400 font-normal">Pertanyaan umum</div>
                </button>
              </div>
            </div>

            {/* Inputs: IGN & Discord */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Minecraft Username (IGN) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: XeonGamer_ID"
                  value={formData.playerName}
                  onChange={(e) => setFormData({ ...formData, playerName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-mc-border text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Username Discord / Kontak
                </label>
                <input
                  type="text"
                  placeholder="Contoh: xeon#1234 atau @xeon"
                  value={formData.discord}
                  onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-mc-border text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm font-mono"
                />
              </div>
            </div>

            {/* Message / Reason */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                {formData.type === 'whitelist' 
                  ? 'Alasan Ingin Bergabung / Pengalaman Main Minecraft'
                  : formData.type === 'report'
                  ? 'Detail Kejadian, Koordinat, atau Nama Pelaku'
                  : 'Pesan / Pertanyaan Anda'} <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tuliskan keterangan lengkap Anda di sini..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-mc-border text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm leading-relaxed"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-glow-emerald flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Sedang Mengirim...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Kirim Pengajuan Sekarang</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
}
