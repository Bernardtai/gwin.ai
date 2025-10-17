'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageSelector } from '@/components/ui/language-selector'
import { Menu, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getCurrentLanguage, getTranslation } from '@/lib/language'

export function Header() {
  const pathname = usePathname()
  const currentLang = getCurrentLanguage()

  const navigationItems = [
    { href: '/', label: getTranslation('home', currentLang) },
    { href: '/builder', label: getTranslation('builder', currentLang) },
    { href: '/services', label: getTranslation('services', currentLang) },
    { href: '/demo', label: getTranslation('demo', currentLang) },
    { href: '/pricing', label: getTranslation('pricing', currentLang) },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-crypto-primary" />
            <span className="text-xl font-bold font-crypto text-crypto-primary">
              GWIN.ai
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex">
          <ul className="flex items-center space-x-2">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                    pathname === item.href && 'bg-accent text-accent-foreground'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Right side controls */}
        <div className="hidden lg:flex items-center space-x-4">
          <LanguageSelector />
          <ThemeToggle />
          <Button variant="crypto" size="sm" className="text-sm px-4 py-2 h-10">
            {getTranslation('connectWallet', currentLang)}
          </Button>
        </div>

        {/* Mobile menu - only visible on mobile */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col space-y-4 mt-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'block px-4 py-3 text-base font-medium transition-colors hover:text-crypto-primary rounded-md hover:bg-muted',
                      pathname === item.href && 'text-crypto-primary bg-muted'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-6 border-t space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{getTranslation('language', currentLang)}</span>
                    <LanguageSelector variant="outline" size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{getTranslation('theme', currentLang)}</span>
                    <ThemeToggle />
                  </div>
                  <Button variant="crypto" size="sm" className="w-full text-sm py-3 h-11">
                    {getTranslation('connectWallet', currentLang)}
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}