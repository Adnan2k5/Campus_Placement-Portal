"use client";

import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, type UserRole } from "@/Client/lib/auth-context";
import { ArrowRight } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const { login, signup, user, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  // Redirect if already authenticated
  if (isAuthenticated && user) {
    if (user.role === "student") {
      router.push("/dashboard/student");
    } else if (user.role === "recruiter") {
      router.push("/dashboard/recruiter");
    } else {
      router.push("/dashboard/admin");
    }
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let success = false;

      if (isLogin) {
        success = login(formData.email, formData.password, selectedRole);
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          setLoading(false);
          return;
        }
        success = signup(
          formData.email,
          formData.password,
          formData.name,
          selectedRole,
        );
      }

      if (success) {
        // Redirect based on role
        if (selectedRole === "student") {
          router.push("/dashboard/student");
        } else if (selectedRole === "recruiter") {
          router.push("/dashboard/recruiter");
        } else {
          router.push("/dashboard/admin");
        }
      } else {
        alert("Invalid credentials or signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Campus Placement Portal</CardTitle>
          <CardDescription>
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Role Selection */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">
              Select Role
            </Label>
            <Tabs
              value={selectedRole}
              onValueChange={(v) => setSelectedRole(v as UserRole)}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Login/Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  disabled={loading}
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>

            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={!isLogin}
                  disabled={loading}
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              size="lg"
            >
              {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          {/* Toggle between Login/Signup */}
          <div className="mt-4 text-center text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({
                  email: "",
                  password: "",
                  name: "",
                  confirmPassword: "",
                });
              }}
              className="text-blue-600 hover:underline font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-semibold text-blue-900 mb-2">
              Demo Credentials:
            </p>
            <p className="text-xs text-blue-800 mb-1">
              <strong>Student:</strong> arjun.kumar@college.edu
            </p>
            <p className="text-xs text-blue-800 mb-1">
              <strong>Recruiter:</strong> john.smith@techcorp.com
            </p>
            <p className="text-xs text-blue-800">
              <strong>Admin:</strong> admin@college.edu
            </p>
            <p className="text-xs text-blue-700 mt-2 italic">
              Password: any value works (mock auth)
            </p>
          </div>

          {/* View Landing Page */}
          <button
            onClick={() => router.push("/landing")}
            className="mt-4 w-full text-center text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center justify-center gap-1"
          >
            View Landing Page
            <ArrowRight size={14} />
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
