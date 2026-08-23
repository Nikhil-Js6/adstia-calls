import type { Call } from '../types/calls'
import { formatDuration, formatSentiment } from '../utils/formatters'

export function CallPopup({ call, onClose }: { call: Call | null, onClose: ()=>void }) {
  if (!call) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[640px] max-h-[85vh] overflow-y-auto bg-[#0f1220] border border-white/20 rounded-[28px] p-7 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
        <button onClick={onClose} className="absolute top-5 right-5 h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/20">✕</button>

        <p className="tracking-widest text-xs text-slate-400 mb-1">{call.id}</p>
        <h2 className="text-3xl font-semibold mb-5">{call.agent}</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="rounded-2xl bg-white/[0.06] p-4 border border-white/10"><p className="text-[10px] uppercase text-slate-400">Duration</p><p className="text-sm mt-1">{formatDuration(call.duration)}</p></div>
          <div className="rounded-2xl bg-white/[0.06] p-4 border border-white/10"><p className="text-[10px] uppercase text-slate-400">Sentiment</p><p className="text-sm mt-1">{formatSentiment(call.sentiment)}</p></div>
          <div className="rounded-2xl bg-white/[0.06] p-4 border border-white/10"><p className="text-[10px] uppercase text-slate-400">Outcome</p><p className="text-sm mt-1 capitalize">{call.outcome}</p></div>
          <div className="rounded-2xl bg-white/[0.06] p-4 border border-white/10"><p className="text-[10px] uppercase text-slate-400">Time</p><p className="text-[11px] mt-1">{new Date(call.timestamp).toLocaleString()}</p></div>
        </div>

        <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Transcript</p>
        <div className="rounded-2xl bg-black/50 border border-white/10 p-5 text-[14px] leading-[1.7] whitespace-pre-wrap">{call.transcript}</div>
      </div>
    </div>
  )
}