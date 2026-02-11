'use client'

import { mockRecruiters, mockJobOpenings } from '@/lib/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Building2, Search, Mail, Phone, Briefcase } from 'lucide-react'
import { useState } from 'react'

export default function AdminRecruiters() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRecruiters = mockRecruiters.filter(
    (recruiter) =>
      recruiter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recruiter.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recruiter.company.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Recruiter Management</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all registered recruiters
          </p>
        </div>

        {/* Search and Stats */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search by name, company, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                <Building2 size={18} className="text-muted-foreground" />
                <span className="text-foreground font-medium">
                  {filteredRecruiters.length} recruiters
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recruiters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecruiters.length > 0 ? (
            filteredRecruiters.map((recruiter) => {
              const recruiterJobs = mockJobOpenings.filter(
                (job) => job.recruiterId === recruiter.id,
              ).length

              return (
                <Card key={recruiter.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{recruiter.name}</h3>
                        <p className="text-sm text-muted-foreground">{recruiter.designation}</p>
                      </div>

                      {/* Company */}
                      <div className="flex items-start gap-2">
                        <Building2 className="text-muted-foreground flex-shrink-0 mt-1" size={16} />
                        <div>
                          <p className="text-xs text-muted-foreground">Company</p>
                          <p className="text-sm font-medium text-foreground">{recruiter.company}</p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start gap-2">
                        <Mail className="text-muted-foreground flex-shrink-0 mt-1" size={16} />
                        <a
                          href={`mailto:${recruiter.email}`}
                          className="text-sm text-blue-600 hover:underline break-all"
                        >
                          {recruiter.email}
                        </a>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start gap-2">
                        <Phone className="text-muted-foreground flex-shrink-0 mt-1" size={16} />
                        <p className="text-sm text-foreground">{recruiter.phone}</p>
                      </div>

                      {/* Job Postings */}
                      <div className="p-3 bg-muted rounded-lg flex items-center gap-3">
                        <Briefcase className="text-muted-foreground" size={20} />
                        <div>
                          <p className="text-xs text-muted-foreground">Active Job Postings</p>
                          <p className="text-lg font-bold text-foreground">{recruiterJobs}</p>
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <Card className="col-span-full">
              <CardContent className="pt-12 text-center pb-12">
                <Building2 className="mx-auto text-muted-foreground mb-3" size={40} />
                <p className="text-muted-foreground">No recruiters found</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
