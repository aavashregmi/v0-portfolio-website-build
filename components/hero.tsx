'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  
  const springY = useSpring(y, { stiffness: 100, damping: 30 })
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise"
    >
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[150px]"
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ y: springY, opacity: springOpacity, scale: springScale }}
        className="relative z-10 container mx-auto px-6 lg:px-12 text-center"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-gradient mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-sm text-muted-foreground">Available for opportunities</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[1.1] mb-6"
        >
          <span className="block">Hello, I&apos;m</span>
          <span className="block mt-2 text-gradient font-normal">
            Aavash Regmi
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-10"
        >
          Crafting exceptional digital experiences through innovative design and 
          meticulous attention to detail. Passionate about creating work that inspires.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#hire"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('hire')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium transition-all hover:bg-accent hover:text-accent-foreground"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="w-4 h-4" />
            Work with me
          </motion.a>
          
          <motion.a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-4 border border-border rounded-full text-foreground font-medium transition-all hover:bg-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn more
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {[
            { value: '5+', label: 'Years Experience' },
            { value: '50+', label: 'Projects Completed' },
            { value: '100%', label: 'Client Satisfaction' },
            { value: '∞', label: 'Ideas & Passion' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-light text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
