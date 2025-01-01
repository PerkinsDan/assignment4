import { useEffect, useState } from "react";
import SingleActivity from "../components/SingleActivity";
import type { Activity } from "../../types";

const Activities = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetch("/api/activities")
            .then((response) => response.json())
            .then((data) => setActivities(data));
    }, []);

    return (
        <div>
            <h3 className="text-xl">Activities</h3>
            {activities.map((activity: Activity) => (
                <SingleActivity key={activity._id} {...activity} />
            ))}
        </div>
    );
};

export default Activities;
