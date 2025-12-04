"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  Fuel,
  AlertTriangle,
  ArrowUpRight,
  Package,
  Activity,
  CreditCard,
  Wallet
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// Mock Data - Simulating aggregated data from modules
const financialData = [
  { name: "Jan", revenue: 45000, expenses: 32000 },
  { name: "Feb", revenue: 52000, expenses: 35000 },
  { name: "Mar", revenue: 48000, expenses: 30000 },
  { name: "Apr", revenue: 61000, expenses: 40000 },
  { name: "May", revenue: 55000, expenses: 38000 },
  { name: "Jun", revenue: 67000, expenses: 42000 },
  { name: "Jul", revenue: 72000, expenses: 45000 },
];

const fuelSalesData = [
  { name: "Petrol", value: 45, color: "#14b8a6" }, // Teal
  { name: "Diesel", value: 35, color: "#3b82f6" }, // Blue
  { name: "High-Octane", value: 15, color: "#8b5cf6" }, // Purple
  { name: "Lubricants", value: 5, color: "#f59e0b" }, // Amber
];

const recentSales = [
  { id: "SL005", product: "Engine Oil (2L)", amount: 1800, status: "approved", time: "2:00 PM" },
  { id: "SL004", product: "Petrol (20L), Diesel...", amount: 7500, status: "pending", time: "11:20 AM" },
  { id: "SL002", product: "Diesel (25L)", amount: 5800, status: "approved", time: "10:15 AM" },
  { id: "SL001", product: "Petrol (10L)", amount: 3500, status: "pending", time: "09:30 AM" },
];

const stockAlerts = [
  { item: "High-Octane", current: 450, min: 1000, status: "critical" },
  { item: "Engine Oil 1L", current: 12, min: 20, status: "low" },
];

export default function Dashboard() {
  // Calculations
  const totalRevenue = 452300;
  const totalExpenses = 125000;
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = ((netProfit / totalRevenue) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#020617]">Dashboard Overview</h1>
          <p className="text-[#64748b]">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>

      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue Card */}
        <Card className="bg-white border-none shadow-sm rounded-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[#64748b]">Total Revenue</p>
                <h3 className="text-2xl font-bold text-[#020617] mt-2">
                  Rs. {totalRevenue.toLocaleString()}
                </h3>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-green-600 flex items-center font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                12.5%
              </span>
              <span className="text-[#94a3b8] ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Expenses Card */}
        <Card className="bg-white border-none shadow-sm rounded-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[#64748b]">Total Expenses</p>
                <h3 className="text-2xl font-bold text-[#020617] mt-2">
                  Rs. {totalExpenses.toLocaleString()}
                </h3>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <CreditCard className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-red-600 flex items-center font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                4.2%
              </span>
              <span className="text-[#94a3b8] ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Net Profit Card */}
        <Card className="bg-white border-none shadow-sm rounded-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[#64748b]">Net Profit</p>
                <h3 className="text-2xl font-bold text-[#020617] mt-2">
                  Rs. {netProfit.toLocaleString()}
                </h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-blue-600 flex items-center font-medium">
                <Activity className="h-4 w-4 mr-1" />
                {profitMargin}%
              </span>
              <span className="text-[#94a3b8] ml-2">margin</span>
            </div>
          </CardContent>
        </Card>

        {/* Fuel Sold Card */}
        <Card className="bg-white border-none shadow-sm rounded-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[#64748b]">Fuel Sold</p>
                <h3 className="text-2xl font-bold text-[#020617] mt-2">
                  24,500 L
                </h3>
              </div>
              <div className="p-2 bg-amber-50 rounded-lg">
                <Fuel className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-green-600 flex items-center font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                8.1%
              </span>
              <span className="text-[#94a3b8] ml-2">volume increase</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue vs Expenses Chart */}
        <Card className="lg:col-span-2 bg-white border-none shadow-sm rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#020617]">Financial Overview</CardTitle>
            <CardDescription>Revenue vs Expenses for the last 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={financialData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickFormatter={(value) => `Rs.${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    name="Revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorExpenses)"
                    name="Expenses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Fuel Sales Distribution */}
        <Card className="bg-white border-none shadow-sm rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#020617]">Sales by Fuel Type</CardTitle>
            <CardDescription>Distribution of fuel sales volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fuelSalesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {fuelSalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#020617]">100%</p>
                  <p className="text-xs text-[#64748b]">Total Volume</p>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {fuelSalesData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[#64748b]">{item.name}</span>
                  </div>
                  <span className="font-medium text-[#020617]">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section: Recent Sales & Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales Table */}
        <Card className="lg:col-span-2 bg-white border-none shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-[#020617]">Recent Sales</CardTitle>
              <CardDescription>Latest transactions from all pumps</CardDescription>
            </div>
            <Link href="/admin/sales">
              <Button variant="ghost" size="sm" className="text-[#14b8a6]">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sale ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.id}</TableCell>
                    <TableCell className="text-[#64748b]">{sale.product}</TableCell>
                    <TableCell className="font-medium">Rs. {sale.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          sale.status === 'approved'
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                        }
                      >
                        {sale.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-[#64748b]">{sale.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Stock Alerts */}
        <Card className="bg-white border-none shadow-sm rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#020617]">Stock Alerts</CardTitle>
            <CardDescription>Items running low on inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stockAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-red-50 border border-red-100">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-[#020617]">{alert.item}</h4>
                    <p className="text-xs text-red-600 mt-1">
                      Current: {alert.current} L (Min: {alert.min} L)
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 bg-white border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800">
                    Restock
                  </Button>
                </div>
              ))}

              <div className="flex items-start gap-4 p-3 rounded-lg bg-amber-50 border border-amber-100">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <Package className="h-4 w-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-[#020617]">Inventory Audit</h4>
                  <p className="text-xs text-amber-600 mt-1">
                    Scheduled for tomorrow
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
