import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
    const [stats, setStats] = useState([]);
    const [colDefs] = useState<ColDef[]>([
        { field: "name" },
        { field: "documentCount" },
        { field: "size" },
        { field: "storageSize" },
        { field: "indexes" },
        { field: "indexSize" },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/stats");
                return await response.json();
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then((data) => {
            console.log(data);
            setStats(data);
        });
    }, []);

    return (
        <div className="container mx-auto">
            <h3 className="py-10 text-3xl">Dashboard</h3>
            <AgGridReact
                rowData={stats}
                columnDefs={colDefs}
                domLayout="autoHeight"
            />
        </div>
    );
}

export default App;
