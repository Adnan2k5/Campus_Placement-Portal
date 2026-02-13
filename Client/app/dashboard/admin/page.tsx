"use client";

import {
  mockStatistics,
  mockStudents,
  mockRecruiters,
  mockJobOpenings,
} from "@/Client/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Briefcase,
  TrendingUp,
  Award,
  BarChart3,
  Building2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const stats = mockStatistics;

  // Pie chart colors
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage all aspects of the campus placement system
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Students
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.totalStudents}
                  </p>
                </div>
                <Users className="text-blue-500" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Recruiters
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.totalRecruiters}
                  </p>
                </div>
                <Building2 className="text-purple-500" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Job Postings
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.totalJobs}
                  </p>
                </div>
                <Briefcase className="text-green-500" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Companies Visited
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.companiesVisited}
                  </p>
                </div>
                <TrendingUp className="text-orange-500" size={32} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Placement Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Placement Rate
                </p>
                <p className="text-4xl font-bold text-green-600">
                  {((stats.placedStudents / stats.totalStudents) * 100).toFixed(
                    0,
                  )}
                  %
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {stats.placedStudents} out of {stats.totalStudents} students
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Average CTC
                </p>
                <p className="text-4xl font-bold text-blue-600">
                  ₹{stats.averageCTC} LPA
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Across all placed students
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Highest CTC
                </p>
                <p className="text-4xl font-bold text-purple-600">
                  ₹{stats.highestCTC} LPA
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Package offered
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department-wise Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 size={20} />
              Department-wise Placement Statistics
            </CardTitle>
            <CardDescription>
              Number of placed students by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.departmentStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="department"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="placed" fill="#10b981" name="Placed" />
                <Bar dataKey="total" fill="#e5e7eb" name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Placement Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Placement Distribution</CardTitle>
            <CardDescription>
              Visual breakdown of placement statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Placed", value: stats.placedStudents },
                      {
                        name: "Not Placed",
                        value: stats.totalStudents - stats.placedStudents,
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-4 md:w-48">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-foreground">
                    Placed: {stats.placedStudents}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-foreground">
                    Not Placed: {stats.totalStudents - stats.placedStudents}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Overview</CardTitle>
            <CardDescription>
              Summary of placement portal status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <span className="text-foreground font-medium">
                Active Job Openings
              </span>
              <Badge>{mockJobOpenings.length}</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <span className="text-foreground font-medium">
                Registered Students
              </span>
              <Badge variant="secondary">{mockStudents.length}</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <span className="text-foreground font-medium">
                Registered Recruiters
              </span>
              <Badge variant="secondary">{mockRecruiters.length}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
