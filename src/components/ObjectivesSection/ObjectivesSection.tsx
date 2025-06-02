"use client";

import styles from './ObjectivesSection.module.scss';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const ObjectivesSection = () => {
  const { t } = useLanguage();

  const objectives = [
    {
      image: "/images/pages/vision/vision-image-4.png",
      icon: "/images/icons/about-icon.svg",
      title: t('vision.objectives.portfolio.title'),
      description: t('vision.objectives.portfolio.description')
    },
    {
      image: "/images/pages/vision/vision-image-5.png",
      icon: "/images/icons/about-icon.svg",
      title: t('vision.objectives.partnerships.title'),
      description: t('vision.objectives.partnerships.description')
    },
    {
      image: "/images/pages/vision/vision-image-6.png",
      icon: "/images/icons/about-icon.svg",
      title: t('vision.objectives.education.title'),
      description: t('vision.objectives.education.description')
    }
  ];

  return (
    <section className={styles.objectivesSection}>
      <div className={styles.contentContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.brandContainer}>
            <span className={styles.brandText}>DAEL CONSTRUCTION</span>
            <span className={styles.brandLine}></span>
          </div>
          <h2>{t('vision.objectivesTitle')}</h2>
        </div>
        
        <div className={styles.objectivesGrid}>
          {objectives.map((objective, index) => (
            <div key={index} className={styles.objectiveCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={objective.image}
                  alt={objective.title}
                  width={400}
                  height={300}
                  className={styles.objectiveImage}
                />
              </div>
              <div className={styles.objectiveContent}>
                <div className={styles.itemHeader}>
                  <div className={styles.iconContainer}>
                    <Image
                      src={objective.icon}
                      alt={`${objective.title} icon`}
                      width={20}
                      height={20}
                      className={styles.icon}
                    />
                  </div>
                  <h3>{objective.title}</h3>
                </div>
                <p>{objective.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ObjectivesSection; 