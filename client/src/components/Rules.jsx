import React, { useState } from 'react';
import { BookOpen, AlertTriangle, ShieldCheck, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function Rules({ rules }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Bagaimana cara bergabung jika saya menggunakan Minecraft Bedrock (HP/PE)?",
      a: "Buka Minecraft di HP atau Windows 10/11 Anda, pilih menu Servers -> Add Server. Masukkan Server Name: Sableng SMP, Server Address: kazuha.davinn.net, dan Port: 30248. Lalu tekan Play!"
    },
    {
      q: "Bagaimana cara melindungi rumah atau bangunan dari griefing?",
      a: "Pemain baru mendapatkan 100 free claim block. Cukup pegang Golden Shovel atau ketik /claim di sudut kiri bawah dan klik sudut kanan atas area base Anda, atau gunakan menu /lands untuk sistem proteksi lanjutan."
    },
    {
      q: "Berapa lama rank store aktif setelah dibeli?",
      a: "Semua rank (VIP, MVP, LEGEND, TITAN) di server kami bersifat PERMANEN dan tidak akan hangus saat reset musim atau berganti bulan."
    },
    {
      q: "Apakah server ini mendukung pemain non-original (TLauncher/Pojav)?",
      a: "Ya! Server kami mendukung mode Semi-Online (mendukung akun Original dan Non-Original). Anda cukup melakukan /register password saat pertama kali login."
    }
  ];

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section id="peraturan" className="py-20 relative bg-slate-950/40 border-t border-mc-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 border border-mc-border text-xs text-red-400 font-semibold mb-3">
            <BookOpen size={14} />
            <span>Aturan Server</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Peraturan & Panduan Bermain
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            Demi kenyamanan bersama, seluruh pemain wajib mematuhi ketentuan berikut. Pelanggaran dapat berakibat sanksi mute, kick, hingga permanent ban.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {rules.map((category, idx) => (
            <div
              key={idx}
              className="bg-mc-card/90 rounded-2xl p-6 border border-mc-border flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-mc-border">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-lg text-white">
                  {category.category}
                </h3>
              </div>

              <ul className="space-y-3.5 flex-1">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <HelpCircle size={20} className="text-emerald-400" />
            <h3 className="text-2xl font-black text-white text-center">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-mc-card/90 rounded-xl border border-mc-border overflow-hidden transition-colors hover:border-slate-600"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-sm sm:text-base text-white hover:text-emerald-300"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp size={18} className="text-emerald-400 shrink-0 ml-3" />
                    ) : (
                      <ChevronDown size={18} className="text-slate-400 shrink-0 ml-3" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-mc-border/60 bg-slate-900/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
