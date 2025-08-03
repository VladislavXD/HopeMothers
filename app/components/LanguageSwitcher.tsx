'use client'

import React from 'react'
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react'
import { useLanguage } from '../lib/language-context'
import { Language } from '../lib/translations'

const languageOptions = [
  { key: 'ru', label: 'Русский', flag: '🇷🇺' },
  { key: 'en', label: 'English', flag: '🇺🇸' },
  { key: 'uz', label: 'O\'zbekcha', flag: '🇺🇿' }
]

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage()
  
  const currentLanguage = languageOptions.find(lang => lang.key === language)

  const handleLanguageChange = (key: string) => {
    setLanguage(key as Language)
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="light"
          className="min-w-unit-16 text-foreground hover:bg-default-100"
          size="sm"
        >
          <span className="text-lg">{currentLanguage?.flag}</span>
          <span className="hidden sm:inline ml-2">{currentLanguage?.label}</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        onAction={(key) => handleLanguageChange(key as string)}
        selectedKeys={[language]}
        selectionMode="single"
      >
        {languageOptions.map((lang) => (
          <DropdownItem key={lang.key} className="text-sm">
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
