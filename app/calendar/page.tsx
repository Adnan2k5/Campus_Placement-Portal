'use client'

import { useState } from 'react'
import MainNav from '@/components/main-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

interface PlacementEvent {
  date: string
  title: string
  company?: string
  type: 'drive' | 'deadline' | 'notice'
  description: string
}

export default function PlacementCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1))

  const events: PlacementEvent[] = [
    {
      date: '2024-03-01',
      title: 'Registration Opens',
      type: 'notice',
      description: 'Placement registration begins for all students',
    },
    {
      date: '2024-03-10',
      title: 'TechCorp Campus Drive',
      company: 'TechCorp Solutions',
      type: 'drive',
      description: 'On-campus recruitment drive. Location: Auditorium',
    },
    {
      date: '2024-03-15',
      title: 'InnovateTech Recruitment',
      company: 'InnovateTech',
      type: 'drive',
      description: 'Full Stack Developer positions. Registration closed on 12th',
    },
    {
      date: '2024-03-20',
      title: 'Application Deadline',
      type: 'deadline',
      description: 'Last date to apply for upcoming drives',
    },
    {
      date: '2024-03-25',
      title: 'FinanceFlow Campus Drive',
      company: 'FinanceFlow',
      type: 'drive',
      description: 'Data Analyst positions. Eligibility: 6.5+ CGPA',
    },
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.find((e) => e.date === dateStr)
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: firstDay }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1),
  )

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'drive':
        return 'bg-blue-100 text-blue-800'
      case 'deadline':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'drive':
        return '🏢'
      case 'deadline':
        return '📌'
      default:
        return '📢'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Calendar size={32} />
            <h1 className="text-4xl font-bold">Placement Calendar</h1>
          </div>
          <p className="text-slate-300">Track all important placement drives and deadlines</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {currentDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={prevMonth}>
                    <ChevronLeft size={18} />
                  </Button>
                  <Button size="sm" variant="outline" onClick={nextMonth}>
                    <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, idx) => {
                  const event = day ? getEventForDate(day) : null
                  const isToday =
                    day &&
                    currentDate.getFullYear() === new Date().getFullYear() &&
                    currentDate.getMonth() === new Date().getMonth() &&
                    day === new Date().getDate()

                  return (
                    <div
                      key={idx}
                      className={`aspect-square p-2 rounded-lg border border-border flex flex-col items-center justify-center text-sm relative group ${
                        day
                          ? isToday
                            ? 'bg-primary text-primary-foreground'
                            : event
                              ? 'bg-muted border-primary/50 cursor-pointer'
                              : 'hover:bg-muted'
                          : 'bg-muted/30'
                      }`}
                    >
                      {day && (
                        <>
                          <span className="font-semibold">{day}</span>
                          {event && (
                            <span className="text-lg absolute bottom-1">{getTypeIcon(event.type)}</span>
                          )}
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Events List */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>All placement activities</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {events.map((event, idx) => (
                  <div key={idx} className="border-l-4 border-primary p-3 bg-muted rounded-r-lg">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${getTypeColor(event.type)}`}>
                        {event.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm text-foreground mb-1">{event.title}</h4>
                    {event.company && (
                      <p className="text-xs text-muted-foreground mb-1">
                        <strong>Company:</strong> {event.company}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Notice */}
        <Card className="mt-8 border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <p className="text-sm text-orange-900">
              <strong>📌 Important:</strong> Students are advised to regularly check this calendar
              for placement drives and application deadlines. Make sure to register before the
              deadline to participate in campus drives.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
