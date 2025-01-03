import { useEffect, useState } from "react";
import type { Instructor } from "../../types";
import SingleInstructor from "../components/SingleInstructor";
import { useParams } from "react-router";
import SingleEdits from "../components/SingleEdits";

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
            <SingleEdits activityClassAndId={`instructors/${params.id}`} />
            {instructor && (
                <SingleInstructor key={instructor._id} {...instructor} />
            )}
        </div>
    );
};

export default Instructor;
