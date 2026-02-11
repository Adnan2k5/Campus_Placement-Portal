'use client'

import React from "react"

import { useState } from 'react'
import MainNav from '@/components/main-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setFormData({ name: '', email: '', subject: '', message: '' })

      // Reset after 3 seconds
      setTimeout(() => setSubmitted(false), 3000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-slate-300">Get in touch with the Placement Cell</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info Cards */}
          {[
            {
              icon: Mail,
              title: 'Email',
              value: 'placement@college.edu',
              link: 'mailto:placement@college.edu',
            },
            {
              icon: Phone,
              title: 'Phone',
              value: '+91-XXXX-XXXXXX',
              link: 'tel:+91-XXXX-XXXXXX',
            },
            {
              icon: MapPin,
              title: 'Address',
              value: 'College Campus, City, State',
            },
          ].map((contact, idx) => {
            const Icon = contact.icon
            return (
              <Card key={idx}>
                <CardContent className="pt-6 text-center">
                  <Icon className="mx-auto text-primary mb-4" size={32} />
                  <h3 className="font-semibold text-foreground mb-2">{contact.title}</h3>
                  {contact.link ? (
                    <a href={contact.link} className="text-blue-600 hover:underline">
                      {contact.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{contact.value}</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="text-green-500 mb-4" size={48} />
                <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="mt-2 min-h-32"
                  />
                </div>

                <Button type="submit" disabled={loading} size="lg" className="w-full">
                  <Send size={16} className="mr-2" />
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Office Hours */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <h3 className="font-bold text-foreground mb-4">Office Hours</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Monday - Friday:</strong> 10:00 AM - 5:00 PM
              </p>
              <p>
                <strong className="text-foreground">Saturday:</strong> 10:00 AM - 2:00 PM
              </p>
              <p>
                <strong className="text-foreground">Sunday:</strong> Closed
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
