import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import mini from "@/assets/slideminigreen-694d12aeada25.webp";
import dotMatrixRed from "@/assets/slidedotmatrixred-694d1258ad727.webp";
import calendarRed from "@/assets/slidecalendarred-694d1256bfe67.webp";

const slides = [
  {
    alt: "Mini LED Clock (Green) - Digital Clock Chennai",
    src: mini,
    width: 577,
    height: 325,
  },
  {
    alt: "Dot Matrix Clock (Red) - LED Clock Manufacturer Chennai",
    src: dotMatrixRed,
  },
  {
    alt: "Calendar Clock (Red) - Brim Clocks",
    src: calendarRed,
  },
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
    <section className="relative min-h-[60svh] md:min-h-[90svh] w-full overflow-hidden bg-background pt-0 md:pt-0">
      
      {/* --- SEO HEADER (NEW) --- */}
      {/* This text is visible to users and Google, forcing the "Chennai" ranking */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-24 md:pt-32 text-center px-4 pointer-events-none">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground drop-shadow-sm mb-3">
          Digital Clock Manufacturer <br className="md:hidden" />
          <span className="text-primary">Chennai</span>
        </h1>
        <p className="text-lg md:text-2xl text-muted-foreground bg-background/60 backdrop-blur-sm px-6 py-2 rounded-full">
          Premium LED Matrix & Wall Clocks
        </p>
      </div>
      {/* ------------------------- */}

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-muted/20 via-background to-background z-10 pointer-events-none" />

      {/* Slides container */}
      <div className="absolute inset-x-0 top-0 bottom-0 flex items-center justify-center z-0 px-4 sm:px-8 md:px-16 lg:px-24 pt-20">
        <div className="relative w-[100%] h-full flex items-center justify-center">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 mx-auto w-full h-full flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt} // Updated alt tags for SEO
                width={slide.width}
                height={slide.height}
                className={`h-full w-full object-contain md:object-contain drop-shadow-2xl`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 right-4 z-30 hidden gap-2 sm:bottom-12 sm:right-12 sm:flex sm:gap-3">
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