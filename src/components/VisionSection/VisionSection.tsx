"use client";

import styles from './VisionSection.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const VisionSection = () => {
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
              <span className={styles.brandText}>VIZIONI YNË</span>
              <Image 
                src="/images/assets/line-2.svg"
                alt="Line"
                width={75}
                height={2}
                className={styles.brandLine}
              />
            </div>
            <h2>Ne fokusohemi në krijimin<br />e hapësirave dinamike.</h2>
            
            <Link href="/vision" className={styles.visionButton}>
              VIZIONI YNË
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
                <h3>Cilësia</h3>
              </div>
              <p>Zgjedhim materialet më të mira dhe zbatojmë teknologjitë më të reja për të garantuar rezistencë, komoditet dhe efikasitet energjetik.</p>
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
                <h3>Besimi</h3>
              </div>
              <p>Punojmë me transparencë dhe profesionalizëm, duke ruajtur një komunikim të vazhdueshëm me klientët tanë në çdo hap të projektit.</p>
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
                <h3>Inovacioni</h3>
              </div>
              <p>Nxisim ide kreative dhe investojmë në zhvillimin e teknologjive të avancuara për të krijuar ndërtesa funksionale dhe me plot hapësira të gjelbra.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection; 