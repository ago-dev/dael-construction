import styles from "./page.module.scss";
import HeroSection from "@/components/HeroSection/HeroSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import VisionSection from "@/components/VisionSection/VisionSection";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <VisionSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
