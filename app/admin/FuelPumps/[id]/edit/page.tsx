import FuelPumpEdit from "../../_components/editPage";

type PageProps = {
    params: { id: string };
};

function getMockFuelPump(id: string) {
    return {
        id,
        pumpName: "Pump Station A",
        location: "Main Entrance",
        status: "active" as const,
        totalNozzles: "4",
        fuelTypes: ["petrol", "diesel", "high-octane"],
        employeeIds: ["emp-001", "emp-002", "emp-003"],
        notes: "This pump is located at the main entrance and handles the majority of customer traffic. Regular maintenance scheduled every 2 weeks.",
    };
}

export default function Page({ params }: PageProps) {
    const data = getMockFuelPump(params.id);
    return <FuelPumpEdit data={data} />;
}
