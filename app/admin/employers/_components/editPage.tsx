"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type EmployerData = {
  employerId: string;
  fullName: string;
  email: string;
  mobile: string;
  address: string;
  fuelPump: string;
  status: "active" | "inactive";
  salary: string;
  advanceSalary?: string;
  joiningDate: string;
  notes?: string;
};

const EmployerEdit = ({ data }: { data: EmployerData }) => {
  const router = useRouter();

  const [formData, setFormData] = useState<EmployerData>({ ...data });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = () => {
    // Validation
    if (!formData.fullName || !formData.email || !formData.mobile) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Mock update logic
    toast.success("Employer updated successfully!");
    router.push("/admin/employers");
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Top Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin/employers")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-xl font-semibold text-[#020617]">Edit Employer</h1>
        </div>
        <Button
          onClick={handleUpdate}
          className="bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-md px-4 py-2"
        >
          Update Employer
        </Button>
      </div>

      {/* Form Card */}
      <Card className="p-6 border shadow-sm bg-white rounded-xl space-y-6">
        {/* Section: Personal Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#020617] border-b pb-2">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-[#020617]">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter full name"
                className="rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-[#020617]">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email"
                className="rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-sm font-medium text-[#020617]">
                Mobile Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="mobile"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                placeholder="Enter mobile number"
                className="rounded-md"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address" className="text-sm font-medium text-[#020617]">
                Address
              </Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter address"
                className="rounded-md"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Section: Employment Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#020617] border-b pb-2">
            Employment Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employerId" className="text-sm font-medium text-[#020617]">
                Employer ID
              </Label>
              <Input
                id="employerId"
                value={formData.employerId}
                disabled
                className="rounded-md bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium text-[#020617]">
                Status <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger className="rounded-md">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuelPump" className="text-sm font-medium text-[#020617]">
                Fuel Pump <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.fuelPump}
                onValueChange={(value) => handleInputChange("fuelPump", value)}
              >
                <SelectTrigger className="rounded-md">
                  <SelectValue placeholder="Select fuel pump" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fuel Pump A">Fuel Pump A</SelectItem>
                  <SelectItem value="Fuel Pump B">Fuel Pump B</SelectItem>
                  <SelectItem value="Fuel Pump C">Fuel Pump C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary" className="text-sm font-medium text-[#020617]">
                Monthly Salary (PKR) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="salary"
                type="number"
                value={formData.salary}
                onChange={(e) => handleInputChange("salary", e.target.value)}
                placeholder="Enter monthly salary"
                className="rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="advanceSalary" className="text-sm font-medium text-[#020617]">
                Advance Salary (PKR)
              </Label>
              <Input
                id="advanceSalary"
                type="number"
                value={formData.advanceSalary}
                onChange={(e) => handleInputChange("advanceSalary", e.target.value)}
                placeholder="Enter advance salary"
                className="rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="joiningDate" className="text-sm font-medium text-[#020617]">
                Joining Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="joiningDate"
                type="date"
                value={formData.joiningDate}
                onChange={(e) => handleInputChange("joiningDate", e.target.value)}
                className="rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Section: Notes */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#020617] border-b pb-2">Notes</h2>
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium text-[#020617]">
              Additional Notes
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Enter any additional notes"
              className="rounded-md"
              rows={4}
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/employers")}
            className="rounded-md"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            className="bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-md"
          >
            Update Employer
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EmployerEdit;
