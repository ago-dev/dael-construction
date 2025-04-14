import React from 'react';
import styles from './page.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projekti | DAEL Construction',
  description: 'Detaje për projektin e DAEL Construction',
};

export default function ProjectLayout({
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