import React from 'react';
import styles from './page.module.scss';
import Header from '@/components/Header/Header';
import PageHero from '@/components/PageHero/PageHero';
import IntroCard from '@/components/IntroCard/IntroCard';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'Projektet | DAEL Construction',
  description: 'Shikoni projektet e realizuara nga DAEL Construction',
};

const ProjectsPage = () => {
  return (
    <div className={styles.projectsPage}>
      <Header variant="dark" />
      
      <IntroCard 
        backgroundImage="/images/pages/projects/projects-background.png"
        title="Projektet tona"
      />
      
      <div className={styles.projectsContainer}>
        <div className={styles.projectItem}>
          <div className={styles.projectImage}>
            <Image 
              src="/images/pages/projects/project-gallery/prime-residence.png"
              alt="Prime Residence"
              width={528}
              height={384}
              layout="responsive"
            />
          </div>
          <div className={styles.itemDescription}>
            <h2>Prime Residence</h2>
            <span className={styles.year}>2024</span>
            <Link href="/projects/prime-residence" className={styles.projectButton}>
              SHIKO PROJEKTIN
              <Image 
                src="/images/icons/tabler-icon-arrow-down-left.svg"
                alt="Arrow"
                width={16}
                height={16}
                className={styles.buttonIcon}
              />
            </Link>
          </div>
        </div>
        
        <div className={styles.projectItem}>
          <div className={styles.projectImage}>
            <Image 
              src="/images/pages/projects/project-gallery/point-parking.png"
              alt="Parking nëntokësor Point Center"
              width={528}
              height={384}
              layout="responsive"
            />
          </div>
          <div className={styles.itemDescription}>
            <h2>Parking nëntokësor<br></br> "Point Center"</h2>
            <span className={styles.year}>2024</span>
            <Link href="/projects/point-parking" className={styles.projectButton}>
              SHIKO PROJEKTIN
              <Image 
                src="/images/icons/tabler-icon-arrow-down-left.svg"
                alt="Arrow"
                width={16}
                height={16}
                className={styles.buttonIcon}
              />
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProjectsPage; 