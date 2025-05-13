"use client";

import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
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
  
  // Define functions with useCallback to ensure they remain stable between renders
  
  // Try to find and click the English option in the iframe
  const tryClickEnglishInIframe = useCallback((iframe: HTMLIFrameElement) => {
    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        // Find the English option
        const englishOptions = iframeDoc.querySelectorAll('td, .goog-te-menu2-item');
        for (let i = 0; i < englishOptions.length; i++) {
          if (englishOptions[i].textContent?.includes('English')) {
            // Click the English option
            (englishOptions[i] as HTMLElement).click();
            console.log('Clicked English option in iframe');
            return true;
          }
        }
      }
    } catch (e) {
      console.log('Could not access iframe content (expected)');
    }
    return false;
  }, []);
  
  // Function to forcibly close the dropdown
  const forceCloseDropdown = useCallback(() => {
    // Try multiple methods to close the dropdown
    
    // 1. Try clicking outside the dropdown (simulate a body click)
    document.body.click();
    
    // 2. Try to hide all Google Translate dropdown-related elements
    const dropdowns = document.querySelectorAll('.goog-te-menu-frame, .skiptranslate iframe, .VIpgJd-ZVi9od-vH1Gmf-hgDUwe, .VIpgJd-ZVi9od-SmfZ-OEVmcd');
    dropdowns.forEach(dropdown => {
      if (dropdown instanceof HTMLElement) {
        dropdown.style.visibility = 'hidden';
        dropdown.style.display = 'none';
        dropdown.style.opacity = '0';
        dropdown.style.height = '0';
        dropdown.style.width = '0';
        dropdown.style.position = 'absolute';
        dropdown.style.pointerEvents = 'none';
        
        // Also try to remove from the DOM
        if (dropdown.parentNode) {
          try {
            dropdown.parentNode.removeChild(dropdown);
          } catch (e) {
            console.log('Could not remove dropdown from DOM');
          }
        }
      }
    });
    
    // 3. Try to find and click any close button
    const closeButtons = document.querySelectorAll('[aria-label="Close"], [title="Close"], .goog-te-menu-close, .VIpgJd-ZVi9od-xq9Zle-LvJwJc, .VIpgJd-ZVi9od-vH1Gmf-PBWx0c');
    closeButtons.forEach(button => {
      if (button instanceof HTMLElement) {
        button.click();
      }
    });
    
    // 4. Try to remove any parent containers that might still be taking up space
    const containers = document.querySelectorAll('.goog-te-menu-container, .goog-te-menu-value, .VIpgJd-ZVi9od-vH1Gmf, .VIpgJd-ZVi9od, .skiptranslate');
    containers.forEach(container => {
      if (container instanceof HTMLElement) {
        container.style.display = 'none';
        container.style.visibility = 'hidden';
        container.style.opacity = '0';
        container.style.height = '0';
        container.style.overflow = 'hidden';
        container.style.position = 'absolute';
        container.style.pointerEvents = 'none';
      }
    });
    
    // 5. Fix for body styles that might cause dead space
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('overflow');
    document.documentElement.style.removeProperty('overflow');
    document.body.classList.remove('translated-ltr', 'translated-rtl');
    
    console.log('Attempted to force close all dropdowns and remove dead space');
  }, []);
  
  // Function to trigger browser's translate feature
  const handleTranslateToEnglish = useCallback(() => {
    console.log('Manual translation to English requested');
    
    // Close the dropdown
    setIsLangDropdownOpen(false);
    setIsMobileLangDropdownOpen(false);
    setCurrentLanguage('en');
    
    // Save preference
    setLanguagePreference('en');
    
    // Remove any existing Google Translate elements first
    removeGoogleTranslate();
    
    console.log('Initializing Google Translate to English...');
    
    // Create a container for Google Translate - position it in a way that won't interfere with layout
    const translateDiv = document.createElement('div');
    translateDiv.id = 'google_translate_element';
    translateDiv.style.cssText = 'position:fixed;bottom:10px;right:10px;z-index:9999;background:white;padding:5px;border-radius:4px;box-shadow:0 2px 10px rgba(0,0,0,0.2);max-height:40px;max-width:200px;overflow:hidden;';
    
    // Add custom CSS to fix Google Translate widget positioning issues
    const fixStyleElement = document.createElement('style');
    fixStyleElement.id = 'google-translate-fix-styles';
    fixStyleElement.textContent = `
      /* Hide Google automatic top banner */
      .goog-te-banner-frame, .skiptranslate, .goog-te-gadget-icon {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        height: 0 !important;
        width: 0 !important;
        position: absolute !important;
        top: -999px !important;
        left: -999px !important;
      }
      
      /* Make sure the body isn't shifted */
      body {
        top: 0 !important;
        position: static !important;
      }
      
      /* Hide any other translation-related elements that might cause dead space */
      .VIpgJd-ZVi9od-vH1Gmf-hgDUwe, .VIpgJd-ZVi9od-l4eHX-hSRGPd {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        width: 0 !important;
        position: absolute !important;
      }
      
      /* Fix for Google's dropdown menu */
      .goog-te-menu-frame {
        position: fixed !important;
        box-shadow: 0 3px 8px 2px rgba(0, 0, 0, 0.1) !important;
        border-radius: 8px !important;
      }
    `;
    document.head.appendChild(fixStyleElement);
    document.body.appendChild(translateDiv);
    
    // Add a helper message to guide users
    const helperMsg = document.createElement('div');
    helperMsg.textContent = 'Translating to English...';
    helperMsg.style.cssText = 'font-size:12px;color:#333;margin-bottom:5px;';
    translateDiv.appendChild(helperMsg);
    
    // Add a direct translate button as fallback
    const directButton = document.createElement('button');
    directButton.textContent = 'Click to Translate';
    directButton.style.cssText = 'background:#4285f4;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;font-size:12px;margin-top:5px;';
    directButton.onclick = () => {
      // Open in Google Translate directly
      window.open(`https://translate.google.com/translate?sl=sq&tl=en&u=${encodeURIComponent(window.location.href)}`, '_blank');
    };
    translateDiv.appendChild(directButton);
    
    // Initialize the Google Translate with proper error handling
    try {
      // Clear any existing initialization function to prevent conflicts
      if ('googleTranslateElementInit' in window) {
        (window as any).googleTranslateElementInit = null;
      }
      
      // Define selectEnglish function to select English in various ways
      // Select English after loading with multiple retries
      const maxAttempts = 10;
      let attempts = 0;
      
      const selectEnglish = () => {
        attempts++;
        console.log(`Attempt ${attempts} to select English`);
        
        // Method 1: Standard dropdown
        const dropdown = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (dropdown) {
          dropdown.value = 'en';
          dropdown.dispatchEvent(new Event('change'));
          console.log('Selected English via dropdown');
          
          // Try to close any dropdowns that might appear
          setTimeout(forceCloseDropdown, 300);
          return true;
        }

        // Method 2: Target the specific Google Translate dropdown menu that appears
        const gtDropdown = document.querySelector('.goog-te-menu-frame, .VIpgJd-ZVi9od-vH1Gmf-hgDUwe, .skiptranslate') as HTMLElement;
        if (gtDropdown) {
          console.log('Found Google Translate dropdown, attempting to select English');
          
          // Either the dropdown is within an iframe or directly in the document
          try {
            // Try to access iframe content if it's an iframe
            if (gtDropdown.tagName === 'IFRAME') {
              const result = tryClickEnglishInIframe(gtDropdown as HTMLIFrameElement);
              if (result) {
                // Try to close dropdowns after selection
                setTimeout(forceCloseDropdown, 300);
                return true;
              }
            } else {
              // If it's not an iframe, look for elements directly
              const englishOptions = document.querySelectorAll('.goog-te-menu2-item, .VIpgJd-ZVi9od-vH1Gmf-ibnC6b-gk6SMd');
              
              for (let i = 0; i < englishOptions.length; i++) {
                const option = englishOptions[i] as HTMLElement;
                if (option.textContent?.includes('English')) {
                  option.click();
                  console.log('Selected English in direct dropdown');
                  setTimeout(forceCloseDropdown, 300);
                  return true;
                }
              }
            }
          } catch (e) {
            console.error('Error accessing Google Translate dropdown:', e);
          }
        }

        // Method 3: Find any translation-related clickable element with English
        const anyTranslateElements = document.querySelectorAll('[class*="translate"], [class*="goog-"], [class*="Vipg"]');
        for (let i = 0; i < anyTranslateElements.length; i++) {
          const el = anyTranslateElements[i] as HTMLElement;
          if (el.textContent?.includes('English') && 
              (el.tagName === 'A' || el.tagName === 'BUTTON' || 
               el.getAttribute('role') === 'button' || 
               el.getAttribute('role') === 'option')) {
            el.click();
            console.log('Selected English via general translate element');
            return true;
          }
        }

        // Method 4: Try to find any clickable elements with English text
        const allElements = document.querySelectorAll('a, button, div[role="button"], span[role="button"]');
        for (let i = 0; i < allElements.length; i++) {
          const el = allElements[i] as HTMLElement;
          if (el.textContent?.includes('English')) {
            el.click();
            console.log('Selected English via text element');
            return true;
          }
        }
        
        // Continue trying if we haven't reached max attempts
        if (attempts < maxAttempts) {
          setTimeout(selectEnglish, 800);
        } else {
          console.warn('Automatic selection failed. Please click on the Google Translate widget that appears in the bottom right corner and select English manually.');
          
          // Make widget more noticeable
          const translateElement = document.getElementById('google_translate_element');
          if (translateElement) {
            translateElement.style.boxShadow = '0 0 15px 5px rgba(255,0,0,0.5)';
            translateElement.style.backgroundColor = '#fff9e6';
            translateElement.style.animation = 'pulse 1.5s infinite';
            
            // Add animation style
            const style = document.createElement('style');
            style.textContent = `
              @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
              }
            `;
            document.head.appendChild(style);
          }
        }
        
        return false;
      };
      
      // Define the callback before loading the script
      (window as any).googleTranslateElementInit = function() {
        try {
          if (typeof window.google === 'undefined' || typeof window.google.translate === 'undefined') {
            console.error('Google Translate API not available');
            return;
          }
          
          console.log('Google Translate API available, initializing...');
          
          // Create the Google Translate widget with autoDisplay: false to prevent automatic dropdowns
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'sq',
              includedLanguages: 'en',
              autoDisplay: false, // Disable auto display to prevent unwanted dropdowns
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 
            'google_translate_element'
          );
          
          console.log('Google Translate widget created successfully');
          
          // Additional cleanup to prevent dead space
          setTimeout(() => {
            // Hide Google website translation banner/bar
            const bannerFrames = document.querySelectorAll('.goog-te-banner-frame, body > .skiptranslate');
            bannerFrames.forEach(frame => {
              if (frame instanceof HTMLElement) {
                frame.style.display = 'none';
                frame.style.height = '0px';
                frame.style.width = '0px';
                
                // Try to remove completely if possible
                if (frame.parentNode) {
                  try {
                    frame.parentNode.removeChild(frame);
                  } catch (e) {
                    console.log('Could not remove banner frame');
                  }
                }
              }
            });
            
            // Fix body position that might be set by Google Translate
            document.body.style.top = '0px';
            document.body.style.position = 'static';
            
            // Remove all iframes that might be causing dead space
            document.querySelectorAll('iframe[id^="goog-"]').forEach(iframe => {
              if (iframe instanceof HTMLElement && iframe.id !== 'google_translate_element') {
                iframe.style.height = '0px';
                iframe.style.width = '0px';
                iframe.style.position = 'absolute';
                iframe.style.top = '-9999px';
                iframe.style.visibility = 'hidden';
                iframe.style.display = 'none';
              }
            });
            
            console.log('Initial cleanup completed');
            
            // Start the selection process after a short delay
            setTimeout(() => {
              console.log('Attempting to select English...');
              selectEnglish();
            }, 300);
          }, 300);
          
          // Remove the helper message once widget is loaded
          if (helperMsg.parentNode) {
            helperMsg.parentNode.removeChild(helperMsg);
          }
        } catch (e) {
          console.error('Error in googleTranslateElementInit:', e);
          
          // Still keep the translate div visible on error
          translateDiv.innerHTML = '<p style="color:red">Translation failed. <a href="#" onclick="window.location.reload()">Try again</a></p>';
        }
      };
      
      // Remove any existing script to prevent duplication issues
      document.querySelectorAll('script[src*="translate.google.com"]').forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      
      // Create and append the script
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      
      // Add error handler
      script.onerror = () => {
        console.error('Failed to load Google Translate script');
        // Show error in the translate div
        translateDiv.innerHTML = '<p style="color:red">Failed to load translator. <a href="#" onclick="window.location.reload()">Try again</a></p>';
        // Reset the property
        if ('googleTranslateElementInit' in window) {
          (window as any).googleTranslateElementInit = null;
        }
      };
      
      // Add a timeout to handle script load failures
      const scriptTimeout = setTimeout(() => {
        if (!window.google?.translate) {
          console.error('Google Translate script load timed out');
          translateDiv.innerHTML = '<p style="color:red">Translator load timed out. <a href="#" onclick="window.location.reload()">Try again</a> or <a href="#" onclick="window.open(\'https://translate.google.com/translate?sl=sq&tl=en&u=\' + encodeURIComponent(window.location.href), \'_blank\')">use Google Translate</a></p>';
        }
      }, 10000); // 10 second timeout
      
      // Add onload handler to clear timeout
      script.onload = () => {
        clearTimeout(scriptTimeout);
        console.log('Google Translate script loaded successfully');
      };
      
      // Append the script to the document
      document.head.appendChild(script);
      
      console.log('Google Translate script added to document');
    } catch (e) {
      console.error('Error setting up Google Translate:', e);
      // Show error in the translate div
      translateDiv.innerHTML = '<p style="color:red">Error setting up translator. <a href="#" onclick="window.location.reload()">Try again</a></p>';
    }
  }, [setIsLangDropdownOpen, setIsMobileLangDropdownOpen, setCurrentLanguage, forceCloseDropdown, tryClickEnglishInIframe]);
  
  // Function to switch back to Albanian
  const handleSwitchToAlbanian = useCallback(() => {
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
  }, [setIsLangDropdownOpen, setIsMobileLangDropdownOpen, setCurrentLanguage]);
  
  // This ensures hydration completes before showing any client-side UI
  // and checks for language preference
  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window === 'undefined') return;
    
    // IMPORTANT: Default the site to Albanian, even if previously set to English
    // This ensures the site is always in Albanian unless explicitly requested
    setCurrentLanguage('sq');
    
    // Make sure any Google Translate elements are removed on initial load
    removeGoogleTranslate();
    
    // Check URL parameters - ONLY translate if explicitly requested via URL
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    
    // Only translate if explicitly requested via 'lang=en' parameter
    if (langParam === 'en') {
      setCurrentLanguage('en');
      setLanguagePreference('en');
      
      // Wait a bit before initializing translate to ensure component is fully mounted
      const timer = setTimeout(() => {
        handleTranslateToEnglish();
        console.log('Initializing translation from URL parameter');
      }, 500);
      
      // Clean URL
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('lang');
      cleanUrl.searchParams.delete('t');
      window.history.replaceState({}, document.title, cleanUrl.toString());
      
      return () => clearTimeout(timer);
    } 
    
    // Albanian is the default - no need to do anything special except clean the URL if needed
    if (langParam === 'sq') {
      // Explicitly set to Albanian from URL
      setCurrentLanguage('sq');
      setLanguagePreference('sq');
      
      // Clean URL
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('lang');
      cleanUrl.searchParams.delete('t');
      window.history.replaceState({}, document.title, cleanUrl.toString());
    }
    
    // We don't check saved preferences anymore - always default to Albanian
    // This ensures the site always starts in Albanian unless explicitly requested via URL
  }, [handleTranslateToEnglish, removeGoogleTranslate, setCurrentLanguage]);
  
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
  
  // Add a click event to the document to close dropdowns when clicking outside
  useEffect(() => {
    if (!isMounted) return;
    
    const handleDocumentClick = (e: MouseEvent) => {
      // Check if we clicked outside Google Translate elements
      const target = e.target as HTMLElement;
      if (!target.closest('#google_translate_element') && 
          !target.closest('.goog-te-menu-frame') && 
          !target.closest('.skiptranslate') &&
          !target.closest('[class*="VIpgJd"]')) {
        
        // Attempt to close dropdowns
        forceCloseDropdown();
      }
    };
    
    // Add the event listener
    document.addEventListener('click', handleDocumentClick);
    
    return () => {
      // Clean up the event listener when component unmounts
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isMounted, forceCloseDropdown]);
  
  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      // Clean up Google Translate elements when component unmounts
      removeGoogleTranslate();
      
      // Remove any leftover scripts
      document.querySelectorAll('script[src*="translate.google.com"]').forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      
      // Remove any styleSheets added by Google Translate
      document.querySelectorAll('style[id^="goog-"], style[id="google-translate-fix-styles"]').forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
  }, []);

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
           {/*}  <li className={styles.langSelector}>
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
              </li> */}
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
        
        {/* <div className={styles.mobileLangSelector}>
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
        </div> */}
      </div>
    </header>
  );
};

export default Header; 