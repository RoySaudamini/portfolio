import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import eventsData from "@/data/events.json";

export const Events = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCertificates, setSelectedCertificates] = useState<{name: string, urls: string[]} | null>(null);
  const [currentCertificateIndex, setCurrentCertificateIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [certificateImages, setCertificateImages] = useState<Record<string, string>>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Load certificate images dynamically
  useEffect(() => {
    const images = import.meta.glob('/src/images/events/*', { eager: true });
    const imageMap: Record<string, string> = {};
    
    Object.entries(images).forEach(([path, module]) => {
      const fileName = path.split('/').pop() || '';
      imageMap[fileName] = (module as { default: string }).default;
    });
    
    console.log("Loaded certificate images:", imageMap);
    setCertificateImages(imageMap);
  }, []);

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

  // Helper function to extract all certificate URLs from an event object
  const getCertificateUrls = (event: Record<string, unknown>): string[] => {
    const urls: string[] = [];
    let counter = 0; // Start from 0 to check certificateLink1, certificateLink2, etc.
    
    // Check certificateLink first
    if (event.certificateLink && typeof event.certificateLink === 'string') {
      const fileName = (event.certificateLink as string).split('/').pop() || '';
      // Try to find the image in certificateImages with any extension
      const matchingImage = Object.keys(certificateImages).find(key => {
        const nameWithoutExt = key.replace(/\.[^/.]+$/, '');
        const urlWithoutExt = fileName.replace(/\.[^/.]+$/, '');
        return nameWithoutExt === urlWithoutExt;
      });
      
      if (matchingImage && certificateImages[matchingImage]) {
        urls.push(certificateImages[matchingImage]);
      } else {
        console.warn(`Certificate image not found for: ${fileName}`);
      }
    }
    
    // Check certificateLink1, certificateLink2, certificateLink3, etc.
    while (event[`certificateLink${counter + 1}`] && typeof event[`certificateLink${counter + 1}`] === 'string') {
      const certLink = event[`certificateLink${counter + 1}`] as string;
      const fileName = certLink.split('/').pop() || '';
      
      const matchingImage = Object.keys(certificateImages).find(key => {
        const nameWithoutExt = key.replace(/\.[^/.]+$/, '');
        const urlWithoutExt = fileName.replace(/\.[^/.]+$/, '');
        return nameWithoutExt === urlWithoutExt;
      });
      
      if (matchingImage && certificateImages[matchingImage]) {
        urls.push(certificateImages[matchingImage]);
      } else {
        console.warn(`Certificate image not found for: ${fileName}`);
      }
      
      counter++;
    }
    
    // Log for debugging
    console.log("Certificate URLs found:", urls);
    
    return urls;
  };

  const handleCertificateClick = (eventTitle: string, event: Record<string, unknown>) => {
    const urls = getCertificateUrls(event);
    setSelectedCertificates({name: eventTitle, urls});
    setCurrentCertificateIndex(0);
    setIsDialogOpen(true);
  };

  const nextCertificate = () => {
    if (selectedCertificates && currentCertificateIndex < selectedCertificates.urls.length - 1) {
      setCurrentCertificateIndex(currentCertificateIndex + 1);
    }
  };

  const prevCertificate = () => {
    if (currentCertificateIndex > 0) {
      setCurrentCertificateIndex(currentCertificateIndex - 1);
    }
  };

  return (
    <section id="events" className="py-20 px-3 sm:px-6 lg:px-8 bg-secondary/30" ref={sectionRef}>
      <div className="container mx-auto px-2 sm:px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Events Attended
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-[94%] sm:w-auto max-w-5xl mx-auto">
          {eventsData.map((event, index) => (
            <Card
              key={index}
              className={`transition-all duration-700 hover:shadow-elegant w-full ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base sm:text-xl mb-2">{event.title}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">{event.description}</CardDescription>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Award className="h-4 w-4 sm:h-6 sm:w-6 text-accent" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs sm:text-sm text-muted-foreground">Event Participation</span>
                  {event.certificateLink && (
                    <button
                      onClick={() => handleCertificateClick(event.title, event)}
                      className="text-[10px] sm:text-xs bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full font-medium hover:bg-primary/20 transition-colors cursor-pointer"
                    >
                      View Certificate
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Certificate Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Certificate - {selectedCertificates?.name}</span>
              {selectedCertificates && selectedCertificates.urls.length > 1 && (
                <span className="text-sm text-muted-foreground">
                  {currentCertificateIndex + 1} of {selectedCertificates.urls.length}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="relative flex items-center justify-center p-4">
            {/* Previous button */}
            {selectedCertificates && selectedCertificates.urls.length > 1 && currentCertificateIndex > 0 && (
              <button
                onClick={prevCertificate}
                className="absolute left-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                aria-label="Previous certificate"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            
            {/* Certificate image */}
            {selectedCertificates && selectedCertificates.urls[currentCertificateIndex] ? (
              <img
                src={selectedCertificates.urls[currentCertificateIndex]}
                alt={`Certificate ${currentCertificateIndex + 1} for ${selectedCertificates.name}`}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
            ) : (
              // Show fallback immediately if no certificate URL is available
              <div className="text-center space-y-4">
                <Award size={64} className="text-primary mx-auto" />
                <h3 className="text-xl font-semibold">Certificate of Participation</h3>
                <p className="text-muted-foreground">For {selectedCertificates?.name}</p>
                <p className="text-sm text-muted-foreground mt-4">
                  Certificate image could not be loaded.
                </p>
              </div>
            )}
            
            {/* Next button */}
            {selectedCertificates && selectedCertificates.urls.length > 1 && currentCertificateIndex < selectedCertificates.urls.length - 1 && (
              <button
                onClick={nextCertificate}
                className="absolute right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                aria-label="Next certificate"
              >
                <ChevronRight size={24} />
              </button>
            )}
            
            {/* Fallback placeholder for onError */}
            <div className="text-center space-y-4 hidden">
              <Award size={64} className="text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Certificate of Participation</h3>
              <p className="text-muted-foreground">For {selectedCertificates?.name}</p>
              <p className="text-sm text-muted-foreground mt-4">
                Certificate image could not be loaded.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
