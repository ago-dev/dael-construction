/**
 * Attempts to manually reset translation by directly accessing Google's translation object
 * This approach tries to use Google's internal API to reset the translation
 */
function resetWithGoogleInternalAPI(): boolean {
  try {
    // Try to access the Google Translate internal API
    const w = window as any;
    
    // Different possible locations of the translation controller
    const translationObjects = [
      w.google?.translate?.TranslateElement?.getInstance?.(),
      w.google?.translate?.TranslateElement,
      w.google?.translate?.TranslateElement?.prototype
    ];
    
    // Try each possible location
    for (const obj of translationObjects) {
      if (obj && typeof obj.restore === 'function') {
        obj.restore();
        return true;
      }
      
      if (obj && typeof obj.reset === 'function') {
        obj.reset();
        return true;
      }
      
      if (obj && typeof obj.clear === 'function') {
        obj.clear();
        return true;
      }
    }
    
    // Try to find and trigger the "restore to original language" link
    const restoreLinks = document.querySelectorAll('a.goog-te-menu-value, a.goog-te-menu2-item, a.goog-te-restore');
    for (const link of restoreLinks) {
      if (link instanceof HTMLElement) {
        link.click();
        return true;
      }
    }
    
    return false;
  } catch (e) {
    console.log('Failed to reset using Google internal API', e);
    return false;
  }
}

/**
 * Removes Google Translate elements and restores the original content
 */
export function removeGoogleTranslate(): void {
  try {
    // Try to revert using Google's internal APIs if available
    const w = window as any;
    
    // Try different possible Google Translate API methods
    if (w.google?.translate?.TranslateElement?.getInstance) {
      const instance = w.google.translate.TranslateElement.getInstance();
      if (instance?.restore) instance.restore();
      if (instance?.reset) instance.reset();
      if (instance?.clear) instance.clear();
    }
    
    // Try to revert using select dropdown if available
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = 'sq';
      selectElement.dispatchEvent(new Event('change'));
    }
    
    // Find and trigger any "restore to original language" links
    const restoreLinks = document.querySelectorAll('a.goog-te-menu-value, a.goog-te-menu2-item, a.goog-te-restore, a.VIpgJd-ZVi9od-l4eHX-hSRGPd');
    for (const link of restoreLinks) {
      if (link instanceof HTMLElement && 
         (link.textContent?.includes('Albanian') || 
          link.textContent?.includes('Original') || 
          link.textContent?.includes('Shqip'))) {
        link.click();
        break;
      }
    }
    
    // Clean up Google Translate elements
    const elementsToRemove = [
      '#google_translate_element',
      'iframe.goog-te-banner-frame',
      'iframe.goog-te-menu-frame',
      'iframe.VIpgJd-ZVi9od-xl07Ob-OEVmcd',  // New Google Translate iframe class
      '.skiptranslate',
      '#goog-gt-tt',
      '.goog-te-balloon-frame',
      '.goog-tooltip',
      '.goog-tooltip-arrow',
      '.goog-tooltip-arrow-left',
      '.goog-tooltip-arrow-right',
      '.goog-text-highlight',
      '[class^="VIpgJd-"]',
      '.google-translate-container'
    ];
    
    // Remove elements from DOM
    elementsToRemove.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        } else if (el instanceof HTMLElement) {
          el.style.display = 'none';
        }
      });
    });
    
    // Reset body styles added by Google Translate
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('overflow');
    document.documentElement.style.removeProperty('overflow');
    document.body.classList.remove('translated-ltr', 'translated-rtl');
    
    // Remove translation related attributes
    document.documentElement.removeAttribute('translated');
    document.documentElement.removeAttribute('lang');
    
    // Remove all added Google Translate styles
    document.querySelectorAll('style[data-goog-trans], style[id^="goog-gt-"], #google-translate-fix-styles').forEach(el => {
      el.parentNode?.removeChild(el);
    });
    
    // Disconnect mutation observer if it exists
    if (w._googleTranslateObserver?.disconnect) {
      w._googleTranslateObserver.disconnect();
      delete w._googleTranslateObserver;
    }
    
    // Remove Google Translate scripts
    document.querySelectorAll('script[src*="translate.google.com"]').forEach(el => {
      el.parentNode?.removeChild(el);
    });
    
    // Clean up global Google Translate elements
    if (w.google?.translate) {
      delete w.googleTranslateElementInit;
    }
    
    // Remove any event listeners we added
    if (typeof w._googleTranslateClickHandler === 'function') {
      document.removeEventListener('click', w._googleTranslateClickHandler);
      delete w._googleTranslateClickHandler;
    }
  } catch (e) {
    console.error('Error removing Google Translate:', e);
  }
}

/**
 * Sets a cookie to remember the language preference
 */
export function setLanguagePreference(lang: 'en' | 'sq'): void {
  try {
    localStorage.setItem('preferred_language', lang);
  } catch (e) {
    console.error('Error saving language preference:', e);
    // Fallback to cookie if localStorage isn't available
    document.cookie = `preferred_language=${lang}; path=/; max-age=${60 * 60 * 24 * 30}`;
  }
}

/**
 * Gets the language preference from localStorage or cookie
 * NOTE: The website should still default to Albanian even if this returns 'en'.
 * This preference should only be used when explicitly checking the saved preference,
 * not for auto-translating on page load.
 */
export function getLanguagePreference(): 'en' | 'sq' {
  try {
    // First try localStorage
    const localPref = localStorage.getItem('preferred_language');
    if (localPref === 'en') {
      return 'en';
    }
    
    // Fall back to cookie
    const match = document.cookie.match(/preferred_language=([^;]+)/);
    if (match && match[1] === 'en') {
      return 'en';
    }
    
    // Default to Albanian if no preference or preference is already Albanian
    return 'sq';
  } catch (e) {
    console.error('Error getting language preference:', e);
    // Default to Albanian on error
    return 'sq';
  }
} 