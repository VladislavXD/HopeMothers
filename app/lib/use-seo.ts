'use client'

import { useEffect } from 'react'
import { useLanguage } from './language-context'
import { translations } from './translations'

export function useSEO() {
  const { language } = useLanguage()

  useEffect(() => {
    const seo = translations[language].seo
    
    // Обновляем title
    document.title = seo.title
    
    // Обновляем meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', seo.description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = seo.description
      document.head.appendChild(meta)
    }
    
    // Обновляем meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', seo.keywords)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'keywords'
      meta.content = seo.keywords
      document.head.appendChild(meta)
    }
    
    // Обновляем lang атрибут
    document.documentElement.lang = language
    
    // Обновляем Open Graph мета-теги
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', seo.title)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:title')
      meta.content = seo.title
      document.head.appendChild(meta)
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', seo.description)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:description')
      meta.content = seo.description
      document.head.appendChild(meta)
    }
    
  }, [language])
}
