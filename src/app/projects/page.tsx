"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';
import Header from '@/components/Header/Header';
import IntroCard from '@/components/IntroCard/IntroCard';
import Footer from '@/components/Footer/Footer';
import { getProjects } from '@/lib/sanity.client';
import { urlForThumbnail } from '@/lib/sanity.client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  year: number;
  featuredImage?: any;
}

const ProjectsPage = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData || []);
      } catch (error) {
        console.error('Error loading projects page:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className={styles.projectsPage}>
        <Header variant="dark" />
        <IntroCard 
          backgroundImage="/images/pages/projects/projects-background.png"
          title={t('projects.title')}
        />
        <div className={styles.projectsContainer}>
          <p>{t('home.projects.loading')}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.projectsPage}>
        <Header variant="dark" />
        <IntroCard 
          backgroundImage="/images/pages/projects/projects-background.png"
          title={t('projects.title')}
        />
        <div className={styles.noProjects}>
          <p>{t('projects.fetchError')}</p>
          <Link href="/" className={styles.adminLink}>
            {t('common.backToHome')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.projectsPage}>
      <Header variant="dark" />
      
      <IntroCard 
        backgroundImage="/images/pages/projects/projects-background.png"
        title={t('projects.title')}
      />
      
      {projects && projects.length > 0 ? (
        <div className={styles.projectsContainer}>
          {projects.map((project: SanityProject) => (
            <div key={project._id} className={styles.projectItem}>
              <div className={styles.projectImage}>
                {project.featuredImage ? (
                  <Image 
                    src={urlForThumbnail(project.featuredImage).url()}
                    alt={project.title}
                    width={528}
                    height={384}
                    style={{ width: '100%', height: 'auto' }}
                    priority
                    quality={100}
                  />
                ) : (
                  <div className={styles.noImage}>
                    <p>{t('projects.noImage')}</p>
                  </div>
                )}
              </div>
              <div className={styles.itemDescription}>
                <h2>{project.title}</h2>
                <span className={styles.year}>{project.year}</span>
              
                <Link href={`/projects/${project.slug.current}`} className={styles.projectButton}>
                  {t('common.viewProject')}
                  <Image 
                    src="/images/icons/tabler-icon-arrow-down-left.svg"
                    alt="Arrow"
                    width={16}
                    height={16}
                    className={styles.buttonIcon}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noProjects}>
          <p>{t('projects.noProjects')}</p>
          <Link href="/admin" className={styles.adminLink}>
            {t('projects.adminLink')}
          </Link>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default ProjectsPage; 