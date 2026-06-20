import { useEffect, useState } from "react";
import SubjectList from "../components/SubjectList";

export default function Dashboard() {
    //State = data that can change while the app is running. 
    const [subjects, setSubjects] = useState<string[]>([]);

    //This stores what the user is typing in the input field.
    const [newSubject, setNewSubject] = useState("");

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
        </div>
    );
}