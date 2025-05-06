import React from 'react';
import styles from './page.module.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProjectCarousel from '@/components/ProjectCarousel/ProjectCarousel';
import { notFound } from 'next/navigation';
import { getProject } from '@/lib/sanity.client';
import { urlFor } from '@/lib/sanity.client';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

// Set to dynamic to prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

type Params = {
  slug: string;
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  try {
    const { slug } = params;
    const project = await getProject(slug);

    if (!project) {
      return {
        title: 'Projekti nuk u gjet | DAEL Construction',
        description: 'Projekti i kërkuar nuk u gjet',
      };
    }

    return {
      title: `${project.title} | DAEL Construction`,
      description: `Detaje për projektin ${project.title} nga DAEL Construction`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'DAEL Construction Project',
      description: 'View project details',
    };
  }
}

function extractGalleryImages(project: any) {
  const images = [];

  if (project.featuredImage) {
    try {
      images.push(urlFor(project.featuredImage).width(1200).height(800).url());
    } catch (e) {
      console.error('Error processing featured image:', e);
    }
  }

  if (project.gallery && project.gallery.length > 0) {
    project.gallery.forEach((item: any) => {
      if (item.asset) {
        try {
          images.push(urlFor(item.asset).width(1200).height(800).url());
        } catch (e) {
          console.error('Error processing gallery image:', e);
        }
      }
    });
  }

  return images;
}

export default async function Page({ params }: { params: Params }) {
  try {
    const { slug } = params;
    const project = await getProject(slug);

    if (!project) {
      notFound();
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
            KTHEHU TEK PROJEKTET
          </Link>

          <div className={styles.projectHeader}>
            <h1>{project.title}</h1>

            <div className={styles.projectStats}>
              <div className={styles.statItem}>
                <h3>HAPËSIRA E NDËRTIMIT</h3>
                <p>{project.hapesira}</p>
              </div>

              <div className={styles.statItem}>
                <h3>APARTAMENTE</h3>
                <p>{project.apartamente}</p>
              </div>

              <div className={styles.statItem}>
                <h3>NDËRTUAR</h3>
                <p>{project.ndertuar}</p>
              </div>
            </div>
          </div>

          <p className={styles.description}>{project.description}</p>
        </div>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error loading project page:', error);
    return (
      <div className={styles.projectPage}>
        <Header variant="dark" />
        <div className={styles.projectContainer}>
          <h1>Error Loading Project</h1>
          <p>Could not load the project data. Please try again later.</p>
          <Link href="/projects" className={styles.backLink}>
            <Image
              src="/images/icons/arrow-left-2.svg"
              alt="Back"
              width={16}
              height={16}
            />
            BACK TO PROJECTS
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}