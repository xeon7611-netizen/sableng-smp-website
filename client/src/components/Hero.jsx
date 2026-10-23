import React, { useState } from 'react';
import { Copy, Check, Users, Sparkles, Gamepad2, ArrowRight, MessageSquare, ExternalLink, RefreshCw, ShieldCheck, Flame, Compass, Pickaxe, Award } from 'lucide-react';

export default function Hero({ config, status, onCopyIp, copied, onRefreshStatus, loadingStatus }) {
  const [platformTab, setPlatformTab] = useState('java'); // 'java' | 'bedrock'
  const [copiedKey, setCopiedKey] = useState(null);

  const javaIp = config.javaIp || "kazuha.davinn.net:30248";
  const bedrockAddress = config.bedrockIp || "kazuha.davinn.net";
  const bedrockPort = String(config.bedrockPort || 30248);

  const handleCopy = (text, key, label) => {
    onCopyIp(text, label);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const onlineRatio = status.players?.max 
    ? Math.min(100, Math.round(((status.players?.online || 0) / status.players.max) * 100))
    : 35;

  return (
    <section id="beranda" className="relative pt-12 pb-24 overflow-hidden">
      
      {/* Real Minecraft Shaders Landscape Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/sableng_hero.jpg"
          alt="Sableng SMP Minecraft World"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1] scale-105"
        />
        {/* Gradients to seamlessly blend with dark UI */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/60 to-[#0f1115]/70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0f1115_90%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Server Tag Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#161a22]/90 border-2 border-[#384052] text-xs sm:text-sm text-slate-200 backdrop-blur-md shadow-2xl">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#55FF55] animate-ping"></span>
            <span className="font-minecraft text-[11px] text-[#FFAA00] tracking-wider uppercase">Season Baru</span>
            <span className="text-slate-300 font-medium">Server Survival Paling Seru & Ramah Pemain Baru!</span>
            <Flame size={15} className="text-[#FFAA00]" />
          </div>
        </div>

        {/* Hero Title & Branding Section (Clean, No Logo, Premium Minecraft Typography) */}
        <div className="text-center max-w-4xl mx-auto mb-12 flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest mb-4">
            ⛏️ OFFICIAL MINECRAFT INDONESIA
          </div>

          <h1 className="font-minecraft text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-[#FFAA00] tracking-wider mb-5 mc-title-gold drop-shadow-[0_4px_30px_rgba(255,170,0,0.5)] whitespace-nowrap select-none">
            {config.serverName || "SABLENG SMP"}
          </h1>
          
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
            Tempat kumpul mabar Minecraft paling santai, kocak, dan seru di Indonesia! Bebas berekspresi, bangun base impian, dan war antar klan tanpa takut diganggu maling.
          </p>

          {/* Quick Feature Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
            <span className="px-3.5 py-1.5 rounded-xl bg-[#161a24]/90 border border-[#2f394d] text-xs font-mono text-slate-300 flex items-center gap-2 shadow-sm">
              <span className="text-[#55FF55] font-bold">✔</span> Survival Klaim (/lands)
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-[#161a24]/90 border border-[#2f394d] text-xs font-mono text-slate-300 flex items-center gap-2 shadow-sm">
              <span className="text-[#FFAA00] font-bold">★</span> Skyblock Sultan (Soon)
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-[#161a24]/90 border border-[#2f394d] text-xs font-mono text-slate-300 flex items-center gap-2 shadow-sm">
              <span className="text-[#55FFFF] font-bold">⚡</span> 20.0 TPS Anti-Lag
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-[#161a24]/90 border border-[#2f394d] text-xs font-mono text-slate-300 flex items-center gap-2 shadow-sm">
              <span className="text-rose-400 font-bold">🎣</span> Event Mancing Akbar
            </span>
          </div>
        </div>

        {/* Live Server Widget Box with Minecraft Deepslate UI */}
        <div className="max-w-3xl mx-auto bg-[#161a24]/95 border-2 border-[#2f3747] rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md relative">
          
          {/* Header of widget */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b-2 border-[#252c3a]">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#202634] border-2 border-[#384052] flex items-center justify-center font-minecraft text-xl text-[#55FF55] shadow-inner">
                ⛏
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="font-minecraft text-sm sm:text-base text-white tracking-wide">
                    STATUS SERVER
                  </h2>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${
                    status.online 
                      ? 'bg-emerald-950/80 text-[#55FF55] border-emerald-600/60' 
                      : 'bg-red-950/80 text-red-400 border-red-700/60'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${status.online ? 'bg-[#55FF55] animate-pulse' : 'bg-red-500'}`}></span>
                    {status.online ? 'ONLINE 24/7' : 'OFFLINE / RESTART'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Versi: <span className="text-[#55FFFF] font-bold">{status.version || config.version}</span> (Java & Bedrock)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onRefreshStatus}
                disabled={loadingStatus}
                className="p-2.5 rounded-lg bg-[#202634] hover:bg-[#2b3346] text-slate-400 hover:text-white transition-colors border border-[#384052]"
                title="Cek Status Terkini"
              >
                <RefreshCw size={16} className={loadingStatus ? 'animate-spin text-[#55FF55]' : ''} />
              </button>
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 justify-end font-mono">
                  <Users size={14} className="text-[#55FFFF]" />
                  <span>Pemain Online</span>
                </div>
                <div className="text-2xl font-black text-white font-mono tracking-tight">
                  <span className="text-[#55FF55]">{status.players?.online || 0}</span>
                  <span className="text-slate-500 text-base font-normal"> / {status.players?.max || 100}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Player Capacity Bar */}
          <div className="py-4">
            <div className="w-full bg-[#0d1017] rounded-lg h-3 overflow-hidden border border-[#2b3346] p-0.5">
              <div 
                className="bg-gradient-to-r from-[#2e8b57] via-[#55FF55] to-[#55FFFF] h-full rounded-sm transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${Math.max(6, onlineRatio)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mt-2">
              <span>Kapasitas: <span className="text-slate-200 font-bold">{onlineRatio}%</span></span>
              <span className="text-[#55FF55] font-semibold flex items-center gap-1">
                <ShieldCheck size={13} /> TPS: 20.0 (Anti-Lag)
              </span>
            </div>
          </div>

          {/* Minecraft In-Game Chat MOTD Box */}
          <div className="mc-chat-box rounded-xl p-3.5 mb-5 font-mono text-xs sm:text-sm text-center flex items-center justify-center gap-2 text-slate-200">
            <Sparkles size={16} className="text-[#FFAA00] shrink-0" />
            <span className="text-[#FFFF55] font-semibold">{status.motd || config.motd}</span>
          </div>

          {/* Live Online Player Avatars & List */}
          {status.players?.list && status.players.list.length > 0 && (
            <div className="mb-6 p-3.5 rounded-xl bg-[#10141d] border border-[#273042]">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#55FF55] animate-ping"></span>
                  Pemain Sedang Online Saat Ini ({status.players.online}):
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/50">
                  Live Terhubung
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {status.players.list.map((p, idx) => (
                  <div key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#181e2b] border border-[#313c52] text-xs font-mono text-slate-200 hover:border-[#55FFFF] transition-all shadow-sm">
                    <img
                      src={`https://mc-heads.net/avatar/${encodeURIComponent(p.name)}/20`}
                      alt={p.name}
                      onError={(e) => { e.target.src = "https://mc-heads.net/avatar/Steve/20"; }}
                      className="w-4 h-4 rounded-sm object-contain"
                    />
                    <span className="font-semibold text-white">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Platform Tabs & IP Copy Box */}
          <div className="space-y-4">
            <div className="flex gap-2 p-1.5 bg-[#0e1118] rounded-xl border border-[#272e3d] w-fit">
              <button
                onClick={() => setPlatformTab('java')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                  platformTab === 'java'
                    ? 'bg-[#2b3447] text-[#55FFFF] border border-[#55FFFF]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🎮 Java Edition (PC)
              </button>
              <button
                onClick={() => setPlatformTab('bedrock')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                  platformTab === 'bedrock'
                    ? 'bg-[#2b3447] text-[#55FF55] border border-[#55FF55]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                📱 Bedrock / MCPE (HP & Win10)
              </button>
            </div>

            {/* IP Display & Copy Section (Dedicated Java vs Bedrock Address & Port) */}
            {platformTab === 'java' ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center justify-between px-4 py-3.5 rounded-xl bg-[#0e1118] border-2 border-[#2e3748] font-mono text-sm sm:text-base text-white">
                  <span className="select-all tracking-wider text-[#55FFFF] font-bold">{javaIp}</span>
                </div>

                <button
                  onClick={() => handleCopy(javaIp, 'java', 'IP Java')}
                  className="btn-mc-green px-6 py-3.5 rounded-xl text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2.5 uppercase shrink-0"
                >
                  {copiedKey === 'java' ? (
                    <>
                      <Check size={18} className="stroke-[3]" />
                      <span>IP TERSALIN!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={18} className="stroke-[2.5]" />
                      <span>SALIN IP SERVER</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Bedrock Server Address */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0e1118] border-2 border-[#2e3748] font-mono">
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Address</span>
                    <span className="select-all text-[#55FF55] font-bold text-sm sm:text-base truncate">{bedrockAddress}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(bedrockAddress, 'bedrock-addr', 'Address Bedrock')}
                    className="btn-mc-green px-3.5 py-2 rounded-lg text-xs tracking-wider flex items-center gap-1.5 uppercase shrink-0"
                  >
                    {copiedKey === 'bedrock-addr' ? (
                      <>
                        <Check size={15} className="stroke-[3]" />
                        <span>TERSALIN!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={15} className="stroke-[2.5]" />
                        <span>SALIN ADDRESS</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Bedrock Port */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0e1118] border-2 border-[#2e3748] font-mono">
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Port</span>
                    <span className="select-all text-[#FFAA00] font-bold text-sm sm:text-base">{bedrockPort}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(bedrockPort, 'bedrock-port', 'Port Bedrock')}
                    className="btn-mc-green px-3.5 py-2 rounded-lg text-xs tracking-wider flex items-center gap-1.5 uppercase shrink-0"
                  >
                    {copiedKey === 'bedrock-port' ? (
                      <>
                        <Check size={15} className="stroke-[3]" />
                        <span>TERSALIN!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={15} className="stroke-[2.5]" />
                        <span>SALIN PORT</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t-2 border-[#252c3a]">
            
            {/* Community Links (Discord & WhatsApp Side-by-Side) */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={config.discordUrl || "https://discord.gg/zsfVXZ3GA"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5865F2]/20 hover:bg-[#5865F2]/30 text-[#858df3] hover:text-white border-2 border-[#5865F2]/40 text-xs sm:text-sm font-bold transition-all font-mono shadow-sm"
              >
                <MessageSquare size={16} />
                <span>GABUNG DISCORD</span>
                <ExternalLink size={14} />
              </a>

              <a
                href={config.whatsappUrl || "https://chat.whatsapp.com/HpQZIcxnHrk3IWupTntclm?s=cl&p=a&mlu=0"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] hover:text-emerald-300 border-2 border-[#25D366]/40 text-xs sm:text-sm font-bold transition-all font-mono shadow-sm"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.98-1.306A9.948 9.948 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.71 0-3.29-.537-4.588-1.455l-.329-.232-2.973.78.793-2.898-.214-.341C3.766 14.596 3.2 13.064 3.2 12c0-4.852 3.948-8.8 8.8-8.8s8.8 3.948 8.8 8.8-3.948 8.8-8.8 8.8z"/>
                </svg>
                <span>GABUNG GRUP WA</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <a
              href="#store"
              className="btn-mc-gold px-4 py-2.5 rounded-xl text-[11px] sm:text-xs tracking-wider uppercase inline-flex items-center gap-2 shrink-0"
            >
              <span>LIHAT STORE & RANKS</span>
              <ArrowRight size={14} />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
