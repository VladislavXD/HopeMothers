'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, Language } from './translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru')

  // Загружаем сохраненный язык из localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && ['ru', 'en', 'uz'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Сохраняем язык в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  // Функция для получения перевода по ключу
  const t = (key: string): string => {
    const keys = key.split('.')
    let translation: any = translations[language]
    
    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k]
      } else {
        // Если перевод не найден, возвращаем ключ или перевод с русского
        console.warn(`Translation missing for key: ${key} in language: ${language}`)
        let fallback: any = translations.ru
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk]
          } else {
            return key
          }
        }
        return fallback || key
      }
    }
    
    return typeof translation === 'string' ? translation : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
