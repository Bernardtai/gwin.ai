import { HeroSection } from '@/components/sections/hero-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { ProcessSection } from '@/components/sections/process-section'
import { DemoSection } from '@/components/sections/demo-section'
import { CTASection } from '@/components/sections/cta-section'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <DemoSection />
      <CTASection />
    </div>
  )
}