import Link from "next/link";
import { Globe, Mail, FileText, User, Activity, AlertCircle, ShieldCheck } from "lucide-react";

export default function Dashboard() {
  const scanners = [
    { title: "URL Scanner", path: "/scan/url", icon: Globe, color: "text-blue-400", bg: "bg-blue-400/10" },
    { title: "Email Analyzer", path: "/scan/email", icon: Mail, color: "text-purple-400", bg: "bg-purple-400/10" },
    { title: "File Inspector", path: "/scan/file", icon: FileText, color: "text-amber-400", bg: "bg-amber-400/10" },
    { title: "Identity Scanner", path: "/scan/identity", icon: User, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  ];

  const recentScans = [
    { id: 1, target: "http://suspicious-login.com", type: "URL", risk: "High", time: "2 mins ago" },
    { id: 2, target: "invoice_update.pdf", type: "File", risk: "Low", time: "1 hour ago" },
    { id: 3, target: "admin@mycompany.com", type: "Identity", risk: "Medium", time: "3 hours ago" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-manrope text-3xl font-extrabold text-[var(--color-obsidian-text)] tracking-tight">Security Dashboard</h1>
        <div className="flex items-center space-x-2 bg-black/40 px-4 py-2 rounded-lg border ghost-border">
          <Activity className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-semibold text-[var(--color-obsidian-text)]">System Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="glass-card ghost-border rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-obsidian-muted)] mb-2 uppercase tracking-widest font-semibold">Total Scans</p>
              <p className="font-manrope text-4xl font-extrabold text-[var(--color-obsidian-text)]">1,284</p>
            </div>
            <div className="w-12 h-12 bg-[var(--color-obsidian-primary)]/10 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-[var(--color-obsidian-primary)]" />
            </div>
          </div>
        </div>
        <div className="glass-card ghost-border rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-obsidian-muted)] mb-2 uppercase tracking-widest font-semibold">Threats Detected</p>
              <p className="font-manrope text-4xl font-extrabold text-[var(--color-obsidian-error)]">42</p>
            </div>
            <div className="w-12 h-12 bg-[var(--color-obsidian-error)]/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-[var(--color-obsidian-error)]" />
            </div>
          </div>
        </div>
        <div className="glass-card ghost-border rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-obsidian-muted)] mb-2 uppercase tracking-widest font-semibold">Safe Items</p>
              <p className="font-manrope text-4xl font-extrabold text-emerald-500">1,190</p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
        </div>
      </div>

      <h2 className="font-manrope text-xl font-bold text-[var(--color-obsidian-text)] mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {scanners.map((s, idx) => (
          <Link href={s.path} key={idx} className="glass-card ghost-border rounded-2xl p-6 hover:bg-[var(--color-obsidian-high)] transition-all group">
            <div className={`w-12 h-12 ${s.bg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <s.icon className={`w-6 h-6 ${s.color}`} />
            </div>
            <h3 className="font-manrope text-[var(--color-obsidian-text)] font-semibold mb-1">{s.title}</h3>
            <p className="text-sm text-[var(--color-obsidian-muted)]">Run a new scan</p>
          </Link>
        ))}
      </div>

      <h2 className="font-manrope text-xl font-bold text-[var(--color-obsidian-text)] mb-6">Recent Activity</h2>
      <div className="glass-card ghost-border rounded-2xl overflow-hidden">
        <ul className="divide-y divide-[rgba(68,72,84,0.15)]">
          {recentScans.map((scan) => (
            <li key={scan.id} className="p-6 hover:bg-[var(--color-obsidian-high)] transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${
                  scan.risk === 'High' ? 'bg-[var(--color-obsidian-error)]' :
                  scan.risk === 'Low' ? 'bg-emerald-500' : 'bg-amber-500'
                } shadow-[0_0_10px_currentColor]`} />
                <div>
                  <p className="font-semibold text-[var(--color-obsidian-text)]">{scan.target}</p>
                  <p className="text-sm text-[var(--color-obsidian-muted)]">{scan.type} Scan</p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                  scan.risk === 'High' ? 'bg-[var(--color-obsidian-error)]/10 text-[var(--color-obsidian-error)] ghost-border' :
                  scan.risk === 'Low' ? 'bg-emerald-500/10 text-emerald-500 ghost-border' : 
                  'bg-amber-500/10 text-amber-500 ghost-border'
                }`}>
                  {scan.risk} Risk
                </span>
                <p className="text-xs text-[var(--color-obsidian-muted)] mt-2">{scan.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
