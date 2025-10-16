"use client"

import { Award, Calendar } from "lucide-react"

const certifications = [
  {
    title: "Minor in Artificial Intelligence",
    issuer: "IIT Ropar",
    date: "2024",
    description: "Specialized coursework in AI, machine learning, and deep learning",
    skills: ["Machine Learning", "Deep Learning", "AI Fundamentals", "Neural Networks"],
  },
  {
    title: "100 Days of Code: Python Pro Bootcamp",
    issuer: "Udemy",
    date: "2023",
    description: "Comprehensive Python programming course with 100+ projects",
    skills: ["Python", "OOP", "Web Development", "Data Structures"],
  },
  {
    title: "Machine Learning with Hands-on Projects",
    issuer: "InternPi",
    date: "2023",
    description: "Practical machine learning course with real-world project implementations",
    skills: ["Scikit-learn", "Model Building", "Feature Engineering", "Model Evaluation"],
  },
]

function CertificationCard({ cert, index }: { cert: (typeof certifications)[0]; index: number }) {
  return (
    <div className="relative">
      <div className="flex gap-6">
        {/* Timeline line and dot */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-primary/20 border-primary text-primary">
            <Award size={20} />
          </div>
          {index < certifications.length - 1 && (
            <div className="w-1 flex-1 bg-gradient-to-b from-primary/50 to-transparent mt-4 min-h-24" />
          )}
        </div>

        {/* Content */}
        <div className="pb-8 flex-1 pt-2">
          <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xl font-semibold text-primary">{cert.title}</h3>
                <p className="text-muted-foreground font-medium">{cert.issuer}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Calendar size={14} />
              <span>{cert.date}</span>
            </div>

            <p className="text-muted-foreground mb-4 text-sm">{cert.description}</p>

            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Certifications & Training</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Continuous learning and professional development in AI, ML, and software engineering
        </p>

        <div className="space-y-2">
          {certifications.map((cert, index) => (
            <CertificationCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
