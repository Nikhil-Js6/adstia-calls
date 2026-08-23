
export const Header = ({ 
    theme, isDark, setIsDark, totalCount 
} : { 
    theme: any, isDark: boolean, setIsDark: any, totalCount: number 
}) => (
    <header className={`sticky top-0 z-20 border-b px-6 py-4 flex justify-between backdrop-blur-xl ${theme.header}`}>
        <h1 className="tracking-[0.3em] text-[13px] font-bold">
            ADSTIA • CALLS
        </h1>
        <div className="flex items-center gap-4">
            <span className={`text-sx font-mono px-2.5 py-1 rounded-md border ${isDark ? 'bg-white/5 border-white/10 text-zonc-300' : 'bg-black/5 border-black/10 text-zinc-600'}`}>
                { totalCount } records
            </span>
        </div>
        <button 
            onClick={() => setIsDark(!isDark)} 
            className={isDark ? "h-9 w-9 rounded-full bg-white/10" : "h-9 w-9 rounded-full bg-[#7C3AED] text-white"}>
                { isDark ? '☀️' : '🌙' }
        </button>
    </header>
)

export const Footer = ({ theme } : { theme: any }) => (
    <footer className={`border-theme px-6 py-6 text-center text-xs ${theme.footer}`}>
        Copyright © { new Date().getFullYear()} • ADSTIA
    </footer>)