import { ExternalLink, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import projectsData from "@/data/projects.json";

export const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-20 px-2 sm:px-6 lg:px-8 bg-secondary/30" ref={sectionRef}>
      <div className="container mx-auto px-1 sm:px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-[96%] sm:w-auto max-w-6xl mx-auto">
          {projectsData.map((project, index) => (
            <Card
              key={index}
              className={`relative flex flex-col transition-all duration-700 hover:shadow-elegant w-full h-full ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-2 flex flex-col min-h-[90px] sm:min-h-[110px]">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base sm:text-xl">{project.title}</CardTitle>
                  <span
                    className={`text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${
                      project.status === "Completed"
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <CardDescription className="text-xs sm:text-sm mt-1 sm:mt-2">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 flex-1 min-h-[48px] sm:min-h-[60px] flex items-end">
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {project.technologies.map((technology, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2 p-4 sm:p-6 pt-2 sm:pt-4 min-h-[48px] sm:min-h-[56px] flex items-end">
                  {"github" in project && (
                    <Button variant="outline" size="sm" className="text-[11px] sm:text-xs h-8 sm:h-9" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                  {"demo" in project && (
                    <Button variant="default" size="sm" className="text-[11px] sm:text-xs h-8 sm:h-9" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Demo
                      </a>
                    </Button>
                  )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
