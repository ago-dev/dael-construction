"use client";

import React, { useState } from 'react';
import styles from './ContactSection.module.scss';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactSectionProps {
  hideTitle?: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ hideTitle = false }) => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? t('contact.validation.nameRequired') : undefined;
      case 'email':
        return value.trim() === '' 
          ? t('contact.validation.emailRequired')
          : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) 
            ? t('contact.validation.emailInvalid')
            : undefined;
      case 'phone':
        return value.trim() !== '' && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(value)
          ? t('contact.validation.phoneInvalid')
          : undefined;
      case 'message':
        return value.trim() === '' ? t('contact.validation.messageRequired') : undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true
    });
    
    setErrors(newErrors);
    
    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      setSubmitStatus('error');
      setSubmitMessage(t('contact.validation.fixErrors'));
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(t('contact.form.successMessage', 'Mesazhi juaj u dërgua me sukses! Do t\'ju kontaktojmë së shpejti.'));
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTouched({ name: false, email: false, phone: false, message: false });
        setErrors({});
      } else {
        const data = await response.json();
        setSubmitStatus('error');
        
        if (response.status === 400) {
          setSubmitMessage(t('contact.validation.fixErrors'));
        } else {
          setSubmitMessage(data.message || t('contact.validation.submitError'));
        }
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(t('contact.validation.submitError'));
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.contentContainer}>
        <div className={styles.contactContent}>
          <div className={styles.formContainer}>
            {!hideTitle && (
              <>
                <h2>{t('contact.title')}</h2>
                <p>{t('contact.subtitle')}</p>
              </>
            )}
            
            {submitStatus === 'success' ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>
                  <Image 
                    src="/images/icons/check-circle.svg"
                    alt="Success"
                    width={32}
                    height={32}
                  />
                </div>
                <p>{submitMessage}</p>
                <button 
                  className={styles.resetButton}
                  onClick={() => setSubmitStatus('idle')}
                >
                  {t('common.sendAnotherMessage')}
                </button>
              </div>
            ) : (
              <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
                {submitStatus === 'error' && submitMessage && (
                  <div className={styles.formError}>
                    {submitMessage}
                  </div>
                )}
                
                <div className={styles.inputContainer}>
                  <label htmlFor="name">{t('contact.form.name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.name && touched.name ? styles.inputError : ''}
                    required
                    disabled={isSubmitting}
                  />
                  {errors.name && touched.name && (
                    <div className={styles.errorMessage}>{errors.name}</div>
                  )}
                </div>
                
                <div className={styles.inputContainer}>
                  <label htmlFor="email">{t('contact.form.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email ? styles.inputError : ''}
                    required
                    disabled={isSubmitting}
                  />
                  {errors.email && touched.email && (
                    <div className={styles.errorMessage}>{errors.email}</div>
                  )}
                </div>
                
                <div className={styles.inputContainer}>
                  <label htmlFor="phone">{t('contact.form.phone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.phone && touched.phone ? styles.inputError : ''}
                    disabled={isSubmitting}
                  />
                  {errors.phone && touched.phone && (
                    <div className={styles.errorMessage}>{errors.phone}</div>
                  )}
                </div>
                
                <div className={styles.inputContainer}>
                  <label htmlFor="message">{t('contact.form.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.message && touched.message ? styles.inputError : ''}
                    rows={4}
                    required
                    disabled={isSubmitting}
                  />
                  {errors.message && touched.message && (
                    <div className={styles.errorMessage}>{errors.message}</div>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                </button>
              </form>
            )}
          </div>
          
          <div className={styles.mapContainer}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1469.5107620190106!2d19.759265300000003!3d41.3829436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135033006396f38f%3A0x1170fc87164160a1!2sKAMZA%201%2C%20DAEL%20CONSTRUCTION%20SHPK!5e1!3m2!1sen!2s!4v1748966375561!5m2!1sen!2s" 
              width="100%" 
              height="398" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.mapIframe}
            ></iframe>
            
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Image 
                    src="/images/icons/mobile.svg"
                    alt="Phone"
                    width={16}
                    height={16}
                  />
                </div>
                <p>+35567 2043 888</p>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Image 
                    src="/images/icons/email.svg"
                    alt="Email"
                    width={16}
                    height={16}
                  />
                </div>
                <p>info@dael.al</p>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Image 
                    src="/images/icons/address.svg"
                    alt="Address"
                    width={16}
                    height={16}
                  />
                </div>
                <p>Rruga Skënderbeu 1030, Kamëz, Albania</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 