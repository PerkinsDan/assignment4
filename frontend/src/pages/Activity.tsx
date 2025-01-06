import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SingleActivity from "../components/SingleActivity";
import type { Activity } from "../../types";
import SingleEdits from "../components/SingleEdits";

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
            <SingleEdits category="activities" id={params.id!} />
            {activity && <SingleActivity {...activity} />}
        </div>
    );
};

export default Activity;
