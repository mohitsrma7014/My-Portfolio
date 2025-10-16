"use client"

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left side */}
          <div className="text-center md:text-left">
            <p className="text-muted-foreground">© 2025 Mohit Sharma. All rights reserved.</p>
            <p className="text-sm text-muted-foreground mt-1">Crafted with passion for data and code.</p>
          </div>

          {/* Social links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/mohitsrma7014"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-background border border-border hover:border-accent/50 hover:text-accent transition-all"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/mohitsrma"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-background border border-border hover:border-accent/50 hover:text-accent transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:mohitsrma7014@gmail.com"
              className="p-2 rounded-lg bg-background border border-border hover:border-accent/50 hover:text-accent transition-all"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-background border border-border hover:border-accent/50 hover:text-accent transition-all"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  )
}
