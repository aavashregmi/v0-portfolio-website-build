import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aavash Regmi | Personal Portfolio',
  description: 'Welcome to the personal portfolio of Aavash Regmi. Discover my work, skills, and journey.',
  keywords: ['Aavash Regmi', 'Portfolio', 'Developer', 'Designer', 'Creative'],
  authors: [{ name: 'Aavash Regmi' }],
  creator: 'Aavash Regmi',
  openGraph: {
    title: 'Aavash Regmi | Personal Portfolio',
    description: 'Welcome to the personal portfolio of Aavash Regmi.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
