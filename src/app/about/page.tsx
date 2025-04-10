import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import IntroCard from '@/components/IntroCard/IntroCard';
import DescriptiveCard from '@/components/DescriptiveCard/DescriptiveCard';
import ValuesComponent from '@/components/ValuesComponent/ValuesComponent';
import ContactSection from '@/components/ContactSection/ContactSection';
import styles from './page.module.scss';

export default function AboutPage() {
  const teamItems = [
    {
      icon: '/images/icons/about-icon.svg',
      title: 'Inxhinierë & Arkitektë të Specializuar',
      description: 'Një skuadër me ekspertë të fushës, që kombinojnë dijen teknike me një qasje vizionare.'
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: 'Profesionalizëm & Përkushtim',
      description: 'Operojmë me ndershmëri dhe transparencë, duke garantuar marrëdhënie afatgjata me klientët dhe partnerët tanë.'
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: 'Përvojë 15+ Vjeçare',
      description: 'Një gamë e gjerë projektesh në portofol na lejon të kuptojmë më mirë nevojat e tregut dhe klientëve.'
    }
  ];

  const distinctiveItems = [
    {
      icon: '/images/icons/about-icon.svg',
      title: 'Inxhinierë & Arkitektë të Specializuar',
      description: 'Një skuadër me ekspertë të fushës, që kombinojnë dijen teknike me një qasje vizionare.'
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: 'Profesionalizëm & Përkushtim',
      description: 'Operojmë me ndershmëri dhe transparencë, duke garantuar marrëdhënie afatgjata me klientët dhe partnerët tanë.'
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: 'Përvojë 15+ Vjeçare',
      description: 'Një gamë e gjerë projektesh në portofol na lejon të kuptojmë më mirë nevojat e tregut dhe klientëve.'
    }
  ];

  const coreValues = [
    {
      icon: '/images/icons/about-icon.svg',
      title: 'Integriteti',
      description: 'Mbajmë fjalën tonë, zbatojmë marrëveshjet dhe punojmë me korrektësi.'
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: 'Transaparenca',
      description: 'Ndajmë me klientët çdo hap të procesit, duke vendosur një bazë të fortë bashkëpunimi.'
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: 'Kujdesi',
      description: 'Çdo vendim, i vogël apo i madh, merret me përgjegjësi dhe vëmendje maksimale.'
    },
    {
      icon: '/images/icons/about-icon.svg',
      title: 'Risia',
      description: 'Ecim me hapin e kohës, duke i paraprirë zhvillimeve teknologjike dhe tregut.'
    }
  ];

  return (
    <div className={styles.aboutPage}>
      <Header variant="dark" />
      
      <IntroCard 
        backgroundImage="/images/pages/about/about-background.png"
        title="Rreth nesh"
      />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.description}>
            <p><b>Dael Construction</b> ka nisur rrugëtimin e saj në vitin 2008 me qëllimin për t'i sjellë Tiranës një model të ri ndërtimi: kompleks banimi me standarde të larta europiane, dizajn funksional dhe një qasje të qëndrueshme ndaj zhvillimit urban. Qysh prej fillimeve tona, kemi arritur të krijojmë një reputacion solid falë punës së palodhur, inovacionit të vazhdueshëm dhe përkushtimit për t'u sjellë klientëve tanë siguri dhe cilësi.</p>
          </div>
        </div>
        
        <DescriptiveCard
          image="/images/pages/about/team.png"
          imageAlt="Dael Construction Team"
          items={teamItems}
          imageOnLeft={true}
          backgroundColor="#1C222B"
          showBrand={true}
          brandText="EKIPI DHE EKSPERTIZA"
          iconBackgroundColor="#1C222B"
        />
        
        <DescriptiveCard
          image="/images/pages/about/about-background-2.jpeg"
          imageAlt="Dael Construction Distinctive Features"
          items={distinctiveItems}
          imageOnLeft={false}
          backgroundColor="#FFFFFF"
          textColor="#121212"
          showBrand={true}
          brandText="ÇFARË NA VEÇON"
          iconBackgroundColor="transparent"
        />
        
        <ValuesComponent values={coreValues} />
        
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
} 