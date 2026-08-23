import { useMemo } from 'react'
import type { Call } from '../types/calls'

type SortKey = 'id' | 'agent' | 'duration' | 'outcome' | 'sentiment'

export function useCallFilters(
  calls: Call[],
  search: string,
  outcome: string,
  sortKey: SortKey,
  desc: boolean
) {
  const filtered = useMemo(()=>{
    let data = calls
    if (outcome!== 'all') data = data.filter(c => c.outcome === outcome)
    if (search.trim()) {
      const q = search.toLowerCase()
      data = data.filter(c =>
        c.agent.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.transcript.toLowerCase().includes(q)
      )
    }
    return data
  }, [calls, search, outcome])

  const sorted = useMemo(()=>{
    return [...filtered].sort((a,b)=>{
      const aVal = (a[sortKey] as any)?? 0
      const bVal = (b[sortKey] as any)?? 0
      if (aVal < bVal) return desc? 1 : -1
      if (aVal > bVal) return desc? -1 : 1
      return 0
    })
  }, [filtered, sortKey, desc])

  return { filtered, filteredCount: filtered.length, total: calls.length, sorted: sorted.slice(0,50) }
}