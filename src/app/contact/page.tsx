'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getCurrentLanguage, getTranslation } from '@/lib/language'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Twitter, Github } from 'lucide-react'

export default function ContactPage() {
  const [currentLang, setCurrentLang] = useState('en')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  useEffect(() => {
    setCurrentLang(getCurrentLanguage())
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-crypto-primary" />,
      title: 'Email',
      description: 'Get in touch via email',
      contact: 'hello@gwin.ai',
      link: 'mailto:hello@gwin.ai',
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-crypto-primary" />,
      title: 'Discord',
      description: 'Join our community',
      contact: 'discord.gg/gwin-ai',
      link: 'https://discord.gg/gwin-ai',
    },
    {
      icon: <Twitter className="h-6 w-6 text-crypto-primary" />,
      title: 'Twitter',
      description: 'Follow us for updates',
      contact: '@gwin_ai',
      link: 'https://twitter.com/gwin_ai',
    },
    {
      icon: <Github className="h-6 w-6 text-crypto-primary" />,
      title: 'GitHub',
      description: 'Check out our code',
      contact: 'github.com/gwin-ai',
      link: 'https://github.com/gwin-ai',
    },
  ]

  const faqs = [
    {
      question: 'How quickly can I get support?',
      answer: 'We typically respond to support requests within 24 hours. Pro and Enterprise customers get priority support.',
    },
    {
      question: 'Do you offer custom development?',
      answer: 'Yes! We offer custom development services for Enterprise customers. Contact us to discuss your needs.',
    },
    {
      question: 'Can I schedule a demo?',
      answer: 'Absolutely! We offer personalized demos for all our plans. Contact us to schedule yours.',
    },
    {
      question: 'Do you have a partner program?',
      answer: 'Yes! We have a partner program for agencies and developers. Contact us for more information.',
    },
  ]

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
                {getTranslation('contactTitle', currentLang as any)}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {getTranslation('contactSubtitle', currentLang as any)}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">
                  Send us a message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Have a question or need help? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full bg-crypto-primary text-white hover:bg-crypto-primary/90">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>
              
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">
                  Get in touch
                </h2>
                <p className="text-muted-foreground mb-8">
                  We&apos;re here to help! Reach out to us through any of these channels.
                </p>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{info.title}</h3>
                          <p className="text-muted-foreground mb-2">{info.description}</p>
                          <a 
                            href={info.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-crypto-primary hover:text-crypto-primary/80 font-medium"
                          >
                            {info.contact}
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                {/* Business Hours */}
                <Card className="p-6 mt-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Clock className="h-6 w-6 text-crypto-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Business Hours</h3>
                      <p className="text-muted-foreground mb-2">We&apos;re available to help you</p>
                      <div className="text-sm">
                        <div>Monday - Friday: 9:00 AM - 6:00 PM PST</div>
                        <div>Saturday: 10:00 AM - 4:00 PM PST</div>
                        <div>Sunday: Closed</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-r from-crypto-primary/10 via-crypto-secondary/10 to-crypto-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Quick answers to common questions
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{faq.answer}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Don&apos;t wait - start building your crypto gambling empire today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-crypto-primary text-white hover:bg-crypto-primary/90">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}