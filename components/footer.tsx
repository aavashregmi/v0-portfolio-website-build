'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'
import Link from 'next/link'

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'Email', icon: Mail, href: 'mailto:hello@aavash.com' },
]

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Me', href: '/about' },
  { name: 'Hire Me', href: '/hire' },
  { name: 'Contact Me', href: '/contact' },
]

export function Footer() {
  const [time, setTime] = useState<string>('')
  const [location, setLocation] = useState<string>('Detecting location...')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      )
    }
    
    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        if (data.city && data.country_name) {
          setLocation(`${data.city}, ${data.country_name}`)
        } else {
          setLocation('Location unavailable')
        }
      } catch {
        setLocation('Location unavailable')
      }
    }

    fetchLocation()

    return () => clearInterval(timeInterval)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <footer className="relative py-16 border-t border-border overflow-hidden noise">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[100px]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/" className="text-2xl font-medium tracking-tight inline-block">
                <span className="text-foreground">Aavash</span>
                <span className="text-accent ml-1">.</span>
              </Link>
            </motion.div>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Crafting exceptional digital experiences through innovation, design, and dedication.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-widest text-muted-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-widest text-muted-foreground">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/50 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Live Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-accent" />
              <span className="font-mono">{time}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-accent" />
              <span>{location}</span>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground flex items-center gap-1"
          >
            © {new Date().getFullYear()} Aavash Regmi. Made with
            <Heart className="w-3 h-3 text-accent fill-accent" />
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
