"use client"

import { useEffect, useRef, useState } from "react"

const skillCategories = [
  {
    category: "Programming & Scripting",
    skills: [
      {
        name: "Python",
        proficiency: 90,
        context: "ML pipelines, backend APIs, data processing, automation",
      },
      {
        name: "SQL",
        proficiency: 85,
        context: "Database design, complex queries, data optimization",
      },
      {
        name: "JavaScript",
        proficiency: 75,
        context: "Frontend development, interactive dashboards",
      },
      {
        name: "Bash",
        proficiency: 70,
        context: "Scripting, automation, DevOps tasks",
      },
    ],
  },
  {
    category: "Machine Learning & AI",
    skills: [
      {
        name: "Scikit-learn / XGBoost",
        proficiency: 85,
        context: "Classification, regression, model evaluation",
      },
      {
        name: "TensorFlow / Deep Learning",
        proficiency: 75,
        context: "Neural networks, NLP models, embeddings",
      },
      {
        name: "OpenAI APIs / LLMs",
        proficiency: 80,
        context: "GPT integration, chatbots, semantic search",
      },
      {
        name: "NLP & FAISS",
        proficiency: 80,
        context: "Text processing, embeddings, semantic search",
      },
    ],
  },
  {
    category: "Backend & Databases",
    skills: [
      {
        name: "Django / DRF",
        proficiency: 85,
        context: "REST APIs, admin dashboards, production systems",
      },
      {
        name: "Node.js",
        proficiency: 70,
        context: "Backend services, API development",
      },
      {
        name: "PostgreSQL / MySQL",
        proficiency: 80,
        context: "Database design, optimization, migrations",
      },
      {
        name: "SQLite",
        proficiency: 75,
        context: "Lightweight databases, local development",
      },
    ],
  },
  {
    category: "Data Analysis & Visualization",
    skills: [
      {
        name: "Pandas / NumPy",
        proficiency: 90,
        context: "Data cleaning, transformation, feature engineering",
      },
      {
        name: "Matplotlib / Seaborn",
        proficiency: 80,
        context: "Statistical visualizations, exploratory analysis",
      },
      {
        name: "Plotly / Dash",
        proficiency: 75,
        context: "Interactive dashboards, real-time visualizations",
      },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      {
        name: "Git / GitHub",
        proficiency: 85,
        context: "Version control, collaborative development",
      },
      {
        name: "Docker",
        proficiency: 70,
        context: "Containerization, deployment, environments",
      },
      {
        name: "AWS / GCP",
        proficiency: 65,
        context: "Cloud services, basic infrastructure",
      },
      {
        name: "Jupyter / Google Colab",
        proficiency: 85,
        context: "Experimentation, prototyping, analysis",
      },
    ],
  },
  {
    category: "Other Concepts",
    skills: [
      {
        name: "Data Pipelines",
        proficiency: 80,
        context: "ETL workflows, automation, data processing",
      },
      {
        name: "Time Series Analysis",
        proficiency: 75,
        context: "Forecasting, trend analysis, anomaly detection",
      },
      {
        name: "API Integration",
        proficiency: 80,
        context: "Third-party APIs, data fetching, webhooks",
      },
      {
        name: "Chatbot Development",
        proficiency: 80,
        context: "NLP assistants, conversational AI, LLM integration",
      },
    ],
  },
]

function SkillCard({ skill }: { skill: (typeof skillCategories)[0]["skills"][0] }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground">{skill.name}</h4>
        <span className="text-xs font-medium text-accent">{skill.proficiency}%</span>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${skill.proficiency}%` : "0%",
          }}
        />
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">{skill.context}</p>
    </div>
  )
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Technical Skills</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Comprehensive expertise in data science, machine learning, and full-stack development
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.category}
              className="p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
            >
              <h3 className="text-lg font-semibold mb-6 text-accent pb-3 border-b border-accent/20">
                {category.category}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
