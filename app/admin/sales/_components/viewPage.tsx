"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Check, X } from "lucide-react";
import { toast } from "sonner";

interface SaleProduct {
    name: string;
    quantity: number;
    price: number;
    lineTotal: number;
}

interface SaleDetails {
    id: string;
    pumpName: string;
    employerName: string;
    customerName: string;
    paymentMethod: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
    products: SaleProduct[];
    subtotal: number;
    tax: number;
    grandTotal: number;
    paidAmount: number;
    notes: string;
    logs: {
        date: string;
        amount: number;
        action: string;
        performedBy: string;
    }[];
}

const SaleView = ({ data }: { data: SaleDetails }) => {
    const router = useRouter();
    const [status, setStatus] = useState(data.status);

    const handleApprove = () => {
        setStatus("approved");
        toast.success("Sale approved successfully");
    };

    const handleReject = () => {
        setStatus("rejected");
        toast.error("Sale rejected");
    };

    const getStatusBadge = (currentStatus: SaleDetails["status"]) => {
        switch (currentStatus) {
            case "pending":
                return (
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-700">
                        Pending
                    </span>
                );
            case "approved":
                return (
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                        Approved
                    </span>
                );
            case "rejected":
                return (
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-600">
                        Rejected
                    </span>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#f1f5f9]">
            <div className="p-6">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={() => router.push("/admin/sales")}
                            className="gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                        <h1 className="text-2xl font-bold text-[#020617]">Sale Details</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={() => router.push(`/admin/sales/${data.id}/edit`)}
                        >
                            Edit
                        </Button>
                        {status === "pending" ? (
                            <>
                                <Button
                                    onClick={handleApprove}
                                    className="bg-[#22c55e] hover:bg-green-600 text-white gap-2"
                                >
                                    <Check className="h-4 w-4" />
                                    Approve
                                </Button>
                                <Button
                                    onClick={handleReject}
                                    className="bg-[#dc2626] hover:bg-red-700 text-white gap-2"
                                >
                                    <X className="h-4 w-4" />
                                    Reject
                                </Button>
                            </>
                        ) : (
                            getStatusBadge(status)
                        )}
                    </div>
                </div>

                {/* Details Card */}
                <Card className="p-6 bg-white border rounded-xl shadow-sm space-y-6">
                    {/* Section 1: Basic Sale Info */}
                    <div>
                        <h2 className="text-lg font-semibold text-[#020617] mb-4 pb-2 border-b">
                            Basic Information
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">
                                    Sale ID
                                </p>
                                <p className="text-base font-semibold text-[#020617]">{data.id}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">
                                    Pump Name
                                </p>
                                <p className="text-base font-semibold text-[#020617]">
                                    {data.pumpName}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">
                                    Employer Name
                                </p>
                                <p className="text-base font-semibold text-[#020617]">
                                    {data.employerName}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">
                                    Customer Name
                                </p>
                                <p className="text-base font-semibold text-[#020617]">
                                    {data.customerName || "—"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">
                                    Payment Method
                                </p>
                                <p className="text-base font-semibold text-[#020617]">
                                    {data.paymentMethod}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">
                                    Status
                                </p>
                                <div className="mt-1">{getStatusBadge(status)}</div>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">
                                    Sale Date & Time
                                </p>
                                <p className="text-base font-semibold text-[#020617]">
                                    {data.createdAt}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Products */}
                    <div>
                        <h2 className="text-lg font-semibold text-[#020617] mb-4 pb-2 border-b">
                            Products in this Sale
                        </h2>
                        <div className="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader className="bg-gray-50">
                                    <TableRow>
                                        <TableHead className="font-semibold text-[#020617]">
                                            Product Name
                                        </TableHead>
                                        <TableHead className="font-semibold text-[#020617] text-center">
                                            Quantity
                                        </TableHead>
                                        <TableHead className="font-semibold text-[#020617] text-right">
                                            Price (Rs.)
                                        </TableHead>
                                        <TableHead className="font-semibold text-[#020617] text-right">
                                            Line Total (Rs.)
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.products.map((product, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="text-[#020617] font-medium">
                                                {product.name}
                                            </TableCell>
                                            <TableCell className="text-[#020617] text-center">
                                                {product.quantity}
                                            </TableCell>
                                            <TableCell className="text-[#020617] text-right">
                                                Rs. {product.price.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-[#020617] font-semibold text-right">
                                                Rs. {product.lineTotal.toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Section 3: Bill Summary */}
                    <div>
                        <h2 className="text-lg font-semibold text-[#020617] mb-4 pb-2 border-b">
                            Bill Summary
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">
                                    Subtotal
                                </p>
                                <p className="text-base font-semibold text-[#020617]">
                                    Rs. {data.subtotal.toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">
                                    Tax
                                </p>
                                <p className="text-base font-semibold text-[#020617]">
                                    Rs. {data.tax.toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">
                                    Grand Total
                                </p>
                                <p className="text-xl font-bold text-[#14b8a6]">
                                    Rs. {data.grandTotal.toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[#64748b] mb-1">
                                    Paid Amount
                                </p>
                                <p className="text-base font-semibold text-[#020617]">
                                    Rs. {data.paidAmount.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Notes */}
                    <div>
                        <h2 className="text-lg font-semibold text-[#020617] mb-4 pb-2 border-b">
                            Sale Notes
                        </h2>
                        <p className="text-base text-[#020617]">
                            {data.notes || "—"}
                        </p>
                    </div>

                    {/* Logs Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-[#020617] mb-4 pb-2 border-b">
                            Payment History
                        </h2>
                        <div className="space-y-4">
                            {data.logs?.map((log, index) => (
                                <div key={index} className="flex gap-4 relative">
                                    {/* Timeline line */}
                                    {index !== (data.logs?.length || 0) - 1 && (
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
                            {!data.logs?.length && (
                                <p className="text-sm text-[#64748b] italic">No payment history available.</p>
                            )}

                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                                <div>
                                    <p className="text-xs text-[#64748b] uppercase font-semibold">Remaining Balance</p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-xl font-bold ${(data.grandTotal - (data.paidAmount || 0)) > 0 ? "text-red-500" : "text-green-600"
                                        }`}>
                                        ₨ {(data.grandTotal - (data.paidAmount || 0)).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SaleView;
