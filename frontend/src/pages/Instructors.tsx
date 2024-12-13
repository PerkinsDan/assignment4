import { useEffect, useState } from "react";

type Instructor = {
    name: string;
    yearsExperience: number;
};

const Instructors = () => {
    const [instructors, setInstructors] = useState<Instructor[]>([]);

    useEffect(() => {
        fetch("/api/instructors")
            .then((response) => response.json())
            .then((data) => setInstructors(data));
    }, []);

    return (
        <div>
            <h3 className="text-xl">Instructors</h3>
            {instructors.map((instructor: Instructor) => (
                <div>
                    <p>Name: {instructor.name}</p>
                    <p>Years Experience: {instructor.yearsExperience}</p>
                </div>
            ))}
        </div>
    );
};

export default Instructors;
