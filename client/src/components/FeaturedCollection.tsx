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

// SEO: Highlighting keywords naturally for Google & Users
const placeWordList = [
  "home", "office", "executive", "cabin", "mosque", "temple", "church", "hospital",
  "clinic", "school", "college", "showroom", "shop", "restaurant", "hotel",
  "factory", "warehouse", "hall", "halls", "reception", "auditorium",
  "chennai", "india", "tamil nadu", "banks", "industrial", "digital",
  "online", "buy", "wall", "clock"
] as const;

const placeWordSet = new Set<string>(placeWordList.map(w => w.toLowerCase()));
const placeWordSplitRegex = new RegExp(`\\b(${placeWordList.join("|")})\\b`, "gi");

function renderFeatureText(feature: string) {
  if (feature.toLowerCase().startsWith("suitable for") || feature.toLowerCase().startsWith("ideal for")) {
    return (
      <span className="font-semibold text-teal-400 whitespace-normal break-words">
        {feature}
      </span>
    );
  }
  return feature.split(placeWordSplitRegex).map((part, index) => {
    const cleanPart = part.replace(/[,.:;!?]/g, "").toLowerCase();
    if (placeWordSet.has(cleanPart)) {
      return (
        <span
          key={`${index}-${part}`}
          className="font-semibold text-teal-400 whitespace-normal break-words"
        >
          {part.charAt(0).toUpperCase() + part.slice(1)}
        </span>
      );
    }
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
// Products Array (UPDATED WITH NEW SPECS & SEO INTACT)
// ------------------------
const collections: ProductItem[] = [
  {
    images: ["/Products/minired.jpeg"],
    name: "Mini LED Digital Clock (Red)", 
    price: "Rs. 990/-",
    category: "Digital Wall Clocks",
    features: [
      "Ideal for homes, offices, and executive cabins (Suits up to 250 sq. ft. rooms).",
      "High Brightness: Features a 7-segment digital LED clock display that is readable at night.",
      "Maintenance Free: 8+ years durable lifespan with built-in lithium battery memory backup.",
      "Complete Kit: Includes a 5V DC power supply, built-in setting buttons, and ABS plastic finish for wall or table-top use.",
      "Warranty: 1-year guarantee. Order your digital clock online today!",
    ],
    size: "Size: 14 x 6.5 x 3 cm | Weight: 250g",
  },
  {
    images: ["/Products/minigreen.jpeg"],
    name: "Mini LED Digital Clock (Green)", 
    price: "Rs. 990/-",
    category: "Digital Wall Clocks",
    features: [
      "Perfect for shops and clinics (Suits up to 250 sq. ft. rooms).",
      "High Brightness: Features a 7-segment digital LED clock display that is readable at night.",
      "Maintenance Free: 8+ years durable lifespan with built-in lithium battery memory backup.",
      "Complete Kit: Includes a 5V DC power supply, built-in setting buttons, and ABS plastic finish for wall or table-top use.",
      "Warranty: 1-year guarantee. Buy the top-rated LED clock in Chennai.",
    ],
    size: "Size: 14 x 6.5 x 3 cm | Weight: 250g",
  },
  {
    images: ["/Products/matrixsingle1.jpeg", "/Products/matrixsingle2.jpeg"],
    name: "Red Dot Matrix LED Clock", 
    price: "Rs. 1,390/-",
    category: "Industrial Clocks",
    features: [
      "Perfect for banks and showrooms (Suits up to 400 sq. ft. rooms).",
      "Customizable Display: High-bright 7x30 LED Dot Matrix clock with dual font options and night-time readability.",
      "Industrial Grade Build: Aluminium powder-coated finish for secure wall or table-top mounting.",
      "Power Safe: 8+ years lifespan with built-in lithium battery memory backup and 5V DC input.",
      "Warranty: 1-year guarantee. Buy locally direct from the manufacturer in Chennai.",
    ],
    size: "Size: 26 x 8 x 4 cm | Weight: 450g",
    densityOptions: ["Thin", "Thick"],
    colorDensityImages: {
      red: { Thin: ["/Products/matrixsingle1.jpeg"], Thick: ["/Products/matrixsingle2.jpeg"] },
    },
  },
  {
    images: ["/Products/matrixdual1.jpeg", "/Products/matrixdual2.jpeg"],
    name: "Dual Colour Dot Matrix Clock",
    price: "Rs. 1,790/-",
    category: "Executive Clocks",
    features: [
      "Ideal for hospital receptions and executive cabins (Suits up to 400 sq. ft. rooms).",
      "Smart Dual-Colour Design: High-bright 7x30 LED Dot Matrix digital wall clock where users can select fonts and colors.",
      "Premium Durability: Aluminium powder-coat finish, built for 8+ years of maintenance-free operation.",
      "Reliable: Built-in lithium battery memory backup protects time data during power cuts (5V DC included).",
      "Support: 1-year guarantee. Dedicated service for digital clocks across Tamil Nadu.",
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
    name: "Digital Calendar LED Clock", 
    price: "Rs. 2,350/-",
    category: "Calendar Clocks",
    features: [
      "Reception Ready: The ideal digital calendar clock for hotels and schools (Suits up to 300 sq. ft. rooms).",
      "Complete Display: High-bright 14x56 LED Dot Matrix shows Time, Day, and Date clearly at a glance.",
      "Robust Construction: Features a premium aluminium powder-coat finish for easy wall or table-top mounting.",
      "Long-Lasting: Enjoy 8+ years of durable, maintenance-free use with a built-in lithium battery backup.",
      "Warranty: 1-year guarantee. Order your digital clocks online with a 5V power supply included.",
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
    name: "Multicolor Digital Calendar Clock", 
    price: "Rs. 3,950/-",
    category: "Premium Clocks",
    hasDualColor: true,
    hasTriColor: true,
    features: [
      "Luxury Choice: Ideal for large auditoriums, halls, colleges, and mosques (Suits up to 2000 sq. ft. rooms).",
      "Advanced Customization: High-bright 7x80 LED Dot Matrix digital clock with 6 options for user-selectable fonts, colors, and modes.",
      "Corporate Quality: Aluminium powder-coat finish provides a premium look for gifting and professional use.",
      "Reliable Backup: Built-in lithium battery protects memory for 8+ years of maintenance-free operation.",
      "Complete Package: Includes 5V DC power supply and a 1-year guarantee. Buy the best digital clocks in Chennai.",
    ],
    size: "Size: 64 x 8 x 4 cm | Weight: 1250g",
  },
  {
    images: ["/Products/jumbored.jpeg"],
    name: "Jumbo Industrial LED Clock", 
    price: "Rs. 4,950/-",
    category: "Industrial Clocks",
    features: [
      "Heavy Duty: The ultimate industrial LED clock for factories, warehouses, and temples (Suits 5000+ sq. ft. halls).",
      "Maximum Visibility: Features ultra-bright 5mm 7-segment LEDs, perfectly readable day or night from long distances.",
      "Rugged Build: Heavy aluminium powder-coat finish designed for wall or ceiling mounting in tough environments.",
      "Industrial Power: Runs on 12V DC (supply included) with a built-in lithium battery for continuous memory backup.",
      "Trusted Warranty: 1-year guarantee with 8+ years of maintenance-free durability. Trusted across industrial India.",
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

        {/* NEWLY ADDED: Price & Size Badges Side-by-Side */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
          {item.price && (
            <div className="inline-block rounded-lg bg-amber-400/10 border border-amber-400/20 px-4 py-2 text-sm sm:text-base font-bold text-amber-400 tracking-wide backdrop-blur-sm shadow-sm">
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
            Buy on WhatsApp
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