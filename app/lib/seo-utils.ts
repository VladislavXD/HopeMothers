import type { Metadata } from "next";
import { translations, Language } from "./translations";

export function generateMetadata(language: Language = 'ru'): Metadata {
  const seo = translations[language].seo;
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: "HopeMothers" }],
    creator: "HopeMothers",
    publisher: "HopeMothers",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: getOpenGraphLocale(language),
      url: 'https://hopemothers.uz',
      title: seo.title,
      description: seo.description,
      siteName: 'HopeMothers',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&h=630&fit=crop',
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&h=630&fit=crop'],
    },
    alternates: {
      canonical: 'https://hopemothers.uz',
      languages: {
        'ru': 'https://hopemothers.uz/ru',
        'en': 'https://hopemothers.uz/en',  
        'uz': 'https://hopemothers.uz/uz',
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },
  };
}

function getOpenGraphLocale(language: Language): string {
  const localeMap = {
    'ru': 'ru_RU',
    'en': 'en_US',
    'uz': 'uz_UZ',
  };
  return localeMap[language];
}

// JSON-LD структурированные данные
export function generateJsonLd(language: Language = 'ru') {
  const seo = translations[language].seo;
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HopeMothers",
    "description": seo.description,
    "url": "https://hopemothers.uz",
    "logo": "https://hopemothers.uz/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998-90-123-45-67",
      "contactType": "Customer Service",
      "areaServed": "UZ",
      "availableLanguage": ["Russian", "English", "Uzbek"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UZ",
      "addressLocality": "Tashkent"
    },
    "sameAs": [
      "https://t.me/hopemothers",
      "https://instagram.com/hopemothers"
    ]
  };
}
