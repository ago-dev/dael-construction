"use client";

import styles from './VisionSection.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const VisionSection = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.visionSection}>
      <div className={styles.imageContainer}>
        <Image
          src="/images/vision/vision-image.png"
          alt="Dael Construction Vision"
          fill
          className={styles.visionImage}
          sizes="100vw"
        />
      </div>
      
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <div className={styles.visionDiv}>
            <div className={styles.brandContainer}>
              <span className={styles.brandText}>{t('home.vision.title')}</span>
              <Image 
                src="/images/assets/line-2.svg"
                alt="Line"
                width={75}
                height={2}
                className={styles.brandLine}
              />
            </div>
            <h2>{t('home.vision.headline')}</h2>
            
            <Link href="/vision" className={styles.visionButton}>
              {t('home.vision.button')}
              <Image 
                src="/images/icons/tabler-icon-arrow-down-left.svg"
                alt="Arrow"
                width={16}
                height={16}
                className={styles.buttonIcon}
              />
            </Link>
          </div>
          
          <div className={styles.visionDescription}>
            <div className={styles.visionItem}>
              <div className={styles.visionItemHeader}>
                <Image 
                  src="/images/icons/vision-1.svg"
                  alt="Cilësia"
                  width={24}
                  height={24}
                  className={styles.visionIcon}
                />
                <h3>{t('home.vision.quality.title')}</h3>
              </div>
              <p>{t('home.vision.quality.description')}</p>
            </div>
            
            <div className={styles.visionItem}>
              <div className={styles.visionItemHeader}>
                <Image 
                  src="/images/icons/vision-2.svg"
                  alt="Besimi"
                  width={24}
                  height={24}
                  className={styles.visionIcon}
                />
                <h3>{t('home.vision.trust.title')}</h3>
              </div>
              <p>{t('home.vision.trust.description')}</p>
            </div>
            
            <div className={styles.visionItem}>
              <div className={styles.visionItemHeader}>
                <Image 
                  src="/images/icons/vision-3.svg"
                  alt="Inovacioni"
                  width={24}
                  height={24}
                  className={styles.visionIcon}
                />
                <h3>{t('home.vision.innovation.title')}</h3>
              </div>
              <p>{t('home.vision.innovation.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection; 