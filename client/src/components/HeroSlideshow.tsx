import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const slides = [
  { alt: "Mini LED Clock (Green)", src: "/assets/slideminigreen.webp", width: 577, height: 325 },
  { alt: "Dot Matrix Clock (Red)", src: "/assets/slidedotmatrixred.webp" },
  { alt: "Calendar LED Clock (Red)", src: "/assets/slidecalendarred.webp" },
];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[60vh] md:min-h-[90vh] w-full overflow-hidden bg-background">

      {/* Top label */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span className="text-sm md:text-base font-medium text-muted-foreground bg-background/70 backdrop-blur px-4 py-1.5 rounded-full">
          Premium LED Clocks
        </span>
      </div>

      {/* Slides */}
      <div className="absolute inset-0 flex items-center justify-center z-0 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="relative w-full h-full flex items-center justify-center">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 mx-auto w-full h-full flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                className="h-full w-full object-contain drop-shadow-2xl"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 right-4 z-30 hidden gap-2 sm:flex sm:bottom-12 sm:right-12">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-0.5 transition-all duration-300 ${
              index === currentSlide
                ? "w-10 bg-primary"
                : "w-6 bg-muted-foreground/50 hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default HeroSlideshow;
