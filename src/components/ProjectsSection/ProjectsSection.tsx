"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './ProjectsSection.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor, urlForHighQuality } from '@/lib/sanity.client';

// Type for Sanity project
type SanityProject = {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  year: number;
  ndertuar?: number;
  hapesira?: string;
  apartamente?: string;
  featuredImage: any;
};

const fetchProjects = async (): Promise<SanityProject[]> => {
  const response = await fetch('/api/projects');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
};

const ProjectsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

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

  // Recheck scrollability when projects load
  useEffect(() => {
    if (projects.length > 0) {
      setTimeout(checkScrollability, 100);
    }
  }, [projects]);

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
          <Link href="/projects" className={styles.projectsButton}>
            TË GJITHA PROJEKTET
            <Image 
              src="/images/icons/tabler-icon-arrow-down-left.svg"
              alt="Arrow"
              width={16}
              height={16}
              className={styles.buttonIcon}
            />
          </Link>
        </div>
        
        <div className={styles.galleryWrapper}>
          <div className={styles.projectsGallery} ref={scrollContainerRef}>
            {isLoading ? (
              <div className={styles.loadingState}>Duke u ngarkuar projektet...</div>
            ) : error ? (
              <div className={styles.errorState}>Nuk u arrit të shfaqen projektet.</div>
            ) : projects.length === 0 ? (
              <div className={styles.emptyState}>Nuk ka projekte për të shfaqur.</div>
            ) : (
              projects.map((project: SanityProject) => (
                <div key={project._id} className={styles.projectCard}>
                  <div className={styles.thumbnailContainer}>
                    {project.featuredImage ? (
                      <Image 
                        src={urlForHighQuality(project.featuredImage).width(528).height(384).url()}
                        alt={project.title}
                        fill
                        className={styles.projectThumbnail}
                      />
                    ) : (
                      <div className={styles.noImage}>
                        <p>Nuk ka imazh</p>
                      </div>
                    )}
                  </div>
                  <div className={styles.projectInfo}>
                    <div className={styles.projectDetails}>
                      <h3>{project.title}</h3>
                      <span className={styles.projectYear}>{project.year}</span>
                    </div>
                    <div className={styles.projectAction}>
                      <Link href={`/projects/${project.slug.current}`} className={styles.projectButton}>
                        <Image 
                          src="/images/icons/tabler-icon-arrow-down-left.svg"
                          alt="View Project"
                          width={16}
                          height={16}
                          className={styles.buttonIcon}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className={styles.controlsContainer}>
            <Link href="/projects" className={styles.mobileProjectsButton}>
              TË GJITHA PROJEKTET
              <Image 
                src="/images/icons/tabler-icon-arrow-down-left.svg"
                alt="Arrow"
                width={16}
                height={16}
                className={styles.buttonIcon}
              />
            </Link>
            
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
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 