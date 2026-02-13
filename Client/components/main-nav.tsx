'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export default function MainNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Calendar', href: '/calendar' },
    { label: 'FAQ', href: '/faq' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => router.push('/')}
          className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
        >
          PlacementHub
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Login Button */}
        <div className="hidden md:flex items-center gap-3">
          <Button onClick={() => router.push('/')} variant="default">
            Login / Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  router.push(item.href)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button onClick={() => router.push('/')} className="w-full" size="lg">
              Login / Sign Up
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
