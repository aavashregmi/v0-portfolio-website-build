'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, MessageSquare, User } from 'lucide-react'

interface FormState {
  name: string
  email: string
  message: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('https://formspree.io/f/xbddjndv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        // Reset after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send message')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden noise">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]"
        />
      </div>

      <div ref={containerRef} className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm uppercase tracking-widest font-medium">Contact</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            Let&apos;s start a
            <span className="block text-gradient">conversation</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question, proposal, or just want to say hello? 
            I&apos;d love to hear from you. Fill out the form below and I&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-border bg-card/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-border bg-card/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="relative">
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Your Message
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  rows={5}
                  placeholder="Tell me about your project, idea, or just say hello..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-border bg-card/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none disabled:opacity-50"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background rounded-2xl font-medium transition-all hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={status !== 'loading' ? { scale: 1.01 } : {}}
              whileTap={status !== 'loading' ? { scale: 0.99 } : {}}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </motion.button>
          </form>

          {/* Status Messages */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 rounded-2xl bg-accent/10 border border-accent/20 flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <p className="text-foreground">Message sent successfully.</p>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-foreground">{errorMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
