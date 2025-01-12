const SingleEdits = ({ category, id }: { category: string; id: string }) => {
    const handleDelete = () => {
        fetch(`/api/${category}/${id}`, {
            method: "DELETE",
        }).then(() => window.location.reload());
    };
    return (
        <div className="flex gap-4">
            <button
                className="p-2 border rounded"
                onClick={() => handleDelete()}
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
    );
};

export default SingleEdits;
