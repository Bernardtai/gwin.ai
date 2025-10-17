'use client'

// Temporarily remove translations
// import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'

export function WalletConnect() {
  // const t = useTranslations('navigation')

  // Placeholder for wallet connection - will be replaced with actual Web3 integration
  return (
    <Button
      variant="crypto"
      size="sm"
      className="flex items-center space-x-2"
      onClick={() => {
        // TODO: Implement actual wallet connection
        console.log('Wallet connection clicked')
      }}
    >
      <Wallet className="h-4 w-4" />
      <span>Connect Wallet</span>
    </Button>
  )
}
