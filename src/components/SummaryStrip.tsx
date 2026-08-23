import type { Call } from "../types/calls"
import { formatDuration } from "../utils/formatters"

type Props = {
  calls: Call[]
  theme: any
  isDark: boolean
}

export const SummaryStrip = ({ calls, theme, isDark }: Props) => {
  const totalCalls = calls.length

  // Calculate average duration
  const totalDuration = calls.reduce((acc, c) => acc + (c.duration || 0), 0)
  const avgDurationSecs = totalCalls > 0 ? Math.round(totalDuration / totalCalls) : 0

  // Outcome breakdown counts
  const breakdown = calls.reduce((acc, c) => {
    const outcome = c.outcome || 'unknown'
    acc[outcome] = (acc[outcome] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Helper for outcome dot colors
  const getOutcomeDotColor = (outcome: string) => {
    switch (outcome) {
      case 'qualified':
        return 'bg-[#22C55E]'
      case 'rejected':
        return 'bg-[#EF4444]'
      case 'callback':
        return 'bg-[#7C3AED]'
      default:
        return 'bg-zinc-400'
    }
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 px-5 py-2 rounded-2xl border backdrop-blur-sm ${theme.card}`}>
      <div className="flex flex-col justify-center p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
        <span className="text-[11px] uppercase tracking-wider font-semibold opacity-70 mb-1">
          Total Filtered Calls
        </span>
        <span className="text-2xl font-black font-mono">{totalCalls}</span>
      </div>

      <div className="flex flex-col justify-center p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
        <span className="text-[11px] uppercase tracking-wider font-semibold opacity-70 mb-1">
          Avg. Call Duration
        </span>
        <span className="text-2xl font-black font-mono">{formatDuration(avgDurationSecs)}</span>
      </div>

      <div className="flex flex-col justify-center p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
        <span className="text-[11px] uppercase tracking-wider font-semibold opacity-70 mb-2">
          Outcome Breakdown
        </span>
        <div className="flex flex-wrap gap-2">
          { Object.entries(breakdown).map(([outcome, count]) => (
            <span 
              key={outcome} 
              className={`text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5 ${
                isDark ? 'bg-white/5 border-white/10 text-zinc-200' : 'bg-white border-black/10 text-zinc-800'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${getOutcomeDotColor(outcome)}`} />
              <span className="capitalize">{outcome.replace('_', ' ')}</span>
              <span className="px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10 font-mono text-[14px] font-bold opacity-80">
                {count}
              </span>
            </span>
          ))}
          { Object.keys(breakdown).length === 0 && (
            <span className="text-xs opacity-50">No records available</span>
          )}
        </div>
      </div>
    </div>
  )
}