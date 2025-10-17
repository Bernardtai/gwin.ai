import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is valid, fallback to 'en' if not
  const validLocale = locale && ['en', 'zh-CN', 'zh-TW', 'th', 'vi'].includes(locale) ? locale : 'en'
  
  return {
    locale: validLocale,
    messages: (await import(`../../../messages/${validLocale}.json`)).default
  }
})
