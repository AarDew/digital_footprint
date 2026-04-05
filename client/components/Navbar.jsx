import Link from "next/link";
import { Shield, LayoutDashboard, Search, MessageSquare, BookOpen } from "lucide-react";

export function Navbar() {
  return (
    <nav className="glass-card sticky top-0 z-50 border-b-0 border-x-0 border-t-0 shadow-none border-b border-[rgba(68,72,84,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-[var(--color-obsidian-text)]">
              <Shield className="h-8 w-8 text-[var(--color-obsidian-primary)]" />
              <span className="font-manrope font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-[var(--color-obsidian-primary)] to-[var(--color-obsidian-secondary)]">CyberDash</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 text-sm font-semibold text-[var(--color-obsidian-muted)]">
              <Link href="/dashboard" className="hover:text-[var(--color-obsidian-text)] flex items-center gap-2 transition-colors">
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
              <Link href="/scan/url" className="hover:text-[var(--color-obsidian-text)] flex items-center gap-2 transition-colors">
                <Search className="h-4 w-4" /> Scan
              </Link>
              <Link href="/chat" className="hover:text-[var(--color-obsidian-text)] flex items-center gap-2 transition-colors">
                <MessageSquare className="h-4 w-4" /> AI Chat
              </Link>
              <Link href="/learn" className="hover:text-[var(--color-obsidian-text)] flex items-center gap-2 transition-colors">
                <BookOpen className="h-4 w-4" /> Learn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
