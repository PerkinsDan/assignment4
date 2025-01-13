import { useEffect, useState } from "react";
import { Boat, Instructor } from "../../types";
import Select, { MultiValue, SingleValue } from "react-select";

type SelectOption = {
    value: string;
    label: string;
};

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const ActivityCreate = () => {
    // form data
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [instructor, setInstructor] = useState("");
    const [boats, setBoats] = useState<MultiValue<SelectOption>>([]);
    const [error, setError] = useState("");

    // fetched data
    const [boatsList, setBoatsList] = useState<Boat[]>([]);
    const [instructorsList, setInstructorsList] = useState<Instructor[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const boatsResponse = await fetch(apiEndpoint + "/api/boats");
            const boatsList = await boatsResponse.json();

            const instructorsResponse = await fetch(
                apiEndpoint + "/api/instructors"
            );
            const instructorsList = await instructorsResponse.json();

            return { boatsList, instructorsList };
        };

        fetchData().then(({ boatsList, instructorsList }) => {
            setBoatsList(boatsList);
            setInstructorsList(instructorsList);
        });
    }, []);

    const instructorsOptions = instructorsList.map((instructor) => ({
        value: instructor._id,
        label: instructor.name,
    })) as { value: string; label: string }[];

    const boatsOptions = boatsList.map((boat) => ({
        value: boat._id,
        label: boat.name,
    }));

    const createActivity = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const response = await fetch(apiEndpoint + "/api/activities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                date,
                instructor,
                boats: boats.map((boat: { value: string }) => boat.value),
            }),
        });

        if (response.status === 201) {
            window.location.href = "/activities";
            return;
        }

        const error = await response.json();
        setError(error.message);
    };

    const handleBoatsChange = (boats: MultiValue<SelectOption>) => {
        setBoats(boats);
    };

    const handleInstructorChange = (instructor: SingleValue<SelectOption>) => {
        if (!instructor) return;
        setInstructor(instructor.value);
    };

    return (
        <div className="flex flex-col items-center w-full gap-5 p-8 border rounded">
            <h3 className="text-2xl">Create a new activity</h3>
            <form
                className="flex flex-col w-1/3 gap-5 "
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="text"
                    placeholder="Name"
                    className="p-3 border rounded"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Date"
                    className="p-3 border rounded"
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <Select
                    options={instructorsOptions}
                    onChange={handleInstructorChange}
                />
                <Select
                    options={boatsOptions}
                    isMulti
                    value={boats}
                    onChange={handleBoatsChange}
                />
                <button
                    className="p-3 border border-blue-600 rounded hover:bg-blue-600 hover:text-white"
                    onClick={createActivity}
                >
                    Create
                </button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default ActivityCreate;
