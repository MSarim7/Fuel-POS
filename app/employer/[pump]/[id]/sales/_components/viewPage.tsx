"use client";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";

// Mock sale data
const mockSale = {
    id: "SALE-1718123456789",
    pumpName: "Fuel Pump A",
    employerName: "Ali Khan",
    paymentMethod: "Cash",
    status: "Approved" as "Pending" | "Approved" | "Rejected",
    createdAt: "Dec 10, 2024 — 02:45 PM",
    items: [
        { id: "1", name: "Regular Petrol", category: "Petrol", quantity: 15, rate: 290, total: 4350 },
        { id: "2", name: "Premium Diesel", category: "Diesel", quantity: 10, rate: 320, total: 3200 },
        { id: "3", name: "Mobil 1 5W-30", category: "Engine Oil", quantity: 2, rate: 2500, total: 5000 },
    ],
    subtotal: 12550,
    tax: 0,
    grandTotal: 12550,
    paidAmount: 12550,
    notes: "",
    logs: [
        {
            date: "Dec 10, 2024 — 02:45 PM",
            amount: 10000,
            action: "Initial Sale",
            performedBy: "Employer: Ali Khan"
        },
        {
            date: "Dec 10, 2024 — 05:30 PM",
            amount: 2550,
            action: "Payment Added",
            performedBy: "Admin: Manager"
        }
    ]
};

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

export default function EmployerSaleView() {
    const router = useRouter();
    const params = useParams();
    const pumpId = params?.pump as string;
    const employerId = params?.id as string;
    // const saleId = params?.saleId as string;

    // In real app, fetch sale by saleId
    const sale = mockSale;

    return (
        <div className="min-h-screen bg-[#f1f5f9]">
            <main className="p-4 lg:p-6 max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/employer/${pumpId}/${employerId}/sales`)}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft size={16} />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-[#020617]">Sale Details</h1>
                            <p className="text-sm text-[#64748b]">#{sale.id}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/employer/${pumpId}/${employerId}/sales/${sale.id}/edit`)}
                        >
                            Edit Sale
                        </Button>
                        {getStatusBadge(sale.status)}
                    </div>
                </div>

                {/* Sale Info Card */}
                <Card className="p-6 bg-white border shadow-sm rounded-xl space-y-6">
                    {/* Basic Info Section */}
                    <div>
                        <h2 className="text-sm font-semibold text-[#020617] mb-4 pb-2 border-b border-gray-100">
                            Basic Information
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">Sale ID</p>
                                <p className="text-sm font-semibold text-[#020617]">{sale.id}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">Pump Name</p>
                                <p className="text-sm font-semibold text-[#020617]">{sale.pumpName}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">Employer</p>
                                <p className="text-sm font-semibold text-[#020617]">{sale.employerName}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">Payment Method</p>
                                <p className="text-sm font-semibold text-[#020617]">{sale.paymentMethod}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">Status</p>
                                {getStatusBadge(sale.status)}
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">Created At</p>
                                <p className="text-sm font-semibold text-[#020617]">{sale.createdAt}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sold Items Section */}
                    <div>
                        <h2 className="text-sm font-semibold text-[#020617] mb-4 pb-2 border-b border-gray-100">
                            Sold Items
                        </h2>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="text-[#64748b]">Product / Fuel Type</TableHead>
                                    <TableHead className="text-center text-[#64748b]">Quantity</TableHead>
                                    <TableHead className="text-center text-[#64748b]">Rate (₨)</TableHead>
                                    <TableHead className="text-right text-[#64748b]">Total (₨)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sale.items.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50">
                                        <TableCell>
                                            <div>
                                                <p className="font-medium text-[#020617]">{item.name}</p>
                                                <p className="text-xs text-[#64748b]">{item.category}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center text-[#020617]">{item.quantity}</TableCell>
                                        <TableCell className="text-center text-[#020617]">₨ {item.rate.toLocaleString()}</TableCell>
                                        <TableCell className="text-right font-medium text-[#020617]">₨ {item.total.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Bill Summary Section */}
                    <div>
                        <h2 className="text-sm font-semibold text-[#020617] mb-4 pb-2 border-b border-gray-100">
                            Bill Summary
                        </h2>
                        <div className="max-w-xs ml-auto space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-[#64748b]">Subtotal</span>
                                <span className="text-[#020617]">₨ {sale.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[#64748b]">Tax</span>
                                <span className="text-[#020617]">₨ {sale.tax.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-200">
                                <span className="text-lg font-semibold text-[#020617]">Grand Total</span>
                                <span className="text-xl font-bold text-[#14b8a6]">₨ {sale.grandTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Notes Section */}
                    <div>
                        <h2 className="text-sm font-semibold text-[#020617] mb-4 pb-2 border-b border-gray-100">
                            Notes
                        </h2>
                        <p className="text-sm text-[#64748b]">
                            {sale.notes || "—"}
                        </p>
                    </div>

                    {/* Logs Section */}
                    <div>
                        <h2 className="text-sm font-semibold text-[#020617] mb-4 pb-2 border-b border-gray-100">
                            Payment Logs
                        </h2>
                        <div className="space-y-4">
                            {/* @ts-ignore */}
                            {sale.logs?.map((log, index) => (
                                <div key={index} className="flex gap-4 relative">
                                    {/* Timeline line */}
                                    {index !== (sale.logs?.length || 0) - 1 && (
                                        <div className="absolute left-[19px] top-8 bottom-[-16px] w-[2px] bg-gray-100" />
                                    )}

                                    <div className="h-10 w-10 shrink-0 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                                        <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                                    </div>
                                    <div className="pt-2 w-full">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium text-[#020617]">{log.action}</p>
                                                <p className="text-xs text-[#64748b] mt-0.5">by {log.performedBy}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-[#14b8a6]">
                                                    + ₨ {log.amount.toLocaleString()}
                                                </p>
                                                <p className="text-xs text-[#64748b] mt-0.5">{log.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                                <div>
                                    <p className="text-xs text-[#64748b] uppercase font-semibold">Remaining Balance</p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-xl font-bold ${(sale.grandTotal - (sale.paidAmount || 0)) > 0 ? "text-red-500" : "text-green-600"
                                        }`}>
                                        ₨ {(sale.grandTotal - (sale.paidAmount || 0)).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    );
}