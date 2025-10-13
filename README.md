🎓 Learning Zone

A Role-Based Coaching Management System

Welcome to Learning Zone — a full-stack educational web platform designed for modern coaching centers. It provides a seamless environment for admins, teachers, and students to connect, manage routines, and enhance learning experiences through interactive tools and gamified activities.

🌟 Live Demo

🔗 Client: https://learningzonekst.netlify.app

🧠 Overview

Learning Zone is built for education & coaching management — from student enrollment to teacher management, routine scheduling, and fun learning activities.
It supports email/password & Google login, role-based dashboards, and dynamic content rendering.

👥 Roles & Permissions
🧑‍💼 Admin Dashboard

View & manage all applied teachers/students.

Accept or reject applications (with SweetAlert confirmation).

Manage all active teachers and students.

Create, edit, and manage class routines.

Search, filter, and paginate tables by name, email, ID, or status.

Full control over activation/deactivation of users.

👨‍🏫 Teacher Dashboard

View applied and active students.

Accept or reject student applications.

Create and manage class routines.

Search and filter data by name/email/ID.

👩‍🎓 Student Dashboard

View personalized class routines.

🏠 Public Pages
🏡 Home Page

Banner Section – welcoming users to start their journey.

Choose Your Role – Join as a Student or Become a Teacher.

About LearningZone – overview of programs and teaching philosophy.

Math Challenge Game – fun, timed math quiz with score tracking & leaderboard (scores saved to DB).

Quiz Section – 10-question general knowledge quiz for practice.

Mini Learning Tools:

🧮 Quick Calculator

🧠 Word of the Day (with meaning)

📖 Random Fact Generator

⏳ Study Timer

Our Teachers – interactive auto-scrolling carousel showing teacher profiles.

🧾 About LearningZone

“Our mission is simple – to inspire, guide, and prepare students for a brighter future.”

LearningZone provides structured coaching from Class 6 to College level, including:

📘 Regular Classes (Class 6 – 10)

🎯 SSC Special Batch

🎓 College Program (Class 11 – 12)

With dedicated teachers and interactive tools, LearningZone bridges traditional coaching with digital innovation.

⚙️ Tech Stack
Category	Technology
Frontend	React.js, Tailwind CSS, DaisyUI, Swiper
Routing	React Router v7
State & Data	React Query, Axios
Auth	Firebase Authentication (Email/Password + Google)
UI/UX Tools	Lottie, SweetAlert2, React Simple Typewriter, React Icons
Backend	Node.js, Express.js, MongoDB
Other Utilities	React Hook Form, React Helmet Async, Canvas Confetti, Match Sorter
🚀 Features

✅ Responsive & modern dashboard design
✅ Role-based dynamic routing and access control
✅ Secure authentication and logout
✅ Application system for users to become teachers/students
✅ Admin approval system with modal detail view
✅ Routine manager and searchable routine table
✅ Math Challenge Game with leaderboard (DB-integrated)
✅ Quizzes & mini educational tools
✅ Pagination, search & filter in tables
✅ Attractive modals and animations

📱 Responsive Design

Fully responsive for all screen sizes (mobile → desktop).

Sidebar transforms into a smooth toggle menu.

Optimized typography, spacing, and animations.

🧩 Folder Structure
learningzone-client/
│
├── src/
│   ├── assets/             # Images, Lottie, animations
│   ├── components/         # Reusable UI components
│   ├── pages/              # Public & Dashboard pages
│   ├── layout/             # Dashboard layout (role-based)
│   ├── hooks/              # Custom hooks (useAuth, useUserRole)
│   ├── routes/             # Protected & Public routes
│   ├── utils/              # Helpers & config
│   └── main.jsx            # App entry point
│
├── public/
├── package.json
└── README.md

🔐 Authentication Flow

Register/Login via Email or Google.

Default role: user.

User can apply to become Teacher or Student.

Admin reviews and approves/rejects applications.

On approval, user’s role updates dynamically.

🧠 Game & Quiz Logic

Math Game:

30-second timer per question.

+1 point for each correct answer.

Streak system & persistent score (saved to DB).

Leaderboard showing top 5 scorers.

Quiz Section:

10 random multiple-choice questions.

Real-time score updates.

🧑‍🏫 Our Teachers Example
Name	Qualification	Subjects	Classes
Papon	MSc	Math, English, ICT	Class 10–12, SSC Batch
Ashik Khan	Diploma	Math, Physics, ICT	Class 6–10, SSC Batch
Tasnima Akter	BSc	English, Bangla, ICT	Class 6–8
🧩 Footer
Learning Zone is your ultimate platform for online education.
Join as a student or teacher and start learning today!

📍 123 Learning Street, Dhaka, Bangladesh  
📧 info@learningzone.com  
📞 +880 1306 068794  

© 2025 Learning Zone. Developed by Ashik Khan Atul

🛠️ Installation & Setup
# Clone the repo
git clone https://github.com/yourusername/learningzone.git
cd learningzone-client

# Install dependencies
npm install

# Run the project
npm run dev

📸 Screenshots

You can add images later, like:

Dashboard preview

Home page

Math game section

Routine manager

💻 Developer

👨‍💻 Ashik Khan Atul
📍 Bangladesh
🔗 LinkedIn

📧 info@learningzone.com
