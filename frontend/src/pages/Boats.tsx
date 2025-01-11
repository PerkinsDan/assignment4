import { useEffect, useState } from "react";
import SingleBoat from "../components/SingleBoat";
import { Boat } from "../../types";
import MassEdits from "../components/MassEdits";
import Select, { SingleValue } from "react-select";

interface SortOption {
    value: string;
    label: string;
}

const Boats = () => {
    const [boats, setBoats] = useState<Boat[]>([]);

    const sortOptions = [
        { value: "name", label: "Name" },
        { value: "model", label: "Model" },
        { value: "manufacturer", label: "Manufacturer" },
        { value: "capacity", label: "Capacity" },
    ];

    useEffect(() => {
        fetch("/api/boats")
            .then((response) => response.json())
            .then((data) => setBoats(data));
    }, []);

    const handleSortChange = (filtered: SingleValue<SortOption>) => {
        if (!filtered) return;

        if (filtered.value == "name") {
            setBoats([...boats].sort((a, b) => a.name.localeCompare(b.name)));
        }

        if (filtered.value == "model") {
            setBoats([...boats].sort((a, b) => a.model.localeCompare(b.model)));
        }

        if (filtered.value == "manufacturer") {
            setBoats(
                [...boats].sort((a, b) =>
                    a.manufacturer.localeCompare(b.manufacturer)
                )
            );
        }

        if (filtered.value == "capacity") {
            setBoats([...boats].sort((a, b) => a.capacity - b.capacity));
        }
    };

    return (
        <div>
            <h3 className="text-xl">Boats</h3>
            <div>
                <p>Sort by</p>
                <Select
                    className="w-72"
                    options={sortOptions}
                    onChange={handleSortChange}
                />
            </div>
            <MassEdits activityClass="boats" />
            {boats.map((boat: Boat) => (
                <SingleBoat key={boat._id} {...boat} />
            ))}
        </div>
    );
};

export default Boats;
