// Everything about Mohit in one place. Edit here — every section reads from this file.

export const PROFILE = {
  name: "Mohit Sharma",
  firstName: "Mohit",
  role: "Data Scientist & ML Engineer",
  roles: ["Data Scientist", "ML Engineer", "AI / LLM Developer", "Founder @ Nexvorta"],
  tagline: "I turn messy data into intelligent systems that run real businesses.",
  summary:
    "Self-driven Machine Learning Engineer and Data Scientist with hands-on experience building AI-powered systems, NLP chatbots and intelligent dashboards. I automate workflows, deploy ML models and integrate LLMs with business applications — with a keen focus on solving real-world problems using data.",
  location: "Alwar, Rajasthan, India",
  availability: "Open to remote work & relocation",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohitsrma.vercel.app").replace(/\/$/, ""),
  email: "mohitsrma7014@gmail.com",
  phone: "+91 70140 28949",
  phoneHref: "tel:+917014028949",
  whatsappHref: "https://wa.me/917014028949",
  resume: "/Mohit_Sharma_Resume.pdf",
  photo: "/profile.jpg",
  social: {
    github: "https://github.com/mohitsrma7014",
    linkedin: "https://www.linkedin.com/in/mohitsrma",
  },
  venture: { name: "Nexvorta", url: "", /* set to https://nexvorta.com once live */ desc: "Technology for every industry — my software company building custom software, AI, ERP and cloud solutions for businesses in India and worldwide." },
};

export const STATS = [
  { value: "2+", label: "years building production systems" },
  { value: "40%", label: "efficiency gain from production dashboards" },
  { value: "60%", label: "fewer compliance errors via traceability" },
  { value: "70%", label: "less manual HR reporting effort" },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  place: string;
  type?: string;
  points: string[];
  tech: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    role: "Founder",
    company: "Nexvorta",
    period: "2026 – Present",
    place: "Alwar, Rajasthan",
    type: "Venture",
    points: [
      "Founding a technology company that builds custom software, AI, ERP and cloud solutions for finance, manufacturing, corporate, services and MSME businesses.",
      "Designed and built the company website: 3D WebGL hero, interactive solution builder, full technical SEO.",
    ],
    tech: ["Next.js", "TypeScript", "Three.js", "SEO", "Product"],
  },
  {
    role: "Data Scientist & Automation Developer",
    company: "SSB Engineers Pvt. Ltd.",
    period: "Apr 2024 – Present",
    place: "Alwar, Rajasthan",
    points: [
      "Deployed production and quality dashboards, increasing efficiency by 40%.",
      "Built a real-time traceability system that reduced compliance errors by 60%.",
      "Developed an NLP assistant for natural-language database querying and internal insights.",
      "Automated the HR reporting pipeline with Python, SQL and Django.",
    ],
    tech: ["Python", "Django", "SQL", "NLP", "Data Pipelines"],
  },
  {
    role: "AI / Backend Developer (GPT Integrations)",
    company: "Auring Technologies",
    period: "Jan 2024 – Apr 2024",
    place: "Gurugram, Haryana",
    type: "Project Intern",
    points: [
      "Integrated GPT APIs to automate customer-support workflows.",
      "Created API documentation and supported deployment of LLM-powered agents.",
      "Built and optimised backend services for AI-powered applications.",
    ],
    tech: ["Python", "OpenAI APIs", "LLMs", "REST APIs"],
  },
  {
    role: "Data Science Intern",
    company: "National Engineering Industries Ltd. (NBC · CK Birla Group)",
    period: "Sep 2023 – Nov 2023",
    place: "Jaipur, Rajasthan",
    type: "Internship",
    points: [
      "Built live dashboards for manufacturing KPIs using Django and Pandas.",
      "Automated data collection from shop-floor machines into a central database.",
      "Optimised OEE metrics and visualised daily trends.",
    ],
    tech: ["Django", "Pandas", "MySQL", "Manufacturing Analytics"],
  },
];

export type ProjectCat = "AI & ML" | "Data & Dashboards" | "Web";

