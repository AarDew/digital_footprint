import { CheckCircle2 } from "lucide-react";

export function RecommendationsList({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="font-manrope text-sm font-bold text-[var(--color-obsidian-muted)] uppercase tracking-widest mb-4 flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-[var(--color-obsidian-primary)]" />
        Recommended Actions
      </h4>
      <ul className="space-y-3">
        {recommendations.map((rec, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm bg-black/40 p-4 rounded-xl ghost-border text-[var(--color-obsidian-text)]">
            <span className="mt-0.5 text-[var(--color-obsidian-primary)]">→</span>
            {rec}
          </li>
        ))}
      </ul>
    </div>
  );
}
