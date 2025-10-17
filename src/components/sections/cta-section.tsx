// Temporarily remove translations
// import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Zap, TrendingUp, Users, Star } from 'lucide-react'

export function CTASection() {
  // const t = useTranslations()

  const benefits = [
    {
      icon: Zap,
      text: 'Deploy in under 5 minutes',
    },
    {
      icon: TrendingUp,
      text: 'Start earning immediately',
    },
    {
      icon: Users,
      text: 'Join 500+ crypto casinos',
    },
    {
      icon: Star,
      text: 'Professional-grade platform',
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-r from-crypto-primary/10 via-crypto-secondary/10 to-crypto-accent/10">
      <div className="container px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Ready to Launch Your Crypto Gambling Empire?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the revolution. Connect your wallet, describe your vision, deploy instantly.
          </p>

          {/* Benefits grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 text-sm">
                <benefit.icon className="h-5 w-5 text-crypto-primary" />
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link 
              href="/builder"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-crypto-primary text-white hover:bg-crypto-primary/90 crypto-glow h-11 rounded-md px-8 text-lg"
            >
              Start Building Now
            </Link>
           
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by crypto entrepreneurs worldwide
            </p>
            <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
              <span>🔒 Non-custodial</span>
              <span>🌐 Multi-chain</span>
              <span>⚡ Instant deployment</span>
              <span>💰 Crypto payments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
