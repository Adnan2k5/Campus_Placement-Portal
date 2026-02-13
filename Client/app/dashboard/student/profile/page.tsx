"use client";

import { useAuth } from "@/Client/lib/auth-context";
import { mockStudents } from "@/Client/lib/mock-data";
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
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, BookOpen, Award, FileText } from "lucide-react";
import { useState } from "react";

export default function StudentProfile() {
  const { user } = useAuth();
  const student = mockStudents.find((s) => s.id === user?.id) || {
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    rollNo: "N/A",
    branch: "Computer Science",
    cgpa: 0,
    skills: [],
    phone: "N/A",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: student.phone,
    cgpa: student.cgpa.toString(),
  });

  const handleSave = () => {
    // In a real app, this would save to a database
    setIsEditing(false);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground mt-1">
              Manage your personal and academic information
            </p>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award size={20} />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <Label>Full Name</Label>
                <div className="mt-2 p-3 bg-muted rounded-lg text-foreground font-medium">
                  {student.name}
                </div>
              </div>

              {/* Email */}
              <div>
                <Label className="flex items-center gap-2">
                  <Mail size={16} />
                  Email Address
                </Label>
                <div className="mt-2 p-3 bg-muted rounded-lg text-foreground font-medium">
                  {student.email}
                </div>
              </div>

              {/* Phone */}
              <div>
                <Label className="flex items-center gap-2">
                  <Phone size={16} />
                  Phone Number
                </Label>
                {isEditing ? (
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-2"
                  />
                ) : (
                  <div className="mt-2 p-3 bg-muted rounded-lg text-foreground font-medium">
                    {student.phone}
                  </div>
                )}
              </div>

              {/* Roll Number */}
              <div>
                <Label>Roll Number</Label>
                <div className="mt-2 p-3 bg-muted rounded-lg text-foreground font-medium">
                  {student.rollNo}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen size={20} />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Branch */}
              <div>
                <Label>Branch</Label>
                <div className="mt-2 p-3 bg-muted rounded-lg text-foreground font-medium">
                  {student.branch}
                </div>
              </div>

              {/* CGPA */}
              <div>
                <Label>CGPA</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={formData.cgpa}
                    onChange={(e) =>
                      setFormData({ ...formData, cgpa: e.target.value })
                    }
                    className="mt-2"
                  />
                ) : (
                  <div className="mt-2 p-3 bg-muted rounded-lg text-foreground font-medium">
                    {student.cgpa.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Skills</CardTitle>
            <CardDescription>Skills relevant for placements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {student.skills.length > 0 ? (
                student.skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground">No skills added yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Resume */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText size={20} />
              Resume
            </CardTitle>
            <CardDescription>Upload or manage your resume</CardDescription>
          </CardHeader>
          <CardContent>
            {student.resume ? (
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="text-blue-500" size={24} />
                  <div>
                    <p className="font-medium text-foreground">Resume.pdf</p>
                    <p className="text-sm text-muted-foreground">
                      Uploaded recently
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <FileText
                  className="mx-auto text-muted-foreground mb-3"
                  size={32}
                />
                <p className="text-muted-foreground mb-4">No resume uploaded</p>
                <Button>Upload Resume</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save Changes */}
        {isEditing && (
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </div>
    </div>
  );
}
