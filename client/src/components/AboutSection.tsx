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
  const clients = [
    "State Bank of India",
    "Canara Bank",
    "Indian Bank",
    "Bank of Baroda",
    "LIC",
    "Indian Railways",
    "Postal Department",
    "Air India",
    "Defence Establishments",
    "Apollo Hospitals",
    "Ashok Leyland",
    "All India Radio",
    "Airports Authority of India",
  ];

  return (
    <section id="about" className="relative bg-secondary px-4 py-20 sm:px-6 sm:py-24 md:py-32 scroll-mt-20 md:scroll-mt-24 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          
          {/* Left Side: Brand Story (Natural & SEO Optimized) */}
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

            {/* Naturally Woven Keywords + New Content */}
            <p className="mb-6 font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
              <span style={{ fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 700 }}>BRIM</span> has been manufacturing <strong className="font-medium text-foreground">LED digital wall clocks</strong> since 1989. We supply reliable time display solutions for banks, factories, hospitals, offices, and public institutions.
            </p>

            <p className="mb-6 font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
              Our clocks are designed for clear visibility, long life, and consistent performance. Each unit is built with durable components and includes a battery backup of up to 8 years. Customers can <strong className="font-medium text-foreground">buy clocks locally in Chennai</strong> or order a <strong className="font-medium text-foreground">digital clock online</strong> through our website.
            </p>

            <p className="mb-10 font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
              With more than three decades of experience, we continue to focus on building dependable digital clocks for professional and domestic environments.
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
              { number: "8", label: "Years Battery Backup", showPlus: false }, // Updated to match your text!
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

        {/* Bottom Section: Trusted Clients */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mt-16 md:mt-24 pt-10 border-t border-border"
        >
          <h3 className="text-sm md:text-base font-body uppercase tracking-widest text-primary mb-6 text-center md:text-left">
            Trusted by Respected Organizations
          </h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {clients.map((client, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium text-foreground hover:bg-muted hover:border-primary/50 transition-colors cursor-default select-none shadow-sm"
              >
                {client}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;