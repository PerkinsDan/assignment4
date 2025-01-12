import { useEffect, useState } from "react";
import SingleActivity from "../components/SingleActivity";
import type { Activity, Boat, Instructor } from "../../types";
import MassEdits from "../components/MassEdits";
import Select from "react-select";
import { SingleValue } from "react-select";

interface InstructorOption {
    value: string;
    label: string;
}

const sortOptions = [
    { value: "name", label: "Name" },
    { value: "date", label: "Date" },
    { value: "instructor", label: "Instructor" },
    { value: "boats", label: "Boats" },
];

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [instructorsList, setInstructorsList] = useState<Instructor[]>([]);
    const [boatsList, setBoatsList] = useState<Boat[]>([]);
    const [filteredActivities, setFilteredActivities] = useState<Activity[]>(
        []
    );

    useEffect(() => {
        fetch("/api/activities")
            .then((response) => response.json())
            .then((data) => {
                setActivities(data);
                setFilteredActivities(data);
            });

        fetch("/api/instructors")
            .then((response) => response.json())
            .then((data) => setInstructorsList(data));

        fetch("/api/boats")
            .then((response) => response.json())
            .then((data) => setBoatsList(data));
    }, []);

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
        instructor: SingleValue<InstructorOption>
    ) => {
        if (!instructor) return;
        if (instructor.value === "") {
            setFilteredActivities(activities);
            return;
        }
        setFilteredActivities(
            activities.filter(
                (activity: Activity) => activity.instructor === instructor.value
            )
        );
    };

    const boatsOptions = [
        {
            value: "",
            label: "No filter",
        },
    ].concat(
        boatsList.map((boat) => ({
            value: boat._id,
            label: boat.name,
        }))
    );

    const handleBoatsChange = (
        newValue: SingleValue<{ value: string; label: string }>
    ) => {
        if (!newValue) return;
        if (newValue.value == "") {
            setFilteredActivities(activities);
            return;
        }
        setFilteredActivities(
            activities.filter((activity: Activity) =>
                activity.boats.includes(newValue.value)
            )
        );
    };

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
        <div className="w-full">
            <div className="flex flex-col justify-between gap-5 p-8 border rounded md:flex-row">
                <div className="flex flex-col justify-between">
                    <h3 className="text-xl font-bold">Activities</h3>
                    <MassEdits activityClass="activities" />
                </div>

                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-4 w-96">
                        <div className="flex items-center justify-between">
                            <p>Instructors:</p>
                            <Select
                                className="w-72"
                                options={instructorsOptions}
                                onChange={handleInstructorChange}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <h4>Boats:</h4>
                            <Select
                                className="w-72"
                                options={boatsOptions}
                                onChange={handleBoatsChange}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <h4>Sort:</h4>
                            <Select
                                className="w-72"
                                options={sortOptions}
                                onChange={handleSortChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-between gap-4">
                {filteredActivities.map((activity: Activity) => (
                    <SingleActivity
                        key={activity._id}
                        activity={activity}
                        boatsList={boatsList}
                        instructorsList={instructorsList}
                    />
                ))}
            </div>
        </div>
    );
};

export default Activities;
