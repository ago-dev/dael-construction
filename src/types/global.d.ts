// Google Translate API type declarations
interface Window {
  googleTranslateElementInit: () => void;
  _googleTranslateObserver?: MutationObserver;
  google: {
    translate: {
      TranslateElement: {
        new (options: {
          pageLanguage: string;
          includedLanguages: string;
          autoDisplay: boolean;
          layout?: number;
        }, elementId: string): {
          restore?: () => void;
          reset?: () => void;
          clear?: () => void;
        };
        getInstance?: () => {
          restore?: () => void;
          reset?: () => void;
          clear?: () => void;
        };
        // Layout constants
        InlineLayout: {
          HORIZONTAL: number;
          SIMPLE: number;
          VERTICAL: number;
        }
      }
    }
  }
} 