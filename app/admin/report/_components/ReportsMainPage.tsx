"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Import report components
import { OverviewReport } from "./OverviewReport";
import { SalesReport } from "./SalesReport";
import { EmployerReport } from "./EmployerReport";
import { PumpsReport } from "./PumpsReport";
import { ExpenseReport } from "./ExpenseReport";
import { StocksReport } from "./StocksReport";

// Dummy data generators
const generateDummyData = () => {
    const pumps = ["Pump 1", "Pump 2", "Pump 3", "Pump 4"];
    const fuelTypes = ["Petrol", "Diesel", "Premium"];
    const expenseTypes = ["Maintenance", "Salaries", "Utilities", "Supplies", "Other"];

    // Generate sales data
    const salesData = Array.from({ length: 50 }, (_, i) => ({
        orderId: `ORD-${1000 + i}`,
        date: new Date(2025, 11, Math.floor(Math.random() * 10) + 1).toISOString(),
        fuelType: fuelTypes[Math.floor(Math.random() * fuelTypes.length)],
        quantity: Math.floor(Math.random() * 50) + 10,
        totalPrice: Math.floor(Math.random() * 5000) + 1000,
        pump: pumps[Math.floor(Math.random() * pumps.length)],
        status: Math.random() > 0.1 ? "Completed" : "Refunded",
        pumpId: `pump-${Math.floor(Math.random() * 4) + 1}`,
    }));

    // Generate employer data
    const employerData = Array.from({ length: 20 }, (_, i) => ({
        employerName: `Employee ${i + 1}`,
        pump: pumps[Math.floor(Math.random() * pumps.length)],
        role: ["Manager", "Operator", "Cashier", "Attendant"][Math.floor(Math.random() * 4)],
        email: `employee${i + 1}@fuelpos.com`,
        dateJoined: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
        status: Math.random() > 0.2 ? "Active" : "Inactive",
        pumpId: `pump-${Math.floor(Math.random() * 4) + 1}`,
        salary: Math.floor(Math.random() * 30000) + 20000,
    }));

    // Generate pump data
    const pumpData = pumps.map((pump, i) => ({
        pumpId: `PUMP-${i + 1}`,
        location: pump,
        fuelType: fuelTypes[i % fuelTypes.length],
        status: Math.random() > 0.2 ? "Active" : "Maintenance",
        lastMaintenance: new Date(2025, 10, Math.floor(Math.random() * 30) + 1).toISOString(),
        totalDispensed: Math.floor(Math.random() * 50000) + 10000,
    }));

    // Generate expense data
    const expenseData = Array.from({ length: 40 }, (_, i) => ({
        expenseId: `EXP-${2000 + i}`,
        date: new Date(2025, 11, Math.floor(Math.random() * 10) + 1).toISOString(),
        category: expenseTypes[Math.floor(Math.random() * expenseTypes.length)],
        amount: Math.floor(Math.random() * 10000) + 500,
        description: `Expense description ${i + 1}`,
        location: pumps[Math.floor(Math.random() * pumps.length)],
        pumpId: `pump-${Math.floor(Math.random() * 4) + 1}`,
    }));

    // Generate stock data
    const stockData = fuelTypes.map((fuel, i) => ({
        fuelType: fuel,
        quantity: Math.floor(Math.random() * 10000) + 1000,
        price: fuel === "Premium" ? 280 : fuel === "Petrol" ? 260 : 250,
        location: pumps[i % pumps.length],
        lastUpdated: new Date(2025, 11, Math.floor(Math.random() * 10) + 1).toISOString(),
        pumpId: `pump-${(i % 4) + 1}`,
    }));

    return {
        sales: salesData,
        employers: employerData,
        pumps: pumpData,
        expenses: expenseData,
        stocks: stockData,
    };
};

