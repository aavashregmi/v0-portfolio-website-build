'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, Users, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CursorEffect } from '@/components/cursor-effect'

const services = [
  {
    icon: Briefcase,
    title: 'Project Collaboration',
    description: 'Partner on exciting projects that push creative boundaries and deliver exceptional results.',
    features: ['Full project lifecycle', 'Regular updates', 'Quality assurance'],
  },
  {
    icon: Users,
    title: 'Consultation',
    description: 'Get expert advice on technology, design, and strategic planning for your initiatives.',
    features: ['Technical guidance', 'Strategy sessions', 'Best practices'],
  },
  {
    icon: Clock,
    title: 'Long-term Partnership',
    description: 'Build a lasting professional relationship for ongoing support and development.',
    features: ['Dedicated support', 'Priority access', 'Continuous improvement'],
  },
]

const reasons = [
  'Commitment to excellence in every project',
  'Strong communication and collaboration skills',
  'Fresh perspectives and innovative thinking',
  'Reliable, dedicated, and professional approach',
  'Passion for learning and continuous growth',
]

export default function HirePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <CursorEffect />
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden noise">
        {/* Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]"
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
            <span className="text-accent text-sm uppercase tracking-widest font-medium">Hire Me</span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              Let&apos;s create something
              <span className="block text-gradient">extraordinary together</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              I&apos;m open to exciting opportunities, collaborations, and projects. 
              Whether you&apos;re looking for a dedicated team member or a creative partner, 
              I&apos;d love to hear from you.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="group relative p-8 rounded-3xl glass border-gradient hover:glow-subtle transition-all duration-500"
              >
                <div className="p-4 rounded-2xl bg-accent/10 text-accent w-fit mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  <service.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-medium text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Why Work With Me */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-light mb-8">
                Why work with <span className="text-gradient">me?</span>
              </h3>
              
              <ul className="space-y-4">
                {reasons.map((reason, index) => (
                  <motion.li
                    key={reason}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-lg text-foreground">{reason}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="relative p-10 rounded-3xl glass border-gradient overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-[60px]" />
              
              <div className="relative">
                <h4 className="text-2xl font-medium mb-4">Ready to get started?</h4>
                <p className="text-muted-foreground mb-8">
                  Let&apos;s discuss how we can work together to bring your vision to life. 
                  I&apos;m excited to hear about your ideas and explore opportunities.
                </p>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium transition-all hover:bg-accent hover:text-accent-foreground group"
                  >
                    Get in touch
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.main>
  )
}
