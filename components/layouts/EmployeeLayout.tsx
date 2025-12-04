'use client';

import { ReactNode } from "react";
import { TopBar } from "@/components/admin/POSTopbar";

interface EmployeeLayoutProps {
  children: ReactNode;
}

export const EmployeeLayout = ({ children }: EmployeeLayoutProps) => {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      <TopBar title="Employee Portal" showUserMenu />
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
};
