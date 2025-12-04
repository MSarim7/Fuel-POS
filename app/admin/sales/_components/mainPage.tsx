"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Search, Eye, Check, X, DollarSign, Clock, CheckCircle } from "lucide-react";
interface Sale {
    id: string;
    products: string;
    pump: string;
    employer: string;
    amount: number;
    paymentMethod: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
}

const mockSales: Sale[] = [
    {
        id: "SL001",
        products: "Petrol (10L), Engine Oil",
        pump: "Fuel Pump A",
        employer: "Ali Hassan",
        amount: 3500,
        paymentMethod: "Cash",
        status: "pending",
        createdAt: "2024-01-15 09:30 AM",
    },
    {
        id: "SL002",
        products: "Diesel (25L)",
        pump: "Fuel Pump B",
        employer: "Ahmed Khan",
        amount: 5800,
        paymentMethod: "Card",
        status: "approved",
        createdAt: "2024-01-15 10:15 AM",
    },
    {
        id: "SL003",
        products: "High-Octane (15L)",
        pump: "Fuel Pump A",
        employer: "Sara Ahmed",
        amount: 4200,
        paymentMethod: "Cash",
        status: "rejected",
        createdAt: "2024-01-14 03:45 PM",
    },
    {
        id: "SL004",
        products: "Petrol (20L), Diesel (10L)",
        pump: "Fuel Pump C",
        employer: "Ali Hassan",
        amount: 7500,
        paymentMethod: "Mobile Payment",
        status: "pending",
        createdAt: "2024-01-14 11:20 AM",
    },
    {
        id: "SL005",
        products: "Engine Oil (2L)",
        pump: "Fuel Pump B",
        employer: "Fatima Noor",
        amount: 1800,
        paymentMethod: "Cash",
        status: "approved",
        createdAt: "2024-01-13 02:00 PM",
    },
];

const Sales = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [pumpFilter, setPumpFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredSales = mockSales.filter((sale) => {
        const matchesSearch =
            sale.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sale.employer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPump = pumpFilter === "all" || sale.pump === pumpFilter;
        const matchesStatus = statusFilter === "all" || sale.status === statusFilter;
        return matchesSearch && matchesPump && matchesStatus;
    });

    const totalSales = mockSales.length;
    const approvedSales = mockSales.filter((s) => s.status === "approved").length;
    const pendingSales = mockSales.filter((s) => s.status === "pending").length;

    const getStatusBadge = (status: Sale["status"]) => {
        switch (status) {
            case "pending":
                return (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                        Pending
                    </span>
                );
            case "approved":
                return (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        Approved
                    </span>
                );
            case "rejected":
                return (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
                        Rejected
                    </span>
                );
        }
    };

    const handleApprove = (id: string) => {
        console.log("Approve sale:", id);
    };

    const handleReject = (id: string) => {
        console.log("Reject sale:", id);
    };

    return (
        <div className="min-h-screen bg-[#f1f5f9]">
            <div className="p-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-white rounded-xl border shadow-sm">
                        <CardContent className="p-6 text-center">
                            <div className="flex justify-center mb-2">
                                <DollarSign className="h-8 w-8 text-[#14b8a6]" />
                            </div>
                            <p className="text-sm text-[#64748b]">Total Sales</p>
                            <p className="text-2xl font-bold text-[#020617]">{totalSales}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white rounded-xl border shadow-sm">
                        <CardContent className="p-6 text-center">
                            <div className="flex justify-center mb-2">
                                <CheckCircle className="h-8 w-8 text-[#22c55e]" />
                            </div>
                            <p className="text-sm text-[#64748b]">Approved Sales</p>
                            <p className="text-2xl font-bold text-[#020617]">{approvedSales}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white rounded-xl border shadow-sm">
                        <CardContent className="p-6 text-center">
                            <div className="flex justify-center mb-2">
                                <Clock className="h-8 w-8 text-yellow-500" />
                            </div>
                            <p className="text-sm text-[#64748b]">Pending Sales</p>
                            <p className="text-2xl font-bold text-[#020617]">{pendingSales}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search + Filters */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#64748b]" />
                            <Input
                                placeholder="Search by Sale ID or Employer"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-full sm:w-64 bg-white"
                            />
                        </div>
                        <Select value={pumpFilter} onValueChange={setPumpFilter}>
                            <SelectTrigger className="w-full sm:w-44 bg-white">
                                <SelectValue placeholder="All Pumps" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="all">All Pumps</SelectItem>
                                <SelectItem value="Fuel Pump A">Fuel Pump A</SelectItem>
                                <SelectItem value="Fuel Pump B">Fuel Pump B</SelectItem>
                                <SelectItem value="Fuel Pump C">Fuel Pump C</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-36 bg-white">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Sales Table */}
                <Card className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="font-semibold text-[#020617]">Sale ID</TableHead>
                                <TableHead className="font-semibold text-[#020617]">Products</TableHead>
                                <TableHead className="font-semibold text-[#020617]">Pump</TableHead>
                                <TableHead className="font-semibold text-[#020617]">Employer</TableHead>
                                <TableHead className="font-semibold text-[#020617]">Amount (₨)</TableHead>
                                <TableHead className="font-semibold text-[#020617]">Payment</TableHead>
                                <TableHead className="font-semibold text-[#020617]">Status</TableHead>
                                <TableHead className="font-semibold text-[#020617]">Created At</TableHead>
                                <TableHead className="font-semibold text-[#020617] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSales.map((sale) => (
                                <TableRow key={sale.id} className="hover:bg-gray-100">
                                    <TableCell className="font-medium text-[#020617]">{sale.id}</TableCell>
                                    <TableCell className="text-[#020617] max-w-[200px] truncate">
                                        {sale.products}
                                    </TableCell>
                                    <TableCell className="text-[#020617]">{sale.pump}</TableCell>
                                    <TableCell className="text-[#020617]">{sale.employer}</TableCell>
                                    <TableCell className="text-[#020617] font-medium">
                                        ₨ {sale.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-[#020617]">{sale.paymentMethod}</TableCell>
                                    <TableCell>{getStatusBadge(sale.status)}</TableCell>
                                    <TableCell className="text-[#64748b] text-sm">{sale.createdAt}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-end gap-2">
                                            {sale.status === "pending" && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleApprove(sale.id)}
                                                        className="bg-[#22c55e] hover:bg-green-600 text-white h-8 px-3"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleReject(sale.id)}
                                                        className="bg-[#dc2626] hover:bg-red-700 text-white h-8 px-3"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => router.push(`/admin/sales/${sale.id}\view`)}
                                                className="h-8 px-3"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default Sales;
