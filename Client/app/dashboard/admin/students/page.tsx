"use client";

import { mockStudents } from "@/Client/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Mail, Phone, Award } from "lucide-react";
import { useState } from "react";

export default function AdminStudents() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Student Management
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage all registered students
          </p>
        </div>

        {/* Search and Stats */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-3 text-muted-foreground"
                  size={18}
                />
                <Input
                  placeholder="Search by name, email, or roll number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                <Users size={18} className="text-muted-foreground" />
                <span className="text-foreground font-medium">
                  {filteredStudents.length} students
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Students</CardTitle>
            <CardDescription>
              Complete list of registered students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Roll No
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Branch
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      CGPA
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Phone
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Skills
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-border hover:bg-muted transition-colors"
                      >
                        <td className="py-4 px-4">
                          <span className="font-medium text-foreground">
                            {student.name}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">
                          {student.rollNo}
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">
                          {student.branch}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Award
                              size={16}
                              className="text-muted-foreground"
                            />
                            <span className="text-foreground font-medium">
                              {student.cgpa.toFixed(2)}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <a
                            href={`mailto:${student.email}`}
                            className="text-blue-600 hover:underline"
                          >
                            {student.email}
                          </a>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">
                          {student.phone}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-1 flex-wrap">
                            {student.skills.slice(0, 2).map((skill, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {student.skills.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{student.skills.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-12 text-center text-muted-foreground"
                      >
                        No students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