export type Project = {
  title: string;
  /** Long-form description for the project's own page. */
  story?: string;
  cat: ProjectCat;
  summary: string;
  points: string[];
  tech: string[];
  code?: string;
  live?: string;
  badge?: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    title: "Multi-Document AI Chatbot",
    story: "Teams often need answers that are spread across many PDFs, manuals and reports. I built a chatbot that indexes multiple documents into vector embeddings with FAISS, retrieves the most relevant passages for each question and asks an OpenAI model to answer using only that context. Conversation history is kept so follow-up questions work naturally, giving domain-specific Q&A over private documents without fine-tuning a model.",
    cat: "AI & ML",
    summary: "Ask questions across many documents at once — answers grounded in your files with semantic search.",
    points: ["Embeddings + FAISS vector search across multiple documents", "Context preserved across follow-up questions", "Domain-specific Q&A over private data"],
    tech: ["Python", "DRF", "OpenAI Embeddings", "FAISS", "Streamlit"],
    featured: true,
  },
  {
    title: "AI Stock Sentiment Recommender",
    story: "Market-moving news arrives faster than anyone can read it. This Django application pulls the latest headlines for a stock from NewsAPI, scores their sentiment with TextBlob, combines the result with financial market data and turns it into a simple, real-time recommendation with a sentiment score that users can act on.",
    cat: "AI & ML",
    summary: "Real-time trading insights from news sentiment combined with financial market data.",
    points: ["News sentiment scoring with NLP", "Financial API integration", "Real-time sentiment scores and trading suggestions"],
    tech: ["Python", "Django", "NewsAPI", "TextBlob", "JavaScript"],
    code: "https://github.com/mohitsrma7014/Stock-Trading-Recommendation-System",
    featured: true,
  },
  {
    title: "Adaptive MCQ Testing System",
    story: "Fixed tests are too easy for strong students and too hard for beginners. As a mentor for a Smart India Hackathon finalist team, I helped design an adaptive test that changes question difficulty in real time based on each answer, and an ML model that predicts a student's skill level. A custom scoring algorithm improved test reliability by 30%.",
    cat: "AI & ML",
    badge: "Smart India Hackathon Finalist (Mentor)",
    summary: "A test that adapts its difficulty in real time and predicts each student's skill level.",
    points: ["Difficulty adjusts based on live answers", "ML model predicts student performance levels", "Custom scoring algorithm improved test reliability by 30%"],
    tech: ["Python", "Django", "Machine Learning"],
    featured: true,
  },
  {
    title: "Manufacturing Traceability & Quality Dashboards",
    story: "At SSB Engineers I build the systems the shop floor runs on: real-time part traceability from raw material to dispatch, production and quality dashboards for supervisors and management, and statistical process control (SPC) charts with anomaly detection. Traceability cut compliance errors by 60%, and the dashboards improved efficiency by 40%.",
    cat: "Data & Dashboards",
    summary: "Production, quality and traceability systems running on a real shop floor.",
    points: ["Real-time part traceability — compliance errors down 60%", "Production & quality dashboards — efficiency up 40%", "SPC charts and anomaly detection for quality monitoring"],
    tech: ["Python", "Django", "React", "PostgreSQL", "Plotly"],
    badge: "In production · SSB Engineers",
    featured: true,
  },
  {
    title: "Employee Analytics Dashboard",
    story: "HR reports used to be compiled by hand from attendance and payroll data every month. I built a Django + MySQL dashboard that tracks attendance, salary and KPIs from internal data and generates the reports automatically — cutting manual reporting effort by 70%.",
    cat: "Data & Dashboards",
    summary: "Attendance, salary and KPI tracking with automated HR reports.",
    points: ["Automated HR reporting — 70% less manual effort", "Attendance, payroll and KPI views from internal data"],
    tech: ["Django", "MySQL", "Pandas", "Matplotlib"],
  },
  {
    title: "NLP Database Assistant",
    story: "Not everyone can write SQL, but everyone has questions about the data. This assistant translates plain-English questions into database queries using NLP and LLMs, runs them safely and returns the answer — giving teams internal insights without waiting for an analyst.",
    cat: "AI & ML",
    summary: "Ask the company database questions in plain English and get instant insights.",
    points: ["Natural-language to SQL querying", "Internal insights without writing code"],
    tech: ["Python", "NLP", "LLMs", "SQL"],
  },
  {
    title: "Nexvorta — Company Website",
    story: "The website for my own technology company. A custom WebGL shader renders thousands of particles that morph into a different shape for each industry; visitors can re-tune the whole site to their industry, generate an instant solution blueprint and estimate ROI. It ships with full technical SEO: structured data, generated social images and 20+ landing pages.",
    cat: "Web",
    summary: "My company's site: a WebGL particle hero that morphs per industry, an instant solution blueprint builder and full SEO.",
    points: ["Three.js shader particles with morphing shapes", "Interactive Solution Builder & ROI calculator", "JSON-LD, OG images, 20+ SEO landing pages"],
    tech: ["Next.js", "TypeScript", "Three.js", "Tailwind"],
    badge: "Launching soon",
    featured: true,
  },
  {
    title: "Jeet Autotech",
    story: "A fast, responsive website for a precision automotive-components manufacturer, presenting its products, capabilities and quality credentials to OEM buyers. Built with Next.js and Tailwind CSS and deployed on Vercel.",
    cat: "Web",
    summary: "Website for a precision automotive-components manufacturer.",
    points: ["Product & capability showcase", "Responsive, fast, deployed on Vercel"],
    tech: ["Next.js", "TypeScript", "Tailwind"],
    live: "https://jeetautotech.vercel.app",
    code: "https://github.com/mohitsrma7014/jeetautotech",
  },
  {
    title: "Bexor",
    story: "A marketing website for a company offering custom web applications, ERP systems, data analytics, API integration and machine-learning solutions to manufacturers. Built with Next.js, TypeScript and Tailwind CSS.",
    cat: "Web",
    summary: "Marketing site for custom web apps, ERP and ML solutions for manufacturing.",
    points: ["Service pages for ERP, analytics, APIs and ML", "Modern responsive UI"],
    tech: ["Next.js", "TypeScript", "Tailwind"],
    live: "https://bexor-website.vercel.app",
    code: "https://github.com/mohitsrma7014/bexor_website",
  },
  {
    title: "House Price Prediction",
    story: "A classic regression problem done properly: exploratory data analysis on the Kaggle housing dataset, feature selection and engineering, then a comparison of linear models and XGBoost evaluated with R² and MAE to find the most accurate, explainable model.",
    cat: "AI & ML",
    summary: "Regression models predicting house prices from the Kaggle housing dataset.",
    points: ["EDA and feature selection", "Evaluated with R² and MAE", "Compared linear models and XGBoost"],
    tech: ["Python", "scikit-learn", "XGBoost", "Pandas", "Seaborn"],
  },
];

