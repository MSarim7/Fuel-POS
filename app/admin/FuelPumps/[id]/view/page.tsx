import FuelPumpView from "../../_components/viewPage";

type PageProps = {
    params: { id: string };
};

function getMockFuelPump(id: string) {
    return {
        id,
        name: "Pump Station A",
        location: "Main Entrance",
        status: "Active" as const,
        totalNozzles: 4,
        fuelTypes: ["Petrol", "Diesel", "High-Octane"],
        assignedEmployees: ["Ahmed Khan", "Ali Hassan", "Bilal Ahmed"],
        notes: "This pump is located at the main entrance and handles the majority of customer traffic. Regular maintenance scheduled every 2 weeks.",
    };
}

export default function Page({ params }: PageProps) {
    const data = getMockFuelPump(params.id);
    return <FuelPumpView data={data} />;
}
