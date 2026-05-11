'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const springConfig = { damping: 25, stiffness: 200 }
  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const updateCursorStyle = () => {
      const target = document.elementFromPoint(mousePosition.x, mousePosition.y)
      if (target) {
        const computedStyle = window.getComputedStyle(target)
        setIsPointer(
          computedStyle.cursor === 'pointer' ||
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') !== null ||
          target.closest('button') !== null
        )
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    const styleInterval = setInterval(updateCursorStyle, 100)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearInterval(styleInterval)
    }
  }, [cursorX, cursorY, mousePosition.x, mousePosition.y])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-accent mix-blend-difference pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-accent/50 mix-blend-difference pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? 50 : 30,
          height: isPointer ? 50 : 30,
          opacity: isPointer ? 0.8 : 0.4,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  )
}
