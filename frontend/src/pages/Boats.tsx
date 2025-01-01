import { useEffect, useState } from "react";
import SingleBoat from "../components/SingleBoat";
import { Boat } from "../../types";

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
                <SingleBoat key={boat._id} {...boat} />
            ))}
        </div>
    );
};

export default Boats;
