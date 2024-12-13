import { useEffect, useState } from "react";

type Boat = {
    name: string;
    model: string;
    manufacturer: string;
    capacity: number;
};

const Boats = () => {
    const [boats, setBoats] = useState<Boat[]>([]);

    useEffect(() => {
        fetch("/api/boats")
            .then((response) => response.json())
            .then((data) => setBoats(data));
    }, []);

    return (
        <div>
            <h3 className="text-xl">Boats</h3>
            {boats.map((boat: Boat) => (
                <div>
                    <p>Name: {boat.name}</p>
                    <p>Model: {boat.model}</p>
                    <p>Manufacturer: {boat.manufacturer}</p>
                    <p>Capacity: {boat.capacity}</p>
                </div>
            ))}
        </div>
    );
};

export default Boats;
