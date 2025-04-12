import React from 'react';
import styles from './page.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Na Kontaktoni | DAEL Construction',
  description: 'Kontaktoni DAEL Construction për çdo pyetje apo bashkëpunim',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
} 