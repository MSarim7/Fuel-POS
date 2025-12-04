import ExpenseView from "../../_components/viewPage";

type PageProps = {
	params: { id: string };
};

function getMockExpense(id: string) {
	return {
		id,
		name: "Diesel Purchase",
		type: "Fuel Purchase",
		amount: 500000,
		pump: "Fuel Pump A",
		date: "2025-11-30",
		paymentMethod: "Bank Transfer",
		createdBy: "Admin User",
		notes: "Bulk diesel purchase for inventory restocking",
	};
}

export default function Page({ params }: PageProps) {
	const data = getMockExpense(params.id);
	return <ExpenseView data={data} />;
}
