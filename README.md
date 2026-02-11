# 🚀 Campus Placement Management System

A scalable, role-based Campus Placement Management System designed to automate and streamline university placement workflows.

This project simulates a real-world recruitment platform with separate dashboards for Students, Recruiters, and Admin, along with protected routing, analytics, and structured state management.

---

## 📌 Overview

The system digitizes the complete placement lifecycle:

- Student profile management  
- Recruiter job postings  
- Application tracking  
- Admin analytics & announcements  
- Placement calendar and support pages  

The architecture ensures strict role-based access and modular separation of concerns.

---

## 🏗 System Architecture

Authentication Layer  
↓  
Role-Based Protected Routes  
↓  
Dashboard Layer (Student / Recruiter / Admin)  
↓  
Global State Management (Context API)  
↓  
Mock Data Layer (LocalStorage Persistence)

---

## 🔐 Authentication & Authorization

- Role-based login (Student / Recruiter / Admin)  
- Session persistence using localStorage  
- Protected routes with automatic redirects  
- Layout-level access control enforcement  

---

## 👨‍🎓 Student Module

- Dashboard with application statistics  
- Job browsing with search and eligibility filters  
- Application status tracking:
  - Applied  
  - Shortlisted  
  - Rejected  
  - Selected  
- Profile management (academic details, skills)  
- Placement notifications  

---

## 🏢 Recruiter Module

- Company profile management  
- Job posting lifecycle (Create / Edit / Delete)  
- Applicant management panel  
- Shortlist / Reject functionality  
- Job-wise application analytics  

---

## 🛠 Admin Module

- Platform-wide statistics dashboard  
- Student & recruiter management  
- Department-wise placement insights  
- Announcement publishing system  
- Placement analytics using charts  

---

## 📊 Analytics & Visualization

Integrated charting system for:

- Placement distribution  
- Department performance  
- Application metrics  
- Recruiter activity tracking  

---

## 🎨 UI/UX Features

- Responsive design (Mobile / Tablet / Desktop)  
- Sidebar-based dashboard navigation  
- Badge-driven status indicators  
- Clean and professional interface  
- Modular component-based structure  

---

## 🛠 Tech Stack

Framework: Next.js (App Router)  
Frontend: React  
Styling: Tailwind CSS  
UI Components: shadcn/ui  
State Management: Context API  
Charts: Recharts  
Authentication: Mock (localStorage)  

---

## 📂 Project Structure

```
app/
├── student/
├── recruiter/
├── admin/
├── login/
├── signup/

components/
context/
data/
```

---

## 🧪 Demo Access

The system uses mock authentication.

You can log in with any email and password while selecting a role.

Example:

Student:  
email: student@test.com  
password: 123456  

Recruiter:  
email: recruiter@test.com  
password: 123456  

Admin:  
email: admin@test.com  
password: 123456  

---

## 📦 Installation & Setup

Clone the repository:

```
git clone https://github.com/your-username/campus-placement-system.git
```

Navigate to project directory:

```
cd campus-placement-system
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## 🚀 Future Enhancements

- Backend integration (Node.js + Express)  
- Database integration (MongoDB / PostgreSQL)  
- JWT authentication  
- Resume upload functionality  
- Email notification system  
- Interview scheduling module  
- CI/CD pipeline integration  
- Docker deployment  

---

## 🎯 Learning Outcomes

This project demonstrates:

- Multi-role system design  
- Protected routing  
- Dashboard architecture  
- State management using Context API  
- Modular frontend structure  
- Real-world SaaS-style UI development  

---

