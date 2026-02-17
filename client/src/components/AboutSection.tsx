import { motion } from "framer-motion";

/**
 * StatCounter Component
 * Static for immediate SEO visibility of trust signals.
 */
const StatCounter = ({ value, label, showPlus = true }: { value: string; label: string; showPlus?: boolean }) => {
  return (
    <div className="border-l border-border pl-4 py-3 sm:pl-6 sm:py-4">
      <p className="mb-2 font-body text-3xl text-primary sm:text-4xl md:text-5xl tabular-nums">
        {value}{showPlus ? <span className="text-primary/50 text-2xl align-top">+</span> : null}
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
          
          {/* Left Side: Brand Story (SEO Optimized) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-primary">
              Premium Clock Manufacturer
            </p>
            
            <h2 className="mb-8 font-body text-3xl text-foreground sm:text-4xl md:text-5xl">
              <span style={{ fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 700 }}>BRIM</span>
              <br />
              <span className="text-primary">LED Clocks Chennai</span>
            </h2>

            {/* Keyword Injection: "LED digital clock wall", "Buy clock Chennai", "Digital clock online" */}
            <p className="mb-6 font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
              <span style={{ fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 700 }}>BRIM</span> is a leading manufacturer of <strong className="font-medium text-foreground">LED digital clock wall</strong> displays. 
              We engineer professional-grade solutions designed for longevity. Whether you are looking to <strong className="font-medium text-foreground">buy clock Chennai</strong> verified quality or order a <strong className="font-medium text-foreground">digital clock online</strong>, we represent the gold standard in timekeeping.
            </p>

            {/* Keyword Injection: "LED clock digital" */}
            <p className="mb-10 font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
              Trusted by financial institutions and factories across <strong className="font-medium text-foreground">Tamil Nadu</strong>, our <strong className="font-medium text-foreground">LED clock digital</strong> systems feature refined high-gloss finishes and 7-year battery backups. 
              <span style={{ fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 700 }}> BRIM</span> combines industrial durability with sophisticated executive design.
            </p>
          </motion.div>

          {/* Right Side: Trust Stats */}
          <motion.div 
            className="grid grid-cols-2 gap-6 sm:gap-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {[
              { number: "35", label: "Years of Experience" },
              { number: "1000", label: "Clients in Chennai" },
              { number: "7", label: "Years of Lifespan" },
              { number: "100%", label: "Made in India", showPlus: false },
            ].map((stat, index) => (
              <StatCounter 
                key={index} 
                value={stat.number} 
                label={stat.label} 
                showPlus={stat.showPlus !== undefined ? stat.showPlus : true} 
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;