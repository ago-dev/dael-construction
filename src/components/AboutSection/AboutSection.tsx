"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './AboutSection.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const AnimatedNumber = ({ targetNumber, duration = 2000, startDelay = 0 }: { 
  targetNumber: number; 
  duration?: number; 
  startDelay?: number; 
}) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          setTimeout(() => {
            const startTime = Date.now();
            const animate = () => {
              const elapsedTime = Date.now() - startTime;
              const progress = Math.min(elapsedTime / duration, 1);
              
              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const animatedValue = Math.round(easeOutQuart * targetNumber);
              
              setCurrentNumber(animatedValue);
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          }, startDelay);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNumber, duration, startDelay, hasStarted]);

  return (
    <span ref={elementRef} className={styles.statNumber}>
      {currentNumber}
    </span>
  );
};

const AboutSection = () => {
  const { t } = useLanguage();

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
            <h2>{t('home.about.title')}</h2>
            <p>{t('home.about.description')}</p>
            
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <AnimatedNumber targetNumber={10} duration={2000} startDelay={0} />
                <span className={styles.statLabel}>{t('common.yearsExperience')}</span>
              </div>
              <div className={styles.statItem}>
                <AnimatedNumber targetNumber={24} duration={2000} startDelay={200} />
                <span className={styles.statLabel}>{t('common.residences')}</span>
              </div>
              <div className={styles.statItem}>
                <AnimatedNumber targetNumber={3} duration={1500} startDelay={400} />
                <span className={styles.statLabel}>{t('common.inConstruction')}</span>
              </div>
            </div>
            
            <Link href="/about" className={styles.aboutButton}>
              {t('home.about.button')}
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
              src="/images/about-image.png"
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