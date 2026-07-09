import HeroSection from '../sections/HeroSection.jsx';
import AboutSection from '../sections/AboutSection.jsx';
import SkillsSection from '../sections/SkillsSection.jsx';
import ProjectsSection from '../sections/ProjectsSection.jsx';
import ExperienceSection from '../sections/ExperienceSection.jsx';
import ContactSection from '../sections/ContactSection.jsx';

export default function Home() {
    return (
        <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
        </main>
    );
}