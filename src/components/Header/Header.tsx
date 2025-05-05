"use client";

import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { setLanguagePreference, getLanguagePreference, removeGoogleTranslate } from '@/lib/translationUtils';

interface HeaderProps {
  variant?: 'light' | 'dark';
}

const Header = ({ variant = 'light' }: HeaderProps) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileLangDropdownOpen, setIsMobileLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'sq'>('sq');
  
  // This ensures hydration completes before showing any client-side UI
  // and checks for language preference
  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window === 'undefined') return;
    
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    
    // Handle URL language parameter
    if (langParam === 'en') {
      setCurrentLanguage('en');
      setLanguagePreference('en');
      setTimeout(handleTranslateToEnglish, 300);
      
      // Clean URL
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('lang');
      cleanUrl.searchParams.delete('t');
      window.history.replaceState({}, document.title, cleanUrl.toString());
      return;
    } 
    
    if (langParam === 'sq') {
      setCurrentLanguage('sq');
      setLanguagePreference('sq');
      removeGoogleTranslate();
      
      // Clean URL
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('lang');
      cleanUrl.searchParams.delete('t');
      window.history.replaceState({}, document.title, cleanUrl.toString());
      return;
    }
    
    // Check saved preference if no URL parameter
    const savedLang = getLanguagePreference();
    if (savedLang === 'en') {
      setCurrentLanguage('en');
      setTimeout(handleTranslateToEnglish, 300);
    }
  }, []);
  
  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  
  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close language dropdown when toggling menu
    setIsMobileLangDropdownOpen(false);
  };
  
  const handleLangToggle = () => {
    setIsLangDropdownOpen(!isLangDropdownOpen);
  };
  
  const handleMobileLangToggle = () => {
    setIsMobileLangDropdownOpen(!isMobileLangDropdownOpen);
  };
  
  // Function to trigger browser's translate feature
  const handleTranslateToEnglish = () => {
    // Close the dropdown
    setIsLangDropdownOpen(false);
    setIsMobileLangDropdownOpen(false);
    setCurrentLanguage('en');
    
    // Save preference
    setLanguagePreference('en');
    
    // Remove any existing Google Translate elements first
    removeGoogleTranslate();
    
    // Create a hidden container for Google Translate
    const translateDiv = document.createElement('div');
    translateDiv.id = 'google_translate_element';
    translateDiv.style.cssText = 'position:absolute;left:-9999px;top:-9999px;';
    document.body.appendChild(translateDiv);
    
    // Initialize the Google Translate
    const script = document.createElement('script');
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'sq',
        includedLanguages: 'en',
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
      
      // Select English after a slight delay
      setTimeout(() => {
        const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (selectElement) {
          selectElement.value = 'en';
          selectElement.dispatchEvent(new Event('change'));
        }
      }, 1000);
    };
    
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(script);
  };
  
  // Function to switch back to Albanian
  const handleSwitchToAlbanian = () => {
    // Close dropdown and update UI immediately
    setIsLangDropdownOpen(false);
    setIsMobileLangDropdownOpen(false);
    setCurrentLanguage('sq');
    
    // Save preference
    setLanguagePreference('sq');
    
    try {
      // Clean up Google Translate elements
      removeGoogleTranslate();
    } catch (e) {
      console.error('Error cleaning up Google Translate:', e);
    }
    
    // Force a page reload to reset state
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', 'sq');
      url.searchParams.set('t', Date.now().toString());
      window.location.href = url.toString();
    }
  };

  return (
    <header className={`${styles.header} ${styles[variant]}`}>
      {/* Page overlay when mobile menu is open */}
      <div 
        className={`${styles.pageOverlay} ${isMobileMenuOpen ? styles.visible : ''}`}
        onClick={handleMenuToggle}
      />
      
      <div className={`${styles.container} ${isMobileMenuOpen ? styles.menuOpen : ''}`}>
        <button 
          className={styles.mobileMenuButton}
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMounted && (
            <Image 
              src={`/images/icons/${variant}/hamburger.svg`}
              alt="Menu" 
              width={36} 
              height={36}
              className={styles.hamburgerIcon}
            />
          )}
        </button>
        
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image 
              src={variant === 'dark' ? "/images/logo-dark.svg" : "/images/logo.svg"}
              alt="Dael Construction Logo"
              className={styles.logo}
              width={120}
              height={40}
            />
          </Link>
        </div>
        
        {/* Only show the nav when mobile menu is closed */}
        {!isMobileMenuOpen && (
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li><Link href="/about">Rreth nesh</Link></li>
              <li><Link href="/vision">Vizioni ynë</Link></li>
              <li><Link href="/projects">Projekte</Link></li>
              <li><Link href="/contact">Kontakto</Link></li>
              <li className={styles.langSelector}>
                <button 
                  onClick={handleLangToggle}
                  className={styles.langButton}
                  aria-expanded={isLangDropdownOpen}
                  aria-haspopup="true"
                >
                  {isMounted && (
                    <Image 
                      src={currentLanguage === 'sq' 
                        ? "/images/languages/albanian.png"
                        : "/images/languages/english.png"} 
                      alt={currentLanguage === 'sq' ? "Albanian flag" : "English flag"} 
                      width={16} 
                      height={12}
                      className={styles.flagIcon}
                    />
                  )}
                  {currentLanguage === 'sq' ? 'AL' : 'EN'} 
                  {isMounted && (
                    <Image 
                      src={`/images/icons/${variant}/down-arrow.svg`}
                      alt="Down arrow" 
                      width={12} 
                      height={12}
                      className={styles.langArrow}
                    />
                  )}
                </button>
                {isMounted && isLangDropdownOpen && (
                  <ul className={styles.langDropdown}>
                    <li>
                      <button onClick={handleSwitchToAlbanian}>
                        <Image 
                          src="/images/languages/albanian.png" 
                          alt="Albanian flag" 
                          width={16} 
                          height={12}
                          className={styles.flagIcon}
                        />
                        AL
                      </button>
                    </li>
                    <li>
                      <button onClick={handleTranslateToEnglish}>
                        <Image 
                          src="/images/languages/english.png" 
                          alt="English flag" 
                          width={16} 
                          height={12}
                          className={styles.flagIcon}
                        />
                        EN
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        )}
      </div>
      
      {/* Mobile menu overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.open : ''}`}>
        <button 
          className={styles.closeButton}
          onClick={handleMenuToggle}
          aria-label="Close menu"
        >
          {isMounted && (
            <Image 
              src="/images/icons/close.svg"
              alt="Close" 
              width={24} 
              height={24}
            />
          )}
        </button>
        
        <ul className={styles.mobileNavList}>
          <li><Link href="/about" onClick={handleMenuToggle}>Rreth nesh</Link></li>
          <li><Link href="/vision" onClick={handleMenuToggle}>Vizioni ynë</Link></li>
          <li><Link href="/projects" onClick={handleMenuToggle}>Projekte</Link></li>
          <li><Link href="/contact" onClick={handleMenuToggle}>Kontakto</Link></li>
        </ul>
        
        <div className={styles.mobileLangSelector}>
          <button 
            className={styles.mobileLangButton}
            onClick={handleMobileLangToggle}
            aria-expanded={isMobileLangDropdownOpen}
            aria-haspopup="true"
          >
            <Image 
              src={currentLanguage === 'sq' 
                ? "/images/languages/albanian.png"
                : "/images/languages/english.png"}
              alt={currentLanguage === 'sq' ? "Albanian flag" : "English flag"}
              width={20} 
              height={15}
              className={styles.flagIcon}
            />
            {currentLanguage === 'sq' ? 'Shqip' : 'English'}
            {isMounted && (
              <Image 
                src="/images/icons/light/down-arrow.svg"
                alt="Down arrow" 
                width={12}
                height={12}
                className={styles.langArrow}
              />
            )}
          </button>
          
          {isMounted && isMobileLangDropdownOpen && (
            <ul className={styles.mobileLangDropdown}>
              <li>
                <button onClick={handleSwitchToAlbanian}>
                  <Image 
                    src="/images/languages/albanian.png" 
                    alt="Albanian flag" 
                    width={16} 
                    height={12}
                    className={styles.flagIcon}
                  />
                  Shqip
                </button>
              </li>
              <li>
                <button onClick={handleTranslateToEnglish}>
                  <Image 
                    src="/images/languages/english.png" 
                    alt="English flag" 
                    width={16} 
                    height={12}
                    className={styles.flagIcon}
                  />
                  English
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 