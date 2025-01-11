import { Link } from "react-router";
import { Boat } from "../../types";

const SingleBoat = (Boat: Boat) => {
    const { _id, name, model, manufacturer, capacity } = Boat;

    return (
        <div className="my-3">
            <p>
                Id:{" "}
                <Link className="text-blue-600" to={`/boats/${_id}`}>
                    {_id}
                </Link>
            </p>
            <p>Name: {name}</p>
            <p>Model: {model}</p>
            <p>Manufacturer: {manufacturer}</p>
            <p>Capacity: {capacity}</p>
        </div>
    );
};

export default SingleBoat;
