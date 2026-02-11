'use client'

import { useAuth } from '@/lib/auth-context'
import { mockRecruiters } from '@/lib/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Building2, Mail, Phone, Globe, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function CompanyProfile() {
  const { user } = useAuth()
  const recruiter = mockRecruiters.find((r) => r.id === user?.id)

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    company: recruiter?.company || '',
    phone: recruiter?.phone || '',
    email: recruiter?.email || '',
    location: 'Bangalore, India',
    website: 'www.techcorp.com',
    about:
      'A leading technology company focused on innovative solutions and digital transformation.',
    employees: '5000+',
  })

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Company Profile</h1>
            <p className="text-muted-foreground mt-1">
              Manage your company information and branding
            </p>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 size={20} />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <Label>Company Name</Label>
                {isEditing ? (
                  <Input value={formData.company} readOnly className="mt-2" />
                ) : (
                  <div className="mt-2 p-3 bg-muted rounded-lg text-foreground font-medium">
                    {formData.company}
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <Label className="flex items-center gap-2">
                  <MapPin size={16} />
                  Location
                </Label>
                {isEditing ? (
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="mt-2"
                  />
                ) : (
                  <div className="mt-2 p-3 bg-muted rounded-lg text-foreground font-medium">
                    {formData.location}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <Label className="flex items-center gap-2">
                  <Mail size={16} />
                  Email
                </Label>
                {isEditing ? (
                  <Input value={formData.email} readOnly className="mt-2" />
                ) : (
                  <div className="mt-2 p-3 bg-muted rounded-lg text-foreground font-medium">
                    {formData.email}
                  </div>
                )}
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
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2"
                  />
                ) : (
                  <div className="mt-2 p-3 bg-muted rounded-lg text-foreground font-medium">
                    {formData.phone}
                  </div>
                )}
              </div>

              {/* Website */}
              <div className="md:col-span-2">
                <Label className="flex items-center gap-2">
                  <Globe size={16} />
                  Website
                </Label>
                {isEditing ? (
                  <Input
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="mt-2"
                  />
                ) : (
                  <div className="mt-2 p-3 bg-muted rounded-lg text-foreground font-medium">
                    {formData.website}
                  </div>
                )}
              </div>

              {/* Employees */}
              <div>
                <Label>Number of Employees</Label>
                {isEditing ? (
                  <Input
                    value={formData.employees}
                    onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                    className="mt-2"
                  />
                ) : (
                  <div className="mt-2 p-3 bg-muted rounded-lg text-foreground font-medium">
                    {formData.employees}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Company */}
        <Card>
          <CardHeader>
            <CardTitle>About Company</CardTitle>
            <CardDescription>Company description for job postings</CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                className="min-h-32"
                placeholder="Describe your company..."
              />
            ) : (
              <div className="p-4 bg-muted rounded-lg text-foreground">
                {formData.about}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recruiter Information */}
        <Card>
          <CardHeader>
            <CardTitle>Recruiter Information</CardTitle>
            <CardDescription>Your profile as a recruiter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Name</Label>
                <div className="mt-2 p-3 bg-muted rounded-lg text-foreground font-medium">
                  {recruiter?.name}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Designation</Label>
                <div className="mt-2 p-3 bg-muted rounded-lg text-foreground font-medium">
                  {recruiter?.designation}
                </div>
              </div>
            </div>
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
  )
}
