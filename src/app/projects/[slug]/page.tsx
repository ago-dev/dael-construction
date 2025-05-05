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

export const revalidate = 3600; // Revalidate every hour

// Type for Sanity project
type SanityProject = {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  year: number;
  ndertuar: number;
  hapesira: string;
  apartamente: string;
  featuredImage: any;
  gallery: Array<{ _key: string; asset: any; alt?: string; caption?: string }>;
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Get the project data using the slug
  const project = await getProject(params.slug);
  
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
}

// Function to extract image URLs from project data
const extractGalleryImages = (project: SanityProject): string[] => {
  const images: string[] = [];
  
  // Add featured image first if available
  if (project.featuredImage) {
    images.push(urlFor(project.featuredImage).width(1200).height(800).url());
  }
  
  // Add gallery images
  if (project.gallery && project.gallery.length > 0) {
    project.gallery.forEach(item => {
      if (item.asset) {
        images.push(urlFor(item.asset).width(1200).height(800).url());
      }
    });
  }
  
  return images;
};

/**
 * Note on Slugs:
 * 
 * 1. When a project is first created, the slug is auto-generated from the title.
 * 2. When the title is changed, the slug needs to be manually updated by clicking
 *    the "Generate" button in the slug field in Sanity Studio.
 * 3. This component uses the slug from the URL to fetch the project data.
 */
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  // Get the project data using the slug
  const project = await getProject(params.slug);
  
  if (!project) {
    notFound();
  }
  
  // Extract gallery images from Sanity project data
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
} 