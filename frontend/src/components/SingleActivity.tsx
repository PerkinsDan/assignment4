import { Link } from "react-router";
import type { Activity } from "../../types";

const SingleActivity = (activity: Activity) => {
    const { _id, name, date, instructor, boats } = activity;

    return (
        <div className="flex gap-4 p-8 my-3 border rounded w-max">
            <div className="flex flex-col gap-3 font-bold">
                <p>Id: </p>
                <p>Name:</p>
                <p>Date:</p>
                <p>Instructor:</p>
                <p>Boats:</p>
            </div>
            <div className="flex flex-col gap-3">
                <div>
                    <Link
                        className="px-1 border border-blue-600 rounded"
                        to={`/activities/${_id}`}
                    >
                        {_id}
                    </Link>
                </div>
                <p>{name}</p>
                <p>{date}</p>

                <div>
                    <Link
                        className="px-1 border border-blue-600 rounded"
                        to={`/instructors/${instructor}`}
                    >
                        {instructor}
                    </Link>
                </div>
                <div className="flex flex-col gap-1">
                    {boats.map((boat: string, index) => (
                        <span key={index} className="flex flex-wrap">
                            <Link
                                className="px-1 border border-blue-600 rounded"
                                to={`/boats/${boat}`}
                            >
                                {boat}
                            </Link>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SingleActivity;
