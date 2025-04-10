import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rreth Nesh | Dael Construction',
  description: 'Mësoni më shumë rreth Dael Construction, historinë tonë, vlerat dhe ekipin.',
};

export default function AboutLayout({
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