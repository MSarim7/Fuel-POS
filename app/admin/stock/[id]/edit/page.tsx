import StockEdit from "../../_components/editPage";

type PageProps = {
    params: { id: string };
};

function getMockStockData(id: string) {
    return {
        id,
        fuelType: "Petrol",
        quantity: "5000",
        purchasePricePerLiter: "260",
        salePricePerLiter: "272",
        supplier: "PSO (Pakistan State Oil)",
        paymentType: "Bank Transfer",
        purchaseDate: "2024-01-15",
        notes: "Regular monthly purchase. Quality checked and verified.",
    };
}

export default function Page({ params }: PageProps) {
    const data = getMockStockData(params.id);
    return <StockEdit data={data} />;
}
