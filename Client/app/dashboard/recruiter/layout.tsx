"use client";

import React from "react";

import { useAuth } from "@/Client/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RecruiterNav from "@/components/recruiter/recruiter-nav";

export default function RecruiterDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "recruiter") {
      router.push("/");
    }
    setIsLoading(false);
  }, [user, router]);

  if (isLoading || user?.role !== "recruiter") {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <RecruiterNav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
