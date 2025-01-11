import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SingleActivity from "../components/SingleActivity";
import type { Activity } from "../../types";
import SingleEdits from "../components/SingleEdits";

const Activity = () => {
    const params = useParams();

    const [activity, setActivity] = useState<Activity>();
    const [boatsList, setBoatsList] = useState([]);
    const [instructorsList, setInstructorsList] = useState([]);

    useEffect(() => {
        fetch("/api/activities/" + params.id)
            .then((response) => response.json())
            .then((data) => setActivity(data));

        fetch("/api/boats")
            .then((response) => response.json())
            .then((data) => setBoatsList(data));

        fetch("/api/instructors")
            .then((response) => response.json())
            .then((data) => setInstructorsList(data));
    }, [params]);

    return (
        <div>
            <div className="flex flex-col w-full gap-8 p-8 border rounded">
                <h3 className="text-xl">Activity</h3>
                <SingleEdits category="activities" id={params.id!} />
            </div>
            {activity && (
                <SingleActivity
                    activity={activity}
                    boatsList={boatsList}
                    instructorsList={instructorsList}
                />
            )}
        </div>
    );
};

export default Activity;
