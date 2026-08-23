type FiltersProps = {
  theme: any
  search: string
  onSearchChange: (val: string) => void
  selectedOutcome: string
  onOutcomeChange: (val: string) => void
  onClear: () => void
}

export const Filters = ({
  theme,
  search,
  onSearchChange,
  selectedOutcome,
  onOutcomeChange,
  onClear,
}: FiltersProps) => {
  const isFiltered = search.trim() !== "" || selectedOutcome !== "ALL"

  return (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`h-10 w-full md:w-[320px] px-5 rounded-3xl border outline-none text-sm ${theme.search}`}
        placeholder="Search calls, agents, transcripts..."
      />

      <select
        value={selectedOutcome}
        onChange={(e) => onOutcomeChange(e.target.value)}
        className={`h-10 px-4 rounded-3xl outline-none border text-sm ${theme.dropdown}`}
      >
        <option value="ALL">All Outcomes</option>
        <option value="qualified">Qualified</option>
        <option value="rejected">Rejected</option>
        <option value="callback">Callback</option>
        <option value="no_answer">No Answer</option>
      </select>

      {isFiltered && (
        <button
          onClick={onClear}
          className="h-9 px-5 rounded-[16px] text-sm font-medium border border-black-500 text-red-500 hover:bg-red-500/10 transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  )
}