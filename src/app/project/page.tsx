import React from 'react';
import styles from './page.module.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'Projekti | DAEL Construction',
  description: 'Detaje për projektin e DAEL Construction',
};

const ProjectPage = () => {
  return (
    <div className={styles.projectPage}>
      <Header variant="dark" />
      
      <div className={styles.projectContainer}>
        {/* Project content will go here */}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProjectPage; 