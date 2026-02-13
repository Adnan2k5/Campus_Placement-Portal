"use client";

import { useAuth } from "@/Client/lib/auth-context";
import {
  mockJobOpenings,
  mockStudents,
  mockApplications,
} from "@/Client/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  MapPin,
  IndianRupee,
  Search,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function JobOpenings() {
  const { user } = useAuth();
  const student = mockStudents.find((s) => s.id === user?.id);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(mockJobOpenings);

  const studentApplications = mockApplications.filter(
    (app) => app.studentId === user?.id,
  );
  const appliedJobIds = new Set(studentApplications.map((app) => app.jobId));

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterJobs(query, filterCompany);
  };

  const handleFilterCompany = (company: string) => {
    setFilterCompany(company);
    filterJobs(searchQuery, company);
  };

  const filterJobs = (search: string, company: string) => {
    let filtered = mockJobOpenings;

    // Filter by search query
    if (search) {
      filtered = filtered.filter(
        (job) =>
          job.role.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Filter by company
    if (company) {
      filtered = filtered.filter((job) => job.company === company);
    }

    // Filter by eligibility
    if (student) {
      filtered = filtered.filter(
        (job) => student.cgpa >= job.eligibility.minCGPA,
      );
    }

    setFilteredJobs(filtered);
  };

  const isEligible = (job: (typeof mockJobOpenings)[0]): boolean => {
    if (!student) return false;
    return (
      student.cgpa >= job.eligibility.minCGPA &&
      job.eligibility.branches.includes(student.branch)
    );
  };

  const hasApplied = (jobId: string): boolean => {
    return appliedJobIds.has(jobId);
  };

  const handleApply = (jobId: string) => {
    // In a real app, this would save the application
    alert("Application submitted successfully!");
  };

  const companies = [...new Set(mockJobOpenings.map((job) => job.company))];

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Openings</h1>
          <p className="text-muted-foreground mt-1">
            Browse and apply for available positions from top companies
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-3 text-muted-foreground"
                    size={18}
                  />
                  <Input
                    placeholder="Search by role or company..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Company
                </label>
                <select
                  value={filterCompany}
                  onChange={(e) => handleFilterCompany(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  <option value="">All Companies</option>
                  {companies.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Results
                </label>
                <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-foreground font-medium">
                  {filteredJobs.length} job
                  {filteredJobs.length !== 1 ? "s" : ""} found
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const eligible = isEligible(job);
              const applied = hasApplied(job.id);

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
                              {job.company}
                            </p>
                          </div>
                          {applied && (
                            <Badge className="bg-green-100 text-green-800">
                              Applied
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin size={16} />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <IndianRupee size={16} />₹{job.ctc} LPA
                          </div>
                          <div className="text-muted-foreground">
                            Deadline:{" "}
                            {new Date(job.deadline).toLocaleDateString()}
                          </div>
                        </div>

                        <p className="text-foreground text-sm mb-3">
                          {job.description}
                        </p>

                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-2">
                            Requirements:
                          </p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {job.requirements.map((req, idx) => (
                              <li key={idx}>• {req}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 p-3 bg-muted rounded-lg text-xs">
                          <p>
                            <strong>Eligibility:</strong> Minimum CGPA:{" "}
                            {job.eligibility.minCGPA} | Branches:{" "}
                            {job.eligibility.branches.join(", ")}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 md:w-48">
                        <Button
                          onClick={() => handleApply(job.id)}
                          disabled={!eligible || applied}
                          className="w-full"
                        >
                          {applied
                            ? "Already Applied"
                            : eligible
                              ? "Apply Now"
                              : "Not Eligible"}
                        </Button>
                        <Link href={`/dashboard/student/jobs/${job.id}`}>
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                          >
                            View Details
                            <ArrowRight size={16} className="ml-2" />
                          </Button>
                        </Link>
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
                <p className="text-muted-foreground">
                  {mockJobOpenings.length === 0
                    ? "No jobs available yet"
                    : "No jobs match your criteria"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
