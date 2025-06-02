import React from 'react';
import styles from './page.module.scss';
import Header from '@/components/Header/Header';
import IntroCard from '@/components/IntroCard/IntroCard';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer/Footer';
import { getProjects } from '@/lib/sanity.client';
import { urlFor, urlForHighQuality } from '@/lib/sanity.client';

// Set to dynamic to prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

// Sanity project type
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

export const metadata = {
  title: 'Projektet | DAEL Construction',
  description: 'Shikoni projektet e realizuara nga DAEL Construction',
};

const ProjectsPage = async () => {
  try {
    // Fetch projects from Sanity
    const projects = await getProjects();
    
    return (
      <div className={styles.projectsPage}>
        <Header variant="dark" />
        
        <IntroCard 
          backgroundImage="/images/pages/projects/projects-background.png"
          title="Projektet tona"
        />
        
        {projects && projects.length > 0 ? (
          <div className={styles.projectsContainer}>
            {projects.map((project: SanityProject) => (
              <div key={project._id} className={styles.projectItem}>
                <div className={styles.projectImage}>
                  {project.featuredImage ? (
                    <Image 
                      src={urlForHighQuality(project.featuredImage).width(528).height(384).url()}
                      alt={project.title}
                      width={528}
                      height={384}
                      style={{ width: '100%', height: 'auto' }}
                      priority
                      quality={100}
                    />
                  ) : (
                    <div className={styles.noImage}>
                      <p>Nuk ka imazh</p>
                    </div>
                  )}
                </div>
                <div className={styles.itemDescription}>
                  <h2>{project.title}</h2>
                  <span className={styles.year}>{project.year}</span>
                
                  <Link href={`/projects/${project.slug.current}`} className={styles.projectButton}>
                    SHIKO PROJEKTIN
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
            <p>Nuk ka projekte për të shfaqur. Ju lutemi shtoni disa projekte në Sanity Studio.</p>
            <Link href="/admin" className={styles.adminLink}>
              Shko te Admin Panel
            </Link>
          </div>
        )}
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error loading projects page:', error);
    return (
      <div className={styles.projectsPage}>
        <Header variant="dark" />
        
        <IntroCard 
          backgroundImage="/images/pages/projects/projects-background.png"
          title="Projektet tona"
        />
        
        <div className={styles.noProjects}>
          <p>Gabim gjatë marrjes së projekteve. Ju lutemi provoni përsëri më vonë.</p>
          <Link href="/" className={styles.adminLink}>
            Kthehu në faqen kryesore
          </Link>
        </div>
        
        <Footer />
      </div>
    );
  }
};

export default ProjectsPage; 