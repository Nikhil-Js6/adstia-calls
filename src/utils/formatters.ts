export const formatDuration = (s: number) => `${s}s`
export const formatSentiment = (s: number | null) => s == null ? 'null' : s.toFixed(2)