const SingleEdits = ({
    activityClassAndId,
}: {
    activityClassAndId: string;
}) => {
    const handleDelete = () => {
        fetch(`/api/${activityClassAndId}`, {
            method: "DELETE",
        }).then(() => window.location.reload());
    };
    return (
        <div>
            <button className="p-2 border" onClick={() => handleDelete()}>
                Delete Record
            </button>
        </div>
    );
};

export default SingleEdits;
