import EmployerView from "../../_components/viewPage";

type PageProps = {
	params: { id: string };
};

function getMockEmployer(id: string) {
	const base = {
		fullName: "Ali Khan",
		email: "ali@example.com",
		mobile: "+92 300 1234567",
		address: "Street 12, Block A, Karachi",
		fuelPump: "Fuel Pump A",
		status: "active" as const,
		salary: "30000",
		advanceSalary: "5000",
		joiningDate: "2024-01-15",
		notes: "Senior employee with excellent performance record",
	};
	return { employerId: id, ...base };
}

export default function Page({ params }: PageProps) {
	const data = getMockEmployer(params.id);
	return <EmployerView data={data} />;
}
