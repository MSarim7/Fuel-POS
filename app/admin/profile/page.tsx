"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function AdminProfilePage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    // Mock admin data - replace with actual auth data
    const adminData = {
        name: "Admin User",
        email: "admin@flamingbun.com",
        password: "Admin@123", // This should come from secure storage
        role: "Administrator",
        joinedDate: "January 2025"
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto p-6">
            {/* Back Button */}
            <div className="flex justify-between items-start md:items-center">
                <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>
            </div>

            <div>
                <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                <p className="text-muted-foreground">
                    Manage your account information
                </p>
            </div>

            {/* Profile Header */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20 border-4 border-primary/20">
                            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                                AD
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-2xl font-semibold">{adminData.name}</h2>
                            <p className="text-muted-foreground">{adminData.role}</p>
                            <p className="text-sm text-muted-foreground">Member since {adminData.joinedDate}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Account Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={adminData.name}
                                disabled
                                className="bg-muted"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={adminData.email}
                                disabled
                                className="bg-muted"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={adminData.password}
                                    readOnly
                                    className="bg-muted pr-10"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Role */}
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input
                                id="role"
                                type="text"
                                value={adminData.role}
                                disabled
                                className="bg-muted"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
