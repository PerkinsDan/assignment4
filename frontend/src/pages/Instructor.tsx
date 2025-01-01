import { useEffect, useState } from "react";
import type { Instructor } from "../../types";
import SingleInstructor from "../components/SingleInstructor";
import { useParams } from "react-router";

const Instructor = () => {
    const params = useParams();
    const [instructor, setInstructor] = useState<Instructor>();

    useEffect(() => {
        fetch("/api/instructors/" + params.id)
            .then((response) => response.json())
            .then((data) => setInstructor(data));
    }, [params]);

    return (
        <div>
            <h3 className="text-xl">Instructors</h3>
            {instructor && (
                <SingleInstructor key={instructor._id} {...instructor} />
            )}
        </div>
    );
};

export default Instructor;
