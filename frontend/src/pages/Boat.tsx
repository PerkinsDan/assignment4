import { useEffect, useState } from "react";
import type { Boat } from "../../types";
import SingleBoat from "../components/SingleBoat";
import { useParams } from "react-router";

const Boat = () => {
    const params = useParams();
    const [boat, setBoat] = useState<Boat>();

    useEffect(() => {
        fetch("/api/boats/" + params.id)
            .then((response) => response.json())
            .then((data) => setBoat(data));
    }, [params]);

    return (
        <div>
            <h3 className="text-xl">Boats</h3>
            {boat && <SingleBoat key={boat._id} {...boat} />}
        </div>
    );
};

export default Boat;
