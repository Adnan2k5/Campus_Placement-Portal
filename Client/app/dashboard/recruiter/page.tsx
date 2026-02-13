"use client";

import { useAuth } from "@/Client/lib/auth-context";
import {
  mockJobOpenings,
  mockApplications,
  mockRecruiters,
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
  Briefcase,
  Users,
  TrendingUp,
  CheckCircle,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const recruiter = mockRecruiters.find((r) => r.id === user?.id);

  // Get recruiter's job postings
  const recruiterJobs = mockJobOpenings.filter(
    (job) => job.recruiterId === user?.id,
  );

  // Get applications for recruiter's jobs
  const recruiterApplications = mockApplications.filter((app) =>
    recruiterJobs.some((job) => job.id === app.jobId),
  );

  // Statistics
  const stats = {
    totalJobs: recruiterJobs.length,
    totalApplications: recruiterApplications.length,
    shortlisted: recruiterApplications.filter((a) => a.status === "shortlisted")
      .length,
    selected: recruiterApplications.filter((a) => a.status === "selected")
      .length,
  };

  // Chart data - applications by job
  const chartData = recruiterJobs.map((job) => ({
    name: job.role.substring(0, 10),
    applications: recruiterApplications.filter((app) => app.jobId === job.id)
      .length,
    ctc: job.ctc,
  }));

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Recruiter Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {recruiter?.name} from {recruiter?.company}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Job Postings</p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.totalJobs}
                  </p>
                </div>
                <Briefcase className="text-blue-500" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Applications</p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.totalApplications}
                  </p>
                </div>
                <Users className="text-purple-500" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Shortlisted</p>
                  <p className="text-3xl font-bold text-green-600">
                    {stats.shortlisted}
                  </p>
                </div>
                <TrendingUp className="text-green-500" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Selected</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {stats.selected}
                  </p>
                </div>
                <CheckCircle className="text-blue-500" size={32} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Chart */}
        {chartData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 size={20} />
                Applications by Job
              </CardTitle>
              <CardDescription>
                Number of applications received for each position
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="applications" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Recent Job Postings */}
        <Card>
          <CardHeader>
            <CardTitle>Active Job Postings</CardTitle>
            <CardDescription>Your currently open positions</CardDescription>
          </CardHeader>
          <CardContent>
            {recruiterJobs.length > 0 ? (
              <div className="space-y-4">
                {recruiterJobs.map((job) => {
                  const jobApplications = recruiterApplications.filter(
                    (app) => app.jobId === job.id,
                  );
                  return (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {job.role}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {job.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-foreground">
                            {jobApplications.length}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            applications
                          </p>
                        </div>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No job postings yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
