import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import mini from "@/assets/slideminigreen-694d12aeada25.webp";
import dotMatrixRed from "@/assets/slidedotmatrixred-694d1258ad727.webp";
import calendarRed from "@/assets/slidecalendarred-694d1256bfe67.webp";
import multiCalendarGreen from "@/assets/slidemutlicalendargreen-694d12b087e67.webp";
import multicolorCalendar from "@/assets/slidemulticolorcalendar-694d12aedd48f.webp";

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
  {
    alt: "Multi Calendar Clock (Green) — Brim Clocks",
    src: multiCalendarGreen,
  },
  {
    alt: "Multicolor Calendar Clock — Brim Clocks",
    src: multicolorCalendar,
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
    <section className="relative min-h-[75svh] md:min-h-[100svh] w-full overflow-hidden bg-background pt-16 md:pt-24">
      {/* Background glow for better visibility of dark clocks */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-muted/20 via-background to-background" />

      {/* Main Image Container with fixed aspect ratio - Constrained vertically to avoid overlap */}
      <div className="absolute inset-x-0 top-24 bottom-28 md:top-20 md:bottom-24 flex items-center justify-center z-10">
        <div className="relative w-[80%] h-full flex items-center justify-center">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 mx-auto w-full h-full max-h-[60svh] md:max-h-none flex items-center justify-center transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              animate={index === currentSlide ? { y: [0, -15, 0] } : {}}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                fetchPriority={index === 0 ? "high" : undefined}
                className={`h-full w-full object-contain md:object-cover ${"desktopObjectPositionClass" in slide ? slide.desktopObjectPositionClass : ""} drop-shadow-2xl`}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            </motion.div>
          ))}
        </div>
      </div>



      {/* Bottom-center Explore button overlay */}
      <div className="pointer-events-none absolute bottom-6 inset-x-0 z-30 sm:bottom-12 flex justify-center">
        <a
          href="#products"
          className="pointer-events-auto group relative inline-block overflow-hidden border border-primary bg-transparent px-8 py-3.5 font-body text-sm font-medium tracking-[0.18em] text-primary transition-all duration-300 ease-out hover:text-primary-foreground sm:px-10"
        >
          <span className="relative z-10">Explore Collection</span>
          <div className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-300 ease-out group-hover:translate-x-0" />
        </a>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 right-4 z-30 hidden gap-2 sm:bottom-12 sm:right-12 sm:flex sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-0.5 transition-all duration-300 ${index === currentSlide
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
