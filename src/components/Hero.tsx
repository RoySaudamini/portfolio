import { useEffect, useState } from "react";
// Ensure the exact filename with correct case sensitivity
import profileImage from "../images/profile_image.jpg";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Profile Image */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-2xl opacity-30 animate-glow" />
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[36rem] lg:h-[36rem] rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl">
                <img
                  src={profileImage}
                  alt="Saudamini Roy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div
            className={`space-y-6 text-center lg:text-left transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="space-y-2">
              <p className="text-sm sm:text-base text-primary font-medium tracking-wide uppercase">
                Hello! My name is
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground">
                Saudamini Roy
              </h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl text-muted-foreground font-medium">
                A bit about me
              </h2>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                I am a second-year B.Tech student at the University of Engineering and Management (UEM), Kolkata, specializing in Computer Science and Technology (CST).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
