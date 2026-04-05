import { cn } from "@/lib/utils";

export function RiskBadge({ level }) {
  const isHigh = level === "High";

  return (
    <div className="flex items-center gap-2">
      {isHigh && (
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-obsidian-error)] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-obsidian-error)]"></span>
        </span>
      )}
      <span className={cn(
        "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ghost-border",
        level === "High" ? "text-[var(--color-obsidian-error)] bg-[var(--color-obsidian-error)]/10" :
        level === "Medium" ? "text-amber-500 bg-amber-500/10" : "text-[var(--color-obsidian-primary)] bg-[var(--color-obsidian-primary)]/10"
      )}>
        {level} Risk
      </span>
    </div>
  );
}
