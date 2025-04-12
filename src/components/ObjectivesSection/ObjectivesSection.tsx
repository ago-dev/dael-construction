"use client";

import styles from './ObjectivesSection.module.scss';
import Image from 'next/image';

const ObjectivesSection = () => {
  const objectives = [
    {
      image: "/images/pages/vision/vision-image-4.png",
      title: "Zgjerimi i Portofolit",
      description: "Krijimi i rezidencave premium dhe projekteve të integruara me shërbime të shumëllojshme."
    },
    {
      image: "/images/pages/vision/vision-image-5.png",
      title: "Bashkëpunime Strategjike",
      description: "Zhvillimi dhe zgjerimi i rrjetit të partnerëve, qoftë atyre vendorë apo ndërkombëtarë."
    },
    {
      image: "/images/pages/vision/vision-image-6.png",
      title: "Edukimi i Tregut",
      description: "Të informojmë rreth rëndësisë së cilësisë në ndërtim dhe avantazheve të teknologjive bashkëkohore."
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
          <h2>Synimet e ardhshme</h2>
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
                  <h3>{objective.title}</h3>
                  <span className={styles.headerLine}></span>
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