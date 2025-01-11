import { Link } from "react-router";
import { Boat } from "../../types";

const SingleBoat = (Boat: Boat) => {
    const { _id, name, model, manufacturer, capacity } = Boat;

    return (
        <div className="flex justify-between mx-auto lg:mx-0 p-8 my-3 border rounded w-[410px]">
            <div className="flex flex-col gap-3 font-bold">
                <p>Id: </p>
                <p>Name:</p>
                <p>Model:</p>
                <p>Manufacturer:</p>
                <p>Capacity:</p>
            </div>
            <div className="flex flex-col gap-3">
                <div>
                    <Link
                        className="px-1 border border-blue-600 rounded"
                        to={`/boats/${_id}`}
                    >
                        {_id}
                    </Link>
                </div>
                <p>{name}</p>
                <p>{model}</p>
                <p>{manufacturer}</p>
                <p>{capacity}</p>
            </div>
        </div>
    );
};

export default SingleBoat;
