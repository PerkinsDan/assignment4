import { useEffect, useState } from "react";
import type { Instructor } from "../../types";
import SingleInstructor from "../components/SingleInstructor";
import MassEdits from "../components/MassEdits";
import Select, { SingleValue } from "react-select";

const sortOptions = [
    { value: "name", label: "Name" },
    { value: "yearsExperience", label: "Years Experience" },
];

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const Instructors = () => {
    const [instructors, setInstructors] = useState<Instructor[]>([]);

    useEffect(() => {
        fetch(apiEndpoint + "/api/instructors")
            .then((response) => response.json())
            .then((data) => setInstructors(data));
    }, []);

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
        <div className="w-full">
            <div className="flex items-start justify-between p-8 border rounded">
                <div className="flex flex-col gap-8">
                    <h3 className="text-xl font-bold">Instructors</h3>
                    <MassEdits activityClass="instructors" />
                </div>
                <div className="flex items-center gap-4">
                    <p>Sort:</p>
                    <Select
                        className="w-72"
                        options={sortOptions}
                        onChange={handleSortChange}
                    />
                </div>
            </div>
            <div className="flex flex-wrap justify-between gap-4">
                {instructors.map((instructor: Instructor) => (
                    <SingleInstructor key={instructor._id} {...instructor} />
                ))}
            </div>
        </div>
    );
};

export default Instructors;
