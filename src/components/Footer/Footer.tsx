// Footer component
// Will display site navigation, contact info, social links, etc. 

import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer = () => {
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
                Rreth nesh
              </Link>
              <Link href="/vision" className={styles.navLink}>
                Vizioni ynë
              </Link>
              <Link href="/projects" className={styles.navLink}>
                Projektet tona
              </Link>
              <Link href="/contact" className={styles.navLink}>
                Kontakto
              </Link>
            </nav>
            
            <div className={styles.socialIcons}>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <Image 
                  src="/images/icons/instagram.svg" 
                  alt="Instagram" 
                  width={20} 
                  height={20} 
                />
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <Image 
                  src="/images/icons/facebook.svg" 
                  alt="Facebook" 
                  width={20} 
                  height={20} 
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 