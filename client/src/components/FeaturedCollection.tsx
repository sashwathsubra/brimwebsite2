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
// Products Array
// ------------------------
const collections: ProductItem[] = [
  {
    images: ["/Products/minired.jpeg"],
    name: "Mini LED Digital Clock (Red)", 
    price: "",
    category: "Digital Wall Clocks",
    features: [
      "Order your digital clock online: Perfect for homes and executive cabins.",
      "High Visibility: Features a bright 1-inch digital LED clock display.",
      "Reliable: Comes with a built-in 7-year battery backup.",
      "Complete Kit: Includes a 5V adapter and wall mount support.",
    ],
    size: "Size: 14 cm x 6.5 cm",
  },
  {
    images: ["/Products/minigreen.jpeg"],
    name: "Mini LED Digital Clock (Green)", 
    price: "",
    category: "Digital Wall Clocks",
    features: [
      "Top-rated LED clock in Chennai: Ideal for offices and shops.",
      "Durable: Designed with a glassy ABS finish and a 1-inch LED display.",
      "Power Safe: Memory backup protects the time during power cuts.",
      "Easy Install: Ready for table-top use or wall mounting.",
    ],
    size: "Size: 14 cm x 6.5 cm",
  },
  {
    images: ["/Products/matrixsingle1.jpeg", "/Products/matrixsingle2.jpeg"],
    name: "Red Dot Matrix LED Clock", 
    price: "",
    category: "Industrial Clocks",
    features: [
      "Best Seller: The preferred digital clock in Chennai for banks.",
      "Industrial Grade: Uses a 7x30 Dot Matrix LED for clear reading.",
      "Long Life: Includes a 7+ year battery backup and customizable fonts.",
      "Buy locally: Order direct from the manufacturer in Chennai with a warranty.",
    ],
    size: "Size: 26 cm x 8 cm",
    densityOptions: ["Thin", "Thick"],
    colorDensityImages: {
      red: { Thin: ["/Products/matrixsingle1.jpeg"], Thick: ["/Products/matrixsingle2.jpeg"] },
    },
  },
  {
    images: ["/Products/matrixdual1.jpeg", "/Products/matrixdual2.jpeg"],
    name: "Dual Colour Dot Matrix Clock",
    price: "",
    category: "Executive Clocks",
    features: [
      "Premium LED digital wall clock display (Available in Red and Green).",
      "Smart Design: Easily customizable fonts for showrooms and cabins.",
      "Reliable: Heavy-duty build paired with a 7-year memory backup.",
      "Local Support: Dedicated service available across Tamil Nadu.",
    ],
    size: "Size: 26 cm x 8 cm",
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
    price: "",
    category: "Calendar Clocks",
    features: [
      "Complete Display: Shows the Time, Day, and Date clearly at a glance.",
      "Reception Ready: The ideal digital clock to order online for hospitals and hotels.",
      "High Tech: Utilizes a 14x56 Dot Matrix display for high accuracy.",
      "Durable: A 7-year battery backup is included as standard.",
    ],
    size: "Size: 26 cm x 8 cm",
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
    price: "",
    category: "Premium Clocks",
    hasDualColor: true,
    hasTriColor: true,
    features: [
      "Luxury Choice: A vibrant, multicolor digital LED clock display.",
      "Big Screen: The 14x56 Matrix is perfect for large halls and lobbies.",
      "Corporate Choice: Buy clocks in Chennai with the best quality finish for gifting.",
      "Features: Wall mountable design with a 5V power supply included.",
    ],
    size: "Size: 65 cm x 8 cm",
  },
  {
    images: ["/Products/jumbored.jpeg"],
    name: "Jumbo Industrial LED Clock", 
    price: "",
    category: "Industrial Clocks",
    features: [
      "Heavy Duty: The best industrial LED digital wall clock unit available.",
      "Long Distance: Highly visible from over 100 feet away (Great for factories and temples).",
      "Rugged: Built for high-heat and dusty environments with a 12V power supply.",
      "Reliable: 7-year backup. Trusted by major industries across Chennai.",
    ],
    size: "Size: 90 cm x 30 cm",
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
      // Note: Removed the bottom margins here, relying entirely on the parent's flex-gap
      className="w-full group flex flex-col md:flex-row md:items-center md:gap-12 max-w-5xl mx-auto glass-effect rounded-2xl p-4 md:p-8 overflow-hidden hover:bg-white/[0.03] transition-colors border border-white/5"
    >
      <div className="relative w-full md:w-1/2 flex-shrink-0 flex justify-center">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 w-full justify-center">
          <ProductImages images={currentImages} productName={item.name} isWide={isWide} />
        </div>
      </div>

      <div className="flex flex-col flex-grow w-full md:w-1/2 p-2 md:p-0 md:pl-4 select-none">
        <h2 className="mb-3 font-body font-semibold text-3xl text-gray-100 text-center md:text-left md:text-4xl md:mb-5 drop-shadow-lg group-hover:text-amber-400 transition-colors duration-300">
          {item.name}
        </h2>

        {item.size && (
          <div className="inline-block max-w-max mx-auto md:mx-0 break-words rounded-lg bg-white/10 border border-white/10 px-4 py-2 text-sm sm:text-base font-semibold text-gray-100 text-center md:text-left tracking-wide leading-relaxed backdrop-blur-sm shadow-sm mb-6">
            {item.size}
          </div>
        )}

        {/* Desktop Features */}
        <ul className="mt-2 list-none space-y-2 text-left text-gray-300 mb-6 hidden md:block">
          {item.features?.map((feature, i) => (
            <li key={i} className="relative pl-5 font-body text-[1.05em] leading-tight">
              <span className="absolute left-0 top-1 font-bold text-amber-400">•</span>
              {renderFeatureText(feature)}
            </li>
          ))}
        </ul>

        {/* Mobile Features */}
        <ul className="mt-4 space-y-3 text-gray-300 mb-6 block md:hidden">
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
            className="inline-flex items-center gap-2 bg-green-500/70 hover:bg-green-500/90 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition-colors text-lg"
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
      
      {/* BULLETPROOF SPACING: Added flex flex-col with strong gap here */}
      <div className="flex flex-col gap-16 md:gap-24">
        {collections.map((item, i) => (
          <ProductCard key={i} item={item} />
        ))}
      </div>

    </section>
  );
}