import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

ModuleRegistry.registerModules([AllCommunityModule]);

type pieProps = {
    chartTitle: string;
    chartData: { name: string; value: number }[];
};

const StoragePieChart = ({ chartTitle, chartData }: pieProps) => {
    // Define colors for each section
    const COLORS = ["#ff3221", "#32cd32"];

    return (
        <PieChart width={200} height={200}>
            <text x={"50%"} y={"50%"} dy={8} textAnchor="middle" fill={"#000"}>
                {chartTitle}
            </text>
            <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
};

function App() {
    type StatsType = {
        name: string;
        documentCount: number;
        size: number;
        storageSize: number;
        indexes: number;
        indexSize: number;
    };

    const [stats, setStats] = useState<StatsType[]>([]);
    const [activityData, setActivityData] = useState<
        { name: string; value: number }[]
    >([]);
    const [boatData, setBoatData] = useState<{ name: string; value: number }[]>(
        []
    );
    const [instructorData, setInstructorData] = useState<
        { name: string; value: number }[]
    >([]);
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
            setStats(data);
            setActivityData([
                { name: "Used", value: stats[0].size },
                {
                    name: "Free",
                    value: stats[0].storageSize - stats[0].size,
                },
            ]);
            setBoatData([
                { name: "Used", value: stats[1].size },
                {
                    name: "Free",
                    value: stats[1].storageSize - stats[1].size,
                },
            ]);
            setInstructorData([
                { name: "Used", value: stats[2].size },
                {
                    name: "Free",
                    value: stats[2].storageSize - stats[2].size,
                },
            ]);
        });
    }, [stats]);

    return (
        <div className="container mx-auto space-y-10">
            <h3 className="text-3xl">Dashboard</h3>
            <AgGridReact
                rowData={stats}
                columnDefs={colDefs}
                domLayout="autoHeight"
            />
            <div className="p-8 border rounded">
                <p className="">Storage</p>
                <div className="flex flex-wrap justify-around">
                    <StoragePieChart
                        chartTitle="Activities"
                        chartData={activityData}
                    />
                    <StoragePieChart chartTitle="Boats" chartData={boatData} />
                    <StoragePieChart
                        chartTitle="Instructors"
                        chartData={instructorData}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
