import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vizioni | Dael Construction',
  description: 'Vizioni i Dael Construction për të transformuar peizazhin urban të Tiranës duke krijuar hapësira banimi dhe komerciale që kombinojnë estetikën moderne, funksionalitetin dhe qëndrueshmërinë.',
};

export default function VisionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 