import { useState } from "react";
import DeleteConfirmation from "./DeleteComfirmationSingle";

const SingleEdits = ({ category, id }: { category: string; id: string }) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    return (
        <>
            <div className="flex gap-4">
                <button
                    className="p-2 border rounded"
                    onClick={() => setShowDeleteConfirmation(true)}
                >
                    Delete Record
                </button>
                <button
                    className="p-2 border rounded"
                    onClick={() =>
                        (window.location.href = `/${category}/${id}/edit`)
                    }
                >
                    Edit Record
                </button>
            </div>
            {showDeleteConfirmation && (
                <DeleteConfirmation category={category} id={id} />
            )}
        </>
    );
};

export default SingleEdits;
