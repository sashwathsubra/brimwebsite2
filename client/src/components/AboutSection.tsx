import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";

const StatCounter = ({ value, label, showPlus = true }: { value: string; label: string; showPlus?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2500 });
  const [displayValue, setDisplayValue] = useState(0);

  // Extract number part
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, numericValue, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <div ref={ref} className="border-l border-border pl-4 py-3 sm:pl-6 sm:py-4">
      <p className="mb-2 font-body text-3xl text-primary sm:text-4xl md:text-5xl tabular-nums">
        {displayValue}{suffix}{showPlus ? <span className="text-primary/50 text-2xl align-top">+</span> : null}
      </p>
      <p className="font-body text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">
        {label}
      </p>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="relative bg-secondary px-4 py-20 sm:px-6 sm:py-24 md:py-32 scroll-mt-20 md:scroll-mt-24 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* SEO TAG 1: Descriptive Subheading */}
            <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-primary">
              Premium Clock Manufacturer
            </p>
            
            <h2 className="mb-8 font-body text-3xl text-foreground sm:text-4xl md:text-5xl">
              <span style={{ fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 700 }}>BRIM</span>
              <br />
              {/* SEO TAG 2: Specific Keyword in Title */}
              <span className="text-primary">LED Clocks Chennai</span>
            </h2>

            {/* SEO TAG 3: "Manufacturer in Chennai" + "Digital Clocks" injected here */}
            <p className="mb-6 font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
              <span style={{ fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 700 }}>BRIM</span> is a leading 
              <strong className="font-medium text-foreground"> manufacturer of digital and LED clocks in Chennai</strong>. 
              We engineer professional-grade timekeeping solutions designed for longevity and precision. 
              Trusted by financial institutions, corporate offices, and factories across <strong className="font-medium text-foreground">Tamil Nadu</strong>.
            </p>

            <p className="mb-10 font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
              Our clocks feature a refined, high-gloss finish and integrated battery backup systems, ensuring seamless reliability. 
              Whether you need <strong className="font-medium text-foreground">industrial digital clocks</strong> or elegant office displays, 
              <span style={{ fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 700 }}> BRIM</span> combines functional excellence with sophisticated design.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 gap-6 sm:gap-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {[
              { number: "35", label: "Years of Experience" },
              { number: "100", label: "Clients in Chennai" }, // SEO Tweak
              { number: "7", label: "Years of Lifespan" },
              { number: "100%", label: "Made in India", showPlus: false },
            ].map((stat, index) => (
              <StatCounter key={index} value={stat.number} label={stat.label} showPlus={"showPlus" in stat ? stat.showPlus : undefined} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;