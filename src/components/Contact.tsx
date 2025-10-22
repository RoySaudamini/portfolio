import { Mail, Phone, Linkedin, Github, Twitter } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Contact = () => {
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

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "saudaminiroy17@gmail.com",
      href: "mailto:saudaminiroy17@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 99074 70771",
      href: "tel:+919907470771",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/saudamini-roy-a28005377/",
      color: "hover:text-[#0077B5]",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://x.com/RoySaudamini",
      color: "hover:text-[#1DA1F2]",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/RoySaudamini",
      color: "hover:text-foreground",
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className={`md:bg-card md:border md:border-border md:rounded-xl md:p-8 lg:p-12 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="group flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 md:bg-secondary/50 md:rounded-lg md:border md:border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">{item.label}</p>
                    <p className="text-sm sm:text-base text-foreground font-medium group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center">
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Connect with me on</p>
              <div className="flex items-center justify-center space-x-4 sm:space-x-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col items-center space-y-1 sm:space-y-2 transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300">
                      <social.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © 2024 Saudamini Roy. Built with passion and code.
          </p>
        </div>
      </div>
    </section>
  );
};
