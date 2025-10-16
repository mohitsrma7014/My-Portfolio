"use client"

import { GraduationCap, Calendar } from "lucide-react"

const education = [
  {
    degree: "B.Tech in Mechanical Engineering",
    institution: "Modern Institute of Technology and Research Centre",
    period: "Pending",
    description: "Strong foundation in engineering principles and problem-solving",
    highlights: [
      "Relevant coursework in data structures and algorithms",
      "Hands-on project experience in automation and systems design",
      "Developed analytical and technical thinking skills",
    ],
  },
  {
    degree: "Senior Secondary (12th)",
    institution: "RBSE",
    period: "Completed",
    description: "Strong academic foundation in science and mathematics",
    highlights: ["Excelled in physics, chemistry, and mathematics", "Developed problem-solving and analytical skills"],
  },
  {
    degree: "Secondary (10th)",
    institution: "RBSE",
    period: "Completed",
    description: "Foundational education with focus on core subjects",
    highlights: ["Strong performance in science and mathematics", "Developed communication and teamwork skills"],
  },
]

function EducationCard({ edu, index }: { edu: (typeof education)[0]; index: number }) {
  return (
    <div className="relative">
      <div className="flex gap-6">
        {/* Timeline line and dot */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-primary/20 border-primary text-primary">
            <GraduationCap size={20} />
          </div>
          {index < education.length - 1 && (
            <div className="w-1 flex-1 bg-gradient-to-b from-primary/50 to-transparent mt-4 min-h-24" />
          )}
        </div>

        {/* Content */}
        <div className="pb-8 flex-1 pt-2">
          <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xl font-semibold text-primary">{edu.degree}</h3>
                <p className="text-muted-foreground font-medium">{edu.institution}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Calendar size={14} />
              <span>{edu.period}</span>
            </div>

            <p className="text-muted-foreground mb-4 text-sm">{edu.description}</p>

            <div>
              <p className="text-xs font-semibold text-primary mb-2">Highlights:</p>
              <ul className="space-y-2">
                {edu.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start text-sm text-muted-foreground gap-2">
                    <span className="text-primary mt-1 flex-shrink-0">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EducationSection() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Education</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Strong academic foundation with focus on engineering and technical excellence
        </p>

        <div className="space-y-2">
          {education.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
