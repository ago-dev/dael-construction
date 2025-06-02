"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import styles from './page.module.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProjectCarousel from '@/components/ProjectCarousel/ProjectCarousel';
import { notFound } from 'next/navigation';
import { getProject } from '@/lib/sanity.client';
import { urlForGalleryPreview } from '@/lib/sanity.client';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function extractGalleryImages(project: any) {
  const images = [];

  if (project.featuredImage) {
    try {
      // Use gallery preview - PNG format, 90% quality, 1200x800 (good balance)
      images.push(urlForGalleryPreview(project.featuredImage).url());
    } catch (e) {
      console.error('Error processing featured image:', e);
    }
  }

  if (project.gallery && project.gallery.length > 0) {
    project.gallery.forEach((item: any) => {
      if (item.asset) {
        try {
          // Use gallery preview - PNG format, 90% quality, 1200x800 (good balance)
          images.push(urlForGalleryPreview(item.asset).url());
        } catch (e) {
          console.error('Error processing gallery image:', e);
        }
      }
    });
  }

  return images;
}

export default function Page({ params }: ProjectPageProps) {
  const { t } = useLanguage();
  const [slug, setSlug] = useState<string>('');
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const resolvedParams = await params;
        const projectSlug = resolvedParams.slug;
        setSlug(projectSlug);
        
        const projectData = await getProject(projectSlug);
        
        if (!projectData) {
          notFound();
        }
        
        setProject(projectData);
      } catch (error) {
        console.error('Error loading project page:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [params]);

  if (loading) {
    return (
      <div className={styles.projectPage}>
        <Header variant="dark" />
        <div className={styles.projectContainer}>
          <p>{t('home.projects.loading')}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className={styles.projectPage}>
        <Header variant="dark" />
        <div className={styles.projectContainer}>
          <h1>{t('project.loadError')}</h1>
          <p>{t('project.loadErrorDescription')}</p>
          <Link href="/projects" className={styles.backLink}>
            <Image
              src="/images/icons/arrow-left-2.svg"
              alt="Back"
              width={16}
              height={16}
            />
            {t('common.backToProjects')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const galleryImages = extractGalleryImages(project);

  return (
    <div className={styles.projectPage}>
      <Header variant="dark" />

      <ProjectCarousel images={galleryImages} />

      <div className={styles.projectContainer}>
        <Link href="/projects" className={styles.backLink}>
          <Image
            src="/images/icons/arrow-left-2.svg"
            alt="Back"
            width={16}
            height={16}
          />
          {t('common.backToProjects')}
        </Link>

        <div className={styles.projectHeader}>
          <h1>{project.title}</h1>

          <div className={styles.projectStats}>
            <div className={styles.statItem}>
              <h3>{t('project.constructionArea')}</h3>
              <p>{project.hapesira}</p>
            </div>

            <div className={styles.statItem}>
              <h3>{t('project.apartments')}</h3>
              <p>{project.apartamente}</p>
            </div>

            <div className={styles.statItem}>
              <h3>{t('project.built')}</h3>
              <p>{project.ndertuar}</p>
            </div>
          </div>
        </div>

        <p className={styles.description}>{project.description}</p>
      </div>

      <Footer />
    </div>
  );
}