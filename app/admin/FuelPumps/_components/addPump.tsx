"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const fuelTypeOptions = [
    { id: "petrol", label: "Petrol" },
    { id: "diesel", label: "Diesel" },
    { id: "high-octane", label: "High-Octane" },
    { id: "engine-oil", label: "Engine Oil" },
];

const employeeOptions = [
    { id: "emp-001", name: "Ahmed Khan" },
    { id: "emp-002", name: "Ali Hassan" },
    { id: "emp-003", name: "Bilal Ahmed" },
    { id: "emp-004", name: "Usman Tariq" },
    { id: "emp-005", name: "Faisal Malik" },
];

const AddFuelPump = () => {
    const router = useRouter();
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        pumpName: "",
        location: "",
        status: "",
        totalNozzles: "",
        notes: "",
    });

    const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFuelTypeToggle = (fuelId: string) => {
        setSelectedFuelTypes((prev) =>
            prev.includes(fuelId)
                ? prev.filter((id) => id !== fuelId)
                : [...prev, fuelId]
        );
    };

    const handleEmployeeToggle = (empId: string) => {
        setSelectedEmployees((prev) =>
            prev.includes(empId)
                ? prev.filter((id) => id !== empId)
                : [...prev, empId]
        );
    };

    const handleSubmit = () => {
        if (!formData.pumpName || !formData.status || !formData.totalNozzles) {
            toast({
                title: "Validation Error",
                description: "Please fill all required fields.",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Fuel Pump Added",
            description: "The fuel pump has been added successfully.",
        });
        router.push("/admin/FuelPumps");
    };

    return (
        <div className="p-6 bg-[#f1f5f9] min-h-screen">
            {/* Back Button + Title */}
            <div className="flex items-center gap-3 mb-6">
                <Button
                    variant="outline"
                    onClick={() => router.push("/admin/FuelPumps")}
                    className="rounded-md"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
                <h1 className="text-xl font-semibold text-[#020617]">Add Fuel Pump</h1>
            </div>

            {/* Form Card */}
            <Card className="p-6 bg-white shadow-sm border rounded-xl space-y-6">
                {/* Section 1: Basic Information */}
                <div>
                    <h2 className="text-sm font-medium text-[#64748b] uppercase tracking-wide mb-4">
                        Basic Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="pumpName" className="text-[#020617]">
                                Pump Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="pumpName"
                                placeholder="Enter pump name"
                                value={formData.pumpName}
                                onChange={(e) => handleInputChange("pumpName", e.target.value)}
                                className="bg-white border rounded-md"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-[#020617]">
                                Location
                            </Label>
                            <Input
                                id="location"
                                placeholder="Enter location (optional)"
                                value={formData.location}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                                className="bg-white border rounded-md"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-[#020617]">
                                Status <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => handleInputChange("status", value)}
                            >
                                <SelectTrigger className="bg-white border rounded-md">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border rounded-md shadow-lg z-50">
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="totalNozzles" className="text-[#020617]">
                                Total Nozzles <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="totalNozzles"
                                type="number"
                                placeholder="Enter number of nozzles"
                                value={formData.totalNozzles}
                                onChange={(e) => handleInputChange("totalNozzles", e.target.value)}
                                className="bg-white border rounded-md"
                                min="1"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 2: Fuel Types */}
                <div>
                    <h2 className="text-sm font-medium text-[#64748b] uppercase tracking-wide mb-4">
                        Fuel Types Available
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {fuelTypeOptions.map((fuel) => (
                            <div key={fuel.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={fuel.id}
                                    checked={selectedFuelTypes.includes(fuel.id)}
                                    onCheckedChange={() => handleFuelTypeToggle(fuel.id)}
                                    className="border-[#64748b] data-[state=checked]:bg-[#14b8a6] data-[state=checked]:border-[#14b8a6]"
                                />
                                <Label
                                    htmlFor={fuel.id}
                                    className="text-sm text-[#020617] cursor-pointer"
                                >
                                    {fuel.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 3: Assigned Employees */}
                <div>
                    <h2 className="text-sm font-medium text-[#64748b] uppercase tracking-wide mb-4">
                        Assigned Employees (Optional)
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {employeeOptions.map((emp) => (
                            <div key={emp.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={emp.id}
                                    checked={selectedEmployees.includes(emp.id)}
                                    onCheckedChange={() => handleEmployeeToggle(emp.id)}
                                    className="border-[#64748b] data-[state=checked]:bg-[#14b8a6] data-[state=checked]:border-[#14b8a6]"
                                />
                                <Label
                                    htmlFor={emp.id}
                                    className="text-sm text-[#020617] cursor-pointer"
                                >
                                    {emp.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 4: Notes */}
                <div>
                    <h2 className="text-sm font-medium text-[#64748b] uppercase tracking-wide mb-4">
                        Notes
                    </h2>
                    <Textarea
                        placeholder="Add any additional notes..."
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        className="bg-white border rounded-md min-h-[100px]"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        variant="outline"
                        onClick={() => router.push("/admin/FuelPumps")}
                        className="rounded-md"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-md"
                    >
                        Add Fuel Pump
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default AddFuelPump;
