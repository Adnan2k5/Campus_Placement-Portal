"use client";

import { useAuth } from "@/Client/lib/auth-context";
import { mockApplications, mockJobOpenings } from "@/Client/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  MapPin,
  IndianRupee,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Applications() {
  const { user } = useAuth();

  const studentApplications = mockApplications.filter(
    (app) => app.studentId === user?.id,
  );

  const applicationsWithDetails = studentApplications.map((app) => ({
    ...app,
    job: mockJobOpenings.find((job) => job.id === app.jobId),
  }));

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

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "shortlisted":
        return "You have been shortlisted! Check notifications for interview details.";
      case "rejected":
        return "Your application was not selected. Good luck with other opportunities!";
      case "selected":
        return "Congratulations! You have been selected. Check your email for offer details.";
      default:
        return "Your application is under review. We will update you soon.";
    }
  };

  const statuses = ["applied", "shortlisted", "rejected", "selected"] as const;

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            My Applications
          </h1>
          <p className="text-muted-foreground mt-1">
            Track the status of all your job applications
          </p>
        </div>

        {/* Tabs for different statuses */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">
              All ({studentApplications.length})
            </TabsTrigger>
            {statuses.map((status) => {
              const count = studentApplications.filter(
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
            {applicationsWithDetails.length > 0 ? (
              applicationsWithDetails.map((app) => (
                <ApplicationCard key={app.id} app={app} />
              ))
            ) : (
              <Card>
                <CardContent className="pt-12 text-center pb-12">
                  <FileText
                    className="mx-auto text-muted-foreground mb-3"
                    size={40}
                  />
                  <p className="text-muted-foreground">No applications yet</p>
                  <Button variant="outline" className="mt-4 bg-transparent">
                    Browse Jobs
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Status-specific tabs */}
          {statuses.map((status) => {
            const filteredApps = applicationsWithDetails.filter(
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
                    <ApplicationCard key={app.id} app={app} />
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

function ApplicationCard({
  app,
}: {
  app: {
    id: string;
    studentId: string;
    jobId: string;
    status: "applied" | "shortlisted" | "rejected" | "selected";
    appliedDate: string;
    job?: (typeof mockJobOpenings)[0];
  };
}) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "shortlisted":
        return <CheckCircle className="text-green-500" size={24} />;
      case "rejected":
        return <XCircle className="text-red-500" size={24} />;
      case "selected":
        return <CheckCircle className="text-blue-500" size={24} />;
      default:
        return <Clock className="text-yellow-500" size={24} />;
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

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "shortlisted":
        return "You have been shortlisted! Check notifications for interview details.";
      case "rejected":
        return "Your application was not selected. Good luck with other opportunities!";
      case "selected":
        return "Congratulations! You have been selected. Check your email for offer details.";
      default:
        return "Your application is under review. We will update you soon.";
    }
  };

  if (!app.job) return null;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Job Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {app.job.role}
                </h3>
                <p className="text-muted-foreground">{app.job.company}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(app.status)}
                <Badge className={getStatusColor(app.status)}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} />
                {app.job.location}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <IndianRupee size={16} />₹{app.job.ctc} LPA
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              Applied on{" "}
              {new Date(app.appliedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <p className="text-sm text-muted-foreground italic border-l-4 border-muted pl-4">
              {getStatusDescription(app.status)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 md:w-40">
            {app.status === "selected" && (
              <Button className="w-full">
                <Download size={16} className="mr-2" />
                Download Offer
              </Button>
            )}
            <Button variant="outline" className="w-full bg-transparent">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
