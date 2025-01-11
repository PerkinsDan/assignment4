import { Link } from "react-router";
import type { Activity } from "../../types";

const SingleActivity = (activity: Activity) => {
    const { _id, name, date, instructor, boats } = activity;

    return (
        <div className="my-3">
            <p>
                Id:{" "}
                <Link className="text-blue-600" to={`/activities/${_id}`}>
                    {_id}
                </Link>
            </p>
            <p>Name: {name}</p>
            <p>Date: {date}</p>
            <p>
                Instructor:{" "}
                <Link
                    className="text-blue-600"
                    to={`/instructors/${instructor}`}
                >
                    {instructor}
                </Link>
            </p>
            <p>
                Boats:{" "}
                {boats.map((boat: string, index) => (
                    <span key={index}>
                        <Link className="text-blue-600" to={`/boats/${boat}`}>
                            {boat}
                        </Link>
                        {index < boats.length - 1 && ", "}
                    </span>
                ))}
            </p>
        </div>
    );
};

export default SingleActivity;
