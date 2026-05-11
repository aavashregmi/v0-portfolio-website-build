'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { CursorEffect } from '@/components/cursor-effect'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { HireMe } from '@/components/hire-me'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { SectionDivider } from '@/components/section-divider'

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen"
    >
      {/* Premium loading overlay that fades out */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed inset-0 z-[100] bg-background pointer-events-none"
      />
      
      <CursorEffect />
      <Navbar />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <HireMe />
      <SectionDivider />
      <Contact />
      <Footer />
    </motion.main>
  )
}
