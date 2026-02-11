'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Building2,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

export default function RecruiterNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Dashboard', href: '/dashboard/recruiter', icon: LayoutDashboard },
    { label: 'Post Job', href: '/dashboard/recruiter/post-job', icon: Briefcase },
    { label: 'My Jobs', href: '/dashboard/recruiter/jobs', icon: Briefcase },
    { label: 'Applicants', href: '/dashboard/recruiter/applicants', icon: Users },
    { label: 'Company Profile', href: '/dashboard/recruiter/company', icon: Building2 },
  ]

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative w-64 h-screen bg-card border-r border-border transition-transform duration-300 z-40 overflow-y-auto`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary mb-8">PlacementHub</h1>

          {/* User Info */}
          <Card className="mb-6 p-4 bg-muted">
            <p className="text-sm font-semibold text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </Card>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <button
                  key={item.href}
                  onClick={() => {
                    router.push(item.href)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-card">
          <Button onClick={handleLogout} variant="destructive" size="sm" className="w-full">
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
