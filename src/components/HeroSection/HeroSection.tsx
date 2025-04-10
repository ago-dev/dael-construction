"use client";

import { useState, useRef } from 'react';
import styles from './HeroSection.module.scss';
import Image from 'next/image';
import { projects } from '@/data/projects';
import { scrollToElement } from '@/utils/scrollUtils';

const HeroSection = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animatingDot, setAnimatingDot] = useState<number | null>(null);
  const prevIndexRef = useRef(currentProjectIndex);
  
  const currentProject = projects[currentProjectIndex];
  
  // Function to navigate to a specific project
  const goToProject = (index: number) => {
    if (index === currentProjectIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setAnimatingDot(index);
    
    // Store the previous index for animation direction
    prevIndexRef.current = currentProjectIndex;
    
    // Short delay before changing the actual slide
    setTimeout(() => {
      setCurrentProjectIndex(index);
      
      // Reset animation states after transition completes
      setTimeout(() => {
        setIsTransitioning(false);
        setAnimatingDot(null);
      }, 300);
    }, 150);
  };
  
  // Auto-rotate carousel every 5 seconds - DISABLED
  /* 
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        const nextIndex = (currentProjectIndex + 1) % projects.length;
        goToProject(nextIndex);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentProjectIndex, isTransitioning]);
  */

  const handleScrollToAbout = () => {
    scrollToElement('aboutSection');
  };

  return (
    <section 
      className={`${styles.heroSection} ${isTransitioning ? styles.transitioning : ''} ${styles['bg-' + currentProjectIndex]}`}
    >
      <div className={styles.contentContainer}>

        <div className={styles.content}>
          <h1>Ne ndërtojmë hapësira që
          frymëzojnë jetesë moderne.</h1>
          <p>Me mbi 17 vite eksperiencë, Dael Construction projekton dhe zhvillon komplekse moderne banimi që balancojnë komoditetin, teknologjinë dhe komunitetin.</p>
          <div className={styles.buttonContainer}>
            <button onClick={handleScrollToAbout}>
              SHIKO MË SHUMË
              <Image 
                src="/images/icons/tabler-icon-arrow-down-left.svg"
                alt="Arrow"
                width={16}
                height={16}
                className={styles.buttonIcon}
              />
            </button>
            <div className={styles.carouselControl}>
              <div className={styles.projectName}>{currentProject.name}</div>
              <div className={styles.projectYear}>{currentProject.year}</div>
              <div className={styles.carouselNav}>
                {projects.map((project, index) => (
                  <div 
                    key={project.id}
                    className={`
                      ${index === currentProjectIndex ? styles.carouselDotCurrent : styles.carouselDot}
                      ${animatingDot === index ? styles.animating : ''}
                    `}
                    onClick={() => goToProject(index)}
                  >
                    <Image 
                      src={index === currentProjectIndex 
                        ? "/images/icons/carousel-current.svg" 
                        : "/images/icons/carousel-next.svg"}
                      alt={index === currentProjectIndex ? "Current slide" : "Next slide"}
                      width={index === currentProjectIndex ? 16 : 8}
                      height={8}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 