'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { mockStudents, mockRecruiters } from './mock-data'

export type UserRole = 'student' | 'recruiter' | 'admin'

export interface AuthContextType {
  user: {
    id: string
    email: string
    name: string
    role: UserRole
  } | null
  isAuthenticated: boolean
  login: (email: string, password: string, role: UserRole) => boolean
  signup: (
    email: string,
    password: string,
    name: string,
    role: UserRole,
  ) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType['user'] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('placement_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem('placement_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (email: string, password: string, role: UserRole): boolean => {
    // Mock authentication - accept any email/password combination
    if (!email || !password) {
      return false
    }

    let userData: AuthContextType['user'] | null = null

    if (role === 'student') {
      const student = mockStudents.find((s) => s.email === email)
      if (student) {
        userData = {
          id: student.id,
          email: student.email,
          name: student.name,
          role: 'student',
        }
      } else {
        // For demo purposes, create a new student
        userData = {
          id: `student_demo_${Date.now()}`,
          email,
          name: email.split('@')[0],
          role: 'student',
        }
      }
    } else if (role === 'recruiter') {
      const recruiter = mockRecruiters.find((r) => r.email === email)
      if (recruiter) {
        userData = {
          id: recruiter.id,
          email: recruiter.email,
          name: recruiter.name,
          role: 'recruiter',
        }
      } else {
        userData = {
          id: `recruiter_demo_${Date.now()}`,
          email,
          name: email.split('@')[0],
          role: 'recruiter',
        }
      }
    } else if (role === 'admin') {
      userData = {
        id: 'admin_1',
        email,
        name: 'Admin User',
        role: 'admin',
      }
    }

    if (userData) {
      setUser(userData)
      localStorage.setItem('placement_user', JSON.stringify(userData))
      return true
    }

    return false
  }

  const signup = (
    email: string,
    password: string,
    name: string,
    role: UserRole,
  ): boolean => {
    if (!email || !password || !name) {
      return false
    }

    const userData: AuthContextType['user'] = {
      id: `${role}_${Date.now()}`,
      email,
      name,
      role,
    }

    setUser(userData)
    localStorage.setItem('placement_user', JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('placement_user')
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
