import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// ------------------------
// Types
// ------------------------
type ProductColor = "red" | "green" | "multicolor";
type ProductDensity = "Thin" | "Thick";

// ------------------------
// SEO & Highlighting Logic
// ------------------------
// We use full phrases here to ensure uniform bolding instead of disjointed words.
// Sorted by length descending later so longer phrases match first.
const seoPhrasesList = [
  "14x56 led dot matrix display",
  "7x80 led dot matrix digital clock",
  "7-segment digital led clock",
  "led dot matrix digital wall clock",
  "led dot matrix digital clock",
  "led dot matrix clock",
  "led dot matrix display",
  "digital calendar clock",
  "jumbo led clock",
  "industrial led clock",
  "digital wall clock",
  "digital clocks",
  "digital clock",
  "led clock",
  "night time readable",
  "night-time readability",
  "night-time readable",
  "1-year guarantee", // <-- Added this to make it bold
  "lithium battery",
  "aluminium powder-coated finish",
  "executive cabins",
  "hospital receptions",
  "large auditoriums",
  "showrooms",
  "auditoriums",
  "factories",
  "warehouses",
  "colleges",
  "hospitals",
  "clinics",
  "mosques",
  "temples",
  "schools",
  "offices",
  "homes",
  "shops",
  "banks",
  "halls",
  "tamil nadu",
  "chennai",
  "india",
];

// Sort by length to prioritize matching longer phrases (e.g., "digital led clock" before "led clock")
const seoPhrases = seoPhrasesList.sort((a, b) => b.length - a.length);

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Dynamically build the regex to split by our exact phrases
const phraseSplitRegex = new RegExp(
  `\\b(${seoPhrases.map(escapeRegExp).join("|")})\\b`,
  "gi"
);

function renderFeatureText(feature: string) {
  return feature.split(phraseSplitRegex).map((part, index) => {
    const cleanPart = part.toLowerCase();

    // If the chunk perfectly matches one of our SEO phrases, bold it nicely
    if (seoPhrases.includes(cleanPart)) {
      return (
        <span
          key={`${index}-${part}`}
          className="font-semibold text-white whitespace-normal break-words"
        >
          {part}
        </span>
      );
    }
    // Otherwise, render normal text
    return (
      <span key={`${index}-${part}`} className="whitespace-normal break-words">
        {part}
      </span>
    );
  });
}

// ------------------------
// ProductItem Type
// ------------------------
type ProductItem = {
  images: string[];
  name: string;
  price: string;
  category: string;
  features?: string[];
  size?: string;
  hasDualColor?: boolean;
  hasTriColor?: boolean;
  greenImages?: string[];
  multiColorImages?: string[];
  densityOptions?: ProductDensity[];
  colorDensityImages?: Partial<
    Record<Exclude<ProductColor, "multicolor">, Record<ProductDensity, string[]>>
  >;
};

