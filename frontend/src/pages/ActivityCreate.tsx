import { useEffect, useState } from "react";
import { Boat, Instructor } from "../../types";
import Select from "react-select";

const ActivityCreate = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [instructor, setInstructor] = useState("");
    const [boats, setBoats] = useState([]);
    const [error, setError] = useState("");

    const [boatsList, setBoatsList] = useState<Boat[]>([]);
    const [instructorsList, setInstructorsList] = useState<Instructor[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const boatsResponse = await fetch("/api/boats");
            const boatsList = await boatsResponse.json();

            const instructorsResponse = await fetch("/api/instructors");
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
    }));

    const boatsOptions = boatsList.map((boat) => ({
        value: boat._id,
        label: boat.name,
    }));

    const createActivity = async (e: { preventDefault: () => void }) => {
        console.log(boats);
        e.preventDefault();

        const response = await fetch("/api/activities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                date,
                instructor,
                boats: boats.map((boat) => boat.value),
            }),
        });

        if (response.status === 200) {
            window.location.href = "/activities";
            return;
        }

        const error = await response.json();
        setError(error.message);
    };

    const handleBoatsChange = (boats) => {
        setBoats(boats);
    };

    const handleInstructorChange = (instructor) => {
        setInstructor(instructor.value);
    };

    return (
        <div>
            <h3>Create a new activity</h3>
            <form
                className="flex flex-col w-1/3 gap-5"
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
                    className="p-3 text-white bg-blue-600 rounded"
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
