export const personalData = {
  name: "Vendi Vardhan Babu",
  role: "Java Full Stack & MERN Full Stack Developer",
  taglines: [
    "Java Full Stack Developer",
    "MERN Stack Specialist",
    "Spring Boot & REST API Architect",
    "React.js Frontend Engineer",
    "MCA Candidate (9.02 CGPA)"
  ],
  bio: "Passionate Java and MERN Full Stack Developer with a strong analytical mindset, deep expertise in Core Java, Spring Boot, React.js, Node.js, and modern database architectures. Dedicated to clean code, scalable microservices, and crafting high-performance, aesthetically pleasing user experiences.",
  email: "vardhanbabuvendi@gmail.com",
  phone: "+91 9100397713",
  location: "SPSR Nellore, Andhra Pradesh, India",
  github: "https://github.com/Vardhan-vendi",
  status: "Open to Full-Time Junior Java / Full Stack Developer Roles",
  profileImg: "/profile-transparent.png",
  stats: [
    { label: "MCA CGPA", value: "9.02 / 10", detail: "Sree Venkateswara College of Eng." },
    { label: "B.Sc CS CGPA", value: "9.28 / 10", detail: "Vikrama Simhapuri University" },
    { label: "Intermediate", value: "98.4%", detail: "MPC Stream" },
    { label: "Certifications", value: "13 Verified", detail: "ExcelR, DevTown, GDSC, MLSA" },
    { label: "REST Endpoints", value: "15+", detail: "Spring Boot & Express.js" },
    { label: "Core Stacks", value: "Java & MERN", detail: "End-to-End Development" },
  ]
};

export const skillsData = {
  categories: [
    { id: "all", label: "All Skills" },
    { id: "java", label: "Java Ecosystem" },
    { id: "mern", label: "MERN & Frontend" },
    { id: "databases", label: "Databases & Cloud" },
    { id: "ml_tools", label: "Python, ML & Tools" },
  ],
  skills: [
    // Java Stack
    { name: "Java", category: "java", level: 95, icon: "Java", color: "from-amber-500 to-orange-500", desc: "OOP, Collections, Multithreading, Exception Handling, Streams" },
    { name: "Spring Boot", category: "java", level: 90, icon: "Layers", color: "from-emerald-500 to-teal-500", desc: "REST APIs, Dependency Injection, Spring Data JPA, Auto-configuration" },
    { name: "Spring Security & JWT", category: "java", level: 85, icon: "ShieldCheck", color: "from-blue-500 to-indigo-500", desc: "Role-based authorization, JWT stateless token authentication" },
    { name: "JDBC & Hibernate/JPA", category: "java", level: 90, icon: "Database", color: "from-cyan-500 to-blue-500", desc: "Object-relational mapping, custom queries, transactional persistence" },
    { name: "Collections Framework", category: "java", level: 95, icon: "Boxes", color: "from-purple-500 to-pink-500", desc: "HashMap, ArrayList, Set, Queue, Custom serialization & exception handling" },

    // MERN & Frontend
    { name: "React.js", category: "mern", level: 92, icon: "Atom", color: "from-cyan-400 to-blue-600", desc: "Hooks, Context API, Redux/Zustand, Custom Hooks, Performance optimization" },
    { name: "Node.js & Express.js", category: "mern", level: 88, icon: "Server", color: "from-green-500 to-emerald-700", desc: "RESTful architecture, middleware design, routing, async event loop" },
    { name: "JavaScript (ES6+)", category: "mern", level: 92, icon: "Code2", color: "from-yellow-400 to-amber-600", desc: "Promises, Async/Await, Closures, DOM manipulation, Modern syntax" },
    { name: "HTML5 & Modern CSS3", category: "mern", level: 95, icon: "Palette", color: "from-orange-500 to-rose-500", desc: "Tailwind CSS, Responsive Web Design, Flexbox/Grid, Glassmorphism" },
    { name: "RESTful API Design", category: "mern", level: 92, icon: "Globe", color: "from-indigo-500 to-purple-600", desc: "CRUD operations, HTTP verbs, status codes, payload serialization" },

    // Databases & Cloud
    { name: "MySQL", category: "databases", level: 90, icon: "Database", color: "from-blue-600 to-indigo-700", desc: "Complex joins, indexing, normalization, stored procedures, DDL/DML" },
    { name: "MongoDB & Mongoose", category: "databases", level: 88, icon: "FileCode", color: "from-emerald-500 to-green-600", desc: "Schema design, aggregation pipelines, MongoDB Atlas cloud clusters" },
    { name: "Git & GitHub", category: "databases", level: 92, icon: "GitBranch", color: "from-rose-500 to-red-600", desc: "Version control, branching strategies, pull requests, collaborative workflows" },
    { name: "Vercel & Render", category: "databases", level: 88, icon: "Cloud", color: "from-teal-400 to-cyan-600", desc: "CI/CD pipelines, production deployment, environment management" },
    { name: "Postman", category: "databases", level: 92, icon: "Send", color: "from-orange-400 to-amber-500", desc: "API testing, collections, environment variables, mock servers" },

    // ML & Tools
    { name: "Python Programming", category: "ml_tools", level: 85, icon: "Terminal", color: "from-blue-400 to-yellow-500", desc: "Data structures, scripting, OOP, algorithmic problem solving" },
    { name: "Machine Learning (NumPy & Pandas)", category: "ml_tools", level: 78, icon: "Cpu", color: "from-purple-500 to-indigo-600", desc: "Data manipulation, feature analysis, ML fundamentals" },
    { name: "Agile & Clean Code", category: "ml_tools", level: 92, icon: "CheckCircle", color: "from-green-400 to-emerald-500", desc: "Root cause analysis, debugging, SOLID principles, sprint workflows" },
  ]
};

