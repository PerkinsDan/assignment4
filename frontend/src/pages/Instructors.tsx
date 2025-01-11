import { useEffect, useState } from "react";
import type { Instructor } from "../../types";
import SingleInstructor from "../components/SingleInstructor";
import MassEdits from "../components/MassEdits";
import Select, { SingleValue } from "react-select";

const Instructors = () => {
    const [instructors, setInstructors] = useState<Instructor[]>([]);

    useEffect(() => {
        fetch("/api/instructors")
            .then((response) => response.json())
            .then((data) => setInstructors(data));
    }, []);

    const sortOptions = [
        { value: "name", label: "Name" },
        { value: "yearsExperience", label: "Years Experience" },
    ];

    const handleSortChange = (filtered: SingleValue<{ value: string }>) => {
        if (!filtered) return;

        if (filtered.value == "name") {
            setInstructors(
                [...instructors].sort((a, b) => a.name.localeCompare(b.name))
            );
        }

        if (filtered.value == "yearsExperience") {
            setInstructors(
                [...instructors].sort(
                    (a, b) => a.yearsExperience - b.yearsExperience
                )
            );
        }
    };

    return (
        <div>
            <h3 className="text-xl">Instructors</h3>
            <div>
                <p>Sort by</p>
                <Select
                    className="w-72"
                    options={sortOptions}
                    onChange={handleSortChange}
                />
            </div>
            <MassEdits activityClass="instructors" />
            {instructors.map((instructor: Instructor) => (
                <SingleInstructor key={instructor._id} {...instructor} />
            ))}
        </div>
    );
};

export default Instructors;
