'use client'

import { HeroUIProvider } from "@heroui/react";
import { LanguageProvider } from "../lib/language-context";
import { ThemeProvider, useTheme } from "../lib/theme-context";
import Nav from "./ui/Navbar/Navbar";
import { Toaster } from 'react-hot-toast';

const InnerProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      <LanguageProvider>
        <Nav/>
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            className: '',
            style: {
              background: 'hsl(var(--nextui-background))',
              color: 'hsl(var(--nextui-foreground))',
              border: '1px solid hsl(var(--nextui-divider))',
            },
            success: {
              duration: 4000,
              style: {
                background: 'hsl(var(--nextui-success-50))',
                color: 'hsl(var(--nextui-success-900))',
                border: '1px solid hsl(var(--nextui-success-200))',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: 'hsl(var(--nextui-danger-50))',
                color: 'hsl(var(--nextui-danger-900))',
                border: '1px solid hsl(var(--nextui-danger-200))',
              },
            },
          }}
        />
      </LanguageProvider>
    </HeroUIProvider>
  );
};

export function Providers({children}: { children: React.ReactNode })  {
  return (
    <ThemeProvider>
      <InnerProviders>
        {children}
      </InnerProviders>
    </ThemeProvider>
  );
}
