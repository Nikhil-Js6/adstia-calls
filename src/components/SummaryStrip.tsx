import type { Call } from '../types/calls'
import { formatDuration } from '../utils/formatters'

export function SummaryStrip({ calls, filtered, isDark }: { calls: Call[], filtered: Call[], isDark: boolean }) {

  const avgDur = filtered.length 
      ? Math.round(filtered.reduce((a, c) => a + c.duration, 0) / filtered.length) 
      : 0;

  const avgSent = filtered.length 
      ? (filtered.reduce((a, c) => a + (c.sentiment ?? 0), 0) / filtered.length).toFixed(2) 
      : '0'

  const qualified = filtered.filter(c => c.outcome === 'qualified').length
  const rejected = filtered.filter(c => c.outcome === 'rejected').length

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className={isDark 
        ? "bg-white/[0.06] border border-white/10 rounded-[18px] p-5" 
        : "bg-white border border-black/10 rounded-[18px] p-5 hover:border-[#7C3AED] shadow-sm"}
      >
        <p className="text-xs uppercase text-slate-400">
          Showing / Total
        </p>
        <p className="text-2xl mt-1">
          { filtered.length } / { calls.length }
        </p>
      </div>
      <div className={isDark
        ? "bg-white/[0.06] border border-white/10 rounded-[18px] p-5" 
        : "bg-white border border-black/10 rounded-[18px] p-5 hover:border-[#7C3AED] shadow-sm"}
      >
        <p className="text-xs uppercase text-slate-400">
          Avg. Duration
        </p>
        <p className="text-2xl mt-1">
          { formatDuration(avgDur) }
        </p>
      </div>
      <div className={isDark 
        ? "bg-white/[0.06] border border-white/10 rounded-[18px] p-5" 
        : "bg-white border border-black/10 rounded-[18px] p-5 border hover:border-[#7C3AED] shadow-sm"}
      >
        <p className="text-xs uppercase text-slate-400">
          Outcome
        </p>
        <p className="text-sm mt-2">
           Qualified: { qualified } | Rejected: { rejected } 
        </p>
      </div>
      <div className={isDark 
        ? "bg-white/[0.06] border border-white/10 rounded-[18px] p-5" 
        : "bg-white border border-black/10 rounded-[18px] p-5 border hover:border-[#7C3AED] shadow-sm"}
      >
        <p className="text-xs uppercase text-slate-400">
          Avg. Sentiment
        </p>
        <p className="text-2xl mt-1">
          { avgSent }
        </p>
      </div>
    </div>
  )
}