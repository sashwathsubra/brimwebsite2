"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Images
import mini from "@/assets/slideminigreen-694d12aeada25.webp";
import dotMatrixRed from "@/assets/slidedotmatrixred-694d1258ad727.webp";
import calendarRed from "@/assets/slidecalendarred-694d1256bfe67.webp";

// Type definition to prevent Build Errors
type Slide = {
  id: number;
  alt: string;
  src: string;
};

const slides: Slide[] = [
  {
    id: 1,
    alt: "Mini LED Clock (Green) - Digital Clock Chennai",
    src: mini,
  },
  {
    id: 2,
    alt: "Dot Matrix Clock (Red) - LED Clock Manufacturer Chennai",
    src: dotMatrixRed,
  },
  {
    id: 3,
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
    // Flex-col ensures the Black Bar sits ON TOP of the Slideshow, not over it
    <section className="flex flex-col w-full min-h-[50svh] md:min-h-[85svh] bg-background">
      
      {/* --- 1. THE SOLID BLACK BAR --- */}
      <div className="w-full bg-black py-4 z-20 shadow-md flex justify-center items-center shrink-0">
        <h2 className="text-sm md:text-lg font-medium tracking-widest text-white uppercase">
          Premium LED Clocks
        </h2>
      </div>

      {/* --- 2. SLIDESHOW CONTAINER (Sits below the bar) --- */}
      <div className="relative flex-1 w-full overflow-hidden bg-white/5">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className={`absolute inset-0 mx-auto w-full h-full flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full object-contain drop-shadow-2xl p-4" // Added p-4 so image doesn't touch edges
                loading={index === 0 ? "eager" : "lazy"}
              />
            </motion.div>
          ))}
        </div>

        {/* Slide indicators (Inside the slideshow area) */}
        <div className="absolute bottom-6 right-0 left-0 flex justify-center gap-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default HeroSlideshow;