import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Bai_Jamjuree } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import "../styles/globals.scss";
import Header from "@/components/Header/Header";
import { ThemeProvider } from "@/context/ThemeContext";
import localFont from 'next/font/local'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${baiJamjuree.variable} ${spaceGrotesk.variable} ${haskoy.variable}`}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
