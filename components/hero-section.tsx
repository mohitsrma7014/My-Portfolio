"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight * 0.7

    // Particle system
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
      age: number
      connections: number
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        age: 0,
        connections: 0,
      })
    }

    const maxLineDistance = 120
    const maxConnectionsPerParticle = 2 // Strict limit to prevent clutter
    const maxTotalConnections = 80 // Global connection limit

    let totalConnections = 0

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(18, 18, 24, 0)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Reset connection counts
      particles.forEach((p) => (p.connections = 0))
      totalConnections = 0

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.age += 0.01

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Draw particle
        ctx.fillStyle = `rgba(85, 150, 255, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          if (
            totalConnections >= maxTotalConnections ||
            particle.connections >= maxConnectionsPerParticle ||
            particles[j].connections >= maxConnectionsPerParticle
          ) {
            continue
          }

          const dx = particles[j].x - particle.x
          const dy = particles[j].y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxLineDistance) {
            particle.connections++
            particles[j].connections++
            totalConnections++

            const distanceOpacity = 1 - distance / maxLineDistance
            const finalOpacity = 0.2 * distanceOpacity

            ctx.strokeStyle = `rgba(85, 150, 255, ${finalOpacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 0.7
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section id="hero" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
            Turning Data Into
          </span>
          <br />
          <span className="text-foreground">Intelligent Solutions</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          I'm <span className="font-semibold text-foreground">Mohit Sharma</span> — a Python Developer & Data Scientist
          crafting insight-driven digital experiences with Django, React, Machine Learning, and Data Visualization.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Projects
            <ArrowRight className="ml-2" size={20} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:bg-muted bg-transparent"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  )
}
