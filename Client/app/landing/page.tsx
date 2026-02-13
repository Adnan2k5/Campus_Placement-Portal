'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import MainNav from '@/components/main-nav'
import { ArrowRight, Briefcase, Users, TrendingUp, Shield, Zap, Globe } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Landing() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Your Career Starts Here
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Connect with top companies, explore career opportunities, and land your dream job
                through our comprehensive placement portal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => router.push('/')}
                  className="text-base font-semibold"
                >
                  Get Started
                  <ArrowRight size={20} className="ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => router.push('/about')}
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="w-full aspect-square bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl shadow-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Us?</h2>
          <p className="text-xl text-muted-foreground">
            The all-in-one platform for students, recruiters, and placement officers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: 'For Students',
              description: 'Access job opportunities, track applications, and manage your career growth in one place.',
            },
            {
              icon: Briefcase,
              title: 'For Recruiters',
              description: 'Find top talent, post jobs, and manage applications with our streamlined platform.',
            },
            {
              icon: Shield,
              title: 'For Admins',
              description: 'Oversee placements, manage portals, and track institutional statistics effortlessly.',
            },
            {
              icon: Zap,
              title: 'Fast & Efficient',
              description: 'Quick application process, instant notifications, and real-time updates.',
            },
            {
              icon: Globe,
              title: 'Global Reach',
              description: 'Connect with companies worldwide and explore international career opportunities.',
            },
            {
              icon: TrendingUp,
              title: 'Success Stories',
              description: 'Join thousands of students who have successfully placed in top organizations.',
            },
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Card key={idx}>
                <CardContent className="pt-8">
                  <Icon className="text-primary mb-4" size={32} />
                  <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Active Students' },
              { value: '50+', label: 'Partner Companies' },
              { value: '95%', label: 'Placement Rate' },
              { value: '₹12 LPA', label: 'Average CTC' },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground">
            Simple steps to your dream job
          </p>
        </div>

        <div className="space-y-8">
          {[
            {
              step: '1',
              title: 'Register & Create Profile',
              desc: 'Sign up on our portal and build your complete profile with academic details and skills.',
            },
            {
              step: '2',
              title: 'Explore Opportunities',
              desc: 'Browse through job openings from top companies and find positions matching your skills.',
            },
            {
              step: '3',
              title: 'Apply & Track',
              desc: 'Apply for positions and track your application status in real-time through our dashboard.',
            },
            {
              step: '4',
              title: 'Interviews & Selection',
              desc: 'Get shortlisted, participate in interviews, and receive offer letters from companies.',
            },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                {item.step}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join our community of students and connect with leading organizations.
          </p>
          <Button
            size="lg"
            onClick={() => router.push('/')}
            className="text-base font-semibold"
          >
            Get Started Now
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PlacementHub</h3>
              <p className="text-slate-300 text-sm">
                Connecting talented students with leading organizations worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>
                  <button onClick={() => router.push('/')} className="hover:text-white">
                    Login
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/calendar')} className="hover:text-white">
                    Calendar
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/faq')} className="hover:text-white">
                    FAQ
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>
                  <button onClick={() => router.push('/about')} className="hover:text-white">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/contact')} className="hover:text-white">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <p className="text-slate-300 text-sm mb-1">placement@college.edu</p>
              <p className="text-slate-300 text-sm">+91-XXXX-XXXXXX</p>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8">
            <p className="text-center text-slate-400 text-sm">
              © 2024 PlacementHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
