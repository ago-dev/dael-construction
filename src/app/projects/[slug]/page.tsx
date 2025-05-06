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

export const revalidate = 3600; // Revalidate every hour

// Fix param handling for Next.js 15
interface PageParams {
  slug: string;
}

// Using the standard Next.js types directly
// Note: Removed our custom PageProps type in favor of the built-in Next.js typing

// Updated metadata generation for Next.js 15
export async function generateMetadata({ 
  params 
}: {
  params: Promise<PageParams> | PageParams;
}): Promise<Metadata> {
  // Properly await the params
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  
  // Get the project data using the slug
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
}

// Function to extract image URLs
function extractGalleryImages(project: any) {
  const images = [];
  
  if (project.featuredImage) {
    images.push(urlFor(project.featuredImage).width(1200).height(800).url());
  }
  
  if (project.gallery && project.gallery.length > 0) {
    project.gallery.forEach((item: any) => {
      if (item.asset) {
        images.push(urlFor(item.asset).width(1200).height(800).url());
      }
    });
  }
  
  return images;
}

// Updated page component with correct Next.js 15 typing
export default async function Page({ 
  params 
}: {
  params: Promise<PageParams> | PageParams;
}) {
  // Properly await the params
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  
  // Get the project data using the slug
  const project = await getProject(slug);
  
  if (!project) {
    notFound();
  }
  
  // Extract gallery images
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