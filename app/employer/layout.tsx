import { EmployeeLayout } from "@/components/layouts/EmployeeLayout";

export default function EmployeeRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EmployeeLayout>{children}</EmployeeLayout>;
}
