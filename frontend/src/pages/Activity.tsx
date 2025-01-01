import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SingleActivity from "../components/SingleActivity";
import type { Activity } from "../../types";

const Activity = () => {
    const params = useParams();

    const [activity, setActivity] = useState<Activity>();

    useEffect(() => {
        fetch("/api/activities/" + params.id)
            .then((response) => response.json())
            .then((data) => setActivity(data));
    }, [params]);

    return (
        <div>
            <h3 className="text-xl">Activity</h3>
            {activity && <SingleActivity {...activity} />}
        </div>
    );
};

export default Activity;
