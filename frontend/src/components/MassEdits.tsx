const MassEdits = ({ activityClass }: { activityClass: string }) => {
    const handleDeleteAll = () => {
        fetch(`/api/${activityClass}`, {
            method: "DELETE",
        }).then(() => window.location.reload());
    };

    return (
        <div>
            <button className="p-2 border" onClick={() => handleDeleteAll()}>
                Delete All
            </button>
            <a className="p-2 border" href={`${activityClass}/create`}>
                Create New
            </a>
        </div>
    );
};

export default MassEdits;
