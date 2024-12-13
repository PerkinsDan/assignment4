import { useEffect, useState } from "react";

type Activity = {
    name: string;
    date: string;
    instructor: string;
    boats: string[];
};

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
                <div>
                    <p>Name: {activity.name}</p>
                    <p>Date: {activity.date}</p>
                    <p>Instructor: {activity.instructor}</p>
                    <p>Boats: {activity.boats.join(", ")}</p>
                </div>
            ))}
        </div>
    );
};

export default Activities;
