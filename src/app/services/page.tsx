'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { GameCard } from '@/components/ui/game-card'
import { getCurrentLanguage, getTranslation } from '@/lib/language'
import { 
  Trophy, 
  Users2, 
  Star, 
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react'
import { Game } from '@/types/games'
import gamesData from '../../../public/assets/games.json'
import Link from 'next/link'

export default function ServicesPage() {
  const [currentLang, setCurrentLang] = useState('en')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false)
  const gamesPerPage = 12

  useEffect(() => {
    setCurrentLang(getCurrentLanguage())
  }, [])

  const allGames: Game[] = gamesData

  const filteredGames = selectedCategory === 'All'
    ? allGames
    : allGames.filter(game => game.category === selectedCategory)

  const categories = ['All', ...Array.from(new Set(allGames.map(game => game.category)))]

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage)
  const startIndex = (currentPage - 1) * gamesPerPage
  const endIndex = startIndex + gamesPerPage
  const currentGames = filteredGames.slice(startIndex, endIndex)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleBackgroundBlur = (isBlurred: boolean) => {
    setIsBackgroundBlurred(isBlurred)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section with Background */}
      <section className={`relative overflow-hidden py-24 bg-gradient-to-br from-crypto-dark via-crypto-darker to-black text-white transition-all duration-300 ${
        isBackgroundBlurred ? 'services-background-blur' : 'services-background-normal'
      }`}>
        {/* Background effects */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full blur-3xl bg-crypto-primary/20" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full blur-3xl bg-crypto-secondary/20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 font-crypto">
              <span className="bg-gradient-to-r from-crypto-primary via-crypto-secondary to-crypto-accent bg-clip-text text-transparent">
                {getTranslation('servicesTitle', currentLang as any)}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {getTranslation('servicesSubtitle', currentLang as any)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/builder" className="inline-flex items-center justify-center bg-crypto-primary text-white hover:bg-crypto-primary/90 crypto-glow h-11 rounded-md px-6 sm:px-8 text-base sm:text-lg">
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center justify-center border-2 border-crypto-primary text-crypto-primary hover:bg-crypto-primary hover:text-white h-11 rounded-md px-6 sm:px-8 text-base sm:text-lg">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Game Platform Hub */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{getTranslation('gamePlatformHub', currentLang as any)}</h2>
              <p className="text-xl text-muted-foreground">
                {getTranslation('servicesSubtitle', currentLang as any)}
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(category)}
                  className="mb-2"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {currentGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  currentLang={currentLang}
                  onBackgroundBlur={handleBackgroundBlur}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Stats */}
            <div className="mt-12 text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-lg border">
                  <Trophy className="h-8 w-8 text-crypto-primary mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{allGames.length}</h3>
                  <p className="text-muted-foreground">{getTranslation('totalGames', currentLang as any)}</p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <Users2 className="h-8 w-8 text-crypto-secondary mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{categories.length - 1}</h3>
                  <p className="text-muted-foreground">{getTranslation('categories', currentLang as any)}</p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <Star className="h-8 w-8 text-crypto-accent mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">4.8</h3>
                  <p className="text-muted-foreground">{getTranslation('averageRating', currentLang as any)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}