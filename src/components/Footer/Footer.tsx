"use client";

// Footer component
// Will display site navigation, contact info, social links, etc. 

import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.contentContainer}>
        <div className={styles.footerContent}>
          <div className={styles.logoContainer}>
            <Image 
              src="/images/footer-logo.svg" 
              alt="Dael Construction Logo" 
              width={150} 
              height={50} 
            />
          </div>
          
          <div className={styles.navigationContainer}>
            <nav className={styles.navigation}>
              <Link href="/about" className={styles.navLink}>
                {t('nav.about')}
              </Link>
              <Link href="/vision" className={styles.navLink}>
                {t('nav.vision')}
              </Link>
              <Link href="/projects" className={styles.navLink}>
                {t('nav.ourProjects')}
              </Link>
              <Link href="/contact" className={styles.navLink}>
                {t('nav.contact')}
              </Link>
            </nav>
            
            <div className={styles.socialIcons}>
              <Link href="https://www.instagram.com/daelconstruction/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <Image 
                  src="/images/icons/instagram.svg" 
                  alt="Instagram" 
                  width={20} 
                  height={20} 
                />
              </Link>
              {/* <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <Image 
                  src="/images/icons/facebook.svg" 
                  alt="Facebook" 
                  width={24} 
                  height={24} 
                />
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 