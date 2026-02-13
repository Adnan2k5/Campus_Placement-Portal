"use client";

import React from "react";

import { useAuth } from "@/Client/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminNav from "@/components/admin/admin-nav";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "admin") {
      router.push("/");
    }
    setIsLoading(false);
  }, [user, router]);

  if (isLoading || user?.role !== "admin") {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminNav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
