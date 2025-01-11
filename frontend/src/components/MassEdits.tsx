const MassEdits = ({ activityClass }: { activityClass: string }) => {
    const handleDeleteAll = () => {
        fetch(`/api/${activityClass}`, {
            method: "DELETE",
        }).then(() => window.location.reload());
    };

    return (
        <div className="flex gap-2">
            <a className="p-2 border rounded" href={`${activityClass}/create`}>
                Create New
            </a>
            <a className="p-2 border rounded" onClick={() => handleDeleteAll()}>
                Delete All
            </a>
        </div>
    );
};

export default MassEdits;
