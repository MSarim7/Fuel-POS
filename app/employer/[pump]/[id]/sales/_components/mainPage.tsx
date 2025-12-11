"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Search, DollarSign, Clock, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Sale {
    id: string;
    products: string;
    amount: number;
    paymentMethod: string;
    status: "Pending" | "Approved" | "Rejected";
    createdAt: string;
}

const mockSales: Sale[] = [
    {
        id: "SALE-1718123456789",
        products: "Regular Petrol (15L), Premium Diesel (10L), Mobil 1 5W-30 (2L)",
        amount: 12550,
        paymentMethod: "Cash",
        status: "Approved",
        createdAt: "Dec 10, 2024 — 02:45 PM",
    },
    {
        id: "SALE-1718123456790",
        products: "Diesel (20L)",
        amount: 6400,
        paymentMethod: "Card",
        status: "Pending",
        createdAt: "Dec 10, 2024 — 03:15 PM",
    },
    {
        id: "SALE-1718123456791",
        products: "High-Octane Petrol (25L)",
        amount: 8750,
        paymentMethod: "Cash",
        status: "Rejected",
        createdAt: "Dec 09, 2024 — 11:30 AM",
    },
];

const getStatusBadge = (status: "Pending" | "Approved" | "Rejected") => {
    const styles = {
        Pending: "bg-yellow-100 text-yellow-700",
        Approved: "bg-green-100 text-[#22c55e]",
        Rejected: "bg-red-100 text-[#dc2626]",
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
            {status}
        </span>
    );
};

export default function EmployerSalesList() {
    const router = useRouter();
    const params = useParams();
    const pumpId = params?.pump as string;
    const employerId = params?.id as string;

    const [sales] = useState<Sale[]>(mockSales);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredSales = sales.filter((sale) => {
        const matchesSearch =
            sale.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sale.products.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || sale.status.toLowerCase() === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalSales = sales.length;
    const approvedSales = sales.filter((s) => s.status === "Approved").length;
    const pendingSales = sales.filter((s) => s.status === "Pending").length;

    return (
        <div className="min-h-screen bg-[#f1f5f9]">
            <div className="p-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-white rounded-xl border shadow-sm">
                        <div className="p-6 text-center">
                            <div className="flex justify-center mb-2">
                                <DollarSign className="h-6 w-6 text-[#14b8a6]" />
                            </div>
                            <p className="text-sm text-[#64748b]">Total Sales</p>
                            <p className="text-2xl font-bold text-[#020617]">{totalSales}</p>
                        </div>
                    </Card>
                    <Card className="bg-white rounded-xl border shadow-sm">
                        <div className="p-6 text-center">
                            <div className="flex justify-center mb-2">
                                <CheckCircle className="h-6 w-6 text-[#22c55e]" />
                            </div>
                            <p className="text-sm text-[#64748b]">Approved Sales</p>
                            <p className="text-2xl font-bold text-[#020617]">{approvedSales}</p>
                        </div>
                    </Card>
                    <Card className="bg-white rounded-xl border shadow-sm">
                        <div className="p-6 text-center">
                            <div className="flex justify-center mb-2">
                                <Clock className="h-6 w-6 text-yellow-500" />
                            </div>
                            <p className="text-sm text-[#64748b]">Pending Sales</p>
                            <p className="text-2xl font-bold text-[#020617]">{pendingSales}</p>
                        </div>
                    </Card>
                </div>

                {/* Search + Filters */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#64748b]" />
                            <Input
                                placeholder="Search by Sale ID or Products"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-full sm:w-64 rounded-md"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-36 rounded-md">
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
                                <TableHead className="font-semibold text-[#020617]">Amount (₨)</TableHead>
                                <TableHead className="font-semibold text-[#020617]">Payment</TableHead>
                                <TableHead className="font-semibold text-[#020617]">Status</TableHead>
                                <TableHead className="font-semibold text-[#020617]">Sale Date & Time</TableHead>
                                <TableHead className="font-semibold text-[#020617] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSales.map((sale) => (
                                <TableRow key={sale.id} className="hover:bg-gray-100">
                                    <TableCell className="font-medium text-[#020617]">{sale.id}</TableCell>
                                    <TableCell className="text-[#020617] max-w-[250px] truncate">
                                        {sale.products}
                                    </TableCell>
                                    <TableCell className="text-[#020617] font-medium">
                                        ₨ {sale.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-[#020617]">{sale.paymentMethod}</TableCell>
                                    <TableCell>{getStatusBadge(sale.status)}</TableCell>
                                    <TableCell className="text-[#64748b] text-sm">{sale.createdAt}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => router.push(`/employer/${pumpId}/${employerId}/sales/${sale.id}/view`)}
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
}