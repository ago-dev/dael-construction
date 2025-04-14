import React from 'react';
import styles from './page.module.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProjectCarousel from '@/components/ProjectCarousel/ProjectCarousel';
import { notFound } from 'next/navigation';

// This would typically come from a database or API
const getProjectData = async (slug: string) => {
  // Mock data - in a real app, fetch this from your API or database
  const projects = {
    'prime-residence': {
      title: 'Prime Residence',
      year: '2024',
      description: 'Përshkrimi i detajuar i projektit Prime Residence...',
      images: [
        '/images/pages/projects/project-gallery/prime-residence.png',
        '/images/pages/projects/project-gallery/prime-residence-2.png',
        '/images/pages/projects/project-gallery/prime-residence-3.png'
      ]
    },
    'point-parking': {
      title: 'Parking nëntokësor "Point Center"',
      year: '2024',
      description: 'Përshkrimi i detajuar i projektit Parking nëntokësor...',
      images: [
        '/images/pages/projects/project-gallery/point-parking.png',
        '/images/pages/projects/project-gallery/point-parking-2.png',
        '/images/pages/projects/project-gallery/point-parking-3.png'
      ]
    }
  };
  
  return projects[slug as keyof typeof projects];
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const project = await getProjectData(resolvedParams.slug);
  
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

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const project = await getProjectData(resolvedParams.slug);
  
  if (!project) {
    notFound();
  }
  
  return (
    <div className={styles.projectPage}>
      <Header variant="dark" />
      
      <ProjectCarousel images={project.images} />
      
      <div className={styles.projectContainer}>
        <h1>{project.title}</h1>
        <p className={styles.year}>{project.year}</p>
        <p className={styles.description}>{project.description}</p>
        {/* Add more project details here */}
      </div>
      
      <Footer />
    </div>
  );
} 