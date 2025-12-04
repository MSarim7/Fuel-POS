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

const AddExpense = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    expenseTitle: "",
    expenseType: "",
    amount: "",
    date: "",
    pump: "",
    paymentMethod: "",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddExpense = () => {
    // Validation
    if (
      !formData.expenseTitle ||
      !formData.expenseType ||
      !formData.amount ||
      !formData.date ||
      !formData.pump ||
      !formData.paymentMethod
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Mock add logic
    toast.success("Expense added successfully!");
    router.push("/admin/expenses");
  };

  return (
    <div className="p-6 bg-[#f1f5f9] min-h-screen">
      {/* Top Bar */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/admin/expenses")}
          className="gap-2 rounded-md"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-xl font-semibold text-[#020617]">Add Expense</h1>
      </div>

      {/* Form Card */}
      <Card className="p-6 bg-white border shadow-sm rounded-xl space-y-6">
        {/* Section: Expense Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#020617] border-b pb-2">
            Expense Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="expenseTitle"
                className="text-sm font-medium text-[#020617]"
              >
                Expense Title / Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="expenseTitle"
                value={formData.expenseTitle}
                onChange={(e) => handleInputChange("expenseTitle", e.target.value)}
                placeholder="Enter expense title"
                className="rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="expenseType"
                className="text-sm font-medium text-[#020617]"
              >
                Expense Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.expenseType}
                onValueChange={(value) => handleInputChange("expenseType", value)}
              >
                <SelectTrigger className="rounded-md">
                  <SelectValue placeholder="Select expense type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fuel Purchase">Fuel Purchase</SelectItem>
                  <SelectItem value="Salary Paid">Salary Paid</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Utility Bills">Utility Bills</SelectItem>
                  <SelectItem value="Cash Withdrawal">Cash Withdrawal</SelectItem>
                  <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium text-[#020617]">
                Amount (Rs.) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                placeholder="Enter amount"
                className="rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-[#020617]">
                Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Section: Pump / Shop Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#020617] border-b pb-2">
            Pump / Shop Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pump" className="text-sm font-medium text-[#020617]">
                Pump / Fuel Station <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.pump}
                onValueChange={(value) => handleInputChange("pump", value)}
              >
                <SelectTrigger className="rounded-md">
                  <SelectValue placeholder="Select pump" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fuel Pump A">Fuel Pump A</SelectItem>
                  <SelectItem value="Fuel Pump B">Fuel Pump B</SelectItem>
                  <SelectItem value="Fuel Pump C">Fuel Pump C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="paymentMethod"
                className="text-sm font-medium text-[#020617]"
              >
                Payment Method <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => handleInputChange("paymentMethod", value)}
              >
                <SelectTrigger className="rounded-md">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Credit">Credit</SelectItem>
                  <SelectItem value="Internal Adjustment">
                    Internal Adjustment
                  </SelectItem>
                </SelectContent>
              </Select>
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

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/expenses")}
            className="rounded-md"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddExpense}
            className="bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-md px-4 py-2"
          >
            Add Expense
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AddExpense;
