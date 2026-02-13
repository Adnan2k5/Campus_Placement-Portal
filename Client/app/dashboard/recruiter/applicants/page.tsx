"use client";

import React from "react";

import { useAuth } from "@/Client/lib/auth-context";
import {
  mockJobOpenings,
  mockApplications,
  mockStudents,
  type Application,
} from "@/Client/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  Award,
} from "lucide-react";
import { useState } from "react";

export default function Applicants() {
  const { user } = useAuth();

  // Get recruiter's job postings
  const recruiterJobs = mockJobOpenings.filter(
    (job) => job.recruiterId === user?.id,
  );

  // Get applications for recruiter's jobs
  const recruiterApplications = mockApplications.filter((app) =>
    recruiterJobs.some((job) => job.id === app.jobId),
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "shortlisted":
        return <CheckCircle className="text-green-500" size={20} />;
      case "rejected":
        return <XCircle className="text-red-500" size={20} />;
      case "selected":
        return <CheckCircle className="text-blue-500" size={20} />;
      default:
        return <Clock className="text-yellow-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "shortlisted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "selected":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const statuses = ["applied", "shortlisted", "rejected", "selected"] as const;

  const handleAction = (
    appId: string,
    newStatus: "shortlisted" | "rejected",
  ) => {
    alert(`Application ${appId} marked as ${newStatus}`);
    // In a real app, this would update the database
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Applicants</h1>
          <p className="text-muted-foreground mt-1">
            Review and manage applications for your job postings
          </p>
        </div>

        {/* Tabs for different statuses */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">
              All ({recruiterApplications.length})
            </TabsTrigger>
            {statuses.map((status) => {
              const count = recruiterApplications.filter(
                (app) => app.status === status,
              ).length;
              return (
                <TabsTrigger key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* All Applications */}
          <TabsContent value="all" className="space-y-4 mt-6">
            {recruiterApplications.length > 0 ? (
              recruiterApplications.map((app) => (
                <ApplicantCard
                  key={app.id}
                  app={app}
                  getStatusIcon={getStatusIcon}
                  getStatusColor={getStatusColor}
                  handleAction={handleAction}
                />
              ))
            ) : (
              <Card>
                <CardContent className="pt-12 text-center pb-12">
                  <Users
                    className="mx-auto text-muted-foreground mb-3"
                    size={40}
                  />
                  <p className="text-muted-foreground">No applications yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Status-specific tabs */}
          {statuses.map((status) => {
            const filteredApps = recruiterApplications.filter(
              (app) => app.status === status,
            );
            return (
              <TabsContent
                key={status}
                value={status}
                className="space-y-4 mt-6"
              >
                {filteredApps.length > 0 ? (
                  filteredApps.map((app) => (
                    <ApplicantCard
                      key={app.id}
                      app={app}
                      getStatusIcon={getStatusIcon}
                      getStatusColor={getStatusColor}
                      handleAction={handleAction}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="pt-12 text-center pb-12">
                      <p className="text-muted-foreground">
                        No applications with {status} status
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}

function ApplicantCard({
  app,
  getStatusIcon,
  getStatusColor,
  handleAction,
}: {
  app: Application & { job?: (typeof mockJobOpenings)[0] };
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusColor: (status: string) => string;
  handleAction: (appId: string, newStatus: "shortlisted" | "rejected") => void;
}) {
  const student = mockStudents.find((s) => s.id === app.studentId);
  const job = mockJobOpenings.find((j) => j.id === app.jobId);

  if (!student || !job) return null;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6 md:items-start">
          {/* Student Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {student.name}
                </h3>
                <p className="text-muted-foreground">
                  {student.branch} • Roll No: {student.rollNo}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(app.status)}
                <Badge className={getStatusColor(app.status)}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Award className="text-muted-foreground" size={16} />
                <span className="text-foreground font-medium">
                  {student.cgpa.toFixed(2)} CGPA
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="text-muted-foreground" size={16} />
                <a
                  href={`mailto:${student.email}`}
                  className="text-blue-600 hover:underline"
                >
                  Email
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="text-muted-foreground" size={16} />
                <span className="text-foreground">{student.phone}</span>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Skills:
              </p>
              <div className="flex flex-wrap gap-1">
                {student.skills.slice(0, 4).map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Job Applied For */}
            <div className="p-3 bg-muted rounded-lg text-sm">
              <p className="text-muted-foreground">Applied for:</p>
              <p className="font-semibold text-foreground">{job.role}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 md:w-48">
            {app.status === "applied" && (
              <>
                <Button
                  onClick={() => handleAction(app.id, "shortlisted")}
                  className="bg-green-600 hover:bg-green-700 w-full"
                >
                  Shortlist
                </Button>
                <Button
                  onClick={() => handleAction(app.id, "rejected")}
                  variant="outline"
                  className="w-full"
                >
                  Reject
                </Button>
              </>
            )}
            {app.status === "shortlisted" && (
              <>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                  Schedule Interview
                </Button>
                <Button
                  onClick={() => handleAction(app.id, "rejected")}
                  variant="outline"
                  className="w-full"
                >
                  Reject
                </Button>
              </>
            )}
            {app.status === "selected" && (
              <Button disabled className="w-full bg-green-600">
                Candidate Selected
              </Button>
            )}
            {app.status === "rejected" && (
              <Button
                disabled
                variant="outline"
                className="w-full bg-transparent"
              >
                Application Rejected
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
