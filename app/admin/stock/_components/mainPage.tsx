"use client";
import { useState } from "react";
import { Package, ShoppingCart, DollarSign, Plus, Eye, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface StockPurchase {
  id: string;
  fuelType: string;
  quantity: number;
  pricePerLiter: number;
  totalPrice: number;
  status: "Normal" | "Low";
  purchaseDate: string;
}

const mockStockPurchases: StockPurchase[] = [
  { id: "1", fuelType: "Petrol", quantity: 5000, pricePerLiter: 272, totalPrice: 1360000, status: "Normal", purchaseDate: "2024-01-15" },
  { id: "2", fuelType: "Diesel", quantity: 8000, pricePerLiter: 280, totalPrice: 2240000, status: "Normal", purchaseDate: "2024-01-14" },
  { id: "3", fuelType: "High-Octane", quantity: 2000, pricePerLiter: 295, totalPrice: 590000, status: "Low", purchaseDate: "2024-01-13" },
  { id: "4", fuelType: "Engine Oil", quantity: 500, pricePerLiter: 450, totalPrice: 225000, status: "Normal", purchaseDate: "2024-01-12" },
  { id: "5", fuelType: "Lubricants", quantity: 200, pricePerLiter: 380, totalPrice: 76000, status: "Low", purchaseDate: "2024-01-11" },
  { id: "6", fuelType: "Petrol", quantity: 6000, pricePerLiter: 270, totalPrice: 1620000, status: "Normal", purchaseDate: "2024-01-10" },
];

const Stock = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [fuelTypeFilter, setFuelTypeFilter] = useState("all");

  const filteredData = mockStockPurchases.filter((item) => {
    const matchesSearch = item.fuelType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = fuelTypeFilter === "all" || item.fuelType === fuelTypeFilter;
    return matchesSearch && matchesFilter;
  });

  const totalPurchases = mockStockPurchases.length;
  const todaysPurchases = 3;
  const totalAmount = mockStockPurchases.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="p-6 bg-[#f1f5f9] min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="bg-white border shadow-sm rounded-xl">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-2">
              <Package className="h-6 w-6 text-[#14b8a6]" />
            </div>
            <p className="text-sm text-[#64748b]">Total Stock Purchases</p>
            <p className="text-2xl font-bold text-[#020617]">{totalPurchases}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border shadow-sm rounded-xl">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-2">
              <ShoppingCart className="h-6 w-6 text-[#06b6d4]" />
            </div>
            <p className="text-sm text-[#64748b]">Today's Purchases</p>
            <p className="text-2xl font-bold text-[#020617]">{todaysPurchases}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border shadow-sm rounded-xl">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-2">
              <DollarSign className="h-6 w-6 text-[#22c55e]" />
            </div>
            <p className="text-sm text-[#64748b]">Total Purchase Amount</p>
            <p className="text-2xl font-bold text-[#020617]">Rs.{totalAmount.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search + Filter + Add Button Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
            <Input
              type="text"
              placeholder="Search stock or fuel type"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full sm:w-64 rounded-md"
            />
          </div>
          <Select value={fuelTypeFilter} onValueChange={setFuelTypeFilter}>
            <SelectTrigger className="w-full sm:w-40 rounded-md">
              <SelectValue placeholder="Fuel Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Petrol">Petrol</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="High-Octane">High-Octane</SelectItem>
              <SelectItem value="Engine Oil">Engine Oil</SelectItem>
              <SelectItem value="Lubricants">Lubricants</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => router.push("/admin/stock/add")}
          className="bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-md px-4 py-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Stock Purchase
        </Button>
      </div>

      {/* Stock Table */}
      <Card className="bg-white border shadow-sm rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-[#64748b] font-semibold">Stock Name / Fuel Type</TableHead>
              <TableHead className="text-[#64748b] font-semibold text-right">Quantity (Liters)</TableHead>
              <TableHead className="text-[#64748b] font-semibold text-right">Price Per Liter</TableHead>
              <TableHead className="text-[#64748b] font-semibold text-right">Total Price</TableHead>
              <TableHead className="text-[#64748b] font-semibold">Status</TableHead>
              <TableHead className="text-[#64748b] font-semibold">Purchase Date</TableHead>
              <TableHead className="text-[#64748b] font-semibold text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-[#64748b]">
                  No stock purchases found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-100 transition-colors">
                  <TableCell className="font-medium text-[#020617]">{item.fuelType}</TableCell>
                  <TableCell className="text-right">{item.quantity.toLocaleString()}</TableCell>
                  <TableCell className="text-right">Rs.{item.pricePerLiter}</TableCell>
                  <TableCell className="text-right font-medium">Rs.{item.totalPrice.toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.status === "Normal"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                        }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-[#64748b]">
                    {new Date(item.purchaseDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/stock/${item.id}/view`)}
                      className="rounded-md"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Stock;
