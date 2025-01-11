import { useEffect, useState } from "react";
import SingleBoat from "../components/SingleBoat";
import { Boat } from "../../types";
import MassEdits from "../components/MassEdits";
import Select, { SingleValue } from "react-select";

interface SortOption {
    value: string;
    label: string;
}

const sortOptions = [
    { value: "name", label: "Name" },
    { value: "model", label: "Model" },
    { value: "manufacturer", label: "Manufacturer" },
    { value: "capacity", label: "Capacity" },
];

const Boats = () => {
    const [boats, setBoats] = useState<Boat[]>([]);

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
        <div className="w-full">
            <div className="flex items-start justify-between p-8 border rounded">
                <div className="flex flex-col gap-8">
                    <h3 className="text-xl">Boats</h3>
                    <MassEdits activityClass="boats" />
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
                {boats.map((boat: Boat) => (
                    <SingleBoat key={boat._id} {...boat} />
                ))}
            </div>
        </div>
    );
};

export default Boats;
