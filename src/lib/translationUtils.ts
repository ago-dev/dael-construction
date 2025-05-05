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
 * Utilities for handling translations
 */

/**
 * Removes Google Translate elements and restores the original content
 */
export function removeGoogleTranslate(): void {
  try {
    // Try to access the Google Translate internal API
    const w = window as any;
    if (w.google?.translate?.TranslateElement?.getInstance?.()?.restore) {
      w.google.translate.TranslateElement.getInstance().restore();
    }
    
    // Try to revert using select dropdown if available
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = 'sq';
      selectElement.dispatchEvent(new Event('change'));
    }
    
    // Clean up Google Translate elements
    const elementsToRemove = [
      '#google_translate_element',
      'iframe.goog-te-banner-frame',
      '.skiptranslate',
      '#goog-gt-tt',
      '.goog-te-balloon-frame',
      '[class^="VIpgJd-"]'
    ];
    
    elementsToRemove.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        } else if (el instanceof HTMLElement) {
          el.style.display = 'none';
        }
      });
    });
    
    // Reset body styles
    document.body.style.top = '0px';
    document.body.style.position = 'static';
    
    // Disconnect mutation observer if it exists
    if (w._googleTranslateObserver?.disconnect) {
      w._googleTranslateObserver.disconnect();
      delete w._googleTranslateObserver;
    }
  } catch (e) {
    console.error('Error removing Google Translate:', e);
  }
}

/**
 * Sets a cookie to remember the language preference
 */
export function setLanguagePreference(lang: 'en' | 'sq'): void {
  document.cookie = `preferred_language=${lang}; path=/; max-age=${60 * 60 * 24 * 30}`;
}

/**
 * Gets the language preference from cookie
 */
export function getLanguagePreference(): 'en' | 'sq' | null {
  const match = document.cookie.match(/preferred_language=([^;]+)/);
  return match ? (match[1] as 'en' | 'sq') : null;
} 