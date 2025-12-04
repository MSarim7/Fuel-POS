"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ExpenseData = {
  id: string;
  name: string;
  type: string;
  amount: number;
  pump: string;
  date: string;
  paymentMethod: string;
  createdBy?: string;
  notes?: string;
};

const ExpenseView = ({ data }: { data: ExpenseData }) => {
  const router = useRouter();
  const expense = data;

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin/expenses")}
            className="gap-2 rounded-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-xl font-semibold text-[#020617]">Expense Details</h1>
        </div>
        <Button
          onClick={() => router.push(`/admin/expenses/${expense.id}/edit`)}
          className="bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-md px-4 py-2"
        >
          Edit
        </Button>
      </div>

      {/* Details Card */}
      <Card className="p-6 bg-white border shadow-sm rounded-xl space-y-6">
        {/* Section: Basic Expense Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#020617] border-b pb-2">
            Basic Expense Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase text-[#64748b] tracking-wide">
                Expense ID
              </span>
              <span className="text-base text-[#020617] font-medium">
                {expense.id}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase text-[#64748b] tracking-wide">
                Expense Name / Title
              </span>
              <span className="text-base text-[#020617] font-medium">
                {expense.name}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase text-[#64748b] tracking-wide">
                Expense Type
              </span>
              <span className="text-base text-[#020617] font-medium">
                {expense.type}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase text-[#64748b] tracking-wide">
                Amount (₨)
              </span>
              <span className="text-base text-[#020617] font-medium">
                {expense.amount.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase text-[#64748b] tracking-wide">
                Date
              </span>
              <span className="text-base text-[#020617] font-medium">
                {new Date(expense.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Section: Shop / Payment Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#020617] border-b pb-2">
            Shop / Payment Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase text-[#64748b] tracking-wide">
                Pump / Fuel Station Name
              </span>
              <span className="text-base text-[#020617] font-medium">
                {expense.pump}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase text-[#64748b] tracking-wide">
                Payment Method
              </span>
              <span className="text-base text-[#020617] font-medium">
                {expense.paymentMethod}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase text-[#64748b] tracking-wide">
                Created By
              </span>
              <span className="text-base text-[#020617] font-medium">
                {expense.createdBy || "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Section: Notes */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#020617] border-b pb-2">Notes</h2>
          <div className="flex flex-col space-y-1">
            <span className="text-xs uppercase text-[#64748b] tracking-wide">
              Additional Notes
            </span>
            <span className="text-base text-[#64748b]">
              {expense.notes || "—"}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExpenseView;
