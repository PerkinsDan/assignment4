import { Link } from "react-router";
import { Instructor } from "../../types";

const SingleInstructor = (instructor: Instructor) => {
    const { _id, name, yearsExperience } = instructor;

    return (
        <div className="my-3">
            <p>
                Id:{" "}
                <Link className="text-blue-600" to={`/instructors/${_id}`}>
                    {_id}
                </Link>
            </p>
            <p>Name: {name}</p>
            <p>Years Experience: {yearsExperience}</p>
        </div>
    );
};

export default SingleInstructor;