// ------------------------
// Products Array
// ------------------------
const collections: ProductItem[] = [
  {
    images: ["/Products/minired.jpeg"],
    name: "Mini LED Digital Clock (Red)", 
    price: "₹ 990/-",
    category: "Digital Wall Clocks",
    features: [
      "Night-time readable, suits up to 250 sq. ft. rooms.",
      "Ideal for homes, offices, and executive cabins.",
      "High-bright 7-segment digital LED clock display.",
      "Durable for 8+ years with a built-in lithium battery for memory backup.",
      "Includes a 5V DC power supply, setting buttons, and an ABS plastic finish.",
      "1-year guarantee.",
    ],
    size: "Size: 14 x 6.5 x 3 cm | Weight: 250g",
  },
  {
    images: ["/Products/minigreen.jpeg"],
    name: "Mini LED Digital Clock (Green)", 
    price: "₹ 990/-",
    category: "Digital Wall Clocks",
    features: [
      "Night-time readable, suits up to 250 sq. ft. rooms.",
      "Ideal for homes, offices, and executive cabins.",
      "High-bright 7-segment digital LED clock display.",
      "Durable for 8+ years with a built-in lithium battery for memory backup.",
      "Includes a 5V DC power supply, setting buttons, and an ABS plastic finish.",
      "1-year guarantee.",
    ],
    size: "Size: 14 x 6.5 x 3 cm | Weight: 250g",
  },
  {
    images: ["/Products/matrixsingle1.jpeg", "/Products/matrixsingle2.jpeg"],
    name: "Dual Font Red Dot Matrix LED Clock", 
    price: "₹ 1,390/-",
    category: "Industrial Clocks",
    features: [
      "Night-time readable, suits up to 400 sq. ft. rooms.",
      "Ideal for banks, shops, homes, and showrooms.",
      "High-bright 7x30 LED dot matrix clock user-selectable dual font.",
      "Durable for 8+ years with a built-in lithium battery for memory backup (5V DC power supply included).",
      "Aluminium powder-coated finish.",
      "1-year guarantee.",
    ],
    size: "Size: 26 x 8 x 4 cm | Weight: 450g",
    densityOptions: ["Thin", "Thick"],
    colorDensityImages: {
      red: { Thin: ["/Products/matrixsingle1.jpeg"], Thick: ["/Products/matrixsingle2.jpeg"] },
    },
  },
  {
    images: ["/Products/matrixdual1.jpeg", "/Products/matrixdual2.jpeg"],
    name: "Dual Colour Dual Font Dot Matrix Clock",
    price: "₹ 1,790/-",
    category: "Executive Clocks",
    features: [
      "Night-time readable, suits up to 400 sq. ft. rooms.",
      "Ideal for banks, shops, homes, and showrooms.",
      "High-bright 7x30 LED dot matrix digital wall clock featuring user-selectable fonts and colors.",
      "Durable for 8+ years with a built-in lithium battery for memory backup (5V DC power supply included).",
      "Aluminium powder-coated finish.",
      "1-year guarantee.",
    ],
    size: "Size: 26 x 8 x 4 cm | Weight: 450g",
    greenImages: ["/Products/matrixdual3.jpeg", "/Products/matrixdual4.jpeg"],
    densityOptions: ["Thin", "Thick"],
    colorDensityImages: {
      red: { Thin: ["/Products/matrixdual1.jpeg"], Thick: ["/Products/matrixdual2.jpeg"] },
      green: { Thin: ["/Products/matrixdual3.jpeg"], Thick: ["/Products/matrixdual4.jpeg"] },
    },
  },
  {
    images: ["/Products/matrixcalendar.jpeg"],
    name: "14X56 LED Dot Matrix Calendar Clock", 
    price: "₹ 2,350/-",
    category: "Calendar Clocks",
    features: [
      "Night-time readable, suits up to 300 sq. ft. rooms.",
      "The ideal digital calendar clock for homes, shops, offices, and executive cabins.",
      "High-bright 14x56 LED dot matrix display shows the time, day, and date clearly at a glance.",
      "8+ years of durability with a built-in lithium battery memory backup (5V DC power supply included).",
      "Aluminium powder-coated finish.",
      "1-year guarantee.",
    ],
    size: "Size: 26 x 8 x 4 cm | Weight: 450g",
  },
  {
    images: [
      "/Products/lcalendar1.jpeg",
      "/Products/lcalendar2.jpeg",
      "/Products/lcalendar3.jpeg",
      "/Products/lcalendar4.jpeg",
      "/Products/lcalendar5.jpeg",
      "/Products/lcalendar6.jpeg",
      "/Products/lcalendar7.jpeg"
    ],
    name: "7X80 LED Dot Matrix Multicolor Calendar Clock", 
    price: "₹ 3,950/-",
    category: "Premium Clocks",
    hasDualColor: true,
    hasTriColor: true,
    features: [
      "Night-time readable, suits up to 2000 sq. ft. rooms.",
      "Ideal for large auditoriums, halls, colleges, and mosques.",
      "High-bright 7x80 LED dot matrix digital clock featuring 6 user-selectable fonts, colors, and modes.",
      "8+ years of durability with a built-in lithium battery memory backup (5V DC power supply included).",
      "Aluminium powder-coated finish.",
      "1-year guarantee.",
    ],
    size: "Size: 64 x 8 x 4 cm | Weight: 1250g",
  },
  {
    images: ["/Products/jumbored.jpeg"],
    name: "Jumbo Industrial LED Clock", 
    price: "₹ 4,950/-",
    category: "Industrial Clocks",
    features: [
      "High-bright 5mm LEDs provide long-distance visibility.",
      "Jumbo LED clock for schools, colleges, factories, warehouses, temples, churches, and mosques (suits 5000+ sq. ft. halls).",
      "Aluminium powder-coated finish designed for wall or ceiling mounting.",
      "8+ years of durability with a built-in lithium battery memory backup (12V DC power supply included).",
      "1-year guarantee.",
    ],
    size: "Size: 73 x 28 x 4 cm | Weight: 2000g",
  },
];

