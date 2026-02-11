'use client'

import { useAuth } from '@/lib/auth-context'
import { mockApplications, mockJobOpenings, mockNotifications } from '@/lib/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Briefcase, Clock, CheckCircle, XCircle, FileText, Bell } from 'lucide-react'

export default function StudentDashboard() {
  const { user } = useAuth()

  // Get student's applications
  const studentApplications = mockApplications.filter((app) => app.studentId === user?.id)

  // Get applications with job details
  const applicationsWithDetails = studentApplications.map((app) => ({
    ...app,
    job: mockJobOpenings.find((job) => job.id === app.jobId),
  }))

  // Count applications by status
  const stats = {
    applied: studentApplications.filter((a) => a.status === 'applied').length,
    shortlisted: studentApplications.filter((a) => a.status === 'shortlisted').length,
    rejected: studentApplications.filter((a) => a.status === 'rejected').length,
    selected: studentApplications.filter((a) => a.status === 'selected').length,
  }

  // Get notifications for this student
  const studentNotifications = mockNotifications.filter((n) => n.studentId === user?.id)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return <CheckCircle className="text-green-500" size={20} />
      case 'rejected':
        return <XCircle className="text-red-500" size={20} />
      case 'selected':
        return <CheckCircle className="text-blue-500" size={20} />
      default:
        return <Clock className="text-yellow-500" size={20} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'selected':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground mt-1">Manage your job applications and track your placement progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Applied</p>
                  <p className="text-3xl font-bold text-foreground">{stats.applied}</p>
                </div>
                <Briefcase className="text-blue-500" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Shortlisted</p>
                  <p className="text-3xl font-bold text-green-600">{stats.shortlisted}</p>
                </div>
                <CheckCircle className="text-green-500" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <XCircle className="text-red-500" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Selected</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.selected}</p>
                </div>
                <FileText className="text-blue-500" size={32} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>View your latest job applications and their status</CardDescription>
          </CardHeader>
          <CardContent>
            {applicationsWithDetails.length > 0 ? (
              <div className="space-y-4">
                {applicationsWithDetails.slice(0, 5).map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{app.job?.role}</h3>
                      <p className="text-sm text-muted-foreground">{app.job?.company}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Applied on {new Date(app.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(app.status)}
                      <Badge className={getStatusColor(app.status)}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No applications yet</p>
            )}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} />
              Recent Notifications
            </CardTitle>
            <CardDescription>Stay updated with placement news</CardDescription>
          </CardHeader>
          <CardContent>
            {studentNotifications.length > 0 ? (
              <div className="space-y-4">
                {studentNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-lg border border-border ${
                      notif.read ? 'bg-background' : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm text-foreground">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(notif.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No notifications</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
