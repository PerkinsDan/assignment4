import { useEffect, useState } from "react";
import { useParams } from "react-router";

const BoatCreate = () => {
    const params = useParams();

    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [capacity, setCapacity] = useState<number>();
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/boats/${params.id}`);
            const boat = await response.json();

            return boat;
        };

        fetchData().then((boat) => {
            setName(boat.name);
            setModel(boat.model);
            setManufacturer(boat.manufacturer);
            setCapacity(boat.capacity);
        });
    }, [params.id]);

    const createBoat = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const response = await fetch(`/api/boats/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                model,
                manufacturer,
                capacity,
            }),
        });

        if (response.status === 200) {
            window.location.href = "/boats";
            return;
        }

        const error = await response.json();
        setError(error.message);
    };

    return (
        <div>
            <h3>Create a new Boat</h3>
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
                    type="text"
                    placeholder="Model"
                    className="p-3 border rounded"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Manufacturer"
                    className="p-3 border rounded"
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Capacity"
                    className="p-3 border rounded"
                    value={capacity}
                    onChange={(e) => setCapacity(parseInt(e.target.value))}
                    required
                />
                <button
                    className="p-3 text-white bg-blue-600 rounded"
                    onClick={createBoat}
                >
                    Create
                </button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default BoatCreate;
