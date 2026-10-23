import React from 'react';
import { Users, Shield, MessageSquare, Sparkles, ExternalLink } from 'lucide-react';

export default function Staff({ staff }) {
  return (
    <section id="staff" className="py-20 relative mc-grid-pattern border-t border-mc-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1e2433] border border-[#384359] text-xs text-[#55FFFF] font-mono font-bold mb-3">
            <Shield size={14} />
            <span>PENGELOLA SERVER</span>
          </div>
          <h2 className="font-minecraft text-2xl sm:text-4xl text-white tracking-wider mc-text-shadow">
            STAFF & MODERATOR
          </h2>
          <p className="text-slate-300 mt-4 text-sm sm:text-base">
            Tim pengelola yang berdedikasi menjaga keamanan, kenyamanan komunitas, dan kelancaran Sableng SMP.
          </p>
        </div>

        {/* Staff Grid (Optimized for 2 members) */}
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          {staff.map((member) => (
            <div
              key={member.id}
              className="group bg-mc-card/90 rounded-2xl p-6 border border-mc-border hover:border-slate-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl text-center flex flex-col justify-between"
            >
              <div>
                {/* Minecraft Skin Avatar */}
                <div className="relative w-24 h-24 mx-auto mb-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                  <div className="relative w-full h-full rounded-2xl bg-slate-900 border border-mc-border p-1.5 flex items-center justify-center overflow-hidden shadow-inner">
                    <img
                      src={`https://mc-heads.net/avatar/${encodeURIComponent(member.avatarSkin || member.name)}/100`}
                      alt={member.name}
                      onError={(e) => {
                        e.target.src = "https://mc-heads.net/avatar/Steve/100";
                      }}
                      className="w-full h-full rounded-xl object-contain drop-shadow-md group-hover:scale-110 transition-transform"
                    />
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="font-extrabold text-lg text-white mb-1 group-hover:text-emerald-400 transition-colors">
                  {member.name}
                </h3>
                <div className="mb-4">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${member.roleBadge || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                    {member.role}
                  </span>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              {/* Discord info */}
              <div className="pt-4 border-t border-mc-border/80 flex items-center justify-center gap-2 text-xs text-slate-300 font-mono bg-slate-900/60 py-2 rounded-xl border border-slate-800">
                <MessageSquare size={13} className="text-[#5865F2]" />
                <span>{member.discord}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Join Staff CTA */}
        <div className="mt-14 text-center">
          <p className="text-sm text-slate-400 mb-3">
            Punya pengalaman mengelola server atau ingin berkontribusi untuk komunitas kami?
          </p>
          <a
            href="https://discord.gg/zsfVXZ3GA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-mc-border transition-colors"
          >
            <Sparkles size={14} className="text-amber-400" />
            <span>Kirim Lamaran Staff di Discord</span>
          </a>
        </div>

      </div>
    </section>
  );
}
