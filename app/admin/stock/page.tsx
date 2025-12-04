import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StockPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Stock Management</h1>
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader>
          <CardTitle>Inventory Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Monitor fuel stock levels and inventory</p>
        </CardContent>
      </Card>
    </div>
  );
}
