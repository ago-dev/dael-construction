import Image from 'next/image';
import styles from './ValuesComponent.module.scss';

interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

interface ValuesComponentProps {
  values: ValueItem[];
  brandText?: string;
  title?: string;
  backgroundImage?: string;
}

const ValuesComponent = ({
  values,
  brandText = 'DAEL CONSTRUCTION',
  title = 'Vlerat themelore',
  backgroundImage = '/images/pages/about/about-background-3.png'
}: ValuesComponentProps) => {
  return (
    <section className={styles.valuesComponent}>
      <div className={styles.contentContainer}>
        <div className={styles.headerSection}>
          <div className={styles.backgroundImageContainer}>
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              className={styles.backgroundImage}
            />
          </div>
          
          <div className={styles.headerContent}>
            <div className={styles.brandContainer}>
              <span className={styles.brandText}>{brandText}</span>
              <span className={styles.brandLine}></span>
            </div>
            <h2>{title}</h2>
          </div>
        </div>
        
        <div className={styles.valuesContainer}>
          {values.map((value, index) => (
            <div 
              key={index} 
              className={`${styles.valueCard} ${index === values.length - 1 ? styles.lastCard : ''}`}
            >
              <div className={styles.titleContainer}>
                <div className={styles.iconContainer}>
                  <Image
                    src={value.icon}
                    alt={`${value.title} icon`}
                    width={24}
                    height={24}
                    className={styles.icon}
                  />
                </div>
                <h3>{value.title}</h3>
              </div>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesComponent; 