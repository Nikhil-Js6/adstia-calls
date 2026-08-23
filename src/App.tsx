import { useState, useMemo, useEffect } from "react"
import { getTheme } from "./components/theme"
import { Header, Footer } from "./components/Header"
import { Filters } from "./components/Filters"
import { CallTable } from "./components/CallTable"
import { CallDrawer } from "./components/CallDrawer"
import callsData from "./data/calls.json"
import type { Call } from "./types/calls"

const ITEMS_PER_PAGE = 15; 

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [selected, setSelected] = useState<Call | null>(null)

  // Filter States
  const [search, setSearch] = useState("")
  const [selectedOutcome, setSelectedOutcome] = useState("ALL")
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)

  const theme = getTheme(isDark)
  const dummyCalls = callsData as unknown as Call[]

  // Filter Logic
  const filteredCalls = useMemo(() => {
    return dummyCalls.filter((call) => {
      const matchesSearch =
        search.trim() === "" ||
        call.agent.toLowerCase().includes(search.toLowerCase()) ||
        call.transcript.toLowerCase().includes(search.toLowerCase()) ||
        call.id.toLowerCase().includes(search.toLowerCase())

      const matchesOutcome =
        selectedOutcome === "ALL" || call.outcome === selectedOutcome

      return matchesSearch && matchesOutcome
    })
  }, [dummyCalls, search, selectedOutcome])

  // Reset to page 1
  useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedOutcome])

  // Pagination
  const totalPages = Math.ceil(filteredCalls.length / ITEMS_PER_PAGE)
  const paginatedCalls = filteredCalls.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleClearFilters = () => {
    setSearch("")
    setSelectedOutcome("ALL")
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme.bg}`}>
      <Header theme={theme} isDark={isDark} setIsDark={setIsDark} totalCount={filteredCalls.length} />

      <Filters
        theme={theme}
        search={search}
        onSearchChange={setSearch}
        selectedOutcome={selectedOutcome}
        onOutcomeChange={setSelectedOutcome}
        onClear={handleClearFilters}
      />

      <div className="px-6 pb-6">
        <CallTable
          data={paginatedCalls}
          theme={theme}
          isDark={isDark}
          onRowClick={(c) => setSelected(c)}
        />
        
        { totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 px-2">
            <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredCalls.length)} of {filteredCalls.length} records
            </p>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${theme.prev}`}
              >
                {'< Previous'}
              </button>
              
              <span className={`text-sm font-medium px-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${theme.next}`}
              >
                {'Next >'}
              </button>
            </div>
          </div>
        )}
      </div>

      <CallDrawer
        open={!!selected}
        call={selected}
        theme={theme}
        isDark={isDark}
        onClose={() => setSelected(null)}
      />

      <Footer theme={theme}/>
    </div>
  )
}