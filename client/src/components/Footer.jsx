import React from 'react';
import { Shield, MessageSquare, Heart, ArrowUp } from 'lucide-react';

export default function Footer({ config, onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0c0d12] border-t-2 border-[#2b303c] text-slate-400 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 whitespace-nowrap">
              <span className="font-minecraft text-base sm:text-lg text-[#FFAA00] tracking-wider mc-text-shadow whitespace-nowrap shrink-0">
                {config.serverName || "SABLENG SMP"}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-600/60 font-mono tracking-wider shadow-sm whitespace-nowrap shrink-0">
                SMP INDO
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Komunitas Minecraft Survival Indonesia paling seru, ramah, dan penuh keseruan. Dilengkapi proteksi tanah aman, ekonomi pemain aktif, dan event mingguan berhadiah!
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={config.discordUrl || "https://discord.gg/zsfVXZ3GA"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#171b26] border-2 border-[#2e3748] text-[#5865F2] hover:bg-[#5865F2]/20 transition-colors"
                title="Discord Sableng SMP"
              >
                <MessageSquare size={18} />
              </a>
              <a
                href={config.whatsappUrl || "https://chat.whatsapp.com/HpQZIcxnHrk3IWupTntclm?s=cl&p=a&mlu=0"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#171b26] border-2 border-[#2e3748] text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                title="Grup WhatsApp Sableng SMP"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.98-1.306A9.948 9.948 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.71 0-3.29-.537-4.588-1.455l-.329-.232-2.973.78.793-2.898-.214-.341C3.766 14.596 3.2 13.064 3.2 12c0-4.852 3.948-8.8 8.8-8.8s8.8 3.948 8.8 8.8-3.948 8.8-8.8 8.8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-minecraft text-xs text-white mb-4 tracking-wider">NAVIGASI</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#beranda" className="hover:text-[#55FF55] transition-colors">Beranda & Status</a></li>
              <li><a href="#gamemode" className="hover:text-[#55FF55] transition-colors">Mode Permainan</a></li>
              <li><a href="#store" className="hover:text-[#FFAA00] transition-colors">Donasi / Ranks</a></li>
              <li><a href="#berita" className="hover:text-[#55FFFF] transition-colors">Pengumuman & Update</a></li>
            </ul>
          </div>

          {/* Server Info */}
          <div>
            <h4 className="font-minecraft text-xs text-white mb-4 tracking-wider">KONEKSI SERVER</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <span className="text-slate-500 block text-[11px] font-sans">Java Edition:</span>
                <span className="text-[#55FFFF] font-bold">{config.ipAddress}</span>
              </li>
              <li>
                <span className="text-slate-500 block text-[11px] font-sans">Bedrock Edition (PE):</span>
                <span className="text-[#55FF55] font-bold">{config.bedrockIp || config.ipAddress}</span>
              </li>
              <li>
                <span className="text-slate-500 block text-[11px] font-sans">Port Bedrock:</span>
                <span className="text-slate-200">{config.bedrockPort || 30248}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Bottom */}
        <div className="pt-8 border-t border-[#1e2330] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {config.serverName}. Bukan produk resmi Minecraft. Tidak disetujui atau terkait dengan Mojang atau Microsoft.
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="ml-2 text-slate-700 hover:text-slate-500 transition-colors text-[10px] select-none"
                title="Kelola"
              >
                [Admin]
              </button>
            )}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171b26] hover:bg-[#202636] text-slate-400 hover:text-white transition-colors border border-[#2c3444]"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
