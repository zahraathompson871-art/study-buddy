interface SubjectListProps {
    subjects: string[];
    onDelete: (index: number) => void;
}

//This component displays subjects and allows deleting them. It does not manage data itself - it only shows ui.
export default function SubjectList({ subjects, onDelete,}: SubjectListProps) {
    return (
        <div>
            <h2>Subjects</h2>

            {subjects.length === 0 ? (
                <p>No subjects added yet.</p>
            ) : (
                <ul>
                    {subjects.map((subject, index) => (
                        <li key={index}>{subject}
                        <button onClick={() => onDelete(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}