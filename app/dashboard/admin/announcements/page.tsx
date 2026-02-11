'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Bell, Trash2, Plus } from 'lucide-react'
import { useState } from 'react'

interface Announcement {
  id: string
  title: string
  message: string
  date: string
  type: 'general' | 'important' | 'deadline'
}

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Campus Drive - TechCorp Solutions',
      message: 'TechCorp Solutions will be visiting our campus on 15th March 2024 for recruitment.',
      date: '2024-02-20',
      type: 'important',
    },
    {
      id: '2',
      title: 'Deadline Extended',
      message: 'The deadline for registering on the placement portal has been extended to 10th March 2024.',
      date: '2024-02-21',
      type: 'deadline',
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'general' as const,
  })

  const handleAddAnnouncement = () => {
    if (formData.title && formData.message) {
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
      }
      setAnnouncements([newAnnouncement, ...announcements])
      setFormData({ title: '', message: '', type: 'general' })
      setShowForm(false)
    }
  }

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'important':
        return 'bg-red-100 text-red-800'
      case 'deadline':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Announcements</h1>
            <p className="text-muted-foreground mt-1">
              Manage placement portal announcements and notifications
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus size={16} className="mr-2" />
            New Announcement
          </Button>
        </div>

        {/* Add Announcement Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Announcement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Announcement title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Announcement message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2 min-h-32"
                />
              </div>

              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground mt-2"
                >
                  <option value="general">General</option>
                  <option value="important">Important</option>
                  <option value="deadline">Deadline</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    setFormData({ title: '', message: '', type: 'general' })
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddAnnouncement}>Post Announcement</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Bell className="text-muted-foreground" size={20} />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground">
                            {announcement.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {new Date(announcement.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{announcement.message}</p>

                      <div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getTypeColor(announcement.type)}`}>
                          {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(announcement.id)}
                      className="text-muted-foreground hover:text-red-600 transition-colors flex-shrink-0 mt-1"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-12 text-center pb-12">
                <Bell className="mx-auto text-muted-foreground mb-3" size={40} />
                <p className="text-muted-foreground">No announcements yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
