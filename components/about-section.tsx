import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center border border-border">
  <Image
                src="/profile_photo.jpg"
                alt="Professional Photo"
                
                className="object-cover rounded-2xl"
              />
</div>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate developer with strong foundations in data science, AI, and full-stack web development. My
              journey combines curiosity-driven learning with real-world project experience.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I specialize in building scalable data pipelines, creating intelligent ML models, and developing
              responsive web applications. I'm constantly exploring new technologies and best practices to deliver
              impactful solutions.
            </p>

            <div className="pt-4">
              <a
                href="/MOHIT_SHARMA_DATA_SCIENTIST_RESUME.pdf"
                className="inline-flex items-center text-accent hover:text-accent/80 font-semibold transition-colors"
              >
                Download Resume
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
