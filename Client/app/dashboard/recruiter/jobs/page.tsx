"use client";

import { useAuth } from "@/Client/lib/auth-context";
import { mockJobOpenings, mockApplications } from "@/Client/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  MapPin,
  IndianRupee,
  Users,
  Edit,
  Trash2,
} from "lucide-react";

export default function RecruiterJobs() {
  const { user } = useAuth();

  // Get recruiter's job postings
  const recruiterJobs = mockJobOpenings.filter(
    (job) => job.recruiterId === user?.id,
  );

  // Get applications for recruiter's jobs
  const recruiterApplications = mockApplications.filter((app) =>
    recruiterJobs.some((job) => job.id === app.jobId),
  );

  const handleEdit = (jobId: string) => {
    // In a real app, this would navigate to edit page
    alert("Edit job: " + jobId);
  };

  const handleDelete = (jobId: string) => {
    // In a real app, this would delete the job
    alert("Delete job: " + jobId);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              My Job Postings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage all your active job postings
            </p>
          </div>
          <Button>
            <Briefcase size={16} className="mr-2" />
            Post New Job
          </Button>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {recruiterJobs.length > 0 ? (
            recruiterJobs.map((job) => {
              const jobApplications = recruiterApplications.filter(
                (app) => app.jobId === job.id,
              );

              return (
                <Card
                  key={job.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">
                              {job.role}
                            </h3>
                            <p className="text-muted-foreground">
                              {job.location}
                            </p>
                          </div>
                          <Badge variant="outline">Active</Badge>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <IndianRupee size={16} />₹{job.ctc} LPA
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users size={16} />
                            {jobApplications.length} applications
                          </div>
                          <div className="text-muted-foreground">
                            Deadline:{" "}
                            {new Date(job.deadline).toLocaleDateString()}
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.eligibility.branches.map((branch, idx) => (
                            <Badge key={idx} variant="secondary">
                              {branch}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Min CGPA: {job.eligibility.minCGPA}
                        </p>
                      </div>

                      {/* Stats and Actions */}
                      <div className="flex flex-col gap-3 md:w-40">
                        <div className="p-4 bg-muted rounded-lg text-center">
                          <p className="text-2xl font-bold text-foreground">
                            {jobApplications.length}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Total Applications
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="p-2 bg-yellow-50 rounded">
                            <p className="font-bold text-yellow-800">
                              {
                                jobApplications.filter(
                                  (a) => a.status === "applied",
                                ).length
                              }
                            </p>
                            <p className="text-yellow-700">Applied</p>
                          </div>
                          <div className="p-2 bg-green-50 rounded">
                            <p className="font-bold text-green-800">
                              {
                                jobApplications.filter(
                                  (a) => a.status === "shortlisted",
                                ).length
                              }
                            </p>
                            <p className="text-green-700">Short</p>
                          </div>
                          <div className="p-2 bg-blue-50 rounded">
                            <p className="font-bold text-blue-800">
                              {
                                jobApplications.filter(
                                  (a) => a.status === "selected",
                                ).length
                              }
                            </p>
                            <p className="text-blue-700">Select</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(job.id)}
                            className="flex-1"
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(job.id)}
                            className="flex-1"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card>
              <CardContent className="pt-12 text-center pb-12">
                <Briefcase
                  className="mx-auto text-muted-foreground mb-3"
                  size={40}
                />
                <p className="text-muted-foreground">No job postings yet</p>
                <Button className="mt-4">Post Your First Job</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
