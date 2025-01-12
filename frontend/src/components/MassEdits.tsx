import { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmationAll";

const MassEdits = ({ activityClass }: { activityClass: string }) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    return (
        <>
            <div className="flex gap-2">
                <a
                    className="p-2 border rounded"
                    href={`${activityClass}/create`}
                >
                    Create New
                </a>
                <a
                    className="p-2 border rounded"
                    onClick={() => setShowDeleteConfirmation(true)}
                >
                    Delete All
                </a>
            </div>
            {showDeleteConfirmation && (
                <DeleteConfirmation activityClass={activityClass} />
            )}
        </>
    );
};

export default MassEdits;
