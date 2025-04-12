import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import IntroCard from '@/components/IntroCard/IntroCard';
import DescriptiveCard from '@/components/DescriptiveCard/DescriptiveCard';
import ContactSection from '@/components/ContactSection/ContactSection';
import styles from './page.module.scss';
import ObjectivesSection from '@/components/ObjectivesSection/ObjectivesSection';

export default function VisionPage() {
  const sustainabilityItems = [
    {
      icon: '/images/icons/about-icon.svg',
      title: 'Inovacioni Teknologjik',
      description: 'Një skuadër me ekspertë të fushës, që kombinojnë dijen teknike me një qasje vizionare.'
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: 'Zhvillim Social',
      description: 'Ofrimi i facilitetit si zona të përbashkëta rekreative, ambjente pushimi dhe hapësira të gjelbra.'
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: 'Qasje Afatgjatë',
      description: 'Investojmë në rezistencën e ndërtesave ndaj kohës dhe ndryshimeve klimatike, duke krijuar një aset me vlerë për brezat e ardhshëm.'
    }
  ];

  return (
    <div className={styles.visionPage}>
      <Header variant="dark" />
      
      <IntroCard 
        backgroundImage="/images/pages/vision/vision-background.png"
        title="Vizioni ynë"
      />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.description}>
            <div className={styles.imageContainer}>
              <Image
                src="/images/pages/vision/vision-image-2.png"
                alt="Our vision"
                width={600}
                height={400}
                className={styles.visionImage}
              />
            </div>

            <div className={styles.visionDescription}>
              <div className={styles.brandContainer}>
                <span className={styles.brandText}>FILOZOFIA E ZHVILLIMIT</span>
                <span className={styles.brandLine}></span>
              </div>
              <p>
                Vizioni ynë është të nxisim standarde të reja në ndërtimin rezidencial, duke sjellë projekte inovative që pasqyrojnë zhvillimin më të fundit në arkitekturë dhe teknologji. Ne mendojmë se banesa nuk është thjesht një investim, por një hapësirë ku njerëzit rrisin familjet e tyre, krijojnë kujtime dhe ndërtojnë të ardhmen. Prandaj, çdo projekt është një mundësi për të ofruar diçka më shumë sesa muret e një shtëpie – ofrojmë cilësi jete.
              </p>
            </div>
          </div>
        </div>
        
        <DescriptiveCard
          image="/images/pages/vision/vision-image-3.png"
          imageAlt="Sustainability and Community"
          items={sustainabilityItems}
          imageOnLeft={false}
          backgroundColor="#1C222B"
          showBrand={true}
          brandText="QËNDRUESHMËRIA DHE KOMUNITETI"
          iconBackgroundColor="#1C222B"
          imageWidth={709.25}
          imageHeight={566}
          introText="Dael Construction angazhohet për ruajtjen e mjedisit dhe ndërtimin e komuniteteve të shëndetshme."
        />
        
        <ObjectivesSection />
      </main>
      
      <Footer />
    </div>
  );
} 