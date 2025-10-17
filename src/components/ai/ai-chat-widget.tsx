'use client'

import { useState, useRef, useEffect } from 'react'
// Temporarily remove translations
// import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot, Send, User, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIChatWidgetProps {
  className?: string
  onSiteGenerated?: (siteData: any) => void
  initialMessage?: string
}

export function AIChatWidget({
  className,
  onSiteGenerated,
  initialMessage
}: AIChatWidgetProps) {
  // const t = useTranslations('builder')
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content: "🤖 Hello! I'm your AI gambling site builder. Tell me what kind of gambling site you want to create. For example: 'A crypto casino with slots and poker' or 'A sports betting platform'",
      timestamp: new Date()
    }
    setMessages([welcomeMessage])

    if (initialMessage) {
      setTimeout(() => {
        handleSendMessage(initialMessage)
      }, 1000)
    }
  }, [initialMessage])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    setIsTyping(true)

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    setIsTyping(false)
    setIsGenerating(true)

    // Simulate site generation delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsGenerating(false)

    // Generate contextual response based on user input
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes('casino') || lowerMessage.includes('slots')) {
      return `🎰 Building your crypto casino empire!\n\nI've created a professional casino with:\n• 🎲 ${Math.floor(Math.random() * 20) + 10} slot games\n• 🃏 Poker tables and blackjack\n• 💰 ETH, USDC, and BTC payments\n• 🎨 Dark crypto theme\n\nEstimated monthly revenue: $${(Math.random() * 2000 + 3000).toFixed(0)}\n\nReady to deploy this to Vercel?`
    } else if (lowerMessage.includes('sports') || lowerMessage.includes('betting')) {
      return `🏈 Creating your sports betting platform!\n\nYour site includes:\n• ⚽ Live sports betting\n• 📊 Real-time odds\n• 💳 Crypto deposits/withdrawals\n• 📱 Mobile optimized\n\nPotential revenue: $${(Math.random() * 3000 + 5000).toFixed(0)}/month\n\nWant me to add more sports or customize the design?`
    } else if (lowerMessage.includes('poker')) {
      return `🃏 Setting up your poker room!\n\nFeatures included:\n• 🎯 Texas Hold'em tables\n• 🏆 Tournament system\n• 💎 NFT rewards for winners\n• 🌐 Multi-table support\n\nProjected earnings: $${(Math.random() * 2500 + 4000).toFixed(0)}/month\n\nShall I proceed with the deployment?`
    } else {
      return `🚀 I understand you want: "${userMessage}"\n\nI'll create a custom gambling platform tailored to your vision. This includes:\n• 🎨 Unique design theme\n• 🎮 Customized game selection\n• 💰 Optimized payment systems\n• 📈 Revenue-maximizing features\n\nExpected monthly revenue: $${(Math.random() * 4000 + 2000).toFixed(0)}\n\nReady to see your site come to life?`
    }
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim()
    if (!text) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Generate AI response
    try {
      const aiResponse = await simulateAIResponse(text)
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])

      // Trigger site generation callback
      if (onSiteGenerated) {
        const siteData = {
          userInput: text,
          aiResponse,
          siteType: text.toLowerCase().includes('casino') ? 'casino' :
                   text.toLowerCase().includes('sports') ? 'sports' : 'custom',
          estimatedRevenue: Math.floor(Math.random() * 4000 + 2000),
          features: ['crypto-payments', 'mobile-responsive', 'ai-optimized'],
          timestamp: new Date()
        }
        onSiteGenerated(siteData)
      }
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: '❌ Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className={cn('flex flex-col h-[600px] max-h-[80vh]', className)}>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Bot className="h-5 w-5 text-crypto-primary" />
          <span>AI Site Builder</span>
          {isGenerating && (
            <div className="flex items-center space-x-1 ml-2">
              <Zap className="h-4 w-4 text-crypto-accent animate-pulse" />
              <span className="text-sm text-crypto-accent">Building...</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex space-x-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    <Bot className="h-8 w-8 text-crypto-primary bg-crypto-primary/10 rounded-full p-1.5" />
                  </div>
                )}

                <div
                  className={cn(
                    'max-w-[80%] rounded-lg px-4 py-3 text-sm',
                    message.role === 'user'
                      ? 'bg-crypto-primary text-white ml-auto'
                      : 'bg-muted text-foreground'
                  )}
                >
                  <div className="whitespace-pre-line">{message.content}</div>
                  <div
                    className={cn(
                      'text-xs mt-2 opacity-70',
                      message.role === 'user' ? 'text-right' : 'text-left'
                    )}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0">
                    <User className="h-8 w-8 text-muted-foreground bg-muted rounded-full p-1.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex space-x-3 justify-start">
                <div className="flex-shrink-0">
                  <Bot className="h-8 w-8 text-crypto-primary bg-crypto-primary/10 rounded-full p-1.5" />
                </div>
                <div className="bg-muted rounded-lg px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-crypto-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-crypto-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-crypto-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tell me what gambling site you want..."
              disabled={isTyping || isGenerating}
              className="flex-1"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping || isGenerating}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSendMessage("Crypto casino with slots and poker")}
              disabled={isTyping || isGenerating}
              className="text-xs"
            >
              🎰 Casino
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSendMessage("Sports betting platform")}
              disabled={isTyping || isGenerating}
              className="text-xs"
            >
              🏈 Sports Betting
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSendMessage("Poker room with tournaments")}
              disabled={isTyping || isGenerating}
              className="text-xs"
            >
              🃏 Poker Room
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
