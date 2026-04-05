"use client";

import { useState } from "react";
import { scanFile } from "@/lib/api";
import { ResultCard } from "@/components/ResultCard";
import { FileText, Upload, Loader2 } from "lucide-react";

export default function FileScanner() {
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!filename) return;
    
    setLoading(true);
    setResult(null);
    try {
      const data = await scanFile(filename);
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
        <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/10 rounded-2xl mb-8 border ghost-border group relative">
          <div className="absolute inset-0 bg-amber-500 blur-2xl opacity-10 rounded-full pointer-events-none" />
          <FileText className="w-10 h-10 text-amber-500 relative z-10" />
        </div>
        <h1 className="font-manrope text-4xl md:text-5xl font-extrabold text-[var(--color-obsidian-text)] mb-4 tracking-tighter">File Inspector</h1>
        <p className="text-[var(--color-obsidian-muted)] text-lg max-w-2xl mx-auto">Upload a file to inspect it for hidden malware, macros, or suspicious behavioral patterns within the binary.</p>
      </div>

      <form onSubmit={handleScan} className="mb-14 relative group">
        <div className="w-full h-48 glass-card ghost-border hover:border-[var(--color-obsidian-primary)]/50 rounded-2xl flex flex-col items-center justify-center text-center p-6 transition-colors cursor-pointer mb-6 group-hover:shadow-[0_0_20px_rgba(0,210,255,0.05)] relative overflow-hidden">
          <Upload className="w-10 h-10 text-[var(--color-obsidian-muted)] group-hover:text-[var(--color-obsidian-primary)] transition-colors mb-4 relative z-10" />
          <p className="font-manrope text-[var(--color-obsidian-text)] font-semibold mb-1 relative z-10">Click to upload or drag and drop</p>
          <p className="text-[var(--color-obsidian-muted)] text-sm mb-4 relative z-10">Any file type (max. 10MB)</p>
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            onChange={(e) => setFilename(e.target.files[0]?.name || "")}
          />
        </div>
        {filename && <p className="text-sm text-[var(--color-obsidian-muted)] mb-6 text-center font-inter bg-black/40 py-2 rounded-lg ghost-border">Selected Object: <span className="text-[var(--color-obsidian-text)] font-medium">[{filename}]</span></p>}
        <button
          type="submit"
          disabled={loading || !filename}
          className="w-full py-4 primary-gradient text-[#00224a] rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-[0_0_40px_rgba(0,210,255,0.3)] hover:scale-[1.01]"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><FileText className="w-5 h-5" /> Inspect File Integrity</>}
        </button>
      </form>

      {result && <ResultCard result={result} />}
    </div>
  );
}
