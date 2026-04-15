import { cn } from "@/lib/utils";

export function ResultSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-8 relative overflow-hidden group animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Background glow placeholder */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-10 bg-[var(--color-obsidian-muted)] pointer-events-none" />

      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="space-y-3 w-1/2">
          {/* inputType substitute */}
          <div className="w-32 h-3 bg-[var(--color-obsidian-bright)] rounded-full animate-pulse opacity-70" />
          {/* inputValue substitute */}
          <div className="w-full max-w-sm h-8 bg-[var(--color-obsidian-bright)] rounded-lg animate-pulse" />
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {/* Risk Badge substitute */}
          <div className="w-24 h-6 bg-[var(--color-obsidian-bright)] rounded-full animate-pulse opacity-70" />
          <div className="flex items-center gap-2 mt-4">
             {/* Score substitute */}
             <div className="w-16 h-12 bg-[var(--color-obsidian-bright)] rounded-lg animate-pulse" />
             <div className="w-8 h-4 bg-[var(--color-obsidian-bright)] rounded-full animate-pulse opacity-70 mt-3" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 relative z-10">
        {/* Reasons Skeleton */}
        <div className="space-y-6">
          <div className="w-32 h-6 bg-[var(--color-obsidian-bright)] rounded-md animate-pulse opacity-70 mb-2" />
          {[1, 2, 3].map((i) => (
             <div key={i} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[var(--color-obsidian-bright)] shrink-0 animate-pulse opacity-50 relative top-1" />
                <div className="space-y-3 flex-1 py-1">
                   <div className="w-full h-3.5 bg-[var(--color-obsidian-bright)] rounded-full animate-pulse" />
                   <div className="w-3/4 h-3.5 bg-[var(--color-obsidian-bright)] rounded-full animate-pulse" />
                </div>
             </div>
          ))}
        </div>
        
        {/* Recommendations Skeleton */}
        <div className="space-y-6">
          <div className="w-40 h-6 bg-[var(--color-obsidian-bright)] rounded-md animate-pulse opacity-70 mb-2" />
          {[1, 2, 3].map((i) => (
             <div key={i} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[var(--color-obsidian-bright)] shrink-0 animate-pulse opacity-50 relative top-1" />
                <div className="space-y-3 flex-1 py-1">
                   <div className="w-full h-3.5 bg-[var(--color-obsidian-bright)] rounded-full animate-pulse" />
                   <div className="w-5/6 h-3.5 bg-[var(--color-obsidian-bright)] rounded-full animate-pulse" />
                </div>
             </div>
          ))}
        </div>
      </div>

      {/* Shimmer overlay class on top of everything for extra effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
    </div>
  );
}