export const SKILLS: { group: string; items: { name: string; level: number; note: string }[] }[] = [
  {
    group: "AI & Machine Learning",
    items: [
      { name: "Scikit-learn / XGBoost", level: 85, note: "Classification, regression, evaluation" },
      { name: "OpenAI APIs / LLMs", level: 80, note: "GPT integration, agents, chatbots" },
      { name: "NLP & FAISS", level: 80, note: "Embeddings, semantic search, RAG" },
      { name: "TensorFlow / Deep Learning", level: 75, note: "Neural networks, NLP models" },
      { name: "Hugging Face", level: 70, note: "Transformers, pretrained models" },
    ],
  },
  {
    group: "Languages",
    items: [
      { name: "Python", level: 90, note: "ML pipelines, APIs, automation" },
      { name: "SQL", level: 85, note: "Complex queries, optimisation" },
      { name: "JavaScript / TypeScript", level: 75, note: "Dashboards, web apps" },
      { name: "Bash", level: 70, note: "Scripting, automation" },
    ],
  },
  {
    group: "Backend & Data",
    items: [
      { name: "Django / DRF", level: 85, note: "REST APIs, production systems" },
      { name: "Pandas / NumPy", level: 90, note: "Cleaning, feature engineering" },
      { name: "PostgreSQL / MySQL", level: 80, note: "Design, migrations, tuning" },
      { name: "Node.js / Next.js", level: 70, note: "APIs, modern web apps" },
    ],
  },
  {
    group: "Visualisation & Tools",
    items: [
      { name: "Plotly / Dash", level: 75, note: "Interactive dashboards" },
      { name: "Matplotlib / Seaborn", level: 80, note: "Statistical visuals, EDA" },
      { name: "Git / GitHub", level: 85, note: "Version control, collaboration" },
      { name: "Docker · AWS · GCP", level: 65, note: "Containers, cloud basics" },
    ],
  },
];

export const STACK_MARQUEE = [
  "Python", "Django", "OpenAI", "LLMs", "FAISS", "Scikit-learn", "XGBoost", "TensorFlow", "Pandas", "SQL", "PostgreSQL",
  "Plotly", "Next.js", "TypeScript", "Three.js", "Docker", "AWS", "Hugging Face",
];

export const EDUCATION = [
  { title: "B.Tech, Mechanical Engineering", org: "Modern Institute of Technology and Research Centre", year: "2024", place: "Alwar, Rajasthan" },
  { title: "Senior Secondary (12th)", org: "RBSE", year: "2020", place: "Alwar, Rajasthan" },
  { title: "Secondary (10th)", org: "RBSE", year: "2018", place: "Alwar, Rajasthan" },
];

export const CERTIFICATIONS = [
  { title: "Minor in Artificial Intelligence", org: "IIT Ropar", year: "2024" },
  { title: "100 Days of Code: Python Pro Bootcamp", org: "Udemy", year: "2024" },
  { title: "Machine Learning with Hands-on Projects", org: "InternPi", year: "2023" },
];

export const slugify = (t: string) =>
  t.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const projectSlug = (p: Project) => slugify(p.title);
