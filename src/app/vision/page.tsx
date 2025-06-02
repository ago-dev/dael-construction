"use client";

import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import IntroCard from '@/components/IntroCard/IntroCard';
import DescriptiveCard from '@/components/DescriptiveCard/DescriptiveCard';
import ContactSection from '@/components/ContactSection/ContactSection';
import styles from './page.module.scss';
import ObjectivesSection from '@/components/ObjectivesSection/ObjectivesSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function VisionPage() {
  const { t } = useLanguage();

  const sustainabilityItems = [
    {
      icon: '/images/icons/about-icon.svg',
      title: t('vision.sustainability.innovation.title'),
      description: t('vision.sustainability.innovation.description')
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: t('vision.sustainability.social.title'),
      description: t('vision.sustainability.social.description')
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: t('vision.sustainability.longterm.title'),
      description: t('vision.sustainability.longterm.description')
    }
  ];

  return (
    <div className={styles.visionPage}>
      <Header variant="dark" />
      
      <IntroCard 
        backgroundImage="/images/pages/vision/vision-background.png"
        title={t('vision.title')}
      />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.description}>
            <div className={styles.imageContainer}>
              <Image
                src="/images/pages/vision/vision-image-2.png"
                alt="Our vision"
                width={600}
                height={400}
                className={styles.visionImage}
              />
            </div>

            <div className={styles.visionDescription}>
              <div className={styles.brandContainer}>
                <span className={styles.brandText}>{t('vision.philosophyTitle')}</span>
                <span className={styles.brandLine}></span>
              </div>
              <p>
                {t('vision.description')}
              </p>
            </div>
          </div>
        </div>
        
        <DescriptiveCard
          image="/images/pages/vision/vision-image-3.png"
          imageAlt="Sustainability and Community"
          items={sustainabilityItems}
          imageOnLeft={false}
          backgroundColor="#1C222B"
          showBrand={true}
          brandText={t('vision.sustainabilityTitle')}
          iconBackgroundColor="#1C222B"
          imageWidth={709.25}
          imageHeight={566}
          introText={t('vision.sustainabilityIntro')}
        />
        
        <ObjectivesSection />
      </main>
      
      <Footer />
    </div>
  );
} 