import Image from 'next/image';
import styles from './DescriptiveCard.module.scss';

interface DescriptiveItem {
  icon: string;
  title: string;
  description: string;
}

interface DescriptiveCardProps {
  image: string;
  imageAlt: string;
  items: DescriptiveItem[];
  imageOnLeft?: boolean;
  backgroundColor?: string;
  textColor?: string;
  brandText?: string;
  showBrand?: boolean;
  iconBackgroundColor?: string;
  imageWidth?: number;
  imageHeight?: number;
  introText?: string;
}

// Helper function to determine if a color is dark
const isDarkColor = (color: string): boolean => {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate brightness (using the formula for relative luminance)
  // https://www.w3.org/TR/WCAG20-TECHS/G17.html
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // Return true if the color is dark (brightness < 128)
  return brightness < 128;
};

const DescriptiveCard = ({
  image,
  imageAlt,
  items,
  imageOnLeft = true,
  backgroundColor = '#FFFFFF',
  textColor,
  brandText = 'DAEL CONSTRUCTION',
  showBrand = false,
  iconBackgroundColor = '#DB4F35',
  imageWidth,
  imageHeight,
  introText
}: DescriptiveCardProps) => {
  // Determine text color based on background if not explicitly provided
  const calculatedTextColor = textColor || (isDarkColor(backgroundColor) ? '#FFFFFF' : '#121212');
  
  return (
    <section 
      className={styles.descriptiveCard}
      style={{ backgroundColor }}
    >
      <div className={styles.contentContainer}>
        <div 
          className={`${styles.content} ${imageOnLeft ? '' : styles.reversed}`}
        >
          <div className={styles.imageContainer}>
            {imageWidth && imageHeight ? (
              <Image
                src={image}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                className={styles.image}
              />
            ) : (
              <Image
                src={image}
                alt={imageAlt}
                fill
                className={styles.image}
              />
            )}
          </div>
          
          <div className={styles.descriptionContainer}>
            {showBrand && (
              <div className={styles.brandContainer}>
                <span className={styles.brandText}>{brandText}</span>
                <span className={styles.brandLine}></span>
              </div>
            )}
            
            {introText && (
              <p className={styles.introText} style={{ color: calculatedTextColor }}>
                {introText}
              </p>
            )}
            
            {items.map((item, index) => (
              <div key={index} className={styles.descriptionItem}>
                <div className={styles.itemHeader}>
                  <div className={styles.iconContainer} style={{ backgroundColor: iconBackgroundColor }}>
                    <Image
                      src={item.icon}
                      alt={`${item.title} icon`}
                      width={24}
                      height={24}
                      className={styles.icon}
                    />
                  </div>
                  <h3 style={{ color: calculatedTextColor }}>{item.title}</h3>
                </div>
                <p style={{ color: calculatedTextColor }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DescriptiveCard; 