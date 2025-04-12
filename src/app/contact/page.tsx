import React from 'react';
import styles from './page.module.scss';
import Header from '@/components/Header/Header';
import IntroCard from '@/components/IntroCard/IntroCard';
import Footer from '@/components/Footer/Footer';
import ContactSection from '@/components/ContactSection/ContactSection';

export const metadata = {
  title: 'Na Kontaktoni | DAEL Construction',
  description: 'Kontaktoni DAEL Construction për çdo pyetje apo bashkëpunim',
};

const ContactPage = () => {
  return (
    <div className={styles.contactPage}>
      <Header variant="dark" />
      
      <IntroCard 
        backgroundImage="/images/pages/contact/contact-background.png"
        title="Na kontaktoni"
      />
      
      <ContactSection hideTitle={true} />
      
      <Footer />
    </div>
  );
};

export default ContactPage; 