export const getTheme = (isDark: boolean) => isDark
? {
    bg: "bg-[#0B0A14] text-white",
    header: "bg-[#0B0A14]/90 border-white/10",
    th: "bg-[#1E1B32] text-[#A78BFA] border-white/10",
    tr: "border-white/[0.06] hover:bg-white/[0.04] text-zinc-200",
    search: "bg-white/[0.07] border-white/10 text-white placeholder:text-zinc-500 focus:border-[#7C3AED]",
    dropdown: "bg-[#1E1B32] border-white/10 text-white",
    footer: "bg-[#0B0A14] border-white/10 text-zinc-500",
} : {
    bg: "bg-[#FCFAFF] text-black",
    header: "bg-white/90 border-black/10",
    th: "bg-[#F5F3FF] text-[#6D28D9] border-[#EDE9FE]",
    tr: "border-black/[0.06] hover:bg-[#F5F3FF] text-black",
    search: "bg-white border-black/30 text-black focus:border-[#7C3AED] focus:ring-4 focus:ring-[#EDE9FE]",
    dropdown: "bg-white border-black/20 text-black",
    footer: "bg-black border-black/30 text-zinc-300",
}