export const projectsData = [
  {
    id: "ecommerce-mern",
    title: "E-Commerce Platform (MERN Full Stack)",
    subtitle: "End-to-End Scalable Online Store with Secure Auth & Order Management",
    category: "Full Stack Web",
    featured: true,
    tags: ["React.js", "Node.js", "Express.js", "MongoDB Atlas", "REST APIs", "JWT", "Tailwind CSS"],
    liveUrl: "https://mvstore-beta.vercel.app/",
    githubUrl: "https://github.com/Vardhan-vendi",
    highlights: [
      "Designed and implemented 10+ RESTful API endpoints for user authentication, product catalog CRUD, cart operations, and order lifecycle.",
      "Engineered robust role-based access control (RBAC) and JWT stateless token authentication to protect sensitive administrative routes.",
      "Built a fluid, responsive React.js user interface styled with modern design patterns and integrated seamlessly with backend APIs.",
      "Deployed full-stack architecture with frontend on Vercel, Node/Express backend on Render, and cloud-hosted MongoDB Atlas database."
    ],
    architecture: {
      frontend: "React.js + Tailwind CSS + Responsive UI",
      backend: "Node.js + Express.js REST API Layer",
      database: "MongoDB Atlas Cloud Cluster",
      security: "JWT Authentication + bcrypt password hashing + Protected Routes"
    },
    badge: "Live Production App"
  },
  {
    id: "core-java-banking",
    title: "Core Java Banking System",
    subtitle: "Enterprise-grade Banking Console & Persistence Engine Extended to Spring Boot",
    category: "Java Enterprise",
    featured: true,
    tags: ["Core Java", "OOP", "Collections Framework", "Serialization", "JDBC", "Spring Boot", "MySQL"],
    liveUrl: null,
    githubUrl: "https://github.com/Vardhan-vendi",
    highlights: [
      "Architected a robust console-based banking application supporting account creation, secure deposits, withdrawals, fund transfers, and transaction auditing.",
      "Applied core OOP principles including encapsulation, polymorphism, and composition for modular and clean business logic.",
      "Implemented custom exception hierarchies for precise error handling and used HashMap/ArrayList collections with serialization for state persistence.",
      "Extended the application into a Spring Boot REST API with Spring Data JPA, Spring Security, and JDBC/MySQL relational database persistence."
    ],
    architecture: {
      frontend: "CLI Interface & Interactive Banking Terminal",
      backend: "Core Java OOP Engine + Spring Boot REST API",
      database: "MySQL Relational Database via JDBC & Spring Data JPA",
      security: "Custom Exception Handlers + Transaction Isolation"
    },
    badge: "Core Enterprise Architecture"
  },
  {
    id: "youtube-clone",
    title: "YouTube Clone Web App",
    subtitle: "High-Performance Video Streaming & Channel Exploration Platform",
    category: "Frontend Web",
    featured: true,
    tags: ["React.js", "JavaScript ES6+", "YouTube Data API v3", "Context API", "CSS3 / Tailwind"],
    liveUrl: null,
    githubUrl: "https://github.com/Vardhan-vendi",
    highlights: [
      "Integrated YouTube Data API v3 to power real-time video search, responsive playback, category filtering, and channel browsing.",
      "Structured global application state using React Context API across 10+ modular components for frictionless data flow.",
      "Wrote clean, component-driven UI with responsive layouts, error boundary protection, and seamless video streaming player.",
      "Optimized API payload consumption with caching patterns and debounced search inputs."
    ],
    architecture: {
      frontend: "React.js + Context API Global State",
      api: "YouTube Data API v3 Endpoints",
      styling: "Custom Responsive Video Player Grid",
      features: "Search Debouncing + Dynamic Category Filters"
    },
    badge: "API-Driven Architecture"
  }
];

