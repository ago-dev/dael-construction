"use client";

import React from 'react';
import styles from './page.module.scss';
import Header from '@/components/Header/Header';
import IntroCard from '@/components/IntroCard/IntroCard';
import Footer from '@/components/Footer/Footer';
import ContactSection from '@/components/ContactSection/ContactSection';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactPage = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.contactPage}>
      <Header variant="dark" />
      
      <IntroCard 
        backgroundImage="/images/pages/contact/contact-background.png"
        title={t('contact.title')}
      />
      
      <ContactSection hideTitle={true} />
      
      <Footer />
    </div>
  );
};

export default ContactPage; 