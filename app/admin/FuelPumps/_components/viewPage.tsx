"use client";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit } from "lucide-react";

type FuelPumpData = {
    id: string;
    name: string;
    location: string;
    status: "Active" | "Inactive";
    totalNozzles: number;
    fuelTypes: string[];
    assignedEmployees: string[];
    notes: string;
};

const FuelPumpView = ({ data }: { data: FuelPumpData }) => {
    const router = useRouter();

    return (
        <div className="p-6 bg-[#f1f5f9] min-h-screen">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={() => router.push("/admin/FuelPumps")}
                        className="rounded-md"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-xl font-semibold text-[#020617]">Fuel Pump Details</h1>
                </div>
                <Button
                    onClick={() => router.push(`/admin/FuelPumps/${data.id}/edit`)}
                    className="bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-md"
                >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                </Button>
            </div>

            {/* Details Card */}
            <Card className="p-6 bg-white rounded-xl border shadow-sm space-y-6">
                {/* Section 1: Basic Information */}
                <div>
                    <h2 className="text-sm font-medium text-[#64748b] uppercase tracking-wide mb-4 border-b pb-2">
                        Basic Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <p className="text-xs uppercase text-[#64748b] mb-1">Pump ID</p>
                            <p className="text-base font-semibold text-[#020617]">{data.id}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-[#64748b] mb-1">Pump Name</p>
                            <p className="text-base font-semibold text-[#020617]">{data.name}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-[#64748b] mb-1">Location</p>
                            <p className="text-base font-semibold text-[#020617]">{data.location}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-[#64748b] mb-1">Status</p>
                            <Badge
                                className={
                                    data.status === "Active"
                                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                                        : "bg-red-100 text-red-600 hover:bg-red-100"
                                }
                            >
                                {data.status}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Section 2: Operational Data */}
                <div>
                    <h2 className="text-sm font-medium text-[#64748b] uppercase tracking-wide mb-4 border-b pb-2">
                        Operational Data
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <p className="text-xs uppercase text-[#64748b] mb-1">Total Nozzles</p>
                            <p className="text-base font-semibold text-[#020617]">{data.totalNozzles}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-[#64748b] mb-2">Fuel Types Available</p>
                            <div className="flex flex-wrap gap-2">
                                {data.fuelTypes.map((fuel) => (
                                    <Badge
                                        key={fuel}
                                        className="bg-[#14b8a6]/10 text-[#14b8a6] hover:bg-[#14b8a6]/10"
                                    >
                                        {fuel}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-[#64748b] mb-2">Assigned Employees</p>
                            <div className="flex flex-wrap gap-2">
                                {data.assignedEmployees.map((emp) => (
                                    <Badge
                                        key={emp}
                                        variant="outline"
                                        className="border-[#64748b]/30 text-[#020617]"
                                    >
                                        {emp}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3: Notes */}
                <div>
                    <h2 className="text-sm font-medium text-[#64748b] uppercase tracking-wide mb-4 border-b pb-2">
                        Notes
                    </h2>
                    <p className="text-base text-[#020617]">
                        {data.notes || "—"}
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default FuelPumpView;
