import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Reports</h1>
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader>
          <CardTitle>Report Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Generate daily, weekly, and monthly reports</p>
        </CardContent>
      </Card>
    </div>
  );
}
