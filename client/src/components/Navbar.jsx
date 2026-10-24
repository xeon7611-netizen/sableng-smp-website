import React, { useState } from 'react';
import { Shield, Sparkles, Users, ShoppingBag, Newspaper, BookOpen, Menu, X, Copy, Check } from 'lucide-react';

export default function Navbar({ config, status, onOpenAdmin, onCopyIp, copied }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Beranda', href: '#beranda', icon: Sparkles },
    { label: 'Mode Game', href: '#gamemode', icon: Shield },
    { label: 'Store Ranks', href: '#store', icon: ShoppingBag },
    { label: 'Berita', href: '#berita', icon: Newspaper },
    { label: 'Staff Tim', href: '#staff', icon: Users },
    { label: 'Aturan', href: '#peraturan', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#12141a]/95 backdrop-blur-md border-b-2 border-[#2b303c] shadow-xl w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full flex items-center justify-between h-20">
          
          {/* Brand on Far Left Corner (Pojok Kiri Atas) */}
          <a href="#beranda" className="flex items-center shrink-0 whitespace-nowrap group py-2 select-none">
            <span className="font-minecraft text-xl sm:text-2xl lg:text-3xl tracking-wider text-[#FFAA00] mc-text-shadow group-hover:text-[#FFD200] transition-colors whitespace-nowrap">
              {config.serverName || "SABLENG SMP"}
            </span>
          </a>

          {/* All Nav Items & Action Buttons on Far Right (Pojok Kanan Atas) */}
          <div className="flex items-center gap-3 lg:gap-6 ml-auto">
            
            {/* Desktop Nav Items */}
            <nav className="hidden lg:flex items-center gap-1 lg:gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold text-slate-300 hover:text-white hover:bg-[#202531] transition-all flex items-center gap-1.5 border border-transparent hover:border-[#384052] whitespace-nowrap shrink-0"
                  >
                    <Icon size={15} className="text-[#55FF55] shrink-0" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Actions (IP Copy & Admin) */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              <button
                onClick={onCopyIp}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1e232d] hover:bg-[#272d3b] border-2 border-[#384052] text-xs font-mono font-bold text-slate-200 transition-all hover:border-[#55FF55] whitespace-nowrap shrink-0"
                title="Klik untuk salin IP"
              >
                {copied ? (
                  <>
                    <Check size={15} className="text-[#55FF55] stroke-[3] shrink-0" />
                    <span className="text-[#55FF55] whitespace-nowrap">IP TERSALIN!</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} className="text-slate-400 shrink-0" />
                    <span className="text-[#55FFFF] whitespace-nowrap font-mono">{config.ipAddress}</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-[#1e232d] border border-[#384052] text-slate-200"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-[#2b303c] bg-[#12141a] px-4 pt-4 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-3 rounded-lg text-slate-200 hover:bg-[#1e232d] hover:text-[#55FF55] font-semibold text-sm border border-transparent hover:border-[#384052]"
              >
                <Icon size={18} className="text-[#55FF55]" />
                {item.label}
              </a>
            );
          })}
          <div className="pt-3 border-t border-[#2b303c]">
            <button
              onClick={() => {
                onCopyIp();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#1e232d] border-2 border-[#55FF55]/40 text-[#55FF55] font-mono font-bold text-sm"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'IP TERSALIN!' : `SALIN IP: ${config.ipAddress}`}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
