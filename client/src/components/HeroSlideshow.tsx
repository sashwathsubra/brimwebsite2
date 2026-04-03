import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import mini from "@/assets/slideminigreen-694d12aeada25.webp";
import dotMatrixRed from "@/assets/slidedotmatrixred-694d1258ad727.webp";
import calendarRed from "@/assets/slidecalendarred-694d1256bfe67.webp";

const slides = [
  {
    alt: "Mini LED Clock (Green) — Brim Clocks",
    src: mini,
    width: 577,
    height: 325,
  },
  {
    alt: "Dot Matrix Clock (Red) — Brim Clocks",
    src: dotMatrixRed,
  },
  {
    alt: "Calendar Clock (Red) — Brim Clocks",
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
    {/* UPDATED: Changed min-h-[55svh] to min-h-[30svh] sm:min-h-[40svh] for mobile spacing */}
    <section className="relative min-h-[30svh] sm:min-h-[40svh] md:min-h-[100svh] w-full overflow-hidden bg-background pt-0 md:pt-24">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-muted/20 via-background to-background" />

      {/* Slides container with responsive side padding */}
      <div className="absolute inset-x-0 top-0 bottom-0 md:top-20 md:bottom-24 flex items-center justify-center z-10 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="relative w-[100%] h-full flex items-center justify-center">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 mx-auto w-full h-full max-h-[50svh] md:max-h-none flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                className={`h-full w-full object-contain md:object-cover drop-shadow-2xl`}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "auto"}
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