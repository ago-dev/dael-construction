"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'sq' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('sq');

  // Load saved language preference on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('preferred_language') as Language;
      if (saved === 'en' || saved === 'sq') {
        setLanguageState(saved);
      }
    } catch (error) {
      console.log('Error loading language preference:', error);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('preferred_language', lang);
    } catch (error) {
      console.log('Error saving language preference:', error);
    }
  };

  // Translation function - will get translations from our translations object
  const t = (key: string, fallback?: string): string => {
    try {
      // Import translations dynamically to avoid circular dependencies
      const translations = require('../lib/translations').translations;
      const value = translations[language]?.[key];
      return value || fallback || key;
    } catch (error) {
      return fallback || key;
    }
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 