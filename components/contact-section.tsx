"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Get in Touch</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Let's Connect</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:mohitsrma7014@gmail.com"
                className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border hover:border-accent/50 transition-all group"
              >
                <Mail className="text-accent group-hover:scale-110 transition-transform" size={24} />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold">mohitsrma7014@gmail.com</p>
                </div>
              </a>

              <a
                href="https://github.com/mohitsrma7014"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border hover:border-accent/50 transition-all group"
              >
                <Github className="text-accent group-hover:scale-110 transition-transform" size={24} />
                <div>
                  <p className="text-sm text-muted-foreground">GitHub</p>
                  <p className="font-semibold">https://github.com/mohitsrma7014</p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/mohitsrma"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border hover:border-accent/50 transition-all group"
              >
                <Linkedin className="text-accent group-hover:scale-110 transition-transform" size={24} />
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <p className="font-semibold">https://linkedin.com/in/mohitsrma</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              {submitted ? "Message Sent!" : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
