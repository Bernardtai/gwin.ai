// Temporarily remove translations
// import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function FeaturesSection() {
  // const t = useTranslations('features')

  const features = [
    {
      title: '⚡ Instant Deployment',
      description: 'From wallet connection to live site in under 5 minutes',
    },
    {
      title: '💰 Crypto Payments Only',
      description: 'Accept ETH, BTC, USDC, and 20+ other cryptocurrencies',
    },
    {
      title: '🤖 AI Site Builder',
      description: 'Describe your vision, AI builds your perfect gambling site',
    },
    {
      title: '🌐 Multi-Chain Support',
      description: 'Ethereum, Polygon, BSC, Arbitrum - your choice',
    },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Revolutionary Crypto-First Features
          </h2>
          <p className="text-xl text-muted-foreground">
            Built for the future of gambling - wallet-first, AI-powered, crypto-native.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-crypto-primary/50 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-4">{feature.title.split(' ')[0]}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
