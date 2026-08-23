import type { Call } from "../types/calls"
import { formatDuration } from "../utils/formatters"

type CallDrawerProps = {
  open: boolean
  onClose: () => void
  call: Call | null
  theme: any
  isDark: boolean
}

export const CallDrawer = ({ open, onClose, call, theme, isDark }: CallDrawerProps) => {
  if (!open || !call) return null

  const getSentimentInfo = (sentiment: number) => {
    if (sentiment >= 0.3) return { label: "Positive", color: "bg-emerald-500" }
    if (sentiment <= -0.3) return { label: "Negative", color: "bg-rose-500" }
    return { label: "Neutral", color: "bg-amber-500" }
  }

  const sentimentInfo = getSentimentInfo(call.sentiment)

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" 
      />

      {/* Drawer */}
      <div className={`fixed right-0 top-0 z-50 h-full w-full max-w-md border-l shadow-2xl flex flex-col ${isDark ? "bg-[#0F0E1A] border-white/10 text-white" : "bg-white border-black/10 text-slate-900"}`}>
        
        {/* Header */}
        <div className={`px-6 py-5 border-b flex justify-between items-center ${theme.th}`}>
          <div>
            <p className="text-[11px] font-semibold tracking-widest opacity-60 mb-1">
              CALL DETAIL • {call.id}
            </p>
            <h2 className="text-lg font-bold">{call.agent}</h2>
          </div>
          <button 
            onClick={onClose} 
            className={`h-8 w-8 rounded-full grid place-items-center transition-colors ${isDark ? "bg-white/10 hover:bg-white/20" : "bg-black/5 hover:bg-black/10"}`}
          >
            ✕
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-xl border p-4 ${theme.card}`}>
              <p className="text-[11px] font-semibold opacity-60 tracking-widest">DURATION</p>
              <p className="text-lg font-bold mt-1 font-mono">{formatDuration(call.duration)}</p>
            </div>
            
            <div className={`rounded-xl border p-4 ${theme.card}`}>
              <p className="text-[11px] font-semibold opacity-60 tracking-widest">SENTIMENT</p>
              <p className="text-lg font-bold mt-1 flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${sentimentInfo.color}`} /> 
                {sentimentInfo.label} ({call.sentiment})
              </p>
            </div>
          </div>

          {/* Full Transcript Display */}
          <div className={`rounded-xl border p-4 ${theme.card}`}>
            <p className="text-[11px] font-semibold opacity-60 tracking-widest mb-3">TRANSCRIPT</p>
            <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans opacity-90">
              {call.transcript}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}