import ExpenseEdit from "../../_components/editPage";

type PageProps = {
	params: { id: string };
};

function getMockExpense(id: string) {
	return {
		id,
		expenseTitle: "Diesel Purchase",
		expenseType: "Fuel Purchase",
		amount: "45000",
		date: "2025-11-30",
		pump: "Fuel Pump A",
		paymentMethod: "Cash",
		notes: "Monthly diesel stock purchase for regular customers",
	};
}

export default function Page({ params }: PageProps) {
	const data = getMockExpense(params.id);
	return <ExpenseEdit data={data} />;
}
