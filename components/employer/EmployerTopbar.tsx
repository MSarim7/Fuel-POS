"use client";

import { useState } from "react";
import { LogOut, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface TopbarProps {
    pumpName: string;
    employerName: string;
    activePage: "create" | "sales";
    pumpId: string;
    employerId: string;
    onLogout?: () => void;
}

export const Topbar = ({
    pumpName,
    employerName,
    activePage,
    pumpId,
    employerId,
    onLogout
}: TopbarProps) => {
    const router = useRouter();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleLogoutConfirm = () => {
        if (onLogout) {
            onLogout();
        } else {
            router.push('/login');
        }
        setShowLogoutDialog(false);
    };

    return (
        <>
            <header className="w-full bg-card border-b border-border p-3 sticky top-0 z-50">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    {/* Left Side - Pump Name Badge */}
                    <div className="flex items-center">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-md text-sm font-medium">
                            {pumpName}
                        </span>
                    </div>

                    {/* Center - Navigation Buttons */}
                    <nav className="flex items-center gap-2">
                        <Link href={`/employer/${pumpId}/${employerId}/createSales`}>
                            <Button
                                variant="ghost"
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activePage === "create"
                                    ? "bg-primary/10 text-primary"
                                    : "text-foreground hover:bg-muted"
                                    }`}
                            >
                                Create Sale
                            </Button>
                        </Link>
                        <Link href={`/employer/${pumpId}/${employerId}/sales`}>
                            <Button
                                variant="ghost"
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activePage === "sales"
                                    ? "bg-primary/10 text-primary"
                                    : "text-foreground hover:bg-muted"
                                    }`}
                            >
                                My Sales
                            </Button>
                        </Link>
                    </nav>

                    {/* Right Side - Employer Name + Logout */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground font-medium hidden sm:inline">
                            {employerName}
                        </span>
                        <Button
                            onClick={() => setShowLogoutDialog(true)}
                            variant="ghost"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 px-3 py-1 rounded-md text-sm transition-colors"
                            size="sm"
                        >
                            <LogOut size={14} className="mr-1" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Logout Confirmation Dialog */}
            <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <AlertDialogContent className="bg-card">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-foreground">Confirm Logout</AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground">
                            Are you sure you want to log out from the Point of Sale? You will need to sign in again to create sales.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-muted text-foreground hover:bg-muted/80">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleLogoutConfirm}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                            Logout
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
