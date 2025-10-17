'use client'

import { useState, useEffect } from 'react'
import { getCurrentLanguage, getTranslation } from '@/lib/language'

export default function PricingPage() {
  const [currentLang, setCurrentLang] = useState('en')

  useEffect(() => {
    setCurrentLang(getCurrentLanguage())
  }, [])

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
                {getTranslation('pricingTitle', currentLang as any)}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {getTranslation('pricingSubtitle', currentLang as any)}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}