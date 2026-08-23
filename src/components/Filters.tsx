type FiltersProps = {
  theme: any
  search: string
  onSearchChange: (val: string) => void
  selectedOutcome: string
  onOutcomeChange: (val: string) => void
  minDuration: string
  onMinDurationChange: (val: string) => void
  maxDuration: string
  onMaxDurationChange: (val: string) => void
  onClear: () => void
}

export const Filters = ({
  theme,
  search,
  onSearchChange,
  selectedOutcome,
  onOutcomeChange,
  minDuration,
  onMinDurationChange,
  maxDuration,
  onMaxDurationChange,
  onClear,
}: FiltersProps) => {
  return (
    <div className="mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
      <div className="w-full lg:w-1/3">
	<div className="flex flex-col">
          <span className="text-[10px] opacity-60 mb-0.5">Search</span>
          <input
             type="text"
             placeholder="Search transcripts, agents, IDs..."
             value={search}
             onChange={(e) => onSearchChange(e.target.value)}
             className={`w-full px-4 py-2 rounded-xl text-sm border outline-none transition-all ${theme.search}`}
          />
       </div>
     </div>
      <div className="w-full lg:w-auto flex flex-wrap items-center gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] opacity-60 mb-0.5">Outcome</span>
          <select
            value={selectedOutcome}
            onChange={(e) => onOutcomeChange(e.target.value)}
            className={`px-3 py-2 rounded-xl text-sm border outline-none ${theme.dropdown}`}
          >
            <option value="ALL">All Outcomes</option>
            <option value="qualified">Qualified</option>
            <option value="rejected">Rejected</option>
            <option value="callback">Callback</option>
            <option value="no_answer">No Answer</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] opacity-60 mb-0.5">Min (sec)</span>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={minDuration}
              onWheel={(e) => e.currentTarget.blur()}
              onChange={(e) => {
                const val = e.target.value;
                if (Number(val) >= 0 || val === "") onMinDurationChange(val);
              }}
              className={`w-24 px-3 py-2 rounded-xl text-sm border outline-none ${theme.search}`}
            />
          </div>

          <span className="text-xs opacity-40 mt-5">-</span>

          <div className="flex flex-col">
            <span className="text-[10px] opacity-60 mb-0.5">Max (sec)</span>
            <input
              type="number"
              min="0"
              placeholder="Any"
              value={maxDuration}
              onWheel={(e) => e.currentTarget.blur()}
              onChange={(e) => {
                const val = e.target.value;
                if (Number(val) >= 0 || val === "") onMaxDurationChange(val);
              }}
              className={`w-24 px-3 py-2 rounded-xl text-sm border outline-none ${theme.search}`}
            />
          </div>
        </div>

        {/* Reset Button aligned with the bottom of the input boxes */}
        <button
          onClick={onClear}
          className="px-3.5 py-2 text-xs font-medium rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors self-end mb-[1px]"
        >
          Reset
        </button>
      </div>
    </div>
  )
}