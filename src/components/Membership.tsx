import { Users, BookOpen, CheckCircle2, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Membership = () => {
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
    <section id="membership" className="py-20 px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Membership & Courses
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Membership Card */}
          <div
            className={`bg-card border border-border rounded-xl p-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Membership</h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-lg border border-border/50">
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Algorand Blockchain Club
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    I am an active member of the university's blockchain club.
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Active Member</span>
                  </div>
                </div>

                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <p className="text-sm text-foreground/70">
                    This club works with a blockchain community named{" "}
                    <span className="text-primary font-medium">"AlgoBharat"</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Card */}
          <div
            className={`bg-card border border-border rounded-xl p-8 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <BookOpen className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Courses</h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-lg border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-foreground">
                      Developing Soft Skills and Personality
                    </h4>
                    <div className="flex items-center space-x-1 text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                      <Clock className="h-3 w-3" />
                      <span>In Progress</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Prof. T. Ravichandran, IIT Kanpur
                  </p>
                </div>

                <div className="p-4 bg-background/50 rounded-lg border border-border/50 text-center">
                  <p className="text-sm text-foreground/70">
                    More courses coming soon...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-xl text-foreground/80 italic">That's all about me !!</p>
        </div>
      </div>
    </section>
  );
};
