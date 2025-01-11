import { Link } from "react-router";
import type { Activity, Boat, Instructor } from "../../types";

type PropTypes = {
    activity: Activity;
    boatsList: Boat[];
    instructorsList: Instructor[];
};

const SingleActivity = ({
    activity,
    boatsList,
    instructorsList,
}: PropTypes) => {
    const { _id, name, date, instructor, boats } = activity;

    return (
        <div className="flex justify-between mx-auto lg:mx-0 p-8 my-3 border rounded w-[400px]">
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
                <p>{date.slice(0, 10)}</p>

                <div>
                    <Link
                        className="px-1 border border-blue-600 rounded"
                        to={`/instructors/${instructor}`}
                    >
                        {
                            instructorsList.find(
                                (instructorObj) =>
                                    instructorObj._id === instructor
                            )?.name
                        }
                    </Link>
                </div>
                <div className="flex flex-col gap-1">
                    {boats.map((boat: string, index) => (
                        <span key={index} className="flex flex-wrap">
                            <Link
                                className="px-1 border border-blue-600 rounded"
                                to={`/boats/${boat}`}
                            >
                                {
                                    boatsList.find(
                                        (boatObj) => boatObj._id === boat
                                    )?.name
                                }
                            </Link>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SingleActivity;
