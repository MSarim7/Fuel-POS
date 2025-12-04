"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Receipt, TrendingUp, DollarSign } from "lucide-react";

interface Expense {
  id: string;
  name: string;
  type: string;
  amount: number;
  pump: string;
  date: string;
  notes: string;
}

// Mock expense data
const mockExpenses: Expense[] = [
  {
    id: "EXP-001",
    name: "Diesel Purchase",
    type: "Fuel Purchase",
    amount: 500000,
    pump: "Fuel Pump A",
    date: "2025-11-30",
    notes: "Bulk diesel purchase for inventory",
  },
  {
    id: "EXP-002",
    name: "Employee Salaries",
    type: "Salary Paid",
    amount: 150000,
    pump: "Fuel Pump A",
    date: "2025-11-29",
    notes: "Monthly salary payment",
  },
  {
    id: "EXP-003",
    name: "Pump Maintenance",
    type: "Maintenance",
    amount: 25000,
    pump: "Fuel Pump B",
    date: "2025-11-28",
    notes: "Regular maintenance and repairs",
  },
  {
    id: "EXP-004",
    name: "Electricity Bill",
    type: "Utility Bills",
    amount: 18000,
    pump: "Fuel Pump A",
    date: "2025-11-27",
    notes: "November electricity charges",
  },
  {
    id: "EXP-005",
    name: "Petrol Purchase",
    type: "Fuel Purchase",
    amount: 450000,
    pump: "Fuel Pump B",
    date: "2025-11-26",
    notes: "Bulk petrol purchase",
  },
  {
    id: "EXP-006",
    name: "Cash Withdrawal",
    type: "Cash Withdrawals",
    amount: 100000,
    pump: "Fuel Pump A",
    date: "2025-11-25",
    notes: "Cash for daily operations",
  },
  {
    id: "EXP-007",
    name: "Office Supplies",
    type: "Miscellaneous",
    amount: 8500,
    pump: "Fuel Pump B",
    date: "2025-11-24",
    notes: "Stationery and office items",
  },
  {
    id: "EXP-008",
    name: "Water Bill",
    type: "Utility Bills",
    amount: 3500,
    pump: "Fuel Pump A",
    date: "2025-11-23",
    notes: "November water charges",
  },
];

const Expenses = () => {
  // ...existing code...
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPump, setSelectedPump] = useState("all");

  // Filter expenses
  const filteredExpenses = useMemo(() => {
    return mockExpenses.filter((expense) => {
      const matchesSearch =
        searchQuery === "" ||
        expense.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "all" || expense.type === selectedType;
      const matchesPump = selectedPump === "all" || expense.pump === selectedPump;
      return matchesSearch && matchesType && matchesPump;
    });
  }, [searchQuery, selectedType, selectedPump]);

  // Calculate summary metrics
  const totalExpenses = mockExpenses.length;

  const today = new Date().toISOString().split("T")[0];
  const todayExpenses = mockExpenses.filter((exp) => exp.date === today).length;

  const totalAmountSpent = mockExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="p-6 bg-[#f1f5f9] min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="bg-white border shadow-sm rounded-xl">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-2">
              <Receipt className="h-6 w-6 text-[#14b8a6]" />
            </div>
            <p className="text-sm text-[#64748b]">Total Expenses</p>
            <p className="text-2xl font-bold text-[#020617]">{totalExpenses}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border shadow-sm rounded-xl">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-[#06b6d4]" />
            </div>
            <p className="text-sm text-[#64748b]">Today's Expenses</p>
            <p className="text-2xl font-bold text-[#020617]">{todayExpenses}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border shadow-sm rounded-xl">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-2">
              <DollarSign className="h-6 w-6 text-[#22c55e]" />
            </div>
            <p className="text-sm text-[#64748b]">Total Amount Spent</p>
            <p className="text-2xl font-bold text-[#020617]">
              Rs. {totalAmountSpent.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search + Filters + Add Button */}
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#64748b]" />
            <Input
              placeholder="Search expense by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-md"
            />
          </div>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px] rounded-md">
              <SelectValue placeholder="Expense Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Fuel Purchase">Fuel Purchase</SelectItem>
              <SelectItem value="Salary Paid">Salary Paid</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
              <SelectItem value="Utility Bills">Utility Bills</SelectItem>
              <SelectItem value="Cash Withdrawals">Cash Withdrawals</SelectItem>
              <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPump} onValueChange={setSelectedPump}>
            <SelectTrigger className="w-[160px] rounded-md">
              <SelectValue placeholder="Pump / Shop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pumps</SelectItem>
              <SelectItem value="Fuel Pump A">Fuel Pump A</SelectItem>
              <SelectItem value="Fuel Pump B">Fuel Pump B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Link href="/admin/expenses/add" className="w-full sm:w-auto">
          <Button className="bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-md px-4 py-2 w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </Link>
      </div>

      {/* Expense Table */}
      <Card className="overflow-hidden bg-white shadow-sm border rounded-xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b">
                <TableHead className="text-xs text-[#64748b]">Expense ID</TableHead>
                <TableHead className="text-xs text-[#64748b]">Name / Title</TableHead>
                <TableHead className="text-xs text-[#64748b]">Type</TableHead>
                <TableHead className="text-xs text-[#64748b]">Pump / Shop</TableHead>
                <TableHead className="text-xs text-[#64748b]">Amount (Rs.)</TableHead>
                <TableHead className="text-xs text-[#64748b]">Date</TableHead>
                <TableHead className="text-xs text-[#64748b]">Notes</TableHead>
                <TableHead className="text-xs text-[#64748b]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 text-[#64748b]"
                  >
                    No expenses found
                  </TableCell>
                </TableRow>
              ) : (
                filteredExpenses.map((expense) => (
                  <TableRow
                    key={expense.id}
                    className="hover:bg-gray-50 border-b"
                  >
                    <TableCell className="text-sm font-medium text-[#020617]">
                      {expense.id}
                    </TableCell>
                    <TableCell className="text-sm text-[#020617]">
                      {expense.name}
                    </TableCell>
                    <TableCell className="text-sm text-[#020617]">
                      {expense.type}
                    </TableCell>
                    <TableCell className="text-sm text-[#020617]">
                      {expense.pump}
                    </TableCell>
                    <TableCell className="text-sm font-semibold text-[#020617]">
                      {expense.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-[#64748b]">
                      {new Date(expense.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-sm text-[#64748b] max-w-[200px] truncate">
                      {expense.notes}
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/expenses/${expense.id}/view`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-md"
                        >
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Expenses;
