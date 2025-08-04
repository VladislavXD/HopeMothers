
'use client'

import { Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@heroui/react";
import { NextPage } from "next";
import React from "react";
import ContactForm from "./components/ui/Field/input";
import { useLanguage } from "./lib/language-context";
import { useSEO } from "./lib/use-seo";

type Props = {};

const Home: NextPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useLanguage();
  
  // Используем SEO хук для динамического обновления метаданных
  useSEO();

	
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-screen bg-cover bg-center font-serif bg-no-repeat bg-[url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528')] flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/40"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto text-center text-white px-4">
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-6 text-center drop-shadow-lg">
            {t('hero.title')}
          </h1>
          <p className="text-white text-lg sm:text-xl mb-8 text-center drop-shadow-md">
            {t('hero.subtitle')}
          </p>
          <p className="text-white text-base sm:text-lg mb-8 text-center drop-shadow-md font-light opacity-90">
						{t('hero.description')}
          </p>
          <Button
            size="lg"
            color="primary"
            className="text-white font-semibold px-8 py-3 text-lg mb-8"
            onClick={onOpen}
          >
            {t('hero.button')}
          </Button>
        </div>

        {/* Copyright Information */}
        <div className="absolute bottom-8 left-0 right-0 z-20 font-serif">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
              <p className="text-xs leading-relaxed opacity-80">
                © 2024-2025 {t('form.copyright')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal with Form */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        size="4xl"
        scrollBehavior="inside"
        backdrop="blur"
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 "
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                <h2 className="text-2xl font-bold text-foreground">
                  {t('modal.title')}
                </h2>
                <p className="text-foreground/80 text-sm">
                  {t('modal.subtitle')}
                </p>
                <p className="text-foreground/60 text-xs mt-2">
                  {t('modal.description')}
                </p>
              </ModalHeader>
              <ModalBody className="pb-6">
                <ContactForm onSuccess={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Home;
