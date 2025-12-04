import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SalesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Sales</h1>
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader>
          <CardTitle>Sales Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">View and manage all sales transactions</p>
        </CardContent>
      </Card>
    </div>
  );
}
