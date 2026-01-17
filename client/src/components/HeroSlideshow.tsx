"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Images
import mini from "@/assets/slideminigreen-694d12aeada25.webp";
import dotMatrixRed from "@/assets/slidedotmatrixred-694d1258ad727.webp";
import calendarRed from "@/assets/slidecalendarred-694d1256bfe67.webp";

// Define the slide structure to prevent TypeScript errors
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
    <section className="relative min-h-[50svh] md:min-h-[85svh] w-full overflow-hidden bg-background pt-8 md:pt-0">
      
      {/* --- HEADER (Non-Intrusive) --- */}
      <div className="absolute top-6 left-0 right-0 z-20 flex justify-center pointer-events-none px-4">
        <div className="bg-background/80 backdrop-blur-md px-6 py-2 rounded-full border border-border/50 shadow-sm">
          <h2 className="text-sm md:text-lg font-medium tracking-widest text-foreground uppercase">
            Premium LED Clocks
          </h2>
        </div>
      </div>
      {/* ----------------------------- */}

      {/* Slides container */}
      <div className="absolute inset-x-0 top-0 bottom-0 flex items-center justify-center z-0 px-4 sm:px-8 md:px-16 lg:px-24 pt-12 md:pt-0">
        <div className="relative w-[100%] h-full flex items-center justify-center">
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
                className="h-full w-full object-contain md:object-contain drop-shadow-2xl"
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
                : "w-6 bg-muted-foreground/30 hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlideshow;