"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// ...existing code...
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


interface Employer {
  id: string;
  name: string;
  email: string;
  phone: string;
  salary: number;
  fuelPump: string;
  status: "Active" | "Inactive";
}

const mockEmployers: Employer[] = [
  {
    id: "EMP-001",
    name: "Ali Khan",
    email: "ali@example.com",
    phone: "+92 300 1234567",
    salary: 30000,
    fuelPump: "Fuel Pump A",
    status: "Active",
  },
  {
    id: "EMP-004",
    name: "Saad Ahmed",
    email: "saad@example.com",
    phone: "+92 301 9876543",
    salary: 25000,
    fuelPump: "Fuel Pump B",
    status: "Inactive",
  },
  {
    id: "EMP-010",
    name: "Sohail",
    email: "sohail@example.com",
    phone: "+92 333 5551234",
    salary: 28500,
    fuelPump: "Fuel Pump A",
    status: "Active",
  },
  {
    id: "EMP-007",
    name: "Hassan Raza",
    email: "hassan@example.com",
    phone: "+92 321 4567890",
    salary: 32000,
    fuelPump: "Fuel Pump B",
    status: "Active",
  },
  {
    id: "EMP-012",
    name: "Bilal Mahmood",
    email: "bilal@example.com",
    phone: "+92 345 7891234",
    salary: 27000,
    fuelPump: "Fuel Pump A",
    status: "Inactive",
  },
];

const Employers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [pumpFilter, setPumpFilter] = useState("All");

  const totalEmployers = mockEmployers.length;
  const activeEmployers = mockEmployers.filter((e) => e.status === "Active").length;
  const inactiveEmployers = mockEmployers.filter((e) => e.status === "Inactive").length;

  const filteredEmployers = mockEmployers.filter((employer) => {
    const matchesSearch =
      employer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employer.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || employer.status === statusFilter;
    const matchesPump = pumpFilter === "All" || employer.fuelPump === pumpFilter;

    return matchesSearch && matchesStatus && matchesPump;
  });

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      <div className="container mx-auto p-6">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="rounded-xl border shadow-sm bg-white">
            <CardHeader className="pb-2 text-center">
              <CardTitle className="text-sm font-medium text-[#64748b]">
                Total Employers
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-[#020617]">{totalEmployers}</p>
              <p className="text-xs text-[#64748b] mt-1">All registered employees</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border shadow-sm bg-white">
            <CardHeader className="pb-2 text-center">
              <CardTitle className="text-sm font-medium text-[#64748b]">
                Active Employers
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-[#14b8a6]">{activeEmployers}</p>
              <p className="text-xs text-[#64748b] mt-1">Currently working</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border shadow-sm bg-white">
            <CardHeader className="pb-2 text-center">
              <CardTitle className="text-sm font-medium text-[#64748b]">
                Inactive Employers
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-red-600">{inactiveEmployers}</p>
              <p className="text-xs text-[#64748b] mt-1">Not currently working</p>
            </CardContent>
          </Card>
        </div>

        {/* Search, Filters, and Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#64748b]" />
              <Input
                placeholder="Search employer by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-md"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px] rounded-md">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={pumpFilter} onValueChange={setPumpFilter}>
              <SelectTrigger className="w-full sm:w-[150px] rounded-md">
                <SelectValue placeholder="Fuel Pump" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Pumps</SelectItem>
                <SelectItem value="Fuel Pump A">Fuel Pump A</SelectItem>
                <SelectItem value="Fuel Pump B">Fuel Pump B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Link href="/admin/employers/add" className="w-full sm:w-auto">
            <Button className="bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-md px-4 py-2 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Employer
            </Button>
          </Link>
        </div>

        {/* Employer Table */}
        <Card className="rounded-xl border shadow-sm bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-xs text-[#64748b] font-semibold">Employer ID</TableHead>
                  <TableHead className="text-xs text-[#64748b] font-semibold">Name</TableHead>
                  <TableHead className="text-xs text-[#64748b] font-semibold">Email</TableHead>
                  <TableHead className="text-xs text-[#64748b] font-semibold">Phone Number</TableHead>
                  <TableHead className="text-xs text-[#64748b] font-semibold">Salary (Rs.)</TableHead>
                  <TableHead className="text-xs text-[#64748b] font-semibold">Fuel Pump</TableHead>
                  <TableHead className="text-xs text-[#64748b] font-semibold">Status</TableHead>
                  <TableHead className="text-xs text-[#64748b] font-semibold text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployers.length > 0 ? (
                  filteredEmployers.map((employer) => (
                    <TableRow key={employer.id} className="hover:bg-gray-100">
                      <TableCell className="text-sm text-[#020617] font-medium">{employer.id}</TableCell>
                      <TableCell className="text-sm text-[#020617]">{employer.name}</TableCell>
                      <TableCell className="text-sm text-[#64748b]">{employer.email}</TableCell>
                      <TableCell className="text-sm text-[#64748b]">{employer.phone}</TableCell>
                      <TableCell className="text-sm text-[#020617] font-medium">
                        {employer.salary.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm text-[#64748b]">{employer.fuelPump}</TableCell>
                      <TableCell>
                        <Badge
                          variant={employer.status === "Active" ? "default" : "secondary"}
                          className={
                            employer.status === "Active"
                              ? "bg-[#14b8a6]/10 text-[#14b8a6] hover:bg-[#14b8a6]/10"
                              : "bg-red-100 text-red-600 hover:bg-red-100"
                          }
                        >
                          {employer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/employers/${employer.id}/view`}>
                          <Button variant="outline" size="sm" className="rounded-md">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-[#64748b] py-8">
                      No employers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Employers;
