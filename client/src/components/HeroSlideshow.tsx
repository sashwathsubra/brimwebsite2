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
    <section className="relative min-h-[55svh] md:min-h-[100svh] w-full overflow-hidden bg-background pt-0 md:pt-24">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-muted/20 via-background to-background z-0" />

      {/* Slides container */}
      <div className="absolute inset-x-0 top-0 bottom-0 md:top-20 md:bottom-24 flex items-center justify-center z-10 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="relative w-[100%] h-full flex items-center justify-center opacity-40 md:opacity-60">
          {/* Lowered opacity on the slideshow container so the text pops out easily */}
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

      {/* Text Overlay (Easy on the eyes) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:mt-12 pointer-events-none">
        <div className="relative z-10 max-w-4xl mx-auto pointer-events-auto">
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-body text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6 drop-shadow-md"
          >
            Buy <span className="text-primary drop-shadow-lg">LED Digital Clocks</span> in Chennai
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="font-body text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-medium bg-background/50 md:bg-transparent p-4 md:p-0 rounded-2xl backdrop-blur-sm md:backdrop-blur-none"
          >
            High-visibility LED digital wall clocks designed for banks, factories, hospitals, offices, and public institutions. Built for clear display, reliable performance, and long service life.
            <br className="hidden sm:block" />
            <span className="block mt-4 text-foreground font-semibold">
              Available for purchase in Chennai or through our website.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#products"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
            >
              View Our Clocks
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-secondary/90 backdrop-blur-md text-foreground border border-border rounded-full font-semibold text-lg hover:bg-muted hover:border-primary/50 transition-all shadow-lg w-full sm:w-auto"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 right-4 z-30 hidden gap-2 sm:bottom-12 sm:right-12 sm:flex sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
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