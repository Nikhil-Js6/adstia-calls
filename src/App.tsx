import { useState, useMemo, useEffect } from "react"
import { getTheme } from "./components/theme"
import { Header, Footer } from "./components/Header"
import { Filters } from "./components/Filters"
import { SummaryStrip } from "./components/SummaryStrip"
import { CallTable } from "./components/CallTable"
import { CallDrawer } from "./components/CallDrawer"
import callsData from "./data/calls.json"
import type { Call } from "./types/calls"

const ITEMS_PER_PAGE = 15; 

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [selected, setSelected] = useState<Call | null>(null)

  // state from URL Search Parameters for refresh persistence
  const queryParams = new URLSearchParams(window.location.search)
  const [search, setSearch] = useState(queryParams.get("search") || "")
  const [selectedOutcome, setSelectedOutcome] = useState(queryParams.get("outcome") || "ALL")
  const [minDuration, setMinDuration] = useState(queryParams.get("minDur") || "")
  const [maxDuration, setMaxDuration] = useState(queryParams.get("maxDur") || "")
  
  // Sorting & Pagination States
  const [sortField, setSortField] = useState<string | null>(queryParams.get("sort") || null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>((queryParams.get("dir") as 'asc' | 'desc') || 'asc')
  const [currentPage, setCurrentPage] = useState(Number(queryParams.get("page")) || 1)

  const theme = getTheme(isDark)
  const dummyCalls = callsData as unknown as Call[]

  // Sync state changes back to URL query parameters
  useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (selectedOutcome !== "ALL") params.set("outcome", selectedOutcome)
    if (minDuration) params.set("minDur", minDuration)
    if (maxDuration) params.set("maxDur", maxDuration)
    if (sortField) params.set("sort", sortField)
    if (sortField && sortDirection) params.set("dir", sortDirection)
    if (currentPage > 1) params.set("page", currentPage.toString())

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`
    window.history.replaceState({}, '', newUrl)
  }, [search, selectedOutcome, minDuration, maxDuration, sortField, sortDirection, currentPage])

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

      const min = minDuration !== "" ? Number(minDuration) : 0
      const max = maxDuration !== "" ? Number(maxDuration) : Infinity
      const matchesDuration = call.duration >= min && call.duration <= max

      return matchesSearch && matchesOutcome && matchesDuration
    })
  }, [dummyCalls, search, selectedOutcome, minDuration, maxDuration])

  // Sorting Logic
  const sortedCalls = useMemo(() => {
    if (!sortField) return filteredCalls;

    return [...filteredCalls].sort((a, b) => {
      let aVal = a[sortField as keyof Call];
      let bVal = b[sortField as keyof Call];

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === 'string') {
        aVal = (aVal as string).toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredCalls, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  // Reset to page 1 on filter change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedOutcome, minDuration, maxDuration])

  // Pagination over sorted and filtered data
  const totalPages = Math.ceil(sortedCalls.length / ITEMS_PER_PAGE)
  const paginatedCalls = sortedCalls.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleClearFilters = () => {
    setSearch("")
    setSelectedOutcome("ALL")
    setMinDuration("")
    setMaxDuration("")
    setSortField(null)
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme.bg}`}>
      <Header theme={theme} isDark={isDark} setIsDark={setIsDark} totalCount={sortedCalls.length} />

      <div className="flex-1 px-6 py-6">
        <Filters
          theme={theme}
          search={search}
          onSearchChange={setSearch}
          selectedOutcome={selectedOutcome}
          onOutcomeChange={setSelectedOutcome}
          minDuration={minDuration}
          onMinDurationChange={setMinDuration}
          maxDuration={maxDuration}
          onMaxDurationChange={setMaxDuration}
          onClear={handleClearFilters}
        />

        {/* Live Summary Strip */}
        <SummaryStrip calls={sortedCalls} theme={theme} isDark={isDark} />

        <CallTable
          data={paginatedCalls}
          theme={theme}
          isDark={isDark}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onRowClick={(c) => setSelected(c)}
        />
        
        { totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 px-2">
            <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, sortedCalls.length)} of {sortedCalls.length} records
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