export const certificatesData = [
  {
    id: 1,
    title: "7-days Bootcamp on JavaScript & ReactJS",
    issuer: "DevTown in collaboration with MLSA & GDSC KIIT Chapter",
    date: "March 2023",
    category: "Frontend & React",
    image: "/certificates/cert-1.jpg",
    certCode: "DevTown / MLSA / GDSC KIIT",
    description: "Certificate of Participation for completing 7-days intensive hands-on Bootcamp on JavaScript fundamentals, DOM manipulation, React component hierarchy, and state management.",
    skills: ["JavaScript", "React.js", "Component Architecture", "Frontend Web"]
  },
  {
    id: 2,
    title: "Application based Program on Adv Excel, PowerPoint and Word",
    issuer: "ExcelR Solutions",
    date: "30th November 2022",
    category: "Tools & Analytics",
    image: "/certificates/cert-2.jpg",
    certCode: "90844E/EXCELR",
    description: "Certificate of Participation for successful completion of 30 hours Live Training Program on Advanced Excel data modeling, formulas, presentations, and technical documentation.",
    skills: ["Advanced Excel", "PowerPoint", "MS Word", "Data Modeling"]
  },
  {
    id: 3,
    title: "Bootcamp on JavaScript & React.js",
    issuer: "Google Developer Student Clubs (GDSC) KIIT Chapter & DevTown",
    date: "March 2023",
    category: "Frontend & React",
    image: "/certificates/cert-3.jpg",
    certCode: "GDSC-KIIT-REACT",
    description: "Certificate of Completion from Google Developer Student Clubs (GDSC) for successfully completing the 7-days React.js and JavaScript engineering bootcamp.",
    skills: ["React.js", "JavaScript", "GDSC Community", "Web Engineering"]
  },
  {
    id: 4,
    title: "Live Training Program on Cloud Fundamentals",
    issuer: "ExcelR Solutions",
    date: "30th March 2023",
    category: "Cloud & DevOps",
    image: "/certificates/cert-4.jpg",
    certCode: "40935E/EXLR/30032023",
    description: "Certificate of Participation for successful completion of 20 hours Live Training Program on Cloud Infrastructure, virtualization, serverless compute, and cloud security paradigms.",
    skills: ["Cloud Fundamentals", "DevOps", "Virtualization", "Cloud Architecture"]
  },
  {
    id: 5,
    title: "Backend Web Development using JavaScript, Node.js and Express Bootcamp",
    issuer: "Microsoft Learn Student Ambassador (MLSA)",
    date: "March 2023",
    category: "Backend & APIs",
    image: "/certificates/cert-5.jpg",
    certCode: "MLSA-BACKEND-NODE",
    description: "Certificate awarded by Microsoft Learn Student Ambassador for attending and completing Backend Web Development using JavaScript, Node.js runtime, and Express.js REST APIs.",
    skills: ["Node.js", "Express.js", "Backend APIs", "Microsoft Learn"]
  },
  {
    id: 6,
    title: "Fundamentals of Full stack Development",
    issuer: "ExcelR Solutions",
    date: "26th December 2022",
    category: "Full Stack Web",
    image: "/certificates/cert-6.jpg",
    certCode: "102769E/EXCELR",
    description: "Certificate of Participation for 30 hours Live Training Program on Fundamentals of Full Stack Development covering frontend engineering, backend integrations, and databases.",
    skills: ["Full Stack Development", "HTML5", "CSS3", "JavaScript", "Database Integration"]
  },
  {
    id: 7,
    title: "Backend Web Development using JavaScript, Node.js & Express",
    issuer: "DevTown in collaboration with MLSA & GDSC KIIT Chapter",
    date: "March 2023",
    category: "Backend & APIs",
    image: "/certificates/cert-7.jpg",
    certCode: "DevTown-Node-Express",
    description: "Certificate of Participation for completing 7-days Bootcamp on Backend Web Development, REST API routing, middleware construction, and JSON data handling with Node.js and Express.",
    skills: ["Node.js", "Express.js", "REST APIs", "Middleware Design"]
  },
  {
    id: 8,
    title: "Python Programming and SQL",
    issuer: "ExcelR Solutions",
    date: "28th October 2022",
    category: "Python & SQL",
    image: "/certificates/cert-8.jpg",
    certCode: "0643E/EXCELR",
    description: "Certificate of Participation for successful completion of 30 hours Live Training Program on Python Object-Oriented Programming, data structures, relational database modeling, and complex SQL querying.",
    skills: ["Python", "SQL", "Relational Databases", "Data Structures", "OOP"]
  },
  {
    id: 9,
    title: "Google Drive Clone using HTML & CSS Bootcamp",
    issuer: "Google Developer Student Clubs (GDSC) KIIT Chapter & DevTown",
    date: "2023",
    category: "Frontend & UI",
    image: "/certificates/cert-9.jpg",
    certCode: "GDSC-GDRIVE-CLONE",
    description: "Certificate of Completion from GDSC KIIT Chapter for building a pixel-perfect Google Drive user interface clone using modern HTML5, CSS3, responsive grid systems, and UI components.",
    skills: ["HTML5", "CSS3", "UI Cloning", "Responsive Layouts"]
  },
  {
    id: 10,
    title: "Google Drive Clone using HTML & CSS Bootcamp",
    issuer: "Microsoft Learn Student Ambassador (MLSA)",
    date: "2023",
    category: "Frontend & UI",
    image: "/certificates/cert-10.jpg",
    certCode: "MLSA-GDRIVE-CLONE",
    description: "Certificate from Microsoft Learn Student Ambassador recognizing successful completion of the Google Drive Web UI Clone project bootcamp using HTML & CSS.",
    skills: ["HTML & CSS", "Microsoft Learn", "Frontend Development"]
  },
  {
    id: 11,
    title: "Certificate of Appreciation for Community Support",
    issuer: "DevTown",
    date: "2023",
    category: "Community & Leadership",
    image: "/certificates/cert-11.jpg",
    certCode: "DEVTOWN-COMMUNITY-APPRECIATION",
    description: "Certificate of Appreciation in grateful recognition of continuing peer support, active participation, and dedication to growing the developer learning community.",
    skills: ["Community Contribution", "Peer Mentorship", "Collaboration"]
  },
  {
    id: 12,
    title: "Backend Web Development using JavaScript, Node.js and Express",
    issuer: "Google Developer Student Clubs (GDSC) KIIT Chapter",
    date: "March 2023",
    category: "Backend & APIs",
    image: "/certificates/cert-12.jpg",
    certCode: "GDSC-BACKEND-NODE-EXPRESS",
    description: "Certificate of Completion from Google Developer Student Clubs for successfully mastering backend web development with JavaScript, asynchronous event loop, and Node.js REST servers.",
    skills: ["Backend Development", "Node.js", "Express.js", "GDSC"]
  },
  {
    id: 13,
    title: "Python Full Stack",
    issuer: "EduSkills (in collaboration with AICTE / ICT Academy)",
    date: "27th August 2025",
    category: "Python & Full Stack",
    image: "/certificates/cert-13.jpg",
    certCode: "152ce59df4e74fc13b0f5fe84e86352b",
    description: "Certificate of Completion awarded for successfully completing the rigorous Python Full Stack development program, encompassing backend logic, database persistence, and web integration.",
    skills: ["Python Full Stack", "Web Development", "Database Persistence", "EduSkills"]
  }
];

