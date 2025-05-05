// Google Translate API type declarations
interface Window {
  googleTranslateElementInit: () => void;
  google: {
    translate: {
      TranslateElement: {
        new (options: {
          pageLanguage: string;
          includedLanguages: string;
          autoDisplay: boolean;
          layout?: number;
        }, elementId: string): void;
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