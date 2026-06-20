import { useState } from "react";
import SubjectList from "../components/SubjectList";

export default function Dashboard() {
    //State = data that can change while the app is running. 
    const [subjects, setSubjects] = useState<string[]>([]);

    //This stores what the user is typing in the input field.
    const [newSubject, setNewSubject] = useState("");

    // Adds a new subject, takes current subjects and adds the new one to the list, then clears the input field.
    function handleAddSubject() {
        if (newSubject.trim() === "") return; // Prevent adding empty subjects
        setSubjects([...subjects, newSubject.trim()]);
        // Clear the input field after adding a subject
        setNewSubject("");
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
            
            <SubjectList subjects={subjects} />
        </div>
    );
}