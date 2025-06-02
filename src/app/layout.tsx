import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import "../styles/globals.scss";
import Header from "@/components/Header/Header";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import localFont from 'next/font/local'

// Replace Geist with Inter, which is widely available
import { Inter, Roboto_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-geist-sans", // Keep the same variable name for compatibility
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono", // Keep the same variable name for compatibility
  subsets: ["latin"],
});

const baiJamjuree = Bai_Jamjuree({
  weight: ['400', '600'],
  variable: "--font-bai-jamjuree",
  subsets: ["latin"],
});

// Use Space Grotesk as a fallback for Haskoy
const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600'],
  variable: "--font-haskoy", // We keep the same variable name for easy replacement later
  subsets: ["latin"],
});

const haskoy = localFont({
  src: [
    {
      path: '../../public/fonts/haskoy/Haskoy-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/haskoy/Haskoy-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    // Add other weights if available
  ],
  variable: '--font-haskoy',
})

export const metadata: Metadata = {
  title: "Dael Construction",
  description: "Professional construction services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable} ${baiJamjuree.variable} ${spaceGrotesk.variable} ${haskoy.variable}`}>
      <body>
        <LanguageProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
