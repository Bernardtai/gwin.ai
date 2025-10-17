// Temporarily remove translations to avoid locale issues
// import { useTranslations } from 'next-intl'
import { HeroSection } from '@/components/sections/hero-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { ProcessSection } from '@/components/sections/process-section'
import { CTASection } from '@/components/sections/cta-section'

export default function HomePage() {
  // const t = useTranslations()

  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <CTASection />
    </div>
  )
}