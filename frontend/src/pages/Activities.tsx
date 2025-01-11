import { useEffect, useState } from "react";
import SingleActivity from "../components/SingleActivity";
import type { Activity, Instructor } from "../../types";
import MassEdits from "../components/MassEdits";
import Select from "react-select";
import { SingleValue } from "react-select";

interface InstructorOption {
    value: string;
    label: string;
}

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [instructorsList, setInstructorsList] = useState<Instructor[]>([]);
    const [filteredActivities, setFilteredActivities] = useState<Activity[]>(
        []
    );
    const [instructor, setInstructor] = useState("");

    useEffect(() => {
        fetch("/api/activities")
            .then((response) => response.json())
            .then((data) => setActivities(data));

        fetch("/api/instructors")
            .then((response) => response.json())
            .then((data) => setInstructorsList(data));
    }, []);

    useEffect(() => {
        if (instructor === "") {
            setFilteredActivities(activities);
        } else {
            setFilteredActivities(
                activities.filter(
                    (activity: Activity) => activity.instructor === instructor
                )
            );
        }
    }, [instructor, activities]);

    const instructorsOptions = [
        {
            value: "",
            label: "No filter",
        },
    ].concat(
        instructorsList.map((instructor) => ({
            value: instructor._id,
            label: instructor.name,
        }))
    );

    const handleInstructorChange = (
        newValue: SingleValue<InstructorOption>
    ) => {
        if (newValue) {
            setInstructor(newValue.value);
        }
    };

    const sortOptions = [
        { value: "name", label: "Name" },
        { value: "date", label: "Date" },
        { value: "instructor", label: "Instructor" },
        { value: "boats", label: "Boats" },
    ];

    const handleSortChange = (
        newValue: SingleValue<{ value: string; label: string }>
    ) => {
        if (!newValue) return;
        setFilteredActivities(
            [...filteredActivities].sort((a, b) => {
                if (newValue.value === "name") {
                    return a.name.localeCompare(b.name);
                }

                if (newValue.value === "date") {
                    return (
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    );
                }

                if (newValue.value === "instructor") {
                    return a.instructor.localeCompare(b.instructor);
                }

                if (newValue.value === "boats") {
                    return a.boats.length - b.boats.length;
                }

                return 0;
            })
        );
    };

    return (
        <div>
            <h3 className="text-xl">Activities</h3>
            <div>
                <h4>Filters</h4>
                <div>
                    <p>Instructors</p>
                    <Select
                        className="w-72"
                        options={instructorsOptions}
                        onChange={handleInstructorChange}
                    />
                </div>
                <div>
                    <p>Sort by</p>
                    <Select
                        className="w-72"
                        options={sortOptions}
                        onChange={handleSortChange}
                    />
                </div>
            </div>
            <MassEdits activityClass="activities" />
            {filteredActivities.map((activity: Activity) => (
                <SingleActivity key={activity._id} {...activity} />
            ))}
        </div>
    );
};

export default Activities;
