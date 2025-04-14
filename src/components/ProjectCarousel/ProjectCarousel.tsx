"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ProjectCarousel.module.scss';

interface ProjectCarouselProps {
  images: string[];
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`${styles.carouselSlide} ${index === currentIndex ? styles.active : ''}`}
          >
            <Image
              src={image}
              alt={`Project image ${index + 1}`}
              fill
              priority={index === currentIndex}
              className={styles.carouselImage}
            />
          </div>
        ))}
        
        <button 
          className={`${styles.carouselButton} ${styles.prevButton}`}
          onClick={handlePrevious}
          aria-label="Previous image"
        >
          <Image 
            src="/images/pages/project/scroll-left.svg"
            alt="Previous"
            width={48}
            height={48}
          />
        </button>
        
        <button 
          className={`${styles.carouselButton} ${styles.nextButton}`}
          onClick={handleNext}
          aria-label="Next image"
        >
          <Image 
            src="/images/pages/project/scroll-right.svg"
            alt="Next"
            width={48}
            height={48}
          />
        </button>
      </div>
    </div>
  );
};

export default ProjectCarousel; 