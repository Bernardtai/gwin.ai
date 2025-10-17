'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Gamepad2, 
  Trophy, 
  Users2, 
  Star, 
  Play, 
  Download, 
  Monitor, 
  Smartphone, 
  Laptop,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Game } from '@/types/games'
import gamesData from '../../../../public/assets/games.json'

export default function ServicesPage() {
  const [isDark, setIsDark] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const gamesPerPage = 12

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
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

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  const handleGameLaunch = (game: Game) => {
    // Open game in new tab
    window.open(game.launchUrl, '_blank')
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'web':
        return <Monitor className="h-4 w-4" />
      case 'mobile':
        return <Smartphone className="h-4 w-4" />
      case 'desktop':
        return <Laptop className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Game Platform Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover and play premium gaming titles from WG.com. Access over 100+ games 
            across multiple platforms with seamless integration.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category
                  ? "bg-crypto-primary text-white"
                  : "border-crypto-primary text-crypto-primary hover:bg-crypto-primary hover:text-white"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {currentGames.map((game: Game, index: number) => (
            <Card key={game.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white/5 backdrop-blur-sm border-white/10">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-crypto-primary/20 to-crypto-secondary/20 flex items-center justify-center overflow-hidden">
                  {game.images && game.images.local_main ? (
                    <img 
                      src={game.images.local_main} 
                      alt={typeof game.name === 'string' ? game.name : (game.name as any).en || (game.name as any)['zh-cn'] || Object.values(game.name as any)[0]}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-crypto-primary/20 to-crypto-secondary/20" style={{display: game.images && game.images.local_main ? 'none' : 'flex'}}>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-crypto-primary to-crypto-secondary rounded-lg flex items-center justify-center">
                        <Gamepad2 className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-crypto-primary">
                        {typeof game.name === 'string' ? game.name : (game.name as any).en || (game.name as any)['zh-cn'] || Object.values(game.name as any)[0]}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {game.category}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-500/20 text-green-400 border-green-500/30">
                    {game.status}
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white">
                  {typeof game.name === 'string' ? game.name : (game.name as any).en || (game.name as any)['zh-cn'] || Object.values(game.name as any)[0]}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {typeof game.description === 'string' ? game.description : (game.description as any).en || (game.description as any)['zh-cn'] || Object.values(game.description as any)[0]}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Platform Icons */}
                <div className="flex items-center gap-2 mb-3">
                  {game.platform.map((platform: string, index: number) => (
                    <div key={index} className="flex items-center gap-1 text-xs text-gray-400">
                      {getPlatformIcon(platform)}
                      <span>{platform}</span>
                    </div>
                  ))}
                </div>
                
                {/* Game Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{game.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users2 className="h-4 w-4 text-blue-400" />
                    <span>{game.players}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4 text-green-400" />
                    <span>{game.size}</span>
                  </div>
                </div>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {game.features.slice(0, 3).map((feature: string, index: number) => (
                    <div key={index} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-xs border-white/20 text-gray-300">
                      {feature}
                    </div>
                  ))}
                  {game.features.length > 3 && (
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-xs border-white/20 text-gray-300">
                      +{game.features.length - 3}
                    </div>
                  )}
                </div>
                
                {/* Launch Button */}
                <Button 
                  onClick={() => handleGameLaunch(game)}
                  className="w-full bg-crypto-primary hover:bg-crypto-primary/90 text-white"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Launch Game
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-crypto-primary text-crypto-primary hover:bg-crypto-primary hover:text-white"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`${
                      currentPage === pageNum
                        ? "bg-crypto-primary text-white"
                        : "border-crypto-primary text-crypto-primary hover:bg-crypto-primary hover:text-white"
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border-crypto-primary text-crypto-primary hover:bg-crypto-primary hover:text-white"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Results Info */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredGames.length)} of {filteredGames.length} games
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6 bg-white/5 backdrop-blur-sm border-white/10">
            <div className="p-3 rounded-full bg-crypto-primary/10 w-fit mx-auto mb-4">
              <Trophy className="h-6 w-6 text-crypto-primary" />
            </div>
            <h3 className="text-2xl font-bold text-crypto-primary mb-2">{allGames.length} Games</h3>
            <p className="text-sm text-gray-400">Premium gaming titles</p>
          </Card>

          <Card className="text-center p-6 bg-white/5 backdrop-blur-sm border-white/10">
            <div className="p-3 rounded-full bg-crypto-secondary/10 w-fit mx-auto mb-4">
              <Users2 className="h-6 w-6 text-crypto-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-crypto-secondary mb-2">1.2M+ Players</h3>
            <p className="text-sm text-gray-400">Active community</p>
          </Card>

          <Card className="text-center p-6 bg-white/5 backdrop-blur-sm border-white/10">
            <div className="p-3 rounded-full bg-crypto-accent/10 w-fit mx-auto mb-4">
              <Star className="h-6 w-6 text-crypto-accent" />
            </div>
            <h3 className="text-2xl font-bold text-crypto-accent mb-2">
              {(allGames.reduce((sum: number, game: Game) => sum + game.rating, 0) / allGames.length).toFixed(1)} Rating
            </h3>
            <p className="text-sm text-gray-400">Average game rating</p>
          </Card>
        </div>

        {/* Features Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <div className="p-3 rounded-full bg-crypto-primary/10 w-fit mx-auto mb-4">
                <Gamepad2 className="h-6 w-6 text-crypto-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Premium Games</h3>
              <p className="text-sm text-gray-400">Access to the latest and most popular gaming titles</p>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <div className="p-3 rounded-full bg-crypto-secondary/10 w-fit mx-auto mb-4">
                <Monitor className="h-6 w-6 text-crypto-secondary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Multi-Platform</h3>
              <p className="text-sm text-gray-400">Play on Web, Mobile, and Desktop devices</p>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <div className="p-3 rounded-full bg-crypto-accent/10 w-fit mx-auto mb-4">
                <Star className="h-6 w-6 text-crypto-accent" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">High Quality</h3>
              <p className="text-sm text-gray-400">Top-rated games with excellent graphics and gameplay</p>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <div className="p-3 rounded-full bg-green-500/10 w-fit mx-auto mb-4">
                <Play className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instant Play</h3>
              <p className="text-sm text-gray-400">Launch games instantly without downloads</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}