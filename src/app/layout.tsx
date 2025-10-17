import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'

// Configure Google Fonts with fallbacks - using subsets and display swap for better performance
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
})

export const metadata: Metadata = {
  title: 'GWIN.ai - Wallet-First AI Gambling Platform Builder',
  description: 'Connect your crypto wallet and launch a professional gambling platform in minutes. No KYC, no banks, no middlemen.',
  keywords: 'crypto gambling, AI site builder, wallet-first, blockchain casino, decentralized gaming',
  authors: [{ name: 'GWIN.ai' }],
  creator: 'WG.com',
  publisher: 'WG.com',
  metadataBase: new URL('https://gwin.ai'),
  openGraph: {
    title: 'GWIN.ai - One Wallet Address = Gambling Empire',
    description: 'Connect your crypto wallet and launch a professional gambling platform in minutes.',
    url: 'https://gwin.ai',
    siteName: 'GWIN.ai',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GWIN.ai - Wallet-First AI Gambling Platform Builder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GWIN.ai - One Wallet Address = Gambling Empire',
    description: 'Connect your crypto wallet and launch a professional gambling platform in minutes.',
    images: ['/og-image.jpg'],
    creator: '@gwin_ai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-inter: ${inter.style.fontFamily};
              --font-orbitron: ${orbitron.style.fontFamily};
            }
          `
        }} />
      </head>
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}