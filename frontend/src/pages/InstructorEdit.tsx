import { useEffect, useState } from "react";
import { useParams } from "react-router";

const InstructorEdit = () => {
    const params = useParams();

    const [name, setName] = useState("");
    const [yearsExperience, setYearsExperience] = useState<number>();
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/instructors/${params.id}`);
            const instructor = await response.json();

            return instructor;
        };

        fetchData().then((instructor) => {
            setName(instructor.name);
            setYearsExperience(instructor.yearsExperience);
        });
    }, [params.id]);

    const createInstructor = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const response = await fetch(`/api/instructors/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                yearsExperience,
            }),
        });

        if (response.status === 200) {
            window.location.href = `/instructors/${params.id}`;
            return;
        }

        const error = await response.json();
        setError(error.message);
    };

    return (
        <div className="flex flex-col items-center w-full gap-5 p-8 border rounded">
            <h3 className="text-2xl">Create a new Instructor</h3>
            <form
                className="flex flex-col w-1/3 gap-5"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="text"
                    placeholder="Name"
                    className="p-3 border rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Years of Experience"
                    className="p-3 border rounded"
                    value={yearsExperience}
                    onChange={(e) =>
                        setYearsExperience(parseInt(e.target.value))
                    }
                    required
                />
                <button
                    className="p-3 border border-blue-600 rounded hover:bg-blue-600 hover:text-white"
                    onClick={createInstructor}
                >
                    Edit
                </button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default InstructorEdit;
