// Temporarily remove translations
// import { useTranslations } from 'next-intl'

export function ProcessSection() {
  // const t = useTranslations('process')

  const steps = [
    {
      title: '🔗 Connect Wallet',
      description: 'Link your crypto wallet address',
      number: '1'
    },
    {
      title: '🎯 Describe Vision',
      description: 'Tell AI what gambling site you want',
      number: '2'
    },
    {
      title: '🚀 Launch Site',
      description: 'Deploy live instantly',
      number: '3'
    },
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            3 Simple Steps to Your Gambling Empire
          </h2>
          <p className="text-xl text-muted-foreground">
            From wallet connection to live site in minutes. No complexity, just results.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative">
                {/* Step number circle */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-crypto-primary text-2xl font-bold text-white">
                  {step.number}
                </div>

                {/* Connecting line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-crypto-primary/30 md:block" />
                )}

                {/* Step content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center rounded-full bg-crypto-primary/10 px-6 py-3 text-sm font-medium text-crypto-primary">
            <span className="mr-2">🚀</span>
            Ready to start your journey?
          </div>
        </div>
      </div>
    </section>
  )
}
