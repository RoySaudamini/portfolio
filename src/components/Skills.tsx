import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Code, Database, Wrench, Users, Brain } from "lucide-react";
import skillsData from "@/data/skills.json";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: typeof Code;
  skills: Skill[];
}

interface CoreCompetency {
  name: string;
  level: number;
}

const SkillBar = ({ name, level }: Skill) => {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setWidth(level), 100);
        }
      },
      { threshold: 0.1 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={barRef} className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-primary font-semibold">{level}%</span>
      </div>
      <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

const CircularProgress = ({ name, level }: CoreCompetency) => {
  const [progress, setProgress] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setProgress(level), 100);
        }
      },
      { threshold: 0.1 }
    );

    if (circleRef.current) {
      observer.observe(circleRef.current);
    }

    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={circleRef} className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="transform -rotate-90 w-32 h-32" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-secondary"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-primary transition-all duration-1000 ease-out"
            strokeLinecap="butt"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-primary">{progress}%</span>
        </div>
      </div>
      <span className="mt-3 text-sm font-medium text-foreground">{name}</span>
    </div>
  );
};

export const Skills = () => {
  // Icon mapping for dynamic icon selection
  const iconMap = {
    Code,
    Database,
    Wrench,
    Users,
    Brain,
  };

  // Get icon component by name
  const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Code;
  };

  // Dynamic skill categories from JSON
  const skillCategories: SkillCategory[] = skillsData.skillCategories?.map(category => ({
    title: category.title,
    icon: getIconComponent(category.icon),
    skills: category.skills
  })) || [];

  const coreCompetencies: CoreCompetency[] = skillsData.circleSkills || [];

  const toolsAndTechnologies: string[] = skillsData.toolsAndTechnologies || [];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur border-muted"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Icon className="text-primary" size={18} />
                  <h3 className="text-base font-bold">{category.title}</h3>
                </div>
                <div>
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar key={skillIndex} {...skill} />
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 p-8 border border-muted/40 rounded-xl bg-card/30 shadow-sm hover:shadow-lg transition-shadow duration-300 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-10">Core Competencies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            {coreCompetencies.map((competency, index) => (
              <CircularProgress key={index} {...competency} />
            ))}
          </div>
        </div>

        <div className="mt-16 p-8 border border-muted/40 rounded-xl bg-card/30 shadow-sm hover:shadow-lg transition-shadow duration-300 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-10">Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {toolsAndTechnologies.map((tool, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
