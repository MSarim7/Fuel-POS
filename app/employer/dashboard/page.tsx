import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Fuel, Receipt, DollarSign } from "lucide-react";

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      {/* Shift Info */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-1 text-2xl font-semibold">Welcome, Employee</h2>
              <p className="text-sm text-muted-foreground">Shift: Morning (6:00 AM - 2:00 PM)</p>
            </div>
            <Badge className="rounded-lg bg-success/10 text-success">Active Shift</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="rounded-xl border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hours Today</p>
                <p className="text-2xl font-semibold">6.5h</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl font-semibold">42</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <Fuel className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fuel Dispensed</p>
                <p className="text-2xl font-semibold">1,240 L</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sales</p>
                <p className="text-2xl font-semibold">₹42,580</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-xl border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Start New Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Process a new fuel sale transaction
            </p>
            <Button className="w-full rounded-xl" size="lg">
              New Sale
            </Button>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">View My Shifts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Check your shift schedule and history
            </p>
            <Button variant="outline" className="w-full rounded-xl" size="lg">
              View Shifts
            </Button>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">End Shift</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Complete your shift and generate report
            </p>
            <Button variant="outline" className="w-full rounded-xl" size="lg">
              End Shift
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
