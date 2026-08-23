export const OutcomeBadge=({outcome,isDark}:{outcome:string,isDark:boolean})=>{
    if(outcome==='qualified') {
        return <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs border ${isDark? "bg-emerald-500/20 text-emerald-200 border-emerald-500/40" : "bg-white text-[#166534] border-[#86EFAC]"}`}><span className="h-4 w-4 rounded-full bg-[#22C55E] text-white grid place-items-center text-[10px]">✓</span> qualified</span>
    }
    if(outcome==='rejected') return <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs border ${isDark? "bg-red-500/20 text-red-200 border-red-500/40" : "bg-white text-[#991B1B] border-[#FCA5A5]"}`}><span className="h-4 w-4 rounded-full bg-[#EF4444] text-white grid place-items-center text-[10px]">✕</span> rejected</span>
    if(outcome==='callback') return <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs text-[#7C3AED] border border-[#7C3AED]">☎ callback</span>
    return <span className={`inline-flex px-3.5 py-1.5 rounded-full text-xs border ${isDark? "bg-white/5 text-zinc-400 border-white/20" : "bg-[#F9FAFB] text-black-200"}`}>No answer</span>
}