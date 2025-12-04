"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type StockViewData = {
  id: string;
  fuelType: string;
  quantity: number;
  pricePerLiter: number;
  totalPrice: number;
  supplier: string;
  paymentType: string;
  purchaseDate: string;
  notes: string;
};

const StockView = ({ data }: { data: StockViewData }) => {
  const router = useRouter();

  const formatCurrency = (value: number) => {
    return `Rs.${value.toLocaleString()}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 bg-[#f1f5f9] min-h-screen">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin/stock")}
            className="gap-2 rounded-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-xl font-semibold text-[#020617]">
            Stock Purchase Details
          </h1>
        </div>
        <Button
          onClick={() => router.push(`/admin/stock/${data.id}/edit`)}
          className="bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-md px-4 py-2"
        >
          Edit
        </Button>
      </div>

      {/* Details Card */}
      <Card className="p-6 bg-white border shadow-sm rounded-xl space-y-6">
        {/* Section 1: Fuel Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#020617] border-b pb-2">
            Fuel Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase text-[#64748b] tracking-wide">
                Stock ID
              </span>
              <span className="text-base text-[#020617] font-medium">
                {data.id}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase text-[#64748b] tracking-wide">
                Fuel Type
              </span>
              <span className="text-base text-[#020617] font-medium">
                {data.fuelType}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase text-[#64748b] tracking-wide">
                Quantity (Liters)
              </span>
              <span className="text-base text-[#020617] font-medium">
                {data.quantity.toLocaleString()} L
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase text-[#64748b] tracking-wide">
                Price Per Liter
              </span>
              <span className="text-base text-[#020617] font-medium">
                {formatCurrency(data.pricePerLiter)}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase text-[#64748b] tracking-wide">
                Total Amount
              </span>
              <span className="text-base text-[#14b8a6] font-semibold">
                {formatCurrency(data.totalPrice)}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase text-[#64748b] tracking-wide">
                Purchase Date
              </span>
              <span className="text-base text-[#020617] font-medium">
                {formatDate(data.purchaseDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Purchase Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#020617] border-b pb-2">
            Purchase Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase text-[#64748b] tracking-wide">
                Purchase Company / Supplier
              </span>
              <span className="text-base text-[#020617] font-medium">
                {data.supplier || "—"}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase text-[#64748b] tracking-wide">
                Payment Type
              </span>
              <span className="text-base text-[#020617] font-medium">
                {data.paymentType || "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Notes */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#020617] border-b pb-2">
            Notes
          </h2>
          <div className="flex flex-col space-y-1">
            <span className="text-xs uppercase text-[#64748b] tracking-wide">
              Additional Notes
            </span>
            <span className="text-base text-[#64748b]">
              {data.notes || "—"}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StockView;
