import type { Call } from "../types/calls"
import { formatDuration } from "../utils/formatters"
import { OutcomeBadge } from "./OutcomeBadge" // Adjust path if needed

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

  // Function to format and highlight transcript speakers nicely
  const renderFormattedTranscript = (text: string) => {
    return text.split("\n").map((line, index) => {
      const isAgent = line.toLowerCase().startsWith("agent:")
      const isCustomer = line.toLowerCase().startsWith("customer:") || line.toLowerCase().startsWith("user:")

      return (
        <div 
          key={index} 
          className={`my-2 p-3 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all ${
            isAgent 
              ? (isDark ? "bg-[#1E1B32]/60 border-[#7C3AED]/30 text-purple-100" : "bg-[#F5F3FF] border-[#DDD6FE] text-[#581c87]") 
              : isCustomer
              ? (isDark ? "bg-white/[0.03] border-white/10 text-zinc-200" : "bg-black/[0.02] border-black/10 text-zinc-800")
              : "opacity-80"
          }`}
        >
          {line}
        </div>
      )
    })
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" 
      />

      {/* Drawer */}
      <div className={`fixed right-0 top-0 z-50 h-full w-full max-w-lg border-l shadow-2xl flex flex-col ${isDark ? "bg-[#0F0E1A] border-white/10 text-white" : "bg-white border-black/10 text-slate-900"}`}>
        
        {/* Header */}
        <div className={`px-6 py-5 border-b flex justify-between items-center ${theme.th}`}>
          <div>
            <p className="text-[11px] font-semibold tracking-widest opacity-60 mb-1">
              CALL DETAIL • {call.id}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <h2 className="text-lg font-bold">{call.agent}</h2>
              <OutcomeBadge outcome={call.outcome} isDark={isDark} />
            </div>
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

          {/* Full Transcript Display with Highlighted Speaker Cards */}
          <div className={`rounded-xl border p-4 ${theme.card}`}>
            <p className="text-[11px] font-semibold opacity-60 tracking-widest mb-3">TRANSCRIPT</p>
            <div className="space-y-1">
              {renderFormattedTranscript(call.transcript)}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}