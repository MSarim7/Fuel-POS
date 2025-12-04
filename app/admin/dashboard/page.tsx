import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Fuel, Receipt, Activity, FileText, Package, TrendingUp } from "lucide-react";

const recentTransactions = [
  { id: "TXN-001", pump: "Pump 1", fuelType: "Diesel", amount: "₹2,450", time: "10:30 AM", status: "completed" },
  { id: "TXN-002", pump: "Pump 3", fuelType: "Petrol", amount: "₹1,890", time: "10:25 AM", status: "completed" },
  { id: "TXN-003", pump: "Pump 2", fuelType: "Diesel", amount: "₹3,200", time: "10:20 AM", status: "completed" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="flex flex-col items-center justify-center p-4 rounded-xl border border-muted shadow-sm">
          <CardHeader className="flex items-center gap-2">
            <DollarSign className="text-primary text-2xl" />
            <CardTitle>Today&apos;s Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">₹45,230</span>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center justify-center p-4 rounded-xl border border-muted shadow-sm">
          <CardHeader className="flex items-center gap-2">
            <Fuel className="text-primary text-2xl" />
            <CardTitle>Fuel Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">2,450 L</span>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center justify-center p-4 rounded-xl border border-muted shadow-sm">
          <CardHeader className="flex items-center gap-2">
            <Receipt className="text-primary text-2xl" />
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">156</span>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center justify-center p-4 rounded-xl border border-muted shadow-sm">
          <CardHeader className="flex items-center gap-2">
            <Activity className="text-primary text-2xl" />
            <CardTitle>Active Pumps</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">8/10</span>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Pump</TableHead>
                <TableHead>Fuel Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-medium">{txn.id}</TableCell>
                  <TableCell>{txn.pump}</TableCell>
                  <TableCell>{txn.fuelType}</TableCell>
                  <TableCell>{txn.amount}</TableCell>
                  <TableCell className="text-muted-foreground">{txn.time}</TableCell>
                  <TableCell>
                    <Badge className="rounded-lg bg-success/10 text-success hover:bg-success/20">
                      {txn.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-xl border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Update Prices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Adjust fuel prices across all pumps
            </p>
            <Button className="w-full rounded-xl" size="lg">
              <TrendingUp className="mr-2 h-4 w-4" />
              Update Prices
            </Button>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Create Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Generate daily sales and inventory reports
            </p>
            <Button variant="outline" className="w-full rounded-xl" size="lg">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Check Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              View current fuel inventory levels
            </p>
            <Button variant="outline" className="w-full rounded-xl" size="lg">
              <Package className="mr-2 h-4 w-4" />
              View Stock
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
