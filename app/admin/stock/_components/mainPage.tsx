"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, ShoppingCart, DollarSign, Plus, Eye, Search, PenLine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface StockPurchase {
  id: string;
  fuelType: string;
  quantity: number;
  purchasePricePerLiter: number;
  salePricePerLiter: number;
  totalPrice: number;
  status: "Normal" | "Low";
  purchaseDate: string;
}

const mockStockPurchases: StockPurchase[] = [
  { id: "1", fuelType: "Petrol", quantity: 5000, purchasePricePerLiter: 260, salePricePerLiter: 272, totalPrice: 1300000, status: "Normal", purchaseDate: "2024-01-15" },
  { id: "2", fuelType: "Diesel", quantity: 8000, purchasePricePerLiter: 270, salePricePerLiter: 280, totalPrice: 2160000, status: "Normal", purchaseDate: "2024-01-14" },
  { id: "3", fuelType: "High-Octane", quantity: 2000, purchasePricePerLiter: 280, salePricePerLiter: 295, totalPrice: 560000, status: "Low", purchaseDate: "2024-01-13" },
  { id: "4", fuelType: "Engine Oil", quantity: 500, purchasePricePerLiter: 400, salePricePerLiter: 450, totalPrice: 200000, status: "Normal", purchaseDate: "2024-01-12" },
  { id: "5", fuelType: "Lubricants", quantity: 200, purchasePricePerLiter: 350, salePricePerLiter: 380, totalPrice: 70000, status: "Low", purchaseDate: "2024-01-11" },
  { id: "6", fuelType: "Petrol", quantity: 6000, purchasePricePerLiter: 258, salePricePerLiter: 270, totalPrice: 1548000, status: "Normal", purchaseDate: "2024-01-10" },
];

const Stock = () => {
  const router = useRouter();
  const [stockData, setStockData] = useState<StockPurchase[]>(mockStockPurchases);
  const [searchQuery, setSearchQuery] = useState("");
  const [fuelTypeFilter, setFuelTypeFilter] = useState("all");

  // Global Price Update State
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedFuelToUpdate, setSelectedFuelToUpdate] = useState("");
  const [newSalePrice, setNewSalePrice] = useState("");

  const filteredData = stockData.filter((item) => {
    const matchesSearch = item.fuelType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = fuelTypeFilter === "all" || item.fuelType === fuelTypeFilter;
    return matchesSearch && matchesFilter;
  });

  const totalPurchases = stockData.length;
  const todaysPurchases = 3; // Mocked
  const totalAmount = stockData.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleUpdateGlobalPrice = () => {
    if (!selectedFuelToUpdate || !newSalePrice) {
      toast.error("Please select a fuel type and enter a new price.");
      return;
    }

    const price = parseFloat(newSalePrice);
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    // Update logic: Find all stocks of this type and update sale price
    const updatedStock = stockData.map(item => {
      if (item.fuelType === selectedFuelToUpdate) {
        return { ...item, salePricePerLiter: price };
      }
      return item;
    });

    setStockData(updatedStock);
    toast.success(`Updated sale price for all ${selectedFuelToUpdate} stock to Rs. ${price}`);
    setIsUpdateModalOpen(false);
    setNewSalePrice("");
    setSelectedFuelToUpdate("");
  };

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
            <p className="text-sm text-[#64748b]">Today&apos;s Purchases</p>
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

      {/* Search + Filter + Add/Update Buttons */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
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

        <div className="flex gap-3 w-full sm:w-auto">
          <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-md px-4 py-2 flex-1 sm:flex-none">
                <PenLine className="h-4 w-4 mr-2" />
                Update Fuel Price
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Update Global Sale Price</DialogTitle>
                <DialogDescription>
                  Select a fuel type to update its sale price across all stock batches.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="fuelSelect">Fuel Type</Label>
                  <Select value={selectedFuelToUpdate} onValueChange={setSelectedFuelToUpdate}>
                    <SelectTrigger id="fuelSelect">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="High-Octane">High-Octane</SelectItem>
                      <SelectItem value="Engine Oil">Engine Oil</SelectItem>
                      <SelectItem value="Lubricants">Lubricants</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPrice">New Sale Price (Per Liter)</Label>
                  <Input
                    id="newPrice"
                    type="number"
                    value={newSalePrice}
                    onChange={(e) => setNewSalePrice(e.target.value)}
                    placeholder="e.g. 285"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleUpdateGlobalPrice} className="bg-[#14b8a6] hover:bg-[#0d9488]">
                  Update Prices
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            onClick={() => router.push("/admin/stock/add")}
            className="bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-md px-4 py-2 flex-1 sm:flex-none"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Stock Purchase
          </Button>
        </div>
      </div>

      {/* Stock Table */}
      <Card className="bg-white border shadow-sm rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-[#64748b] font-semibold">Stock / Fuel Type</TableHead>
              <TableHead className="text-[#64748b] font-semibold text-right">Qty (L)</TableHead>
              <TableHead className="text-[#64748b] font-semibold text-right">Purchase (Unit)</TableHead>
              <TableHead className="text-[#64748b] font-semibold text-right">Sale (Unit)</TableHead>
              <TableHead className="text-[#64748b] font-semibold text-right text-green-600">Total Purchase</TableHead>
              <TableHead className="text-[#64748b] font-semibold">Status</TableHead>
              <TableHead className="text-[#64748b] font-semibold">Date</TableHead>
              <TableHead className="text-[#64748b] font-semibold text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-[#64748b]">
                  No stock purchases found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-100 transition-colors">
                  <TableCell className="font-medium text-[#020617]">{item.fuelType}</TableCell>
                  <TableCell className="text-right">{item.quantity.toLocaleString()}</TableCell>
                  <TableCell className="text-right">Rs.{item.purchasePricePerLiter}</TableCell>
                  <TableCell className="text-right font-semibold text-blue-600">Rs.{item.salePricePerLiter}</TableCell>
                  <TableCell className="text-right font-medium text-green-700">Rs.{item.totalPrice.toLocaleString()}</TableCell>
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
