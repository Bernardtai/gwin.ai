'use client'

// Temporarily remove translations
// import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Zap, TrendingUp, Shield, Globe } from 'lucide-react'
import PrismaticBurst from '@/components/ui/PrismaticBurst'
import { useEffect, useState } from 'react'

export function HeroSection() {
  // const t = useTranslations('hero')
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark')
      setIsDark(isDarkMode)
    }

    checkTheme()

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className={`relative overflow-hidden h-[50vh] flex items-center justify-center ${
      isDark ? 'text-white' : 'text-gray-900'
    } ${
      isDark
        ? 'bg-gradient-to-br from-crypto-dark via-crypto-darker to-black'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* PrismaticBurst Background - Only in Dark Mode */}
      {isDark && (
        <div className="absolute inset-0">
          <PrismaticBurst
            animationType="rotate3d"
            intensity={2}
            speed={0.5}
            distort={1.0}
            paused={false}
            offset={{ x: 0, y: 0 }}
            hoverDampness={0.25}
            rayCount={24}
            mixBlendMode="lighten"
            colors={['#00D4FF', '#9333EA', '#F59E0B']} // Dark mode: bright crypto colors
          />
        </div>
      )}

      {/* Background effects */}
      <div className={`absolute inset-0 bg-[url('/grid.svg')] bg-center ${
        isDark ? '[mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]' : '[mask-image:linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0))]'
      }`} />
      <div className={`absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full blur-3xl ${
        isDark ? 'bg-crypto-primary/20' : 'bg-crypto-primary/10'
      }`} />
      <div className={`absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full blur-3xl ${
        isDark ? 'bg-crypto-secondary/20' : 'bg-crypto-secondary/10'
      }`} />

      <div className="container-responsive relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main headline */}
          <h1 className="mb-6 text-responsive-3xl font-bold leading-tight font-crypto">
            <span className="bg-gradient-to-r from-crypto-primary via-crypto-secondary to-crypto-accent bg-clip-text text-transparent">
              One Wallet Address = Gambling Empire
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`mb-8 text-responsive-lg ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Connect your crypto wallet and launch a professional gambling platform in minutes. No KYC, no banks, no middlemen.
          </p>

          {/* CTA Buttons */}
          <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/builder"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-crypto-primary text-white hover:bg-crypto-primary/90 crypto-glow h-11 rounded-md px-6 sm:px-8 text-base sm:text-lg"
            >
              Connect Wallet & Start
            </Link>
            <Link 
              href="/demo"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-crypto-primary text-crypto-primary hover:bg-crypto-primary hover:text-white h-11 rounded-md px-6 sm:px-8 text-base sm:text-lg"
            >
              Watch Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-crypto-primary">
                500+ Sites Launched
              </div>
              <div className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>Sites Launched</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-crypto-secondary">
                20+ Cryptocurrencies
              </div>
              <div className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>Cryptocurrencies Supported</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-crypto-accent">
                5-Minute Launch
              </div>
              <div className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>Average Deployment Time</div>
            </div>
          </div>

          {/* Floating icons for visual appeal */}
          <div className="absolute top-1/2 left-4 sm:left-10 hidden lg:block">
            <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-crypto-primary/50 animate-pulse" />
          </div>
          <div className="absolute top-1/3 right-4 sm:right-10 hidden lg:block">
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-crypto-secondary/50 animate-pulse" />
          </div>
          <div className="absolute bottom-1/3 left-8 sm:left-20 hidden lg:block">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-crypto-accent/50 animate-pulse" />
          </div>
          <div className="absolute bottom-1/4 right-8 sm:right-20 hidden lg:block">
            <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-crypto-primary/50 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
