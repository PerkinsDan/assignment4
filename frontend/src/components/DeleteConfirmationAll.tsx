const DeleteConfirmation = ({ activityClass }: { activityClass: string }) => {
    const handleDeleteAll = () => {
        fetch(`/api/${activityClass}`, {
            method: "DELETE",
        }).then(() => window.location.reload());
    };

    return (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-600 bg-opacity-15">
            <div className="flex flex-col items-center justify-center gap-5 p-8 bg-white rounded">
                <div className="text-xl">
                    Do you really want to delete all {activityClass}?
                </div>
                <div className="flex justify-between w-full">
                    <button
                        className="w-1/3 p-3 border border-red-600 rounded hover:bg-red-600 hover:text-white"
                        onClick={handleDeleteAll}
                    >
                        Yes
                    </button>
                    <button
                        className="w-1/3 p-3 border border-blue-600 rounded hover:bg-blue-600 hover:text-white"
                        onClick={() => window.location.reload()}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
