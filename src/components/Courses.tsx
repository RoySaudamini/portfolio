import { BookOpen, Clock, Award, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import coursesData from "@/data/courses.json";
import { useIsMobile } from "@/hooks/use-mobile";

// Import certificate images
// This is a dynamic import approach that works with Vite
const certificateImages = import.meta.glob('../images/courses/*.jpg');

export const Courses = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCertificates, setSelectedCertificates] = useState<{name: string, urls: string[]} | null>(null);
  const [currentCertificateIndex, setCurrentCertificateIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // For mobile devices, we'll show only the first 6 courses initially
  // On desktop, show all courses
  const visibleCoursesCount = !isMobile || showAllCourses ? coursesData.length : 6;
  const visibleCourses = coursesData.slice(0, visibleCoursesCount);

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

  // Helper function to extract all certificate URLs from a course object
  const getCertificateUrls = (course: Record<string, unknown>): string[] => {
    const urls: string[] = [];
    let counter = 1;
    
    // Check certificateUrl first
    if (course.certificateUrl && typeof course.certificateUrl === 'string') {
      // Convert JSON path to a public path that works with import.meta.glob
      // The path in JSON is like "/src/images/courses/file.jpg"
      // We need to transform it to "../images/courses/file.jpg" for the import.meta.glob pattern
      const urlPath = (course.certificateUrl as string).replace('/src/', '../');
      urls.push(urlPath);
    }
    
    // Check certificateUrl2, certificateUrl3, etc.
    while (course[`certificateUrl${counter + 1}`] && typeof course[`certificateUrl${counter + 1}`] === 'string') {
      const urlPath = (course[`certificateUrl${counter + 1}`] as string).replace('/src/', '../');
      urls.push(urlPath);
      counter++;
    }
    
    return urls;
  };

  const handleCertificateClick = async (courseTitle: string, course: Record<string, unknown>) => {
    const urlPaths = getCertificateUrls(course);
    
    // We need to get the actual URLs that Vite will recognize
    // For this, we're using the import.meta.glob to find the matching module for each path
    const urls: string[] = [];
    
    for (const path of urlPaths) {
      // Find the matching import from our glob imports
      const importPath = Object.keys(certificateImages).find(
        imgPath => imgPath.endsWith(path.replace('../', ''))
      );
      
      if (importPath) {
        try {
          // Dynamically import the image
          const module = await (certificateImages[importPath] as () => Promise<{ default: string }>)();
          urls.push(module.default);
        } catch (error) {
          console.error(`Failed to load image: ${path}`, error);
        }
      } else {
        console.warn(`No matching import found for: ${path}`);
      }
    }
    
    setSelectedCertificates({name: courseTitle, urls});
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
    <section id="courses" className="py-20 px-3 sm:px-6 lg:px-8" ref={sectionRef}>
      <div className="container mx-auto px-2 sm:px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Courses
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="w-[94%] sm:w-auto max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-accent" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">Online Learning</h3>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
            {visibleCourses.map((course, index) => (
              <div 
                key={index} 
                className={`p-4 sm:p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-700 w-full ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <h4 className="text-base sm:text-lg font-semibold text-foreground">
                    {course.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                  {course.instructor}
                </p>
                <div className="flex items-center justify-center">
                  {course.certificate ? (
                    <button
                      onClick={() => handleCertificateClick(course.title, course)}
                      className="text-[10px] sm:text-xs bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full font-medium hover:bg-primary/20 transition-colors cursor-pointer"
                    >
                      View Certificate
                    </button>
                  ) : (
                    <div className="flex items-center space-x-1 text-[10px] sm:text-xs text-accent bg-accent/10 px-2 py-0.5 sm:py-1 rounded">
                      <Clock className="h-2.5 sm:h-3 w-2.5 sm:w-3" />
                      <span>In Progress</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* View More/Less Button - Only visible on mobile and when there are more than 6 courses */}
          {isMobile && coursesData.length > 6 && (
            <div className="mt-8 mb-4 text-center">
              <button
                onClick={() => setShowAllCourses(!showAllCourses)}
                className="px-5 sm:px-6 py-2 sm:py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-xs sm:text-sm font-medium transition-colors flex items-center justify-center mx-auto space-x-1.5 sm:space-x-2"
                aria-label={showAllCourses ? "View less courses" : "View more courses"}
              >
                <span>{showAllCourses ? "View Less" : "View More"}</span>
                {showAllCourses ? <ChevronUp size={14} className="sm:w-4 sm:h-4" /> : <ChevronDown size={14} className="sm:w-4 sm:h-4" />}
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-lg sm:text-xl text-foreground/80 italic">That's all about me !!</p>
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
              <div className="text-center space-y-4">
                <Award size={64} className="text-primary mx-auto" />
                <h3 className="text-xl font-semibold">Certificate Not Available</h3>
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
            
            {/* Fallback placeholder */}
            <div className="text-center space-y-4 hidden">
              <Award size={64} className="text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Certificate of Completion</h3>
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
