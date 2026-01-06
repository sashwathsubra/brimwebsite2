import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mini from "@/assets/slideminigreen-694d12aeada25.webp";
import dotMatrixRed from "@/assets/slidedotmatrixred-694d1258ad727.webp";
import calendarRed from "@/assets/slidecalendarred-694d1256bfe67.webp";

const slides = [
  { alt: "Mini LED Clock (Green)", src: mini },
  { alt: "Dot Matrix Clock (Red)", src: dotMatrixRed },
  { alt: "Calendar Clock (Red)", src: calendarRed },
];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide with cleanup
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentSlide]);

  return (
    <section className="relative min-h-[75svh] md:min-h-[100svh] w-full overflow-hidden bg-background pt-16 md:pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-muted/20 via-background to-background" />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentSlide}
            src={slides[currentSlide].src}
            alt={slides[currentSlide].alt}
            className="h-full w-full object-contain md:object-cover drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            loading="lazy"
            decoding="async"
          />
        </AnimatePresence>
      </div>

      {/* Explore Collection Button */}
      <div className="pointer-events-none absolute bottom-6 inset-x-0 z-30 sm:bottom-12 flex justify-center">
        <a
          href="#products"
          className="pointer-events-auto group relative inline-block overflow-hidden border border-primary bg-transparent px-8 py-3.5 font-body text-sm font-medium tracking-[0.18em] text-primary transition-all duration-300 ease-out hover:text-primary-foreground sm:px-10"
        >
          <span className="relative z-10">Explore Collection</span>
          <div className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-300 ease-out group-hover:translate-x-0" />
        </a>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 right-4 z-30 hidden gap-2 sm:bottom-12 sm:right-12 sm:flex sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-0.5 transition-all duration-300 ${
              index === currentSlide ? "w-10 bg-primary" : "w-6 bg-muted-foreground/50 hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlideshow;
