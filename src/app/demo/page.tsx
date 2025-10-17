'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getCurrentLanguage, getTranslation } from '@/lib/language'
import { Play, Zap, TrendingUp, Users, Star, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function DemoPage() {
  const [currentLang, setCurrentLang] = useState('en')
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    setCurrentLang(getCurrentLanguage())
  }, [])

  const demoSteps = [
    {
      title: 'Connect Your Wallet',
      description: 'Connect your crypto wallet in seconds. No KYC, no personal information required.',
      icon: <Zap className="h-8 w-8 text-crypto-primary" />,
      video: '/demo/wallet-connect.mp4',
    },
    {
      title: 'Describe Your Vision',
      description: 'Tell our AI what kind of gambling platform you want. Be as specific or general as you like.',
      icon: <Play className="h-8 w-8 text-crypto-primary" />,
      video: '/demo/ai-chat.mp4',
    },
    {
      title: 'AI Builds Your Site',
      description: 'Watch as our AI creates your professional gambling platform in real-time.',
      icon: <TrendingUp className="h-8 w-8 text-crypto-primary" />,
      video: '/demo/site-generation.mp4',
    },
    {
      title: 'Deploy & Earn',
      description: 'Your site is live and ready to accept players. Start earning immediately!',
      icon: <Star className="h-8 w-8 text-crypto-primary" />,
      video: '/demo/deployment.mp4',
    },
  ]

  const features = [
    {
      title: '⚡ 5-Minute Setup',
      description: 'From wallet connection to live site in under 5 minutes',
    },
    {
      title: '🤖 AI-Powered',
      description: 'Advanced AI that understands your vision and builds accordingly',
    },
    {
      title: '💰 Crypto Payments',
      description: 'Accept ETH, BTC, USDC, and 20+ other cryptocurrencies',
    },
    {
      title: '🌐 Multi-Chain',
      description: 'Support for Ethereum, Polygon, BSC, Arbitrum, and more',
    },
    {
      title: '📱 Mobile Ready',
      description: 'Responsive design that works perfectly on all devices',
    },
    {
      title: '🔒 Secure',
      description: 'Bank-grade security with crypto wallet integration',
    },
  ]

  const testimonials = [
    {
      name: 'Crypto Casino King',
      role: 'Platform Owner',
      content: 'Built my casino in 3 minutes. Already making $5K/month!',
      revenue: '$5,000/month',
    },
    {
      name: 'Sports Bet Pro',
      role: 'Platform Owner',
      content: 'The AI understood exactly what I wanted. Perfect sports betting site!',
      revenue: '$8,500/month',
    },
    {
      name: 'Poker Master',
      role: 'Platform Owner',
      content: 'Best investment I ever made. ROI in the first week!',
      revenue: '$12,000/month',
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-crypto-dark via-crypto-darker to-black text-white">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full blur-3xl bg-crypto-primary/20" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full blur-3xl bg-crypto-secondary/20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 font-crypto">
              <span className="bg-gradient-to-r from-crypto-primary via-crypto-secondary to-crypto-accent bg-clip-text text-transparent">
                {getTranslation('demoTitle', currentLang as any)}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {getTranslation('demoSubtitle', currentLang as any)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-crypto-primary text-white hover:bg-crypto-primary/90 crypto-glow">
                <Play className="mr-2 h-5 w-5" />
                Watch Full Demo
              </Button>
              <Link href="/builder" className="inline-flex items-center justify-center border-2 border-crypto-primary text-crypto-primary hover:bg-crypto-primary hover:text-white h-11 rounded-md px-6 sm:px-8 text-base sm:text-lg">
                Try It Yourself
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Steps */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground">
                See how easy it is to build your gambling empire
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {demoSteps.map((step, index) => (
                <Card 
                  key={index} 
                  className={`p-6 text-center hover:shadow-lg transition-all cursor-pointer ${
                    activeStep === index ? 'ring-2 ring-crypto-primary bg-crypto-primary/5' : ''
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex justify-center mb-4">
                    {step.icon}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      {index + 1}. {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{step.description}</CardDescription>
                  </CardContent>
                  {activeStep === index && (
                    <div className="mt-4">
                      <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                        <Play className="h-12 w-12 text-crypto-primary" />
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gradient-to-r from-crypto-primary/10 via-crypto-secondary/10 to-crypto-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Why Choose GWIN.ai?
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to launch a successful crypto gambling platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Success Stories
              </h2>
              <p className="text-xl text-muted-foreground">
                Real results from real users
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-crypto-primary">
                          {testimonial.revenue}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-crypto-primary/10 via-crypto-secondary/10 to-crypto-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Build Your Empire?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join 500+ successful crypto gambling platforms built with our AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/builder" className="inline-flex items-center justify-center bg-crypto-primary text-white hover:bg-crypto-primary/90 crypto-glow h-11 rounded-md px-6 sm:px-8 text-base sm:text-lg">
                Start Building Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              {/* <Link href="/pricing" className="inline-flex items-center justify-center border-2 border-crypto-primary text-crypto-primary hover:bg-crypto-primary hover:text-white h-11 rounded-md px-6 sm:px-8 text-base sm:text-lg">
                View Pricing
              </Link> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}