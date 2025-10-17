'use client'

import { useState, useEffect } from 'react'
import { AIChatWidget } from '@/components/ai/ai-chat-widget'
import { HeroSection } from '@/components/sections/hero-section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getCurrentLanguage, getTranslation } from '@/lib/language'
import { Bot, Zap, TrendingUp, Shield, Globe, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function BuilderPage() {
  const [currentLang, setCurrentLang] = useState('en')
  const [generatedSite, setGeneratedSite] = useState<any>(null)

  useEffect(() => {
    setCurrentLang(getCurrentLanguage())
  }, [])

  const handleSiteGenerated = (siteData: any) => {
    setGeneratedSite(siteData)
  }

  const features = [
    {
      icon: <Bot className="h-8 w-8 text-crypto-primary" />,
      title: 'AI-Powered Design',
      description: 'Our AI understands your vision and creates a professional gambling platform tailored to your needs.',
    },
    {
      icon: <Zap className="h-8 w-8 text-crypto-primary" />,
      title: 'Instant Deployment',
      description: 'From concept to live site in under 5 minutes. No coding, no complex setup required.',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-crypto-primary" />,
      title: 'Revenue Optimization',
      description: 'Built-in features to maximize your earnings from day one with proven conversion strategies.',
    },
    {
      icon: <Shield className="h-8 w-8 text-crypto-primary" />,
      title: 'Crypto-First Security',
      description: 'Bank-grade security with crypto wallet integration. No KYC, no personal data required.',
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
                {getTranslation('builderTitle', currentLang as any)}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {getTranslation('builderSubtitle', currentLang as any)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#ai-builder" className="inline-flex items-center justify-center bg-crypto-primary text-white hover:bg-crypto-primary/90 crypto-glow h-11 rounded-md px-6 sm:px-8 text-base sm:text-lg">
                Start Building Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/demo" className="inline-flex items-center justify-center border-2 border-crypto-primary text-crypto-primary hover:bg-crypto-primary hover:text-white h-11 rounded-md px-6 sm:px-8 text-base sm:text-lg">
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Builder Section */}
      <section id="ai-builder" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Build Your Gambling Empire
              </h2>
              <p className="text-xl text-muted-foreground">
                Simply describe what you want, and our AI will create it for you
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* AI Chat Widget */}
              <div className="lg:col-span-1">
                <AIChatWidget 
                  onSiteGenerated={handleSiteGenerated}
                  className="h-[600px]"
                />
              </div>
              
              {/* Features */}
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-2xl font-bold mb-6">Why Choose Our AI Builder?</h3>
                {features.map((feature, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Generated Site Preview */}
      {generatedSite && (
        <section className="py-24 bg-gradient-to-r from-crypto-primary/10 via-crypto-secondary/10 to-crypto-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                🎉 Your Site is Ready!
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Your gambling platform has been generated with the following features:
              </p>
              
              <Card className="p-8 mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Site Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <strong>Type:</strong> {generatedSite.siteType}
                    </div>
                    <div>
                      <strong>Estimated Revenue:</strong> ${generatedSite.estimatedRevenue}/month
                    </div>
                    <div>
                      <strong>Features:</strong> {generatedSite.features.join(', ')}
                    </div>
                    <div>
                      <strong>Generated:</strong> {generatedSite.timestamp.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-crypto-primary text-white hover:bg-crypto-primary/90">
                  Deploy to Vercel
                </Button>
                <Button variant="outline" size="lg">
                  Preview Site
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-crypto-primary/10 via-crypto-secondary/10 to-crypto-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Start Your Gambling Empire?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join 500+ successful crypto gambling platforms built with our AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#ai-builder" className="inline-flex items-center justify-center bg-crypto-primary text-white hover:bg-crypto-primary/90 crypto-glow h-11 rounded-md px-6 sm:px-8 text-base sm:text-lg">
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