export default function ReportsMainPage() {
    const [selectedPump, setSelectedPump] = useState<string>("all");
    const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
    const [toDate, setToDate] = useState<Date | undefined>(undefined);
    const [rawData, setRawData] = useState<any>({ sales: [], employers: [], pumps: [], expenses: [], stocks: [] });
    const [isLoading, setIsLoading] = useState(true);

    // Generate dummy data only on client side to prevent hydration errors
    useEffect(() => {
        setRawData(generateDummyData());
        setIsLoading(false);
    }, []);

    const pumps = ["Pump 1", "Pump 2", "Pump 3", "Pump 4"];

    // Filter data based on selected pump and date range
    const getFilteredData = () => {
        const filterByPumpAndDate = (items: any[]) => {
            return items.filter((item) => {
                const itemDate = new Date(item.date || item.dateJoined || item.lastMaintenance || item.lastUpdated);
                const matchesPump = selectedPump === "all" || item.pumpId === selectedPump || item.pump === selectedPump || item.location === selectedPump;
                const matchesDate = !fromDate || !toDate || (itemDate >= fromDate && itemDate <= toDate);
                return matchesPump && matchesDate;
            });
        };

        return {
            sales: filterByPumpAndDate(rawData.sales),
            employers: selectedPump === "all" ? rawData.employers : rawData.employers.filter((e) => e.pumpId === selectedPump || e.pump === selectedPump),
            pumps: selectedPump === "all" ? rawData.pumps : rawData.pumps.filter((p) => p.pumpId === selectedPump || p.location === selectedPump),
            expenses: filterByPumpAndDate(rawData.expenses),
            stocks: selectedPump === "all" ? rawData.stocks : rawData.stocks.filter((s) => s.pumpId === selectedPump || s.location === selectedPump),
        };
    };

    const filteredData = getFilteredData();

    // Calculate overview metrics
    const calculateOverviewMetrics = () => {
        const totalRevenue = filteredData.sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
        const totalOrders = filteredData.sales.length;
        const totalExpenses = filteredData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const totalProfit = totalRevenue - totalExpenses;

        return {
            totalRevenue,
            totalOrders,
            totalExpenses,
            totalProfit,
            totalPumps: filteredData.pumps.length,
            fuelStock: filteredData.stocks.reduce((sum, stock) => sum + stock.quantity, 0),
            totalEmployers: filteredData.employers.length,
            activePumps: filteredData.pumps.filter((p) => p.status === "Active").length,
        };
    };

    const overviewMetrics = calculateOverviewMetrics();

    return (
        <div className="p-6 space-y-6" suppressHydrationWarning>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
                    <p className="text-muted-foreground">Comprehensive business insights and reports</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center flex-wrap">
                <Select value={selectedPump} onValueChange={setSelectedPump}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Pump" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Pumps</SelectItem>
                        {pumps.map((pump, idx) => (
                            <SelectItem key={idx} value={pump}>
                                {pump}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-background">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <DatePicker
                        selected={fromDate}
                        onChange={(date) => setFromDate(date || undefined)}
                        dateFormat="MMM dd, yyyy"
                        placeholderText="From Date"
                        className="bg-transparent outline-none text-sm w-[140px]"
                    />
                </div>

                <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-background">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <DatePicker
                        selected={toDate}
                        onChange={(date) => setToDate(date || undefined)}
                        dateFormat="MMM dd, yyyy"
                        placeholderText="To Date"
                        minDate={fromDate || undefined}
                        className="bg-transparent outline-none text-sm w-[140px]"
                    />
                </div>

                <Button
                    variant="outline"
                    onClick={() => {
                        setSelectedPump("all");
                        setFromDate(undefined);
                        setToDate(undefined);
                    }}
                >
                    Reset Filters
                </Button>
            </div>

            {/* Tabs with Report Components */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="sales">Sales</TabsTrigger>
                    <TabsTrigger value="employer">Employer</TabsTrigger>
                    <TabsTrigger value="pumps">Pumps</TabsTrigger>
                    <TabsTrigger value="expense">Expense</TabsTrigger>
                    <TabsTrigger value="stocks">Stocks</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <OverviewReport metrics={overviewMetrics} salesData={filteredData.sales} />
                </TabsContent>

                <TabsContent value="sales">
                    <SalesReport salesData={filteredData.sales} />
                </TabsContent>

                <TabsContent value="employer">
                    <EmployerReport employersData={filteredData.employers} />
                </TabsContent>

                <TabsContent value="pumps">
                    <PumpsReport pumpsData={filteredData.pumps} />
                </TabsContent>

                <TabsContent value="expense">
                    <ExpenseReport expensesData={filteredData.expenses} totalRevenue={overviewMetrics.totalRevenue} />
                </TabsContent>

                <TabsContent value="stocks">
                    <StocksReport stocksData={filteredData.stocks} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
