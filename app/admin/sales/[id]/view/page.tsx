"use client";

import SaleView from "../../_components/viewPage";

// Mock data to simulate fetching from an API
const mockSaleData = {
    id: "SL001",
    pumpName: "Fuel Pump A",
    employerName: "Ali Hassan",
    customerName: "Muhammad Usman",
    paymentMethod: "Cash",
    status: "pending" as const,
    createdAt: "2024-01-15 09:30 AM",
    products: [
        { name: "Petrol", quantity: 10, price: 280, lineTotal: 2800 },
        { name: "Engine Oil (1L)", quantity: 1, price: 700, lineTotal: 700 },
    ],
    subtotal: 3500,
    tax: 0,
    grandTotal: 3500,
    paidAmount: 3500,
    notes: "Customer requested receipt copy via email.",
    logs: [
        {
            date: "2024-01-15 09:30 AM",
            amount: 2000,
            action: "Initial Sale",
            performedBy: "Employer: Ali Hassan"
        },
        {
            date: "2024-01-15 10:00 AM",
            amount: 1500,
            action: "Payment Added",
            performedBy: "Admin: Manager"
        }
    ]
};

const ViewSalePage = ({ params }: { params: { id: string } }) => {
    // In a real app, we would fetch data using params.id
    // const data = await fetchSale(params.id);

    // For now, we use the mock data
    const data = {
        ...mockSaleData,
        id: params.id || mockSaleData.id, // Use the ID from the URL if available
    };

    return <SaleView data={data} />;
};

export default ViewSalePage;
