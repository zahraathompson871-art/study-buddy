interface SubjectListProps {
    subjects: string[];
}

// This component receives a list of subjects from it's parent (dashboard) and displays them on the screen. If there are no subjects, it shows a message indicating that no subjects have been added yet.
export default function SubjectList({ subjects }: SubjectListProps) {
    return (
        <div>
            <h2>Subjects</h2>

            {subjects.length === 0 ? (
                <p>No subjects added yet.</p>
            ) : (
                <ul>
                    {subjects.map((subject, index) => (
                        <li key={index}>{subject}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}