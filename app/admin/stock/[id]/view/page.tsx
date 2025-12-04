import StockView from "../../_components/viewPage";

type PageProps = {
    params: { id: string };
};

function getMockStockData(id: string) {
    return {
        id,
        fuelType: "Petrol",
        quantity: 5000,
        pricePerLiter: 272,
        totalPrice: 1360000,
        supplier: "PSO (Pakistan State Oil)",
        paymentType: "Bank Transfer",
        purchaseDate: "2024-01-15",
        notes: "Regular monthly purchase. Quality checked and verified.",
    };
}

export default function Page({ params }: PageProps) {
    const data = getMockStockData(params.id);
    return <StockView data={data} />;
}
