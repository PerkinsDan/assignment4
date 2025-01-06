import { useEffect, useState } from "react";
import type { Boat } from "../../types";
import SingleBoat from "../components/SingleBoat";
import { useParams } from "react-router";
import SingleEdits from "../components/SingleEdits";

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
            <SingleEdits category="boats" id={params.id!} />
            {boat && <SingleBoat key={boat._id} {...boat} />}
        </div>
    );
};

export default Boat;
