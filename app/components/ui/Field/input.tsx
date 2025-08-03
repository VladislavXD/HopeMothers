'use client'

import React, { useState } from 'react'
import { Input, Button, Textarea, RadioGroup, Radio } from "@heroui/react"
import { useLanguage } from '../../../lib/language-context'
import axios from 'axios'
import toast from 'react-hot-toast'

interface FormData {
  name: string
  phone: string
  email: string
  age: string
  region: string
  telegram: string
  hasPregnancyExperience: string
  comment: string
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  age?: string
  region?: string
  telegram?: string
  hasPregnancyExperience?: string
}

interface ContactFormProps {
  onSuccess?: () => void
}

const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    age: '',
    region: '',
    telegram: '',
    hasPregnancyExperience: '',
    comment: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Валидация имени
    if (!formData.name.trim()) {
      newErrors.name = t('validation.nameRequired')
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('validation.nameMinLength')
    }

    // Валидация телефона
    if (!formData.phone.trim()) {
      newErrors.phone = t('validation.phoneRequired')
    } else if (!/^\+?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = t('validation.phoneInvalid')
    }

    // Валидация email
    if (!formData.email.trim()) {
      newErrors.email = t('validation.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('validation.emailInvalid')
    }

    // Валидация возраста
    if (!formData.age.trim()) {
      newErrors.age = t('validation.ageRequired')
    } else {
      const ageNum = parseInt(formData.age)
      if (isNaN(ageNum) || ageNum < 18 || ageNum > 45) {
        newErrors.age = t('validation.ageRange')
      }
    }

    // Валидация региона
    if (!formData.region.trim()) {
      newErrors.region = t('validation.regionRequired')
    }

    // Валидация Telegram
    if (!formData.telegram.trim()) {
      newErrors.telegram = t('validation.telegramRequired')
    } else if (!/^@?[a-zA-Z0-9_]{5,32}$/.test(formData.telegram.replace('@', ''))) {
      newErrors.telegram = t('validation.telegramInvalid')
    }

    // Валидация опыта беременности
    if (!formData.hasPregnancyExperience) {
      newErrors.hasPregnancyExperience = t('validation.experienceRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Очищаем ошибку для поля при изменении
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Здесь будет отправка данных на сервер
      console.log('Form submission:', formData)

      const response = await axios.post('https://api.telegram.org/bot7654585303:AAF4PLGIngtvFrWEDB6utX0Q4Zy_kNSAygI/sendMessage', {
        chat_id: '610691463',
        text: `New form submission:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAge: ${formData.age}\nRegion: ${formData.region}\nTelegram: ${formData.telegram}\nExperience: ${formData.hasPregnancyExperience}\nComment: ${formData.comment}`
      })

      if (response.status === 200) {
        toast.success(`${t('toast.successTitle')}\n${t('toast.successDescription')}`, {
          duration: 4000,
          position: 'top-center',
        })
      } else {
        toast.error(`${t('toast.errorTitle')}\n${t('toast.errorDescription')}`, {
          duration: 4000,
          position: 'top-center',
        })
      }

      // Очистка формы после успешной отправки
      setFormData({
        name: '',
        phone: '',
        email: '',
        age: '',
        region: '',
        telegram: '',
        hasPregnancyExperience: '',
        comment: ''
      })
      
      
      // Закрываем модал после успешной отправки
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      toast.error(`${t('toast.errorTitle')}\n${t('toast.errorDescription')}`, {
        duration: 4000,
        position: 'top-center',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Имя */}
              <Input
                label={t('form.name')}
                placeholder={t('form.namePlaceholder')}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
                isRequired
                className="w-full"
              />

              {/* Телефон */}
              <Input
                label={t('form.phone')}
                placeholder={t('form.phonePlaceholder')}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                isInvalid={!!errors.phone}
                errorMessage={errors.phone}
                isRequired
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <Input
                label={t('form.email')}
                type="email"
                placeholder={t('form.emailPlaceholder')}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                isRequired
                className="w-full"
              />

              {/* Возраст */}
              <Input
                label={t('form.age')}
                type="number"
                placeholder={t('form.agePlaceholder')}
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                isInvalid={!!errors.age}
                errorMessage={errors.age}
                isRequired
                min="18"
                max="40"
                className="w-full"
              />
            </div>

            {/* Регион */}
            <Input
              label={t('form.region')}
              placeholder={t('form.regionPlaceholder')}
              value={formData.region}
              onChange={(e) => handleInputChange('region', e.target.value)}
              isInvalid={!!errors.region}
              errorMessage={errors.region}
              isRequired
              className="w-full"
            />

            {/* Telegram */}
            <Input
              label={t('form.telegram')}
              placeholder={t('form.telegramPlaceholder')}
              value={formData.telegram}
              onChange={(e) => handleInputChange('telegram', e.target.value)}
              isInvalid={!!errors.telegram}
              errorMessage={errors.telegram}
              isRequired
              className="w-full"
            />

            {/* Опыт беременности */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {t('form.experience')} <span className="text-danger">{t('form.required')}</span>
              </label>
              <RadioGroup
                value={formData.hasPregnancyExperience}
                onValueChange={(value) => handleInputChange('hasPregnancyExperience', value)}
                orientation="horizontal"
                className="flex gap-6"
                isInvalid={!!errors.hasPregnancyExperience}
              >
                <Radio value="yes" className="text-foreground">
                  {t('form.experienceYes')}
                </Radio>
                <Radio value="no" className="text-foreground">
                  {t('form.experienceNo')}
                </Radio>
              </RadioGroup>
              {errors.hasPregnancyExperience && (
                <p className="text-danger text-sm">{errors.hasPregnancyExperience}</p>
              )}
            </div>

            {/* Комментарий */}
            <Textarea
              label={t('form.comment')}
              placeholder={t('form.commentPlaceholder')}
              value={formData.comment}
              onChange={(e) => handleInputChange('comment', e.target.value)}
              minRows={4}
              className="w-full"
            />

            {/* Кнопка отправки */}
            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                color="primary"
                size="lg"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className="w-full md:w-auto min-w-[200px]"
              >
                {isSubmitting ? t('form.submitting') : t('form.submit')}
              </Button>
            </div>
          </form>
    </div>
  )
}

export default ContactForm