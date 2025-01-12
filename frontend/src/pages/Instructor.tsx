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
            <div className="flex flex-col w-full gap-8 p-8 border rounded">
                <h3 className="text-xl font-bold">Instructor</h3>
                <SingleEdits category="instructors" id={params.id!} />
            </div>
            {instructor && (
                <SingleInstructor key={instructor._id} {...instructor} />
            )}
        </div>
    );
};

export default Instructor;
