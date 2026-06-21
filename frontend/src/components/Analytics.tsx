import type { Studysession } from "../types/sessions";

interface AnalyticsProps {
    sessions: Studysession[];
}

//This component turns raw session data into insights 
export default function Analytics({ sessions }: AnalyticsProps) {
    // Calculate total study time
    const totalTime = sessions.reduce((acc, session) => {
        return acc + session.duration;
    }, 0);

    // Calculate time spent per subject
    const timePerSubject: Record<string, number> = {};

    sessions.forEach((session) => {
        if (!timePerSubject[session.subject]) {
            timePerSubject[session.subject] = 0;
        }

        timePerSubject[session.subject] += session.duration;
    });

    //Session count per subject
    const sessionCountPerSubject: Record<string, number> = {};

    sessions.forEach((session) => {
        if (!sessionCountPerSubject[session.subject]) {
            sessionCountPerSubject[session.subject] = 0;
        }

        sessionCountPerSubject[session.subject] += 1;
    });

    function formatTime(seconds: number) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    }

    return (
        <div>
            <h2>Analytics</h2>
            <p>Total Study Time: {formatTime(totalTime)}</p>
            <h3>Time Spent Per Subject:</h3>
            <ul>
                {Object.entries(timePerSubject).map(([subject, time]) => (
                    <li key={subject}>
                        {subject}: {formatTime(time)}
                    </li>
                ))}
            </ul>
            <h3>Session Count Per Subject:</h3>
            <ul>
                {Object.entries(sessionCountPerSubject).map(([subject, count]) => (
                    <li key={subject}>
                        {subject}: {count} sessions
                    </li>
                ))}
            </ul>
        </div>
    );
}