import { Link } from "react-router";
import { Instructor } from "../../types";

const SingleInstructor = (instructor: Instructor) => {
    const { _id, name, yearsExperience } = instructor;

    return (
        <div className="flex justify-between mx-auto lg:mx-0 p-8 my-3 border rounded w-[410px]">
            <div className="flex flex-col gap-3 font-bold">
                <p>Id: </p>
                <p>Name:</p>
                <p>Years Experience:</p>
            </div>
            <div className="flex flex-col gap-3">
                <div>
                    <Link
                        className="px-1 border border-blue-600 rounded"
                        to={`/instructors/${_id}`}
                    >
                        {_id}
                    </Link>
                </div>
                <p>{name}</p>
                <p>{yearsExperience}</p>
            </div>
        </div>
    );
};

export default SingleInstructor;
