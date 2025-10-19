import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Events } from "@/components/Events";
import { Courses } from "@/components/Courses";
import { Contact } from "@/components/Contact";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Education />
      <Experience />
      <Skills />
      <Projects />
      <Events />
      <Courses />
      <Contact />
      <ScrollToTop />
    </div>
  );
};

export default Index;
