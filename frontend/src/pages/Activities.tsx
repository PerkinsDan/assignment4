import { useEffect, useState } from "react";
import SingleActivity from "../components/SingleActivity";
import type { Activity } from "../../types";
import MassEdits from "../components/MassEdits";

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
            <MassEdits activityClass="activities" />
            {activities.map((activity: Activity) => (
                <SingleActivity key={activity._id} {...activity} />
            ))}
        </div>
    );
};

export default Activities;
