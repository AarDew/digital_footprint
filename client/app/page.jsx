import Link from "next/link";
import { Shield, Lock, Search, Globe, Mail, FileText, User } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[var(--color-obsidian-primary)]/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--color-obsidian-secondary)]/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border ghost-border bg-black/40 text-[var(--color-obsidian-primary)] text-xs uppercase tracking-widest font-bold mb-8 shadow-xl">
          <Shield className="w-4 h-4" />
          <span>Advanced Threat Detection</span>
        </div>
        
        <h1 className="font-manrope text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-white drop-shadow-2xl">
          Secure Your Digital <br className="hidden md:block" /> Footprint Today
        </h1>
        
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-obsidian-muted)] mx-auto mb-12 leading-relaxed">
          A unified system that analyzes digital footprints and detects cyber threats in real-time. Scan URLs, emails, files, and identities with one click.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/dashboard" className="primary-gradient text-[#00224a] px-8 py-4 rounded-md font-bold transition-all shadow-[0_0_40px_rgba(0,210,255,0.2)] hover:shadow-[0_0_60px_rgba(0,210,255,0.4)]">
            Open Command Center
          </Link>
          <Link href="/scan/url" className="ghost-border text-[var(--color-obsidian-primary)] px-8 py-4 rounded-md font-bold flex items-center gap-2 transition-all hover:bg-[var(--color-obsidian-primary)]/10">
            <Search className="w-5 h-5" /> Quick Analysis
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Globe, label: "URL Scanner", desc: "Detect malicious domains" },
            { icon: Mail, label: "Email Analyzer", desc: "Identify phishing attempts" },
            { icon: FileText, label: "File Inspection", desc: "Find hidden malware" },
            { icon: User, label: "Identity Check", desc: "Prevent data breaches" }
          ].map((feature, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl group transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-[var(--color-obsidian-primary)]/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-[var(--color-obsidian-primary)]" />
              </div>
              <h3 className="font-manrope text-[var(--color-obsidian-text)] font-bold text-lg">{feature.label}</h3>
              <p className="text-sm text-[var(--color-obsidian-muted)] mt-2 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
