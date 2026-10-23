import React from 'react';
import { Sparkles, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';

export default function StoreRanks({ ranks, serverName }) {
  const DISCORD_TICKET_URL = "https://discord.gg/zsfVXZ3GA";

  return (
    <section id="store" className="py-20 relative bg-[#12151c] border-t-2 border-[#2b303c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1e2433] border border-[#384359] text-xs text-[#FFAA00] font-mono font-bold mb-3">
            <Sparkles size={14} />
            <span>SABLENG OFFICIAL STORE</span>
          </div>
          <h2 className="font-minecraft text-2xl sm:text-4xl text-[#FFAA00] tracking-wider mc-title-gold">
            PAKET DONASI & RANKS
          </h2>
          <p className="text-slate-300 mt-4 text-sm sm:text-base">
            Dukung server agar terus aktif 24/7 dan dapatkan hak istimewa seperti /fly, sethome ekstra, kit mingguan, dan title keren permanen!
          </p>
        </div>

        {/* Ranks Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ranks.map((rank) => (
            <div
              key={rank.id}
              className={`relative bg-[#171b26] rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between shadow-2xl ${
                rank.popular
                  ? 'border-[#55FFFF] shadow-[0_0_20px_rgba(85,255,255,0.25)]'
                  : 'border-[#2c3343] hover:border-[#475269]'
              }`}
            >
              {/* Badge if popular */}
              {rank.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#55FFFF] text-slate-950 font-minecraft text-[10px] uppercase tracking-wider shadow-md font-bold">
                  ★ PALING LARIS
                </div>
              )}

              <div>
                {/* Header of card */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-minecraft text-xl font-bold tracking-wider mc-text-shadow"
                    style={{ color: rank.color }}
                  >
                    [{rank.name}]
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-400 bg-[#212736] px-2.5 py-1 rounded border border-[#364057]">
                    {rank.badge}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b-2 border-[#232938]">
                  <div className="text-3xl font-black text-white font-mono tracking-tight">
                    {rank.price}
                  </div>
                  <span className="text-xs text-[#55FF55] font-semibold mt-1 flex items-center gap-1.5 font-mono">
                    <ShieldCheck size={14} /> Status: Permanen
                  </span>
                </div>

                {/* Perks list */}
                <div className="space-y-3 mb-8">
                  <span className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider block">
                    Keuntungan Utama:
                  </span>
                  {rank.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <div className="w-4 h-4 rounded bg-emerald-950 text-[#55FF55] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-700/60 font-bold">
                        ✓
                      </div>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: Direct Open Ticket in Discord (Strictly 1 Line) */}
              <div>
                <a
                  href={DISCORD_TICKET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 px-3 rounded-xl text-[10px] sm:text-[11px] uppercase tracking-tight font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap select-none ${
                    rank.popular
                      ? 'btn-mc-green'
                      : 'btn-mc-gray'
                  }`}
                >
                  <MessageSquare size={15} className="shrink-0" />
                  <span className="whitespace-nowrap">OPEN TIKET DC</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner: Open Ticket in Discord */}
        <div className="mt-12 bg-[#171b26] rounded-2xl p-6 border-2 border-[#2c3343] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#5865F2]/20 text-[#858df3] border-2 border-[#5865F2]/60 flex items-center justify-center shrink-0">
              <MessageSquare size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Cara Pembelian Rank</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Untuk membeli atau donasi rank, silakan langsung <strong className="text-[#858df3]">Open Tiket di Discord</strong> kami. Staff admin akan langsung memproses pesanan dan mengaktifkan rank di akun Minecraft Anda!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={DISCORD_TICKET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-mc-green px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2 shadow-lg"
            >
              <MessageSquare size={16} />
              <span>BUKA TIKET DISCORD</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
