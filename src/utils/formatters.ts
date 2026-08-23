export const formatSentiment = (s: number | null) => s == null ? 'null' : s.toFixed(2)
export const formatDuration = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return "0s";

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
        return `${hrs}h:${mins.toString().padStart(2, '0')}m:${secs.toString().padStart(2, '0')}s`;
    }
    if (mins > 0) {
        return `${mins}m : ${secs.toString().padStart(2, '0')}s`;
    }
    return `${secs}s`;
};
export const formatDate = (timestamp: string): string => {
    if (!timestamp) return "-";

    const date = new Date(timestamp)
    if (isNaN(date.getTime())) return timestamp;

    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    })
};


