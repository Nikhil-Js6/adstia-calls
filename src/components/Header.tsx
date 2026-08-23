
export const Header = ({ 
    theme, isDark, setIsDark, totalCount 
} : { 
    theme: any, isDark: boolean, setIsDark: any, totalCount: number 
}) => (
    <header className={`sticky top-0 z-20 border-b px-6 py-3 flex items-center justify-between backdrop-blur-xl ${theme.header}`}>
        <h1 className="tracking-[0.3em] text-[16px] font-bold">
            ADSTIA
        </h1>
        <div className="flex items-center gap-3">
            <span className={`text-xs font-mono p-1 rounded-md border ${isDark ? 'bg-[#7C3AED] border-[#7C3AED] text-white-300' : 'bg-slate border-[#7C3AED] text-[#7C3AED]'}`}>
                { totalCount }/300
            </span>
            <button 
                onClick={() => setIsDark(!isDark)} 
                className={isDark ? "h-9 w-9 rounded-full bg-white/15 flex items-center justify-center transition" : "h-9 w-9 rounded-full bg-[#7C3AED] text-white flex items-center justify-center transition"}>
                { isDark ? '☀️' : '🌙' }
            </button>
        </div>
    </header>
)

export const Footer = ({ theme } : { theme: any }) => (
    <footer className={`border-t px-6 py-4 text-center text-xs mt-auto ${theme.footer}`}>
        Copyright © { new Date().getFullYear()} • ADSTIA
    </footer>)