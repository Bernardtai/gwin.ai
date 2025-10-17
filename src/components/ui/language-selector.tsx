'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getCurrentLanguage, getTranslation, type Language } from '@/lib/language'

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'zh-CN' as Language, name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW' as Language, name: '繁體中文', flag: '🇹🇼' },
  { code: 'th' as Language, name: 'ไทย', flag: '🇹🇭' },
  { code: 'vi' as Language, name: 'Tiếng Việt', flag: '🇻🇳' },
]

interface LanguageSelectorProps {
  className?: string
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'sm' | 'default' | 'lg'
  showLabel?: boolean
}

export function LanguageSelector({ 
  className, 
  variant = 'ghost', 
  size = 'sm',
  showLabel = false 
}: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [currentLang, setCurrentLang] = useState<Language>('en')
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Load saved language preference on mount
  useEffect(() => {
    setMounted(true)
    const savedLanguage = getCurrentLanguage()
    const language = languages.find(lang => lang.code === savedLanguage)
    if (language) {
      setSelectedLanguage(language)
      setCurrentLang(savedLanguage)
    }
  }, [])

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return (
      <Button 
        variant={variant} 
        size={size}
        className={cn('gap-2', className)}
        type="button"
        disabled
      >
        <Globe className="h-4 w-4" />
        <span>🇺🇸</span>
      </Button>
    )
  }

  const handleLanguageChange = (newLocale: Language) => {
    const newLanguage = languages.find(lang => lang.code === newLocale) || languages[0]
    setSelectedLanguage(newLanguage)
    setCurrentLang(newLocale)
    
    // Store the language preference
    localStorage.setItem('preferred-language', newLocale)
    
    // Close the dropdown
    setOpen(false)
    
    // Trigger a page refresh to update all content
    window.location.reload()
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size}
          className={cn('gap-2', className)}
          type="button"
        >
          <Globe className="h-4 w-4" />
          {showLabel && selectedLanguage && (
            <span className="hidden sm:inline">{selectedLanguage.name}</span>
          )}
          {!showLabel && selectedLanguage && (
            <span>{selectedLanguage.flag}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={cn(
              'flex items-center gap-2 cursor-pointer',
              selectedLanguage.code === language.code && 'bg-accent text-accent-foreground'
            )}
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
            {selectedLanguage.code === language.code && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}