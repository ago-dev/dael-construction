"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './ProjectsSection.module.scss';
import Image from 'next/image';
import { projects } from '@/data/projects';

const ProjectsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      // Check if we can scroll left
      setCanScrollLeft(container.scrollLeft > 0);
      
      // Check if we can scroll right
      setCanScrollRight(
        container.scrollWidth > container.clientWidth + container.scrollLeft
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      // Initial check
      checkScrollability();
      
      // Check on window resize
      window.addEventListener('resize', checkScrollability);
      
      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -624, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 624, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.projectsSection}>
      <div className={styles.contentContainer}>
        <div className={styles.introSection}>
          <div className={styles.introContent}>
            <div className={styles.headerContainer}>
              <Image 
                src="/images/icons/projects-1.svg"
                alt="Projects Icon"
                width={24}
                height={24}
                className={styles.sectionIcon}
              />
              <h2>Projektet</h2>
            </div>
            <p>Ne kemi zhvilluar dhjetëra projekte rezidenciale në Tiranë, duke ofruar standardet më të larta në ndërtim, dizajn funksional dhe hapësira të mirë organizuara.</p>
          </div>
          <button className={styles.projectsButton}>
            TË GJITHA PROJEKTET
            <Image 
              src="/images/icons/tabler-icon-arrow-down-left.svg"
              alt="Arrow"
              width={16}
              height={16}
              className={styles.buttonIcon}
            />
          </button>
        </div>
        
        <div className={styles.galleryWrapper}>
          <div className={styles.projectsGallery} ref={scrollContainerRef}>
            {projects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.thumbnailContainer}>
                  <Image 
                    src={project.thumbnail}
                    alt={project.alt}
                    fill
                    className={styles.projectThumbnail}
                  />
                </div>
                <div className={styles.projectInfo}>
                  <div className={styles.projectDetails}>
                    <h3>{project.name}</h3>
                    <span className={styles.projectYear}>{project.year}</span>
                  </div>
                  <div className={styles.projectAction}>
                    <button className={styles.projectButton}>
                      <Image 
                        src="/images/icons/tabler-icon-arrow-down-left.svg"
                        alt="View Project"
                        width={16}
                        height={16}
                        className={styles.buttonIcon}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.navigationButtons}>
            <button 
              className={`${styles.navButton} ${!canScrollLeft ? styles.navButtonDisabled : ''}`}
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <Image 
                src="/images/icons/arrow-right.svg"
                alt="Scroll Left"
                width={16}
                height={16}
                className={styles.leftButtonIcon}
              />
            </button>
            <button 
              className={`${styles.navButton} ${!canScrollRight ? styles.navButtonDisabled : ''}`}
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <Image 
                src="/images/icons/arrow-right.svg"
                alt="Scroll Right"
                width={16}
                height={16}
              />
            </button>
          </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 