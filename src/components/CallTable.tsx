import { ContactCell } from "./ContactCell"
import { OutcomeBadge } from "./OutcomeBadge"
import type { Call } from "../types/calls"
import { formatDuration } from "../utils/formatters"

// Indian format date helper
const formatIndianDate = (timestamp: string): string => {
    if (!timestamp) return "-";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return timestamp;

    return date.toLocaleString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });
};

type Props = {
  data: Call[]
  theme: any
  isDark: boolean
  sortField: string | null
  sortDirection: 'asc' | 'desc'
  onSort: (field: string) => void
  onRowClick: (call: Call) => void
}

export const CallTable = ({ 
  data, 
  theme, 
  isDark, 
  sortField, 
  sortDirection, 
  onSort, 
  onRowClick 
}: Props) => {
  const renderSortArrow = (field: string) => {
    if (sortField !== field) return <span className="opacity-30 ml-1">↕</span>;
    return <span className="ml-1 text-primary">{sortDirection === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className={`rounded-2xl border overflow-hidden ${theme.card}`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className={`border-b text-xs font-semibold ${theme.th}`}>
            <th onClick={() => onSort('id')} className="px-5 py-3.5 cursor-pointer select-none hover:opacity-80">
              ID {renderSortArrow('id')}
            </th>
            <th onClick={() => onSort('agent')} className="px-5 py-3.5 cursor-pointer select-none hover:opacity-80">
              Agent {renderSortArrow('agent')}
            </th>
            <th onClick={() => onSort('duration')} className="px-5 py-3.5 cursor-pointer select-none hover:opacity-80">
              Duration {renderSortArrow('duration')}
            </th>
            <th onClick={() => onSort('timestamp')} className="px-5 py-3.5 cursor-pointer select-none hover:opacity-80">
              Timestamp {renderSortArrow('timestamp')}
            </th>
            <th onClick={() => onSort('outcome')} className="px-5 py-3.5 cursor-pointer select-none hover:opacity-80">
              Outcome {renderSortArrow('outcome')}
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {data.length > 0 ? (
            data.map((c) => (
              <tr
                key={c.id}
                onClick={() => onRowClick(c)}
                className={`border-theme cursor-pointer transition-colors ${theme.tr}`}
              >
                <td className="px-5 py-4 font-mono text-xs opacity-70">{c.id}</td>
                <td className="px-5 py-4">
                  <ContactCell name={c.agent} />
                </td>
                <td className="px-5 py-4 text-xs opacity-80">{formatDuration(c.duration)}</td>
                <td className="px-5 py-4 text-xs opacity-70">{formatIndianDate(c.timestamp)}</td>
                <td className="px-5 py-4">
                  <OutcomeBadge outcome={c.outcome} isDark={isDark} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-5 py-12 text-center opacity-50">
                No matching call records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}