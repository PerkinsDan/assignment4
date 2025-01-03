import { useEffect, useState } from "react";
import type { Instructor } from "../../types";
import SingleInstructor from "../components/SingleInstructor";
import MassEdits from "../components/MassEdits";

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
            <MassEdits activityClass="instructors" />
            {instructors.map((instructor: Instructor) => (
                <SingleInstructor key={instructor._id} {...instructor} />
            ))}
        </div>
    );
};

export default Instructors;
