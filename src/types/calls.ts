export interface Call {
    id: string;
    agent: string;
    duration: number;
    timestamp: string;
    outcome: string;
    sentiment: number;
    transcript: string;
}