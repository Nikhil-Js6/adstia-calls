export interface Call {
    id: string;
    agent: string;
    duration: number;
    timestamp: string;
    outcome: string;
    sentiment: number | null;
    transcript: string;
}