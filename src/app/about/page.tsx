'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getCurrentLanguage, getTranslation } from '@/lib/language'
import { Zap, Users, Target, Award, ArrowRight, Globe, Shield, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const [currentLang, setCurrentLang] = useState('en')

  useEffect(() => {
    setCurrentLang(getCurrentLanguage())
  }, [])

  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      description: 'Former Goldman Sachs quant with 10+ years in crypto and gambling tech.',
      image: '/team/alex.jpg',
    },
    {
      name: 'Sarah Kim',
      role: 'CTO',
      description: 'Ex-Google engineer specializing in AI and blockchain infrastructure.',
      image: '/team/sarah.jpg',
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of Product',
      description: 'Former DraftKings product lead with deep gambling industry experience.',
      image: '/team/marcus.jpg',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Head of Security',
      description: 'Cybersecurity expert with 15+ years protecting financial systems.',
      image: '/team/elena.jpg',
    },
  ]

  const values = [
    {
      icon: <Zap className="h-8 w-8 text-crypto-primary" />,
      title: 'Innovation First',
      description: 'We push the boundaries of what\'s possible with AI and blockchain technology.',
    },
    {
      icon: <Shield className="h-8 w-8 text-crypto-primary" />,
      title: 'Security & Privacy',
      description: 'Your data and your users\' data is protected with bank-grade security.',
    },
    {
      icon: <Globe className="h-8 w-8 text-crypto-primary" />,
      title: 'Global Accessibility',
      description: 'Making crypto gambling accessible to everyone, everywhere.',
    },
    {
      icon: <Users className="h-8 w-8 text-crypto-primary" />,
      title: 'Community Driven',
      description: 'We build for our community, with our community, and by our community.',
    },
  ]

  const milestones = [
    {
      year: '2023',
      title: 'Company Founded',
      description: 'GWIN.ai was founded with a vision to democratize crypto gambling.',
    },
    {
      year: '2024 Q1',
      title: 'AI Builder Launched',
      description: 'Released our first AI-powered gambling site builder.',
    },
    {
      year: '2024 Q2',
      title: '500+ Sites Launched',
      description: 'Reached a major milestone of 500+ successful platform launches.',
    },
    {
      year: '2024 Q3',
      title: 'Multi-Chain Support',
      description: 'Added support for Ethereum, Polygon, BSC, and Arbitrum.',
    },
    {
      year: '2024 Q4',
      title: 'Enterprise Solutions',
      description: 'Launched enterprise-grade solutions for large-scale operations.',
    },
  ]

  const stats = [
    {
      number: '500+',
      label: 'Sites Launched',
      icon: <TrendingUp className="h-6 w-6 text-crypto-primary" />,
    },
    {
      number: '20+',
      label: 'Cryptocurrencies',
      icon: <Globe className="h-6 w-6 text-crypto-primary" />,
    },
    {
      number: '5 min',
      label: 'Average Build Time',
      icon: <Zap className="h-6 w-6 text-crypto-primary" />,
    },
    {
      number: '99.9%',
      label: 'Uptime',
      icon: <Shield className="h-6 w-6 text-crypto-primary" />,
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
                {getTranslation('aboutTitle', currentLang as any)}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {getTranslation('aboutSubtitle', currentLang as any)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/builder" className="inline-flex items-center justify-center bg-crypto-primary text-white hover:bg-crypto-primary/90 crypto-glow h-11 rounded-md px-6 sm:px-8 text-base sm:text-lg">
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center border-2 border-crypto-primary text-crypto-primary hover:bg-crypto-primary hover:text-white h-11 rounded-md px-6 sm:px-8 text-base sm:text-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We believe that everyone should have access to the tools needed to build a successful 
                  crypto gambling platform. Our mission is to democratize the gambling industry by 
                  removing technical barriers and making it accessible to entrepreneurs worldwide.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  Through cutting-edge AI technology and blockchain integration, we&apos;re creating a 
                  future where anyone can launch a professional gambling platform in minutes, 
                  not months.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/builder" className="inline-flex items-center justify-center bg-crypto-primary text-white hover:bg-crypto-primary/90 crypto-glow h-11 rounded-md px-6 text-base">
                    Join Our Mission
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-crypto-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-r from-crypto-primary/10 via-crypto-secondary/10 to-crypto-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Our Values
              </h2>
              <p className="text-xl text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-muted-foreground">
                The brilliant minds behind GWIN.ai
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-crypto-primary font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {member.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-r from-crypto-primary/10 via-crypto-secondary/10 to-crypto-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Our Journey
              </h2>
              <p className="text-xl text-muted-foreground">
                Key milestones in our mission to democratize crypto gambling
              </p>
            </div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-crypto-primary text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-lg font-bold text-crypto-primary">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-semibold">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Be part of the future of crypto gambling. Start building your platform today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/builder" className="inline-flex items-center justify-center bg-crypto-primary text-white hover:bg-crypto-primary/90 crypto-glow h-11 rounded-md px-6 sm:px-8 text-base sm:text-lg">
                Start Building Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center border-2 border-crypto-primary text-crypto-primary hover:bg-crypto-primary hover:text-white h-11 rounded-md px-6 sm:px-8 text-base sm:text-lg">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}