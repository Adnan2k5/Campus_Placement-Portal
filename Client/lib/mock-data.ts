export interface Student {
  id: string
  name: string
  email: string
  rollNo: string
  branch: string
  cgpa: number
  skills: string[]
  resume?: string
  phone: string
}

export interface Recruiter {
  id: string
  name: string
  email: string
  company: string
  phone: string
  designation: string
}

export interface JobOpening {
  id: string
  company: string
  role: string
  ctc: number
  location: string
  eligibility: {
    minCGPA: number
    branches: string[]
  }
  description: string
  requirements: string[]
  deadline: string
  recruiterId: string
}

export interface Application {
  id: string
  studentId: string
  jobId: string
  status: 'applied' | 'shortlisted' | 'rejected' | 'selected'
  appliedDate: string
}

export interface Notification {
  id: string
  studentId?: string
  recruiterId?: string
  message: string
  type: 'interview' | 'shortlist' | 'reject' | 'offer' | 'general'
  createdAt: string
  read: boolean
}

export const mockStudents: Student[] = [
  {
    id: 'student_1',
    name: 'Arjun Kumar',
    email: 'arjun.kumar@college.edu',
    rollNo: '20CS001',
    branch: 'Computer Science',
    cgpa: 8.5,
    skills: ['Python', 'JavaScript', 'React', 'Node.js', 'SQL'],
    phone: '+91-9876543210',
  },
  {
    id: 'student_2',
    name: 'Priya Singh',
    email: 'priya.singh@college.edu',
    rollNo: '20CS002',
    branch: 'Computer Science',
    cgpa: 9.2,
    skills: ['Java', 'Spring Boot', 'Docker', 'AWS', 'Kubernetes'],
    phone: '+91-9876543211',
  },
  {
    id: 'student_3',
    name: 'Rohan Patel',
    email: 'rohan.patel@college.edu',
    rollNo: '20EC001',
    branch: 'Electronics',
    cgpa: 7.8,
    skills: ['Circuit Design', 'VHDL', 'Embedded Systems', 'MATLAB'],
    phone: '+91-9876543212',
  },
  {
    id: 'student_4',
    name: 'Neha Sharma',
    email: 'neha.sharma@college.edu',
    rollNo: '20ME001',
    branch: 'Mechanical',
    cgpa: 8.1,
    skills: ['CAD', 'SOLIDWORKS', 'ANSYS', 'Thermodynamics'],
    phone: '+91-9876543213',
  },
]

export const mockRecruiters: Recruiter[] = [
  {
    id: 'recruiter_1',
    name: 'John Smith',
    email: 'john.smith@techcorp.com',
    company: 'TechCorp Solutions',
    phone: '+91-8876543210',
    designation: 'HR Manager',
  },
  {
    id: 'recruiter_2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@innovate.com',
    company: 'InnovateTech',
    phone: '+91-8876543211',
    designation: 'Talent Acquisition Lead',
  },
  {
    id: 'recruiter_3',
    name: 'Amit Kumar',
    email: 'amit.kumar@finance.com',
    company: 'FinanceFlow',
    phone: '+91-8876543212',
    designation: 'Campus Recruiter',
  },
]

export const mockJobOpenings: JobOpening[] = [
  {
    id: 'job_1',
    company: 'TechCorp Solutions',
    role: 'Software Engineer',
    ctc: 12,
    location: 'Bangalore',
    eligibility: {
      minCGPA: 7.0,
      branches: ['Computer Science', 'IT'],
    },
    description:
      'We are looking for talented software engineers to join our team and work on cutting-edge technologies.',
    requirements: [
      'Strong programming skills in Python or Java',
      'Experience with web development',
      'Good problem-solving abilities',
    ],
    deadline: '2024-03-15',
    recruiterId: 'recruiter_1',
  },
  {
    id: 'job_2',
    company: 'InnovateTech',
    role: 'Full Stack Developer',
    ctc: 14,
    location: 'Hyderabad',
    eligibility: {
      minCGPA: 7.5,
      branches: ['Computer Science', 'IT'],
    },
    description:
      'Join our innovative team to build scalable web applications using modern tech stack.',
    requirements: [
      'React.js and Node.js experience',
      'Database design knowledge',
      'REST API development',
    ],
    deadline: '2024-03-20',
    recruiterId: 'recruiter_2',
  },
  {
    id: 'job_3',
    company: 'FinanceFlow',
    role: 'Data Analyst',
    ctc: 11,
    location: 'Mumbai',
    eligibility: {
      minCGPA: 6.5,
      branches: ['Computer Science', 'IT', 'Statistics'],
    },
    description:
      'Analyze financial data and provide insights using advanced analytics and visualization tools.',
    requirements: [
      'SQL and Python proficiency',
      'Data visualization skills',
      'Statistical analysis knowledge',
    ],
    deadline: '2024-03-25',
    recruiterId: 'recruiter_3',
  },
  {
    id: 'job_4',
    company: 'TechCorp Solutions',
    role: 'DevOps Engineer',
    ctc: 13,
    location: 'Pune',
    eligibility: {
      minCGPA: 7.5,
      branches: ['Computer Science', 'IT'],
    },
    description:
      'Work with cutting-edge DevOps tools and infrastructure to scale our applications.',
    requirements: [
      'Docker and Kubernetes knowledge',
      'AWS or GCP experience',
      'Linux system administration',
    ],
    deadline: '2024-04-10',
    recruiterId: 'recruiter_1',
  },
]

export const mockApplications: Application[] = [
  {
    id: 'app_1',
    studentId: 'student_1',
    jobId: 'job_1',
    status: 'shortlisted',
    appliedDate: '2024-02-20',
  },
  {
    id: 'app_2',
    studentId: 'student_1',
    jobId: 'job_2',
    status: 'applied',
    appliedDate: '2024-02-21',
  },
  {
    id: 'app_3',
    studentId: 'student_2',
    jobId: 'job_4',
    status: 'selected',
    appliedDate: '2024-02-19',
  },
  {
    id: 'app_4',
    studentId: 'student_3',
    jobId: 'job_1',
    status: 'rejected',
    appliedDate: '2024-02-20',
  },
]

export const mockNotifications: Notification[] = [
  {
    id: 'notif_1',
    studentId: 'student_1',
    message: 'You have been shortlisted for Software Engineer role at TechCorp Solutions',
    type: 'shortlist',
    createdAt: '2024-02-22',
    read: false,
  },
  {
    id: 'notif_2',
    studentId: 'student_2',
    message: 'Interview scheduled for DevOps Engineer role at TechCorp Solutions on 15-Mar-2024',
    type: 'interview',
    createdAt: '2024-02-23',
    read: false,
  },
]

// Placement statistics
export const mockStatistics = {
  totalStudents: mockStudents.length,
  totalRecruiters: mockRecruiters.length,
  totalJobs: mockJobOpenings.length,
  placedStudents: 15,
  companiesVisited: 8,
  averageCTC: 11.8,
  highestCTC: 18,
  departmentStats: [
    { department: 'Computer Science', placed: 12, total: 20 },
    { department: 'IT', placed: 8, total: 15 },
    { department: 'Electronics', placed: 3, total: 18 },
    { department: 'Mechanical', placed: 2, total: 20 },
  ],
}
