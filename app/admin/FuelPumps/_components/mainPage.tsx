"use client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Fuel, CheckCircle, XCircle } from "lucide-react";

interface FuelPump {
    id: string;
    name: string;
    location: string;
    status: "Active" | "Inactive";
    totalNozzles: number;
}

const mockFuelPumps: FuelPump[] = [
    { id: "FP-001", name: "Pump Station A", location: "Main Entrance", status: "Active", totalNozzles: 4 },
    { id: "FP-002", name: "Pump Station B", location: "East Wing", status: "Active", totalNozzles: 6 },
    { id: "FP-003", name: "Pump Station C", location: "West Wing", status: "Inactive", totalNozzles: 4 },
    { id: "FP-004", name: "Pump Station D", location: "South Gate", status: "Active", totalNozzles: 8 },
    { id: "FP-005", name: "Pump Station E", location: "North Side", status: "Inactive", totalNozzles: 2 },
    { id: "FP-006", name: "Pump Station F", location: "Central Area", status: "Active", totalNozzles: 6 },
];

const FuelPumps = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredPumps = mockFuelPumps.filter((pump) => {
        const matchesSearch =
            pump.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pump.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || pump.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const totalPumps = mockFuelPumps.length;
    const activePumps = mockFuelPumps.filter((p) => p.status === "Active").length;
    const inactivePumps = mockFuelPumps.filter((p) => p.status === "Inactive").length;

    return (
        <div className="min-h-screen bg-[#f1f5f9]">
            <div className="p-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-white border rounded-xl shadow-sm">
                        <CardContent className="p-6 text-center">
                            <div className="flex justify-center mb-2">
                                <Fuel className="h-8 w-8 text-[#14b8a6]" />
                            </div>
                            <p className="text-sm text-[#64748b]">Total Fuel Pumps</p>
                            <p className="text-2xl font-bold text-[#020617]">{totalPumps}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border rounded-xl shadow-sm">
                        <CardContent className="p-6 text-center">
                            <div className="flex justify-center mb-2">
                                <CheckCircle className="h-8 w-8 text-[#22c55e]" />
                            </div>
                            <p className="text-sm text-[#64748b]">Active Pumps</p>
                            <p className="text-2xl font-bold text-[#020617]">{activePumps}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border rounded-xl shadow-sm">
                        <CardContent className="p-6 text-center">
                            <div className="flex justify-center mb-2">
                                <XCircle className="h-8 w-8 text-red-500" />
                            </div>
                            <p className="text-sm text-[#64748b]">Inactive Pumps</p>
                            <p className="text-2xl font-bold text-[#020617]">{inactivePumps}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search + Filters + Add Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
                            <Input
                                placeholder="Search fuel pump by name or ID"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-white border rounded-md"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-40 bg-white border rounded-md">
                                <SelectValue placeholder="Pump Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border rounded-md shadow-lg z-50">
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Link href="/admin/FuelPumps/add" className="w-full sm:w-auto">
                        <Button className="bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-md px-4 py-2 w-full sm:w-auto">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Fuel Pump
                        </Button>
                    </Link>
                </div>

                {/* Fuel Pump Table */}
                <Card className="bg-white border rounded-xl shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="text-[#64748b] font-medium">Pump ID</TableHead>
                                <TableHead className="text-[#64748b] font-medium">Pump Name</TableHead>
                                <TableHead className="text-[#64748b] font-medium">Location</TableHead>
                                <TableHead className="text-[#64748b] font-medium">Status</TableHead>
                                <TableHead className="text-[#64748b] font-medium">Total Nozzles</TableHead>
                                <TableHead className="text-[#64748b] font-medium text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPumps.map((pump) => (
                                <TableRow key={pump.id} className="hover:bg-gray-100">
                                    <TableCell className="font-medium text-[#020617]">{pump.id}</TableCell>
                                    <TableCell className="text-[#020617]">{pump.name}</TableCell>
                                    <TableCell className="text-[#64748b]">{pump.location}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                pump.status === "Active"
                                                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                    : "bg-red-100 text-red-600 hover:bg-red-100"
                                            }
                                        >
                                            {pump.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-[#020617]">{pump.totalNozzles}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/admin/FuelPumps/${pump.id}/view`}>
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
                            ))}
                            {filteredPumps.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-[#64748b]">
                                        No fuel pumps found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default FuelPumps;
