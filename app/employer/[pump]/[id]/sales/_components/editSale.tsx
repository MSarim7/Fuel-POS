"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Calculator } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock database - synced with mainPage.tsx
const mockDatabase = [
    {
        id: "SALE-1718123456789",
        customerName: "Walk-in Customer",
        items: [
            { id: "1", name: "Regular Petrol", category: "Petrol", quantity: 15, rate: 290, total: 4350 },
            { id: "2", name: "Premium Diesel", category: "Diesel", quantity: 10, rate: 320, total: 3200 },
            { id: "3", name: "Mobil 1 5W-30", category: "Engine Oil", quantity: 2, rate: 2500, total: 5000 },
        ],
        totalAmount: 12550,
        paidAmount: 12550, // Fully paid
        status: "Approved",
    },
    {
        id: "SALE-1718123456790",
        customerName: "Walk-in Customer",
        items: [
            { id: "1", name: "Diesel", category: "Diesel", quantity: 20, rate: 320, total: 6400 },
        ],
        totalAmount: 6400,
        paidAmount: 3000, // Partial payment (Remaining 3400)
        status: "Pending",
    },
    {
        id: "SALE-1718123456791",
        customerName: "Walk-in Customer",
        items: [
            { id: "1", name: "High-Octane Petrol", category: "Petrol", quantity: 25, rate: 350, total: 8750 },
        ],
        totalAmount: 8750,
        paidAmount: 8750, // Rejected but full amount shown in original logic? Assuming fully paid or just status rejected
        status: "Rejected",
    },
];

export default function EmployerEditSale() {
    const router = useRouter();
    const params = useParams();
    const pumpId = params?.pump as string;
    const employerId = params?.id as string;
    const saleId = params?.saleId as string;

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
                // Fallback
                setSale(mockDatabase.find(s => s.id === "SALE-1718123456790") || mockDatabase[0]);
                if (!foundSale && saleId !== "new") {
                    toast.error("Sale not found, showing demo data");
                }
            }
        }
    }, [saleId]);

    if (!sale) return <div className="p-6">Loading...</div>;

    // Calculate remaining
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
        // Simulate API call
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
                        <h1 className="text-2xl font-bold text-[#020617]">Edit Sale Payment</h1>
                        <p className="text-sm text-[#64748b]">Update payment details for #{sale.id}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Sale Details (Left) */}
                    <Card className="md:col-span-2 p-6 bg-white border shadow-sm rounded-xl">
                        <h2 className="text-lg font-semibold text-[#020617] mb-4">Sale Summary</h2>

                        <div className="mb-6">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableHead>Product</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sale.items.map((item: any) => (
                                        <TableRow key={item.id || item.productName}>
                                            <TableCell>
                                                <div className="font-medium">{item.name || item.productName}</div>
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
                        </div>
                    </Card>

                    {/* Payment Update (Right) */}
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
                                        <Label htmlFor="addPayment">Add Payment</Label>
                                        <Input
                                            id="addPayment"
                                            type="number"
                                            placeholder="Enter amount"
                                            value={newPayment || ""}
                                            onChange={(e) => setNewPayment(Number(e.target.value))}
                                            max={remainingAmount}
                                        />
                                        <p className="text-xs text-gray-500">Max addable: ₨ {remainingAmount}</p>
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
                                    This sale is fully paid.
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
