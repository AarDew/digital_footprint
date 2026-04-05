"use client";

import { useState } from "react";
import { scanURL } from "@/lib/api";
import { ResultCard } from "@/components/ResultCard";
import { Globe, Search, Loader2 } from "lucide-react";

export default function URLScanner() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setResult(null);
    try {
      const data = await scanURL(url);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[var(--color-obsidian-primary)]/10 rounded-2xl mb-8 border ghost-border group relative">
          <div className="absolute inset-0 bg-[var(--color-obsidian-primary)] blur-2xl opacity-10 rounded-full pointer-events-none" />
          <Globe className="w-10 h-10 text-[var(--color-obsidian-primary)] relative z-10" />
        </div>
        <h1 className="font-manrope text-4xl md:text-5xl font-extrabold text-[var(--color-obsidian-text)] mb-4 tracking-tighter">URL Analyzer</h1>
        <p className="text-[var(--color-obsidian-muted)] text-lg max-w-2xl mx-auto">Deep dive into website links to decode potential phishing loops, hidden malware signatures, or unsanctioned activity.</p>
      </div>

      <form onSubmit={handleScan} className="mb-14 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-obsidian-primary)] to-[var(--color-obsidian-secondary)] rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition duration-500"></div>
        <div className="relative flex items-center bg-black rounded-xl p-1 border ghost-border">
          <Search className="absolute left-6 w-5 h-5 text-[var(--color-obsidian-muted)]" />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full bg-transparent pt-4 pb-4 pl-16 pr-36 rounded-xl text-[var(--color-obsidian-text)] placeholder-[var(--color-obsidian-muted)] focus:outline-none text-lg transition-all"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 primary-gradient text-[#00224a] px-8 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,210,255,0.4)]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Initiate Scan"}
          </button>
        </div>
      </form>

      {result && <ResultCard result={result} />}
    </div>
  );
}
