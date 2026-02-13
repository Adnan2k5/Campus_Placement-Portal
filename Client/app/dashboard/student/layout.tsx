"use client";

import React from "react";

import { useAuth } from "@/Client/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StudentNav from "@/components/student/student-nav";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "student") {
      router.push("/");
    }
    setIsLoading(false);
  }, [user, router]);

  if (isLoading || user?.role !== "student") {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <StudentNav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
