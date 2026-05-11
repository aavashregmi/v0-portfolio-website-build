'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const width = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '100%', '100%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className="relative h-32 flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ width, opacity }}
        className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />
    </div>
  )
}
