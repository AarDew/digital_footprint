"use client";

import { useState } from "react";
import { scanEmail } from "@/lib/api";
import { ResultCard } from "@/components/ResultCard";
import { Mail, Search, Loader2 } from "lucide-react";

export default function EmailScanner() {
  const [emailText, setEmailText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!emailText) return;
    
    setLoading(true);
    setResult(null);
    try {
      const data = await scanEmail(emailText);
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
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[var(--color-obsidian-secondary)]/10 rounded-2xl mb-8 border ghost-border group relative">
          <div className="absolute inset-0 bg-[var(--color-obsidian-secondary)] blur-2xl opacity-10 rounded-full pointer-events-none" />
          <Mail className="w-10 h-10 text-[var(--color-obsidian-secondary)] relative z-10" />
        </div>
        <h1 className="font-manrope text-4xl md:text-5xl font-extrabold text-[var(--color-obsidian-text)] mb-4 tracking-tighter">Email Analyzer</h1>
        <p className="text-[var(--color-obsidian-muted)] text-lg max-w-2xl mx-auto">Paste full email headers or content to break down and identify potential phishing patterns structurally.</p>
      </div>

      <form onSubmit={handleScan} className="mb-14 relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-[var(--color-obsidian-secondary)] to-purple-500 opacity-5 blur-xl group-focus-within:opacity-20 transition duration-500 rounded-2xl"></div>
        <div className="relative">
          <textarea
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            placeholder="Paste email text or headers here... (e.g., Return-Path: <suspicious@example.com>)"
            className="w-full h-48 bg-black border ghost-border p-6 rounded-2xl text-[var(--color-obsidian-text)] placeholder-[var(--color-obsidian-muted)] focus:outline-none focus:border-[var(--color-obsidian-secondary)]/50 focus:shadow-[0_0_0_4px_rgba(101,161,254,0.1)] transition-all resize-none mb-6 relative z-10 font-inter text-sm"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 primary-gradient text-[#00224a] rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative z-10 hover:shadow-[0_0_40px_rgba(0,210,255,0.3)] hover:scale-[1.01]"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Search className="w-5 h-5" /> Initiate Analysis</>}
          </button>
        </div>
      </form>

      {result && <ResultCard result={result} />}
    </div>
  );
}
