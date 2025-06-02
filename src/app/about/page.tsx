"use client";

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import IntroCard from '@/components/IntroCard/IntroCard';
import DescriptiveCard from '@/components/DescriptiveCard/DescriptiveCard';
import ValuesComponent from '@/components/ValuesComponent/ValuesComponent';
import ContactSection from '@/components/ContactSection/ContactSection';
import styles from './page.module.scss';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  const teamItems = [
    {
      icon: '/images/icons/about-icon.svg',
      title: t('about.team.engineers.title'),
      description: t('about.team.engineers.description')
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: t('about.team.professionalism.title'),
      description: t('about.team.professionalism.description')
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: t('about.team.experience.title'),
      description: t('about.team.experience.description')
    }
  ];

  const distinctiveItems = [
    {
      icon: '/images/icons/about-icon.svg',
      title: t('about.distinctive.quality.title'),
      description: t('about.distinctive.quality.description')
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: t('about.distinctive.community.title'),
      description: t('about.distinctive.community.description')
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: t('about.distinctive.development.title'),
      description: t('about.distinctive.development.description')
    }
  ];

  const coreValues = [
    {
      icon: '/images/icons/about-icon.svg',
      title: t('about.values.integrity.title'),
      description: t('about.values.integrity.description')
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: t('about.values.transparency.title'),
      description: t('about.values.transparency.description')
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: t('about.values.care.title'),
      description: t('about.values.care.description')
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    }
  ];

  return (
    <div className={styles.aboutPage}>
      <Header variant="dark" />
      
      <IntroCard 
        backgroundImage="/images/pages/about/about-background.png"
        title={t('about.title')}
      />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.description}>
            <p><b>Dael Construction</b> {t('about.description')}</p>
          </div>
        </div>
        
        <DescriptiveCard
          image="/images/pages/about/team.png"
          imageAlt="Dael Construction Team"
          items={teamItems}
          imageOnLeft={true}
          backgroundColor="#1C222B"
          showBrand={true}
          brandText={t('about.teamTitle')}
          iconBackgroundColor="#1C222B"
        />
        
        <DescriptiveCard
          image="/images/pages/about/about-background-2.jpeg"
          imageAlt="Dael Construction Distinctive Features"
          items={distinctiveItems}
          imageOnLeft={false}
          backgroundColor="#FFFFFF"
          textColor="#121212"
          showBrand={true}
          brandText={t('about.distinctiveTitle')}
          iconBackgroundColor="transparent"
        />
        
        <ValuesComponent values={coreValues} />
        
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
} 