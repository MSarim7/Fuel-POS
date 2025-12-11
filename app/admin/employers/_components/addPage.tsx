"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddEmployer = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    mobile: "",
    address: "",
    status: "",
    fuelPump: "",
    monthlySalary: "",
    advanceSalary: "",
    joiningDate: "",
    notes: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.mobile) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Employer added successfully!",
    });
    router.push("/admin/employers");
  };

  return (
    <div className="p-6 bg-[#f1f5f9] min-h-screen">
      {/* Top Bar - Back Button + Title */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/employers")}
          className="rounded-md"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-xl font-semibold text-[#020617]">Add Employer</h1>
      </div>

      {/* Employer Form Card */}
      <Card className="p-6 border shadow-sm bg-white rounded-xl space-y-6">
        <form onSubmit={handleSubmit}>
          {/* Section 1: Personal Information */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-[#020617] border-b pb-2">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="rounded-md"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className="rounded-md"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  className="rounded-md"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  className="rounded-md"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter mobile number"
                  className="rounded-md"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter full address"
                  className="rounded-md min-h-[80px]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Employment Details */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-[#020617] border-b pb-2">
              Employment Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger className="rounded-md">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fuelPump">Fuel Pump *</Label>
                <Select
                  value={formData.fuelPump}
                  onValueChange={(value) => handleSelectChange("fuelPump", value)}
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

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="monthlySalary">Monthly Salary (Rs.) *</Label>
                <Input
                  id="monthlySalary"
                  name="monthlySalary"
                  type="number"
                  value={formData.monthlySalary}
                  onChange={handleInputChange}
                  placeholder="Enter monthly salary"
                  className="rounded-md"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="advanceSalary">Advance Salary (Rs.)</Label>
                <Input
                  id="advanceSalary"
                  name="advanceSalary"
                  type="number"
                  value={formData.advanceSalary}
                  onChange={handleInputChange}
                  placeholder="Enter advance amount (optional)"
                  className="rounded-md"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="joiningDate">Joining Date *</Label>
                <Input
                  id="joiningDate"
                  name="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                  className="rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 3: Notes */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-[#020617] border-b pb-2">
              Notes
            </h2>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Add any additional notes or comments (optional)"
                className="rounded-md min-h-[100px]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/employers")}
              className="rounded-md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-md px-4 py-2"
            >
              Add Employer
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddEmployer;