// ----------------------------
// ProductImages Component
// ----------------------------
const ProductImages = ({ images, productName, isWide }: { images: string[]; productName: string; isWide?: boolean }) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images) return;
    images.forEach((img) => {
      const i = new Image();
      i.src = img;
    });
  }, [images]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    
    let interval: NodeJS.Timeout;
    if (images.length > 1) {
      interval = setInterval(() => api.scrollNext(), 3000);
    }
    return () => {
      api.off("select", onSelect);
      clearInterval(interval);
    };
  }, [api, images?.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full max-w-sm md:max-w-md flex flex-col items-center touch-pan-y">
      <Carousel 
        setApi={setApi} 
        opts={{ 
          loop: true, 
          align: "center",
          watchDrag: images.length > 1 
        }} 
        className="w-full touch-pan-y"
      >
        <CarouselContent className="touch-pan-y">
          {images.map((src, i) => (
            <CarouselItem key={i} className="basis-full">
              <div className={`flex justify-center items-center bg-white rounded-xl overflow-hidden ${isWide ? "px-8 py-4" : "p-2"}`}>
                <img 
                  src={src} 
                  alt={`${productName} - View ${i + 1}`} 
                  loading="eager" 
                  className="w-full h-auto max-h-[320px] md:max-h-[340px] object-contain rounded-xl" 
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button key={i} onClick={() => api?.scrollTo(i)} className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === i ? "w-6 bg-amber-400" : "w-2 bg-white/20"}`} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

// ----------------------------
// ProductCard Component
// ----------------------------
const ProductCard = ({ item }: { item: ProductItem }) => {
  const phone = "919445887243";
  const buildWhatsAppUrl = (product: string) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(
      `Hello! I saw your ${product} online. I would like to buy a clock in Chennai. Please provide more details.`
    )}`;

  const currentImages = [
    ...(item.images ?? []),
    ...(item.greenImages ?? []),
    ...(item.multiColorImages ?? []),
  ];
  const isWide = item.name.includes("Jumbo");

  return (
    <motion.div
      id={item.name.toLowerCase().replace(/\s+/g, "-")}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full group flex flex-col md:flex-row md:items-center md:gap-12 max-w-5xl mx-auto glass-effect rounded-2xl p-4 md:p-8 overflow-hidden hover:bg-white/[0.03] transition-colors border border-white/5"
    >
      <div className="relative w-full md:w-1/2 flex-shrink-0 flex justify-center">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 w-full justify-center">
          <ProductImages images={currentImages} productName={item.name} isWide={isWide} />
        </div>
      </div>

      <div className="flex flex-col flex-grow w-full md:w-1/2 p-2 md:p-0 md:pl-4 select-none">
        <h2 className="mb-4 font-body font-semibold text-3xl text-gray-100 text-center md:text-left md:text-4xl drop-shadow-lg group-hover:text-amber-400 transition-colors duration-300">
          {item.name}
        </h2>

        {/* PRICE & SIZE BADGES */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
          {item.price && (
            <div className="inline-block rounded-xl bg-amber-400/10 border border-amber-400/20 px-6 py-2.5 text-xl md:text-2xl font-bold text-amber-400 tracking-wide backdrop-blur-sm shadow-sm">
              {item.price}
            </div>
          )}
          {item.size && (
            <div className="inline-block rounded-lg bg-white/10 border border-white/10 px-4 py-2 text-sm sm:text-base font-medium text-gray-200 tracking-wide backdrop-blur-sm shadow-sm">
              {item.size}
            </div>
          )}
        </div>

        {/* Desktop Features */}
        <ul className="mt-2 list-none space-y-3 text-left text-gray-300 mb-8 hidden md:block">
          {item.features?.map((feature, i) => (
            <li key={i} className="relative pl-5 font-body text-[1.05em] leading-relaxed">
              <span className="absolute left-0 top-1.5 font-bold text-amber-400">•</span>
              {renderFeatureText(feature)}
            </li>
          ))}
        </ul>

        {/* Mobile Features */}
        <ul className="mt-2 space-y-3 text-gray-300 mb-8 block md:hidden">
          {item.features?.map((feature, i) => (
            <li key={i} className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 font-body text-[1em] leading-snug">
              {renderFeatureText(feature)}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex justify-center md:justify-start">
          <a
            href={buildWhatsAppUrl(item.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500/70 hover:bg-green-500/90 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md transition-all duration-300 text-lg hover:scale-[1.02]"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-6 h-6"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// ----------------------------
// Products Page Export
// ----------------------------
export default function FeaturedCollection() {
  return (
    <section id="products" className="scroll-mt-24 px-4 md:px-12 lg:px-24 pt-16 pb-20">
      
      {/* BULLETPROOF SPACING */}
      <div className="flex flex-col gap-16 md:gap-24">
        {collections.map((item, i) => (
          <ProductCard key={i} item={item} />
        ))}
      </div>

    </section>
  );
}