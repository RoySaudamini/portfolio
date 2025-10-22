import { GraduationCap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const educationData = [
  {
    title: "CURRENTLY",
    institution: "University of Engineering and Management (UEM), Kolkata",
    degree: "B. Tech",
    field: "Computer Science and Technology (CST)",
  },
  {
    title: "12TH BOARDS",
    institution: "St Paul's Academy",
    degree: "ISC Board",
    marks: "94.6 %",
  },
  {
    title: "10TH BOARDS",
    institution: "St Paul's Academy",
    degree: "ICSE Board",
    marks: "96.8 %",
  },
];

export const Education = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleCards((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="py-16 sm:py-20 px-2 sm:px-6 lg:px-8">
      <div className="container mx-auto px-0 sm:px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4 sm:px-4">
          {educationData.map((edu, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`group relative bg-card border border-border rounded-xl p-5 sm:p-7 w-[92%] max-w-md mx-auto hover:border-primary/50 transition-all duration-500 ${
                visibleCards.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-sm font-bold text-primary uppercase tracking-wider">
                    {edu.title}
                  </span>
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary/60 group-hover:text-primary transition-colors" />
                </div>

                <div className="space-y-1 sm:space-y-3">
                  <h3 className="text-base sm:text-xl font-semibold text-foreground">
                    {edu.institution}
                  </h3>
                  <p className="text-xs sm:text-base text-muted-foreground">{edu.degree}</p>
                  <p className="text-xs sm:text-base text-foreground/80">{edu.field || edu.marks}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
