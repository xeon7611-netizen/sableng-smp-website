import React, { useState, useRef, useEffect } from 'react';
import { Newspaper, Calendar, User, ArrowRight, Tag, X, Sparkles } from 'lucide-react';

export default function Announcements({ announcements }) {
  const [activeTag, setActiveTag] = useState('ALL');
  const [selectedNews, setSelectedNews] = useState(null);
  const newsDialogRef = useRef(null);

  const tags = ['ALL', 'UPDATE', 'EVENT', 'INFO'];

  const filtered = activeTag === 'ALL'
    ? announcements
    : announcements.filter(a => a.tag.toUpperCase() === activeTag);

  useEffect(() => {
    const dialog = newsDialogRef.current;
    if (!dialog) return;

    if (selectedNews) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [selectedNews]);

  // Modern Web Guidance fallback for light dismiss
  useEffect(() => {
    const dialog = newsDialogRef.current;
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
        setSelectedNews(null);
      }
    };

    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialog.addEventListener('click', handleBackdropClick);
    }
    return () => {
      dialog.removeEventListener('click', handleBackdropClick);
    };
  }, []);

  const getTagColor = (tag) => {
    switch (tag.toUpperCase()) {
      case 'UPDATE':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'EVENT':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'INFO':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <section id="berita" className="py-20 relative bg-slate-950/40 border-t border-mc-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 border border-mc-border text-xs text-cyan-400 font-semibold mb-3">
              <Newspaper size={14} />
              <span>Kabar Terkini</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Berita & Pembaruan Server
            </h2>
            <p className="text-slate-400 mt-2 text-base">
              Ikuti jadwal event, pengumuman patch notes, dan update fitur terbaru.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl border border-mc-border w-fit">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTag === t
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t === 'ALL' ? 'Semua' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((news) => (
            <article
              key={news.id}
              onClick={() => setSelectedNews(news)}
              className="group bg-mc-card/90 rounded-2xl overflow-hidden border border-mc-border hover:border-slate-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mc-card via-transparent to-transparent"></div>
                  <span className={`absolute top-4 left-4 px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider border backdrop-blur-md ${getTagColor(news.tag)}`}>
                    {news.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-slate-500" />
                      {news.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User size={13} className="text-slate-500" />
                      {news.author}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {news.content}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:underline">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* News Detail Modal */}
      <dialog
        ref={newsDialogRef}
        closedby="any"
        aria-labelledby="newsDialogTitle"
        onClose={() => setSelectedNews(null)}
        className="m-auto p-0 bg-transparent rounded-2xl max-w-2xl w-[95%] text-slate-100 shadow-2xl backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm"
      >
        {selectedNews && (
          <div className="bg-mc-card border border-mc-border rounded-2xl overflow-hidden relative">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-black/60 text-slate-300 hover:text-white backdrop-blur-md"
              aria-label="Tutup"
            >
              <X size={18} />
            </button>

            <div className="h-64 relative">
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mc-card via-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6">
                <span className={`px-2.5 py-1 rounded text-xs font-black uppercase tracking-wider border ${getTagColor(selectedNews.tag)}`}>
                  {selectedNews.tag}
                </span>
                <h3 id="newsDialogTitle" className="text-2xl font-black text-white mt-2">
                  {selectedNews.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-4 text-xs text-slate-400 pb-4 border-b border-mc-border">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-emerald-400" />
                  Tanggal: {selectedNews.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <User size={14} className="text-cyan-400" />
                  Penulis: {selectedNews.author}
                </span>
              </div>

              <div className="text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {selectedNews.content}
              </div>

              <div className="pt-6 border-t border-mc-border flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedNews(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-white transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
