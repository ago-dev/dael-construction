"use client";

import styles from './AboutSection.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className={styles.aboutSection} id="aboutSection">
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={styles.brandContainer}>
              <span className={styles.brandText}>DAEL CONSTRUCTION</span>
              <Image 
                src="/images/assets/line.svg"
                alt="Line"
                width={75}
                height={2}
                className={styles.brandLine}
              />
            </div>
            <h2>Rreth nesh</h2>
            <p>Prej vitit 2008, Dael Construction ka qenë pjesë e transformimit urban në Tiranë duke ofruar rezidenca moderne, projekte inovatore dhe zgjidhje të qëndrueshme ndërtimi. Fokusi ynë është përtej ndërtimit të objekteve fizike: ne synojmë të krijojmë ambiente banimi ku njerëzit mund të zhvillohen dhe të krijojnë histori jetësore.</p>
            
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>17</span>
                <span className={styles.statLabel}>VITE EKSPERIENCË</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>24</span>
                <span className={styles.statLabel}>REZIDENCA</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>3</span>
                <span className={styles.statLabel}>NË NDËRTIM</span>
              </div>
            </div>
            
            <Link href="/about" className={styles.aboutButton}>
              RRETH NESH
              <Image 
                src="/images/icons/tabler-icon-arrow-down-left.svg"
                alt="Arrow"
                width={16}
                height={16}
                className={styles.buttonIcon}
              />
            </Link>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/images/about/about-image.png"
              alt="About Dael Construction"
              fill
              className={styles.aboutImage}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 