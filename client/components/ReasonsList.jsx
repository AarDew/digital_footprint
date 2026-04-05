import { AlertTriangle } from "lucide-react";

export function ReasonsList({ reasons }) {
  if (!reasons || reasons.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="font-manrope text-sm font-bold text-[var(--color-obsidian-muted)] uppercase tracking-widest mb-4 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        Identified Factors
      </h4>
      <ul className="space-y-3">
        {reasons.map((reason, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm bg-black/40 p-4 rounded-xl ghost-border text-[var(--color-obsidian-text)]">
            <span className="mt-0.5 text-[var(--color-obsidian-error)]">●</span>
            {reason}
          </li>
        ))}
      </ul>
    </div>
  );
}
