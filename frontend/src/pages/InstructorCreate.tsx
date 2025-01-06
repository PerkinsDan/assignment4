import { useState } from "react";

const InstructorCreate = () => {
    const [name, setName] = useState("");
    const [yearsExperience, setYearsExperience] = useState<number>();
    const [error, setError] = useState("");

    const createInstructor = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const response = await fetch(`/api/instructors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                yearsExperience,
            }),
        });

        if (response.status === 200) {
            window.location.href = "/instructors";
            return;
        }

        const error = await response.json();
        setError(error.message);
    };

    return (
        <div>
            <h3>Create a new Instructor</h3>
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
                    className="p-3 text-white bg-blue-600 rounded"
                    onClick={createInstructor}
                >
                    Create
                </button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default InstructorCreate;
