"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calculator } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock database - synced with mainPage.tsx
const mockDatabase = [
    {
        id: "SL001",
        customerName: "Muhammad Usman",
        items: [
            { name: "Petrol", quantity: 10, rate: 280, total: 2800 },
            { name: "Engine Oil (1L)", quantity: 1, rate: 700, total: 700 },
        ],
        totalAmount: 3500,
        paidAmount: 3500, // Fully paid
        status: "Approved",
    },
    {
        id: "SL002",
        customerName: "Ahmed Khan",
        items: [
            { name: "Diesel", quantity: 25, rate: 232, total: 5800 },
        ],
        totalAmount: 5800,
        paidAmount: 5800, // Fully paid
        status: "Approved",
    },
    {
        id: "SL003",
        customerName: "Sara Ahmed",
        items: [
            { name: "High-Octane", quantity: 15, rate: 280, total: 4200 },
        ],
        totalAmount: 4200,
        paidAmount: 0, // Unpaid
        status: "Rejected",
    },
    {
        id: "SL004",
        customerName: "Ali Hassan",
        items: [
            { name: "Petrol", quantity: 20, rate: 280, total: 5600 },
            { name: "Diesel", quantity: 10, rate: 190, total: 1900 },
        ],
        totalAmount: 7500,
        paidAmount: 5000, // Partially paid (Remaining 2500)
        status: "Pending",
    },
    {
        id: "SL005",
        customerName: "Fatima Noor",
        items: [
            { name: "Engine Oil", quantity: 2, rate: 900, total: 1800 },
        ],
        totalAmount: 1800,
        paidAmount: 1800,
        status: "Approved",
    }
];

export default function AdminEditSale() {
    const router = useRouter();
    const params = useParams();
    const saleId = params?.id as string;

    const [sale, setSale] = useState<any>(null);
    const [newPayment, setNewPayment] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (saleId) {
            // Simulate fetch
            const foundSale = mockDatabase.find(s => s.id === saleId);
            if (foundSale) {
                setSale(foundSale);
            } else {
                // Fallback for demo or if ID not found, just use the partial one for testing 
                // but better to show not found or fallback to first
                // For user request "add a mock data where remaining amount is pending", 
                // we ensure SL004 is used if ID doesn't match known ones or just default to SL004 if not found
                setSale(mockDatabase.find(s => s.id === "SL004") || mockDatabase[0]);
                if (!foundSale && saleId !== "new") {
                    toast.error("Sale not found, showing demo data");
                }
            }
        }
    }, [saleId]);

    if (!sale) return <div className="p-6">Loading...</div>;

    const remainingAmount = sale.totalAmount - sale.paidAmount;

    const handleUpdatePayment = () => {
        if (newPayment <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        if (newPayment > remainingAmount) {
            toast.error("Amount exceeds remaining balance");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const updatedPaid = sale.paidAmount + newPayment;
            setSale({
                ...sale,
                paidAmount: updatedPaid,
                status: updatedPaid >= sale.totalAmount ? "Approved" : "Pending"
            });
            setNewPayment(0);
            setLoading(false);
            toast.success("Payment updated successfully");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#f1f5f9] p-4 lg:p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.back()}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-[#020617]">Edit Sale (Admin)</h1>
                        <p className="text-sm text-[#64748b]">Manage payment for #{sale.id}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Sale Details */}
                    <Card className="md:col-span-2 p-6 bg-white border shadow-sm rounded-xl">
                        <h2 className="text-lg font-semibold text-[#020617] mb-4">Sale Summary</h2>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead>Product</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sale.items.map((item: any, idx: number) => (
                                    <TableRow key={idx}>
                                        <TableCell>
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-xs text-gray-500">{item.quantity} x {item.rate}</div>
                                        </TableCell>
                                        <TableCell className="text-right">₨ {item.total.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow className="font-bold border-t-2">
                                    <TableCell>Total Amount</TableCell>
                                    <TableCell className="text-right text-[#020617]">₨ {sale.totalAmount.toLocaleString()}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>

                    {/* Payment Update */}
                    <div className="space-y-6">
                        <Card className="p-6 bg-white border shadow-sm rounded-xl space-y-4">
                            <h2 className="text-lg font-semibold text-[#020617] flex items-center gap-2">
                                <Calculator className="h-5 w-5 text-[#14b8a6]" />
                                Payment Status
                            </h2>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#64748b]">Total Amount</span>
                                    <span className="font-medium">₨ {sale.totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#64748b]">Already Paid</span>
                                    <span className="font-medium text-green-600">₨ {sale.paidAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                    <span className={remainingAmount > 0 ? "text-red-500" : "text-green-600"}>
                                        {remainingAmount > 0 ? "Remaining" : "Fully Paid"}
                                    </span>
                                    <span className={remainingAmount > 0 ? "text-red-500" : "text-green-600"}>
                                        ₨ {remainingAmount.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {remainingAmount > 0 && (
                                <div className="pt-4 border-t space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="addPaymentAdmin">Add Payment</Label>
                                        <Input
                                            id="addPaymentAdmin"
                                            type="number"
                                            placeholder="Enter amount"
                                            value={newPayment || ""}
                                            onChange={(e) => setNewPayment(Number(e.target.value))}
                                            max={remainingAmount}
                                        />
                                    </div>
                                    <Button
                                        onClick={handleUpdatePayment}
                                        className="w-full bg-[#14b8a6] hover:bg-[#0d9488]"
                                        disabled={loading || newPayment <= 0 || newPayment > remainingAmount}
                                    >
                                        {loading ? "Updating..." : "Update Payment"}
                                    </Button>
                                </div>
                            )}

                            {remainingAmount === 0 && (
                                <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm text-center font-medium">
                                    Fully Paid
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
