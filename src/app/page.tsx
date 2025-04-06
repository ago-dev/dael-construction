import Image from "next/image";
import styles from "./page.module.scss";
import HeroSection from "@/components/HeroSection/HeroSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import VisionSection from "@/components/VisionSection/VisionSection";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";
// Import other components as needed

// Homepage component
// Will import and compose all section components

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <HeroSection />
        <AboutSection />
        <VisionSection />
        <ProjectsSection />
        <ContactSection />
        {/* Add other section components */}
      </main>
      <Footer />
    </div>
  );
}
