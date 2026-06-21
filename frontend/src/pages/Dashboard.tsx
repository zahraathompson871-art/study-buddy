import {useEffect, useState } from "react";
import SubjectList from "../components/SubjectList";
import type { Studysession } from "../types/sessions";
import Analytics from "../components/Analytics";

export default function Dashboard() {
    //State = data that can change while the app is running. 
    const [subjects, setSubjects] = useState<string[]>([]);

    //This stores what the user is typing in the input field.
    const [newSubject, setNewSubject] = useState("");

    const [activeSubject, setActiveSubject] = useState<string | null>(null);
    const [seconds, setSeconds] = useState(0);
    const [sessions, setSessions] = useState<Studysession[]>(() => {
        const saved = localStorage.getItem("sessions");
        return saved ? JSON.parse(saved) : [];
    });

    //Load saved subjects when app starts.
    useEffect(() => {
        const savedSubjects = localStorage.getItem("subjects");
        if (savedSubjects) {
            setSubjects(JSON.parse(savedSubjects));
        }
    }, []);

    //Save subjects whenever they change.
    useEffect(() => {
        if (subjects.length === 0) return; 

            localStorage.setItem("subjects", JSON.stringify(subjects));
    }, [subjects]);

    useEffect(() => {
        let interval: number | undefined;

        if (activeSubject) {
            interval = window.setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [activeSubject]);

    useEffect(() => {
        localStorage.setItem("sessions", JSON.stringify(sessions));
    }, [sessions]);

    // Adds a new subject, takes current subjects and adds the new one to the list, then clears the input field.
    function handleAddSubject() {
        if (newSubject.trim() === "") return; // Prevent adding empty subjects
        setSubjects([...subjects, newSubject.trim()]);
        // Clear the input field after adding a subject
        setNewSubject("");
    }

    function handleDeleteSubject(index: number) {
        const updatedSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(updatedSubjects);
    } 
    
    function startSession(subject: string) {
        setActiveSubject(subject);
        setSeconds(0);
    }

    function stopSession() {
        if (!activeSubject) return;

        const newSession: Studysession = {
            id: crypto.randomUUID(),
            subject: activeSubject,
            duration: seconds,
            date: new Date().toISOString(),
        };

        setSessions((prev) => [...prev, newSession]);
        setActiveSubject(null);
        setSeconds(0);
    }

    return (
        <div>
            <h1>Study Buddy</h1>
            <input
                type="text"
                placeholder="Enter subject..."
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
            />
            <button onClick={handleAddSubject}>Add Subject</button>
            
            <SubjectList subjects={subjects}
             onDelete={handleDeleteSubject}
             />

             {subjects.map((subject) => (
                <div key={subject}>
                    <span>{subject}</span>
                    <button onClick={() => startSession(subject)}>Start Session</button>
                </div>
            ))}

            <h2>Timer: {seconds}s</h2>
            <button onClick={stopSession}>Stop Session</button>

            <h2>Study Sessions</h2>
            <ul>
                {sessions.map((session) => (
                    <li key={session.id}>
                        {session.subject} - {session.duration} seconds
                    </li>
                ))}
            </ul>

            {/*Analytics component takes raw session data and turns it into insights.*/}
            <Analytics sessions={sessions} />
        </div>
    );
}