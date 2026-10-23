import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gamemodes from './components/Gamemodes';
import StoreRanks from './components/StoreRanks';
import Announcements from './components/Announcements';
import Staff from './components/Staff';
import Rules from './components/Rules';
import AdminModal from './components/AdminModal';
import Footer from './components/Footer';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState({
    serverName: "Sableng SMP",
    ipAddress: "kazuha.davinn.net:30248",
    javaIp: "kazuha.davinn.net:30248",
    bedrockIp: "kazuha.davinn.net",
    bedrockPort: 30248,
    version: "1.20.4 - 1.21.x",
    discordUrl: "https://discord.gg/zsfVXZ3GA",
    whatsappUrl: "https://chat.whatsapp.com/HpQZIcxnHrk3IWupTntclm?s=cl&p=a&mlu=0",
    motd: "★ Selamat Datang di Sableng SMP ★ Survival Kocak & Ramah Pemain Baru!"
  });

  const [status, setStatus] = useState({
    online: false,
    players: { online: 0, max: 40, list: [] },
    version: "1.20.4 - 1.21.x",
    motd: "Memeriksa status server Sableng SMP...",
    icon: null
  });

  const [announcements, setAnnouncements] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [staff, setStaff] = useState([]);
  const [rules, setRules] = useState([]);
  
  // UI States
  const [copied, setCopied] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Copy IP to Clipboard with feedback
  const handleCopyIp = (customIp, label = "IP Server") => {
    const textToCopy = customIp || config.ipAddress;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    setCopied(true);
    showToast('success', `${label} "${textToCopy}" berhasil disalin!`);
    setTimeout(() => setCopied(false), 2500);
  };

  // Fetch status
  const fetchStatus = async () => {
    setLoadingStatus(true);
    try {
      const res = await fetch('/api/status?refresh=1&t=' + Date.now());
      const data = await res.json();
      if (data.success && data.status) {
        setStatus(data.status);
      }
    } catch (e) {
      console.error("Gagal memperbarui status server:", e);
    } finally {
      setLoadingStatus(false);
    }
  };

  // Fetch all initial data
  const loadData = async () => {
    try {
      const [resConfig, resStatus, resAnn, resRanks, resStaff, resRules] = await Promise.all([
        fetch('/api/config').then(r => r.json()),
        fetch('/api/status?refresh=1&t=' + Date.now()).then(r => r.json()),
        fetch('/api/announcements').then(r => r.json()),
        fetch('/api/ranks').then(r => r.json()),
        fetch('/api/staff').then(r => r.json()),
        fetch('/api/rules').then(r => r.json()),
      ]);

      if (resConfig.success) setConfig(resConfig.config);
      if (resStatus.success) setStatus(resStatus.status);
      if (resAnn.success) setAnnouncements(resAnn.announcements);
      if (resRanks.success) setRanks(resRanks.ranks);
      if (resStaff.success) setStaff(resStaff.staff);
      if (resRules.success) setRules(resRules.rules);
    } catch (err) {
      console.warn("API server loading error (check if backend is running):", err);
    }
  };

  useEffect(() => {
    loadData();
    // Refresh live status every 15 seconds for real-time player updates
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      
      {/* Toast Notification Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md text-sm ${
            toast.type === 'success' 
              ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200' 
              : toast.type === 'error'
              ? 'bg-red-950/90 border-red-500/40 text-red-200'
              : 'bg-slate-900/90 border-slate-700 text-slate-200'
          }`}>
            {toast.type === 'success' && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle size={18} className="text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info size={18} className="text-cyan-400 shrink-0" />}
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        config={config}
        status={status}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onCopyIp={() => handleCopyIp()}
        copied={copied}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          config={config}
          status={status}
          onCopyIp={handleCopyIp}
          copied={copied}
          onRefreshStatus={fetchStatus}
          loadingStatus={loadingStatus}
        />

        <Gamemodes />

        <StoreRanks
          ranks={ranks}
          serverName={config.serverName}
        />

        <Announcements
          announcements={announcements}
        />

        <Staff
          staff={staff}
        />

        <Rules
          rules={rules}
        />
      </main>

      {/* Admin Panel Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onConfigUpdated={(newCfg) => setConfig(newCfg)}
        announcements={announcements}
        onAnnouncementsUpdated={loadData}
        onNotification={(type, msg) => showToast(type, msg)}
      />

      {/* Footer */}
      <Footer config={config} />

    </div>
  );
}
