import type { Studysession } from "../types/sessions";

interface LeadershipProps {
    sessions: Studysession[];
}

function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    return `${hours}h ${minutes}m`;
}

export default function Leadership({ 
    sessions,
 }: LeadershipProps) {
    const totals: Record<string, number> = {};

    sessions.forEach((session) => {
        if (!totals[session.subject]) {
            totals[session.subject] = 0;
        }
        totals[session.subject] += session.duration;
    });

    const rankedSubjects = Object.entries(totals).sort((a, b) => b[1] - a[1]);

    return (
        <div>
            <h2>Most studied subjects</h2>
            {rankedSubjects.length === 0 ? (
                <p>No study sessions yet.</p>
            ) : (
                <ol>
                    {rankedSubjects.map(([subject, time]) => (
                        <li key={subject}>
                            {subject}: {formatTime(time)}
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
}