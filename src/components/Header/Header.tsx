"use client";

import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeaderProps {
  variant?: 'light' | 'dark';
}

const Header = ({ variant = 'light' }: HeaderProps) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileLangDropdownOpen, setIsMobileLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    setIsMounted(true);
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

  const handleLanguageChange = (lang: 'sq' | 'en') => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
    setIsMobileLangDropdownOpen(false);
  };

  // Add a click event to the document to close dropdowns when clicking outside
  useEffect(() => {
    if (!isMounted) return;
    
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Close language dropdowns if clicking outside
      if (!target.closest(`.${styles.langSelector}`) && !target.closest(`.${styles.mobileLangSelector}`)) {
        setIsLangDropdownOpen(false);
        setIsMobileLangDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isMounted]);

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
              <li><Link href="/about">{t('nav.about')}</Link></li>
              <li><Link href="/vision">{t('nav.vision')}</Link></li>
              <li><Link href="/projects">{t('nav.projects')}</Link></li>
              <li><Link href="/contact">{t('nav.contact')}</Link></li>
              <li className={styles.langSelector}>
                <button 
                  onClick={handleLangToggle}
                  className={styles.langButton}
                  aria-expanded={isLangDropdownOpen}
                  aria-haspopup="true"
                >
                  {isMounted && (
                    <Image 
                      src={language === 'sq' 
                        ? "/images/languages/albanian.png"
                        : "/images/languages/english.png"} 
                      alt={language === 'sq' ? "Albanian flag" : "English flag"} 
                      width={16} 
                      height={12}
                      className={styles.flagIcon}
                    />
                  )}
                  {t(language === 'sq' ? 'common.language.al' : 'common.language.en')} 
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
                      <button onClick={() => handleLanguageChange('sq')}>
                        <Image 
                          src="/images/languages/albanian.png" 
                          alt="Albanian flag" 
                          width={16} 
                          height={12}
                          className={styles.flagIcon}
                        />
                        {t('common.language.al')}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLanguageChange('en')}>
                        <Image 
                          src="/images/languages/english.png" 
                          alt="English flag" 
                          width={16} 
                          height={12}
                          className={styles.flagIcon}
                        />
                        {t('common.language.en')}
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
          <li><Link href="/about" onClick={handleMenuToggle}>{t('nav.about')}</Link></li>
          <li><Link href="/vision" onClick={handleMenuToggle}>{t('nav.vision')}</Link></li>
          <li><Link href="/projects" onClick={handleMenuToggle}>{t('nav.projects')}</Link></li>
          <li><Link href="/contact" onClick={handleMenuToggle}>{t('nav.contact')}</Link></li>
        </ul>
        
        <div className={styles.mobileLangSelector}>
          <button 
            className={styles.mobileLangButton}
            onClick={handleMobileLangToggle}
            aria-expanded={isMobileLangDropdownOpen}
            aria-haspopup="true"
          >
            <Image 
              src={language === 'sq' 
                ? "/images/languages/albanian.png"
                : "/images/languages/english.png"}
              alt={language === 'sq' ? "Albanian flag" : "English flag"}
              width={20} 
              height={15}
              className={styles.flagIcon}
            />
            {t(language === 'sq' ? 'common.language.albanian' : 'common.language.english')}
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
                <button onClick={() => handleLanguageChange('sq')}>
                  <Image 
                    src="/images/languages/albanian.png" 
                    alt="Albanian flag" 
                    width={16} 
                    height={12}
                    className={styles.flagIcon}
                  />
                  {t('common.language.albanian')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLanguageChange('en')}>
                  <Image 
                    src="/images/languages/english.png" 
                    alt="English flag" 
                    width={16} 
                    height={12}
                    className={styles.flagIcon}
                  />
                  {t('common.language.english')}
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