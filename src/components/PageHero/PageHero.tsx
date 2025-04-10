import Image from 'next/image';
import styles from './PageHero.module.scss';

interface PageHeroProps {
  backgroundImage: string;
  title: string;
  brandText?: string;
}

const PageHero = ({ backgroundImage, title, brandText = 'DAEL CONSTRUCTION' }: PageHeroProps) => {
  return (
    <div className={styles.heroSection}>
      <Image
        src={backgroundImage}
        alt={title}
        fill
        priority
        className={styles.heroImage}
      />
      
      <div className={styles.heroContentWrapper}>
        <div className={styles.heroContent}>
          <div className={styles.brandContainer}>
            <span className={styles.brandText}>{brandText}</span>
            <span className={styles.brandLine}></span>
          </div>
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default PageHero; 