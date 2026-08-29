<div align="center">

# 🌟 Vendi Vardhan Babu — Personal Developer Portfolio

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Java](https://img.shields.io/badge/Java-17%2B-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <strong>A modern, minimalist, pure white 3D developer portfolio engineered for high performance, smooth micro-interactions, and responsive full-viewport presentation.</strong>
</p>

[🌐 Live Portfolio Demo](https://mvstore-beta.vercel.app/) • [📄 View Resume](https://github.com/Vardhan-vendi) • [✉️ Get in Touch](mailto:vardhanbabuvendi@gmail.com)

---

</div>

## 📌 Overview

This repository contains the source code for the personal developer portfolio of **Vendi Vardhan Babu**, a Java Full Stack and MERN Stack Developer. Built from the ground up with **React 19**, **Vite**, **Tailwind CSS**, and **Framer Motion**, the application showcases real engineering projects, 13 industry-verified certifications, technical skill matrix, and academic distinctions.

---

## ✨ Key Architectural Features

### ⚪ 1. Pure White Minimalist Aesthetic (`#FFFFFF`)
- Clean, distraction-free visual design with deep slate typography (`#0F172A`), high-contrast accents, and soft elevation shadows.
- Full viewport height (`100dvh`) and edge-to-edge width layout (`w-full max-w-[96vw]`) optimized for all viewports from mobile (320px) to ultrawide displays.

### ☕ 2. Dual-Stream 360° Infinite Rotating Skills Carousels
- Continuous kinetic horizontal ticker with **authentic official SVG brand icons** (*Java, Spring Boot, React.js, Node.js, MongoDB, MySQL, Python, JavaScript, Tailwind CSS, HTML5, CSS3, Git, Postman, JWT*).
- Interactive hover-to-pause functionality and edge gradient mask fading for a seamless infinite loop.

### 🏆 3. 3D Coverflow Certificate Carousel
- Interactive horizontal 3D Coverflow slider displaying **13 verified credentials** from ExcelR, DevTown, GDSC, MLSA, and EduSkills.
- Features active card scale magnification (`scale-100`, `z-20`), perspective tilt transitions, keyboard navigation (`←`, `→`), and an interactive zoomable **High-Resolution Lightbox Modal**.

### 📄 4. Dynamic Vector Resume Preview & Direct Download
- Interactive full-screen vector resume modal with zoom-in/out, print trigger, and direct one-click PDF download.
- Features client-side PDF rendering (`pdfjs-dist`) for automatic high-res preview synchronization.

### 🔐 5. Secret Admin Control Panel (`/admin`)
- Built-in live content studio accessible at `/admin`.
- Allows real-time editing, adding, and deleting of skills, featured projects, certificates, resume documents, and profile metadata.
- Integrated **IndexedDB storage** (`idbStorage.js`) to handle large PDF files without browser quota limitations.

---

## 🛠️ Tech Stack & Tooling

| Domain | Technologies |
|---|---|
| **Core Languages** | Java (17+), JavaScript (ES6+), Python, SQL, HTML5, CSS3 |
| **Backend & APIs** | Spring Boot, Spring Data JPA, Spring Security, RESTful APIs, Node.js, Express.js, JWT Authentication, JDBC, Hibernate |
| **Frontend & UI** | React.js 19, Tailwind CSS 3.4, Framer Motion, Lucide Icons, Canvas Confetti |
| **Databases & Cloud** | MySQL, MongoDB Atlas, Mongoose, Vercel, Render |
| **Tools & Version Control** | Git, GitHub, Postman, VS Code, PDF.js, Vite |

---

## 📂 Project Directory Structure

```plaintext
final-portifolio/
├── public/
│   ├── certificates/             # 13 verified high-res certificate images
│   ├── profile-transparent.png   # Solid alpha transparent portrait
│   ├── resume-preview.png        # Vector high-res resume preview
│   └── Vendi_Vardhan_Babu_Resume.pdf
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   └── AdminDashboard.jsx # Secret /admin Control Panel
│   │   ├── icons/
│   │   │   ├── GithubIcon.jsx     # Custom GitHub vector icon
│   │   │   └── TechIcons.jsx      # Official brand SVG icons (Java, Spring, etc.)
│   │   ├── About.jsx              # Engineering perspective & academic metrics
│   │   ├── CertificateModal.jsx   # Zoomable high-res certificate lightbox
│   │   ├── Certificates.jsx       # 3D Coverflow horizontal carousel
│   │   ├── Contact.jsx            # Direct contact hub & message form
│   │   ├── Education.jsx          # Academic journey timeline
│   │   ├── Footer.jsx             # Minimalist footer & back-to-top
│   │   ├── Hero.jsx               # Borderless full-viewport hero section
│   │   ├── Navbar.jsx             # Floating glassmorphic navbar with bold icons
│   │   ├── Projects.jsx           # Featured engineering projects showcase
│   │   ├── ResumeModal.jsx        # Interactive vector resume lightbox
│   │   └── Skills.jsx             # Dual-stream 360° infinite rotating marquee
│   ├── context/
│   │   └── PortfolioContext.jsx   # Live state management & persistence
│   ├── data/
│   │   └── portfolioData.js       # Central data store for portfolio content
│   ├── utils/
│   │   ├── idbStorage.js          # IndexedDB helper for unlimited PDF storage
│   │   └── pdfToImage.js          # Client-side PDF to image renderer
│   ├── App.jsx                    # Root application component & router
│   ├── index.css                  # Global Tailwind & typography styles
│   └── main.jsx                   # React 19 root mount
├── vercel.json                    # SPA rewrite configuration for Vercel
├── vite.config.js                 # Vite build setup
├── tailwind.config.js             # Tailwind theme configuration
└── package.json                   # Project dependencies & build scripts
```

---

## 🚀 Featured Engineering Projects

### 1. 🛒 MERN Stack E-Commerce Platform
- **Live Demo**: [mvstore-beta.vercel.app](https://mvstore-beta.vercel.app/)
- **Tech Stack**: React.js, Node.js, Express.js, MongoDB Atlas, JWT, Tailwind CSS
- **Key Highlights**:
  - Secure stateless JWT user authentication and role-based access control.
  - Dynamic shopping cart, order management, and responsive catalog browsing.
  - Production-ready deployment across Vercel and cloud backend clusters.

### 2. 🏦 Core Java Banking Management System
- **Repository**: [GitHub Source](https://github.com/Vardhan-vendi)
- **Tech Stack**: Core Java (OOP), Collections Framework, JDBC, MySQL, Multithreading
- **Key Highlights**:
  - Robust account lifecycle management (creation, deposits, withdrawals, fund transfers).
  - Custom exception handling architecture and transaction history logging.
  - Relational database persistence with normalized SQL tables and JDBC connectivity.

### 3. 📺 Full-Stack YouTube Clone
- **Tech Stack**: React.js, RapidAPI, Tailwind CSS, Material Icons
- **Key Highlights**:
  - Responsive video streaming interface with category filters and live search.
  - Asynchronous REST API consumption with cached requests.

---

## 🎓 Academic Credentials

- **Master of Computer Applications (MCA)** — `2024 – 2026`
  - **Institution**: Sree Venkateswara College of Engineering, JNTUA
  - **Academic Standing**: **9.02 / 10.0 CGPA**
- **Bachelor of Science in Computer Science (B.Sc CS)** — `2021 – 2024`
  - **Institution**: Krishna Chaitanya Degree & PG College, Vikrama Simhapuri University
  - **Academic Standing**: **9.28 / 10.0 CGPA**
- **Intermediate (MPC)** — `2019 – 2021`
  - **Institution**: Gurthikonda Sreeramulu Junior College
  - **Score**: **98.4%**

---

## 💻 Local Development Setup

To run this project locally on your machine:

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 2. Clone Repository
```bash
git clone https://github.com/Vardhan-vendi/vendi-vardhan-babu-portfolio.git
cd vendi-vardhan-babu-portfolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 5. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 🔐 Secret Admin Route

To access the live in-browser Content Control Panel:
- Navigate to `http://localhost:5173/admin` *(or append `#/admin`)*.
- Edit skills, featured projects, certificates, upload new resumes, or update personal information.
- Click **"Save & Go to Home"** to save changes to local persistence and return to the live site.

---

## 📬 Contact & Connect

- **Name**: Vendi Vardhan Babu
- **Email**: [vardhanbabuvendi@gmail.com](mailto:vardhanbabuvendi@gmail.com)
- **Phone**: [+91 9100397713](tel:+919100397713)
- **Location**: SPSR Nellore, Andhra Pradesh, India
- **GitHub**: [github.com/Vardhan-vendi](https://github.com/Vardhan-vendi)

---

<div align="center">
  <sub>Designed & Developed with ❤️ by <strong>Vendi Vardhan Babu</strong></sub>
</div>
