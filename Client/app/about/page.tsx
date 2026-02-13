'use client'

import MainNav from '@/components/main-nav'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Target, Trophy, ArrowRight, MapPin, Mail, Phone } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">About Placement Cell</h1>
          <p className="text-slate-300">
            Bridging the gap between talented students and leading organizations
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 lg:p-8 space-y-12">
        {/* Mission Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-blue-500" size={28} />
                <h3 className="text-xl font-bold text-foreground">Our Mission</h3>
              </div>
              <p className="text-muted-foreground">
                To provide equal opportunities to all students and facilitate their successful
                placement in prestigious organizations through comprehensive support and guidance.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="text-yellow-500" size={28} />
                <h3 className="text-xl font-bold text-foreground">Our Vision</h3>
              </div>
              <p className="text-muted-foreground">
                To establish a premier placement ecosystem where students excel in their careers,
                recruiters find top talent, and the college maintains strong industry partnerships.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <Card>
          <CardContent className="pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">About Us</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                The Placement Cell is an integral part of our college, dedicated to bridging the
                gap between our talented student community and the industry. With a track record of
                successful placements, we pride ourselves on connecting exceptional students with
                leading organizations globally.
              </p>
              <p>
                Our portal serves as a comprehensive platform for students to explore career
                opportunities, showcase their skills, and apply for positions from top companies.
                Recruiters use our portal to identify and hire talented graduates who can contribute
                to their organizations.
              </p>
              <p>
                We are committed to maintaining transparency, fairness, and ethics in all placement
                activities. Our team works tirelessly to ensure that every student gets a fair chance
                to pursue their career aspirations.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Key Statistics */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Students Registered', value: '500+' },
              { label: 'Companies Partnered', value: '50+' },
              { label: 'Placement Rate', value: '95%' },
              { label: 'Average CTC', value: '₹12 LPA' },
            ].map((stat, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <Card>
          <CardContent className="pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Transparency',
                  desc: 'We maintain complete transparency in all placement processes and communications.',
                },
                {
                  title: 'Fairness',
                  desc: 'Equal opportunities for all students irrespective of background or circumstances.',
                },
                {
                  title: 'Excellence',
                  desc: 'We strive for excellence in every aspect of placement facilitation.',
                },
                {
                  title: 'Integrity',
                  desc: 'Upholding highest standards of ethics and integrity in all activities.',
                },
                {
                  title: 'Support',
                  desc: 'Continuous support and guidance to students throughout their placement journey.',
                },
                {
                  title: 'Partnership',
                  desc: 'Strong partnerships with industry to bring best opportunities to students.',
                },
              ].map((value, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent className="pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Get In Touch</h2>
            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  title: 'Address',
                  value: 'Placement Cell, College Campus, City, State - PIN',
                },
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
              ].map((contact, idx) => {
                const Icon = contact.icon
                return (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <Icon className="text-primary flex-shrink-0" size={24} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-muted-foreground">{contact.title}</p>
                      {contact.link ? (
                        <a href={contact.link} className="text-foreground font-medium hover:text-primary">
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">{contact.value}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready to Start Your Career Journey?</h2>
          <p>Join thousands of students who have successfully placed in leading organizations.</p>
          <Button
            onClick={() => (window.location.href = '/')}
            className="bg-white text-blue-600 hover:bg-slate-100"
          >
            Register Now
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
