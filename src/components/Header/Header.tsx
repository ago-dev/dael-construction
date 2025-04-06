"use client";

import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

const Header = () => {
  const { theme } = useTheme();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // This ensures hydration completes before showing any client-side UI
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleLangToggle = () => {
    setIsLangDropdownOpen(!isLangDropdownOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button 
          className={styles.mobileMenuButton}
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMounted && (
            <Image 
              src={`/images/icons/light/hamburger.svg`}
              alt="Menu" 
              width={36} 
              height={36}
              className={styles.hamburgerIcon}
            />
          )}
        </button>
        
        <Link href="/" className={styles.logo}>
          <Image 
            src="/images/logo.png" 
            alt="Dael Construction Logo" 
            width={150} 
            height={33} 
            priority
          />
        </Link>
        
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li><Link href="/services">Rreth nesh</Link></li>
            <li><Link href="/projects">Vizioni ynë</Link></li>
            <li><Link href="/about">Projekte</Link></li>
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
                    src="/images/languages/albanian.png" 
                    alt="Albanian flag" 
                    width={16} 
                    height={12}
                    className={styles.flagIcon}
                  />
                )}
                AL 
                {isMounted && (
                  <Image 
                    src={`/images/icons/${theme}/down-arrow.svg`}
                    alt="Down arrow" 
                    width={9.33} 
                    height={5.33}
                    className={styles.langArrow}
                  />
                )}
              </button>
              {isMounted && isLangDropdownOpen && (
                <ul className={styles.langDropdown}>
                  <li>
                    <button>
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
                    <button>
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
      </div>
      
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          {/* Mobile menu content */}
        </div>
      )}
    </header>
  );
};

export default Header; 