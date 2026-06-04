import type { Metadata } from 'next'
import { Inter, Outfit, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-clash',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TerlikSpor Dashboard',
  description: 'Legends Cup Bursa 1. Ligi takip paneli',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} min-h-screen bg-background text-text-primary antialiased font-sans`}>
        {children}
      </body>
    </html>
  )
}