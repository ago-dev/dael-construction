"use client";

import React from 'react';
import { useState } from 'react';
import styles from './ContactSection.module.scss';
import Image from 'next/image';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface ContactSectionProps {
  hideTitle?: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ hideTitle = false }) => {
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

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Ju lutem vendosni emrin tuaj.' : undefined;
      case 'email':
        return value.trim() === '' 
          ? 'Ju lutem vendosni adresën tuaj të email-it.' 
          : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) 
            ? 'Adresa e email-it nuk është e vlefshme.' 
            : undefined;
      case 'phone':
        return value.trim() !== '' && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(value)
          ? 'Ju lutem vendosni një numër telefoni të vlefshëm.'
          : undefined;
      case 'message':
        return value.trim() === '' ? 'Ju lutem shkruani mesazhin tuaj dhe do t\'ju kontaktojmë sa më shpejt të jetë e mundur.' : undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate on change if the field has been touched
    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate on blur
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors: FormErrors = {};
    let hasErrors = false;
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true
    });
    
    // Check each field
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        hasErrors = true;
      }
    });
    
    setErrors(newErrors);
    
    if (!hasErrors) {

      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Reset touched state
      setTouched({
        name: false,
        email: false,
        phone: false,
        message: false
      });
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.contentContainer}>
        <div className={styles.contactContent}>
          <div className={styles.formContainer}>
            {!hideTitle && (
              <>
                <h2>Kontakto</h2>
                <p>Për më shumë detaje, mos ngurroni të na kontaktoni.</p>
              </>
            )}
            
            <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
              <div className={styles.inputContainer}>
                <label htmlFor="name">EMRI JUAJ</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.name && touched.name ? styles.inputError : ''}
                  required
                />
                {errors.name && touched.name && (
                  <div className={styles.errorMessage}>{errors.name}</div>
                )}
              </div>
              
              <div className={styles.inputContainer}>
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? styles.inputError : ''}
                  required
                />
                {errors.email && touched.email && (
                  <div className={styles.errorMessage}>{errors.email}</div>
                )}
              </div>
              
              <div className={styles.inputContainer}>
                <label htmlFor="phone">NR. I TELEFONIT</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.phone && touched.phone ? styles.inputError : ''}
                />
                {errors.phone && touched.phone && (
                  <div className={styles.errorMessage}>{errors.phone}</div>
                )}
              </div>
              
              <div className={styles.inputContainer}>
                <label htmlFor="message">MESAZHI JUAJ</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.message && touched.message ? styles.inputError : ''}
                  required
                ></textarea>
                {errors.message && touched.message && (
                  <div className={styles.errorMessage}>{errors.message}</div>
                )}
              </div>
              
              <button type="submit" className={styles.submitButton}>
                DËRGO MESAZH
                <Image 
                  src="/images/icons/tabler-icon-arrow-down-left.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                  className={styles.buttonIcon}
                />
              </button>
            </form>
          </div>
          
          <div className={styles.mapContainer}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0557193455484!2d19.81870731744384!3d41.32750000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE5JzM5LjAiTiAxOcKwNDknMDcuNCJF!5e1!3m2!1sen!2sus!4v1623456789012!5m2!1sen!2sus" 
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
                <p>+355 696090007</p>
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
                <p>sales@dael.construction.com</p>
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
                <p>Rruga e Kosovareve 16, Tiranë, 1019, Albania</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 