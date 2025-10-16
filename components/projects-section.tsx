"use client"

import { ExternalLink, Github, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const projects = [
  {
    title: "Diabetes Prediction ML Model",
    description:
      "Predicts whether a person has diabetes based on health metrics using machine learning classification.",
    tech: ["Python", "Pandas", "Scikit-learn", "Jupyter"],
    highlights: [
      "Data preprocessing pipeline with handling missing values",
      "Cross-validation and hyperparameter tuning",
      "Achieved ~90% accuracy with interpretability via SHAP",
    ],
    github: "#",
    demo: "#",
  },
  {
    title: "Car Price Prediction",
    description: "Regression model to estimate used car prices from features like mileage, year, and brand.",
    tech: ["Python", "Scikit-learn", "Pandas", "GridSearchCV"],
    highlights: [
      "Feature engineering with one-hot encoding and interaction terms",
      "Hyperparameter optimization using GridSearchCV",
      "Performance metrics: RMSE and R² evaluation",
    ],
    github: "#",
    demo: "#",
  },
  {
    title: "IPL Winning Team Prediction",
    description: "Classification model predicting IPL match winners based on team stats and player features.",
    tech: ["Python", "Scikit-learn", "XGBoost", "RandomForest"],
    highlights: [
      "Experimented with ensemble models for better accuracy",
      "Feature importance analysis and selection",
      "Achieved competitive accuracy on historical data",
    ],
    github: "#",
    demo: "#",
  },
  {
    title: "Breast Cancer Detection",
    description: "Predict whether a tumor is benign or malignant from medical diagnostic data.",
    tech: ["Python", "Scikit-learn", "Logistic Regression", "SVM"],
    highlights: [
      "Balanced class handling and ROC-AUC curve analysis",
      "Model evaluation with precision, recall, and F1-score",
      "Interpretable results for medical applications",
    ],
    github: "#",
    demo: "#",
  },
  {
    title: "SPC Quality Control Dashboard",
    description: "Real-time statistical process control dashboard for manufacturing quality monitoring.",
    tech: ["Python", "Django", "React", "PostgreSQL", "Plotly"],
    highlights: [
      "Interactive visualizations for real-time monitoring",
      "Statistical control charts and anomaly detection",
      "Responsive design for desktop and mobile",
    ],
    github: "#",
    demo: "#",
  },
  {
    title: "Data Pipeline Automation",
    description: "Automated ETL pipeline for processing and transforming large datasets with monitoring.",
    tech: ["Python", "Pandas", "PostgreSQL", "Docker", "AWS"],
    highlights: [
      "Scalable data processing with error handling",
      "Automated scheduling and monitoring",
      "Reduced manual effort by 60%",
    ],
    github: "#",
    demo: "#",
  },
]

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="group rounded-xl bg-background border border-border hover:border-accent/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
      <div className="h-32 bg-gradient-to-br from-accent/20 via-primary/10 to-background flex items-center justify-center border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/10 to-primary/10" />
        <Zap className="text-accent/40 group-hover:text-accent/60 transition-colors" size={32} />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {isExpanded && (
          <div className="mb-4 p-3 rounded-lg bg-card border border-border/50 space-y-2 animate-in fade-in duration-300">
            <p className="text-xs font-semibold text-accent mb-2">Key Highlights:</p>
            <ul className="space-y-1">
              {project.highlights.map((highlight, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Less" : "More"}
          </Button>
          <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github size={16} className="mr-2" />
              Code
            </a>
          </Button>
          <Button size="sm" className="flex-1 bg-accent hover:bg-accent/90" asChild>
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} className="mr-2" />
              Demo
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Featured Projects</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A selection of my best work in machine learning, data science, and full-stack development
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
