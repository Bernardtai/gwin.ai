'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Gamepad2, 
  Trophy, 
  Star, 
  Play, 
  Download, 
  Monitor, 
  Smartphone, 
  Laptop,
  ArrowRight,
  Info
} from 'lucide-react'
import { Game } from '@/types/games'
import Image from 'next/image'

interface GameCardProps {
  game: Game
  currentLang: string
  onBackgroundBlur?: (isBlurred: boolean) => void
}

export function GameCard({ game, currentLang, onBackgroundBlur }: GameCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const getPlatformIcons = (platforms: string[]) => {
    return platforms.map((platform, index) => {
      switch (platform.toLowerCase()) {
        case 'web':
          return <Monitor key={index} className="h-4 w-4" />
        case 'mobile':
          return <Smartphone key={index} className="h-4 w-4" />
        case 'desktop':
          return <Laptop key={index} className="h-4 w-4" />
        default:
          return <Gamepad2 key={index} className="h-4 w-4" />
      }
    })
  }

  const getGameName = (game: Game) => {
    if (typeof game.name === 'string') {
      return game.name
    }
    const langKey = currentLang === 'zh-CN' ? 'zh-cn' : 
                   currentLang === 'zh-TW' ? 'zh-tw' : 
                   currentLang === 'th' ? 'th' : 
                   currentLang === 'vi' ? 'vi' : 'en'
    return game.name[langKey as keyof typeof game.name] || game.name.en || 'Untitled Game'
  }

  const getGameDescription = (game: Game) => {
    if (typeof game.description === 'string') {
      return game.description
    }
    const langKey = currentLang === 'zh-CN' ? 'zh-cn' : 
                   currentLang === 'zh-TW' ? 'zh-tw' : 
                   currentLang === 'th' ? 'th' : 
                   currentLang === 'vi' ? 'vi' : 'en'
    return game.description[langKey as keyof typeof game.description] || game.description.en || 'No description available'
  }

  const getGameImagePath = (game: Game) => {
    // Use the local_main image path from the game's images object
    if (game.images && game.images.local_main) {
      return game.images.local_main
    }
    
    // Fallback to local_icon if local_main is not available
    if (game.images && game.images.local_icon) {
      return game.images.local_icon
    }
    
    // Final fallback to a generic game image based on category
    const categoryImages: { [key: string]: string } = {
      'slot games': 'dragon-treasure.webp',
      'poker': 'texas-hold\'em-1.webp',
      'blackjack': 'american-18.webp',
      'roulette': 'european-17.webp',
      'baccarat': 'punto-banco-15.webp',
      'sports': 'football-1.webp',
      'lottery': 'powerball-1.webp',
      'live': 'dragon-1.webp'
    }
    
    const category = game.category?.toLowerCase() || ''
    const fallbackImage = categoryImages[category] || 'dragon-treasure.webp'
    
    return `/assets/images/games/${fallbackImage}`
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setIsFlipped(true)
    onBackgroundBlur?.(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsFlipped(false)
    onBackgroundBlur?.(false)
  }

  return (
    <div 
      className="relative w-full h-80 perspective-1000"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Container with 3D Transform */}
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of Card - Game Preview with Info Below */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-slate-900">
            {/* Game Image - Top Half */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={getGameImagePath(game)}
                alt={getGameName(game)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Top Right Rating */}
              <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-white">{game.rating}</span>
              </div>
              
              {/* Platform Icons - Top Left */}
              <div className="absolute top-3 left-3 flex items-center space-x-2 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
                {getPlatformIcons(game.platform)}
              </div>
            </div>

            {/* Game Info - Bottom Half */}
            <div className="p-4 h-32 flex flex-col justify-between">
              {/* Game Title and Description */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                  {getGameName(game)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {getGameDescription(game)}
                </p>
              </div>

              {/* Game Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">{game.provider}</span>
                <span className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">{game.size}</span>
                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded px-2 py-1">
                  {game.status}
                </span>
              </div>

              {/* Hover Indicator */}
              <div className="flex items-center justify-center text-gray-400 text-xs mt-2">
                <Info className="h-3 w-3 mr-1" />
                <span>Hover for details</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Back of Card - Game Details with Play Link */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <Card className="h-full overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-crypto-dark via-crypto-darker to-black">
            {/* Background with subtle pattern */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-crypto-primary/10 via-crypto-secondary/5 to-crypto-accent/10" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col p-6">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getPlatformIcons(game.platform)}
                  </div>
                  <div className="flex items-center space-x-1 bg-crypto-primary/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-white">{game.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">
                  {getGameName(game)}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {getGameDescription(game)}
                </p>
              </div>

              {/* Features */}
              <div className="mb-4 flex-1">
                <h4 className="text-sm font-semibold text-crypto-primary mb-2">Features:</h4>
                <div className="grid grid-cols-2 gap-1">
                  {game.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="text-xs text-gray-400 bg-black/30 rounded px-2 py-1">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Game Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Provider:</span>
                  <span className="text-white font-medium">{game.provider}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Size:</span>
                  <span className="text-white font-medium">{game.size}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Players:</span>
                  <span className="text-white font-medium">{game.players}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400 font-medium">{game.status}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 bg-transparent border-crypto-primary text-crypto-primary hover:bg-crypto-primary hover:text-white transition-all duration-300"
                  onClick={() => window.open(game.links?.demo || game.launchUrl, '_blank')}
                >
                  <Play className="h-4 w-4 mr-1" />
                  Demo
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-crypto-primary hover:bg-crypto-primary/90 text-white transition-all duration-300"
                  onClick={() => window.open(game.links?.main || game.launchUrl, '_blank')}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Add Game
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
