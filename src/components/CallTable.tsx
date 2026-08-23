import { ContactCell } from "./ContactCell"
import { OutcomeBadge } from "./OutcomeBadge"
import type { Call } from "../types/calls"
import { formatDate, formatDuration } from "../utils/formatters"

type Props = {
  data: Call[]
  theme: any
  isDark: boolean
  onRowClick: (call: Call) => void
}

export const CallTable = ({ data, theme, isDark, onRowClick }: Props) => {
  return (
    <div className={`rounded-2xl border overflow-hidden ${theme.card}`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className={`border-b text-xs font-semibold ${theme.th}`}>
            <th className="px-5 py-3.5">ID</th>
            <th className="px-5 py-3.5">Agent</th>
            <th className="px-5 py-3.5">Duration</th>
            <th className="px-5 py-3.5">Timestamp</th>
            <th className="px-5 py-3.5">Outcome</th>
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
                <td className="px-5 py-4 text-xs opacity-70">{formatDate(c.timestamp)}</td>
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