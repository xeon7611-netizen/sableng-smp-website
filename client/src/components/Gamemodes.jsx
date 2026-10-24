import React from 'react';
import { Compass, Sparkles, Pickaxe, Clock } from 'lucide-react';

export default function Gamemodes() {
  const modes = [
    {
      id: "survival",
      title: "Survival SMP Sableng",
      tag: "Main Server",
      badgeColor: "bg-emerald-950 text-[#55FF55] border-emerald-600",
      description: "Survival santai tapi penuh petualangan! Dilengkapi proteksi tanah anti-maling, eksplorasi World Custom yang memukau, dan pasar ekonomi antar pemain yang aktif.",
      icon: Compass,
      isComingSoon: false,
      features: [
        "Sistem Proteksi Klaim Tanah (/lands & /claim)",
        "Pasar Lelang & Toko Peti Pemain (/ah)",
        "World Generator Custom (Bioma Unik, Tebing Megah & Alam Spektakuler)",
        "Eksplorasi Dunia Tanpa Batas dengan Gua Eksotis & Struktur Unik"
      ]
    },
    {
      id: "skyblock",
      title: "Skyblock Sultan",
      tag: "COMING SOON",
      badgeColor: "bg-amber-950 text-[#FFAA00] border-amber-600 animate-pulse",
      description: "Bangun kerajaan di atas awan dari 1 pulau kecil. Kumpulkan kekayaan dengan minion otomatis dan jadilah Sultan peringkat #1 di Sableng SMP!",
      icon: Pickaxe,
      isComingSoon: true,
      features: [
        "Generator Ore Bertingkat (Cobble s/d Netherite)",
        "Minion Otomatis Pemanen Sumber Daya",
        "Papan Peringkat /is top Berhadiah Bulanan",
        "Misi Harian dengan Reward Exp & Koin Melimpah",
        "Bebas Ganti Bioma & Cuaca Pulau Sendiri"
      ]
    }
  ];

  return (
    <section id="gamemode" className="py-20 relative bg-[#0e1017] border-t-2 border-[#2b303c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1b202c] border border-[#384052] text-xs text-[#55FF55] font-mono font-bold mb-3">
            <Sparkles size={14} />
            <span>MODE PERMAINAN SABLENG</span>
          </div>
          <h2 className="font-minecraft text-2xl sm:text-4xl text-white tracking-wider mc-text-shadow">
            PILIH PETUALANGANMU
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base font-medium">
            Semua mode permainan di Sableng SMP dioptimalkan dengan performa 20 TPS agar tidak ada lag saat PvP atau bertualang.
          </p>
        </div>

        {/* 2 Centered Gamemode Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.id}
                className={`group relative bg-[#151922] rounded-2xl p-7 border-2 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between ${
                  mode.isComingSoon 
                    ? 'border-[#3b352b] opacity-90' 
                    : 'border-[#2b3344] hover:border-[#4c5a75]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#1e2433] border-2 border-[#384359] flex items-center justify-center text-[#55FF55] shadow-inner group-hover:scale-105 transition-transform">
                      <Icon size={24} />
                    </div>
                    <span className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold border ${mode.badgeColor}`}>
                      {mode.tag}
                    </span>
                  </div>

                  <h3 className="font-minecraft text-base sm:text-lg text-white mb-3 group-hover:text-[#FFAA00] transition-colors mc-text-shadow">
                    {mode.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                    {mode.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t-2 border-[#232a38]">
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      Fitur Andalan:
                    </span>
                    {mode.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-[#55FF55] font-bold mt-0.5">✔</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  {mode.isComingSoon ? (
                    <button
                      disabled
                      className="w-full py-3 rounded-xl text-xs font-minecraft tracking-wider uppercase text-center block bg-[#25221b] text-[#FFAA00]/80 border-2 border-[#473c2b] cursor-not-allowed opacity-90"
                    >
                      COMING SOON
                    </button>
                  ) : (
                    <a
                      href="#beranda"
                      className="btn-mc-green w-full py-3 rounded-xl text-xs tracking-wider uppercase text-center block"
                    >
                      Mainkan Sekarang
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
