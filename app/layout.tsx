import React from "react";
import type { Metadata } from "next";

import "./globals.css";
import { Providers } from "./components/providers";
import { generateMetadata, generateJsonLd } from "./lib/seo-utils";


export const metadata: Metadata = generateMetadata('ru');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generateJsonLd('ru');
  
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="">
            <Providers>
              {children}
            </Providers>
      </body>
    </html>
  );
}