export const educationData = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Sree Venkateswara College of Engineering",
    location: "North Rajupalem, Andhra Pradesh",
    period: "2024 - 2026",
    score: "CGPA: 9.02 / 10.0 (Result Awaited)",
    highlight: "Top Academic Performer in Advanced Computer Applications, Java Enterprise Systems, and Software Engineering.",
    tags: ["Core Java", "Spring Boot", "Distributed Databases", "Software Architecture"]
  },
  {
    degree: "Bachelor of Computer Science (B.Sc)",
    institution: "Krishna Chaitanya Degree & PG College, Vikrama Simhapuri University",
    location: "Andhra Pradesh",
    period: "2021 - 2024",
    score: "CGPA: 9.28 / 10.0",
    highlight: "Graduated with High Distinction. Deep foundation in Object-Oriented Programming, Relational DBMS, and Data Structures.",
    tags: ["Computer Science Fundamentals", "Data Structures", "SQL & DBMS", "Web Development"]
  },
  {
    degree: "Intermediate (MPC Stream)",
    institution: "Gurthikonda Sreeramulu Junior College",
    location: "Andhra Pradesh",
    period: "2019 - 2021",
    score: "Percentage: 98.4%",
    highlight: "Exceptional mathematical and analytical aptitude, securing 98.4% in Board Examinations.",
    tags: ["Mathematics", "Physics", "Analytical Logic"]
  }
];
