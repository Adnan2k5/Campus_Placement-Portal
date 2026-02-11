'use client'

import { useState } from 'react'
import MainNav from '@/components/main-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, Search, HelpCircle } from 'lucide-react'
import { Input } from '@/components/ui/input' 

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'students' | 'recruiters' | 'general'
}

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'students' | 'recruiters' | 'general'>('all')

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I register on the placement portal?',
      answer:
        'Visit the login page and select "Student" role. Click on "Sign up" and fill in your details including name, email, and password. Once registered, you can complete your profile with academic information and skills.',
      category: 'students',
    },
    {
      id: '2',
      question: 'What is the minimum CGPA required for placement?',
      answer:
        'The minimum CGPA requirement varies by company and position. Most companies require a minimum of 6.0-7.5 CGPA. You can check the eligibility criteria for each job opening before applying.',
      category: 'students',
    },
    {
      id: '3',
      question: 'How do I upload my resume?',
      answer:
        'Go to your profile page and click on the Resume section. Click "Upload Resume" and select your PDF file. You can update your resume at any time before the deadline.',
      category: 'students',
    },
    {
      id: '4',
      question: 'Can I apply for multiple positions from the same company?',
      answer:
        'Yes, you can apply for multiple positions from the same company as long as you meet the eligibility criteria for each role. However, there may be restrictions based on company policies.',
      category: 'students',
    },
    {
      id: '5',
      question: 'How will I know about interview schedules?',
      answer:
        'You will receive notifications on the portal as soon as your application status changes. Make sure to enable notifications and regularly check your email for updates from recruiters.',
      category: 'students',
    },
    {
      id: '6',
      question: 'How do I post a job opening?',
      answer:
        'Go to the "Post Job" section in your recruiter dashboard. Fill in the job details including role, location, CTC, eligibility criteria, and job description. Once submitted, the job will be visible to eligible students.',
      category: 'recruiters',
    },
    {
      id: '7',
      question: 'Can I edit a job posting after publishing?',
      answer:
        'Yes, you can edit job postings that are still open. Go to "My Jobs" section, select the job you want to modify, and click "Edit". Changes will be reflected immediately.',
      category: 'recruiters',
    },
    {
      id: '8',
      question: 'How do I shortlist candidates?',
      answer:
        'In the "Applicants" section, you can view all applications for your job postings. Click on an applicant to view their details and use the "Shortlist" button to move them to the shortlisted stage.',
      category: 'recruiters',
    },
    {
      id: '9',
      question: 'What is the difference between placement and internship?',
      answer:
        'Placement refers to full-time job offers after graduation, while internships are temporary positions during academic years. This portal primarily focuses on placement drives.',
      category: 'general',
    },
    {
      id: '10',
      question: 'Are there any fees for using this portal?',
      answer:
        'No, the placement portal is completely free for students. Both students and recruiters can use all features without any charges.',
      category: 'general',
    },
  ]

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories = [
    { value: 'all' as const, label: 'All Questions' },
    { value: 'students' as const, label: 'For Students' },
    { value: 'recruiters' as const, label: 'For Recruiters' },
    { value: 'general' as const, label: 'General' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle size={32} />
            <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          </div>
          <p className="text-slate-300">Find answers to common questions about the placement portal</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 lg:p-8 space-y-8">
        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <Card key={faq.id} className="hover:shadow-lg transition-shadow">
                <button
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-muted transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-muted-foreground transition-transform flex-shrink-0 ${
                      expandedId === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedId === faq.id && (
                  <CardContent className="border-t border-border pt-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    <div className="mt-4">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          faq.category === 'students'
                            ? 'bg-blue-100 text-blue-800'
                            : faq.category === 'recruiters'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {faq.category === 'students'
                          ? 'For Students'
                          : faq.category === 'recruiters'
                            ? 'For Recruiters'
                            : 'General'}
                      </span>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-12 text-center pb-12">
                <HelpCircle className="mx-auto text-muted-foreground mb-3" size={40} />
                <p className="text-muted-foreground">No FAQs match your search</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact Support */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-900 mb-2">Didn't find your answer?</h3>
            <p className="text-blue-800 text-sm mb-4">
              Contact the placement office at placement@college.edu or visit the help section for more information.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
