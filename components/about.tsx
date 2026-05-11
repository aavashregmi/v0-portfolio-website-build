'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Palette, Lightbulb, Rocket, GraduationCap, Award } from 'lucide-react'

const skills = [
  { name: 'Frontend Development', icon: Code2, description: 'React, Next.js, TypeScript, and modern web technologies' },
  { name: 'UI/UX Design', icon: Palette, description: 'Creating beautiful, intuitive user interfaces' },
  { name: 'Problem Solving', icon: Lightbulb, description: 'Analytical thinking and creative solutions' },
  { name: 'Innovation', icon: Rocket, description: 'Pushing boundaries with cutting-edge tech' },
]

const achievements = [
  { icon: GraduationCap, title: 'Academic Excellence', description: 'Pursuing excellence in education' },
  { icon: Award, title: 'Project Success', description: 'Delivered impactful projects' },
]

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-32 overflow-hidden noise">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]"
        />
      </div>

      <div ref={containerRef} className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-accent text-sm uppercase tracking-widest font-medium">About Me</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            Passionate about creating
            <span className="block text-gradient">meaningful experiences</span>
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                I&apos;m Aavash Regmi, a dedicated individual with a passion for technology, 
                design, and innovation. I believe in the power of combining creativity with 
                technical expertise to build solutions that make a difference.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                My journey has been shaped by curiosity and a relentless drive to learn. 
                Whether it&apos;s developing elegant code, designing intuitive interfaces, or 
                exploring new technologies, I approach every challenge with enthusiasm 
                and a commitment to excellence.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                I&apos;m driven by the belief that great work comes from the intersection of 
                passion, skill, and purpose. Every project is an opportunity to create 
                something meaningful and impactful.
              </p>
            </div>

            {/* Achievement Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="p-5 rounded-2xl glass border-gradient"
                >
                  <achievement.icon className="w-6 h-6 text-accent mb-3" />
                  <h4 className="font-medium text-foreground mb-1">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-light mb-8">Core Competencies</h3>
            
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group p-6 rounded-2xl glass border-gradient hover:glow-subtle transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                    <skill.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-foreground mb-1">{skill.name}</h4>
                    <p className="text-muted-foreground">{skill.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Philosophy Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 text-center"
        >
          <blockquote className="max-w-4xl mx-auto">
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground leading-relaxed italic">
              &ldquo;Excellence is not a destination but a continuous journey of learning, 
              growing, and pushing the boundaries of what&apos;s possible.&rdquo;
            </p>
            <footer className="mt-6 text-muted-foreground">— My Philosophy</footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
