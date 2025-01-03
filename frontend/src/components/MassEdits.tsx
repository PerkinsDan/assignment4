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
        </div>
    );
};

export default MassEdits;
