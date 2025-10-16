"use client"

import { Briefcase, Calendar } from "lucide-react"

const experiences = [
  {
    role: "Data Scientist & Automation Developer",
    company: "SSB Engineers Pvt. Ltd.",
    period: "Current",
    description: "Building production dashboards and automation systems",
    achievements: [
      "Deployed production and quality dashboards, increasing efficiency by 40%",
      "Built real-time traceability system reducing compliance errors by 60%",
      "Developed an NLP assistant for database querying and internal insights",
      "Automated HR reporting pipeline using Python + SQL + Django",
    ],
    tech: ["Python", "Django", "SQL", "NLP", "Data Pipelines"],
  },
  {
    role: "AI/Backend Developer (GPT Integrations)",
    company: "Auring Technologies",
    period: "January 2024 - March 2024 (Project Intern)",
    description: "Integrated LLM APIs and built AI-powered solutions",
    achievements: [
      "Integrated GPT APIs to automate customer support workflows",
      "Created API documentation and supported deployment of LLM-powered agents",
      "Built backend services for AI-powered applications",
      "Optimized API performance and error handling",
    ],
    tech: ["Python", "OpenAI APIs", "Backend Development", "LLMs", "API Integration"],
  },
  {
    role: "Data Science Intern",
    company: "National Engineering Industries Ltd. (NBC CK Birla Group)",
    period: "September 2023 - November 2023 (Internship)",
    description: "Manufacturing analytics and process optimization",
    achievements: [
      "Built live dashboards for manufacturing KPIs using Django & Pandas",
      "Automated data collection from shop-floor machines to central database",
      "Optimized OEE metrics and visualized daily trends",
      "Reduced manual reporting effort by 70%",
    ],
    tech: ["Django", "Pandas", "MySQL", "Data Visualization", "Manufacturing Analytics"],
  },
]

function ExperienceCard({ exp, index }: { exp: (typeof experiences)[0]; index: number }) {
  return (
    <div className="relative">
      <div className="flex gap-6">
        {/* Timeline line and dot */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-accent/20 border-accent text-accent">
            <Briefcase size={20} />
          </div>
          {index < experiences.length - 1 && (
            <div className="w-1 flex-1 bg-gradient-to-b from-accent/50 to-transparent mt-4 min-h-24" />
          )}
        </div>

        {/* Content */}
        <div className="pb-8 flex-1 pt-2">
          <div className="bg-card rounded-lg p-6 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xl font-semibold text-accent">{exp.role}</h3>
                <p className="text-muted-foreground font-medium">{exp.company}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Calendar size={14} />
              <span>{exp.period}</span>
            </div>

            <p className="text-muted-foreground mb-4 text-sm">{exp.description}</p>

            <div className="mb-4">
              <p className="text-xs font-semibold text-accent mb-2">Key Achievements:</p>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start text-sm text-muted-foreground gap-2">
                    <span className="text-accent mt-1 flex-shrink-0">→</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-border/50">
              {exp.tech.map((tech) => (
                <span key={tech} className="px-2 py-1 rounded text-xs bg-accent/10 text-accent border border-accent/20">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Professional Experience</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Hands-on experience in building AI systems, data pipelines, and production dashboards
        </p>

        <div className="space-y-2">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
