import { RiskBadge } from "./RiskBadge";
import { ReasonsList } from "./ReasonsList";
import { RecommendationsList } from "./RecommendationsList";
import { ShieldAlert, ShieldCheck, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export function ResultCard({ result }) {
  if (!result) return null;

  const { inputType, inputValue, riskScore, riskLevel, reasons, recommendations } = result;

  const scoreColor = 
    riskScore >= 80 ? "text-rose-500" :
    riskScore >= 40 ? "text-amber-500" : "text-emerald-500";

  const Icon = 
    riskLevel === "High" ? ShieldAlert :
    riskLevel === "Low" ? ShieldCheck : Shield;

  return (
    <div className="glass-card rounded-2xl p-8 relative overflow-hidden group">
      {/* Background glow based on risk */}
      <div className={cn(
        "absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none",
        riskLevel === "High" ? "bg-rose-500" :
        riskLevel === "Low" ? "bg-emerald-500" : "bg-amber-500"
      )} />

      <div className="flex items-start justify-between mb-8 relative z-10">
        <div>
          <p className="text-[var(--color-obsidian-muted)] text-xs mb-2 uppercase tracking-widest font-semibold">{inputType} Analysis</p>
          <p className="font-manrope text-2xl font-bold text-[var(--color-obsidian-text)] truncate max-w-full" title={inputValue}>
            {inputValue}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <RiskBadge level={riskLevel} />
          <div className="flex items-center gap-2 mt-4">
            <span className={cn("font-manrope text-5xl font-extrabold tracking-tighter", scoreColor)}>{riskScore}</span>
            <span className="text-[var(--color-obsidian-muted)] text-sm font-medium mt-3">/ 100</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 relative z-10">
        <ReasonsList reasons={reasons} />
        <RecommendationsList recommendations={recommendations} />
      </div>
    </div>
  );
}
