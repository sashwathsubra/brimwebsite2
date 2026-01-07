import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import dot_single_red from "@/assets/new_dot_single.jpeg";
import dot_single_green from "@/assets/new_dot_single_green.jpeg";
import dot_double_red from "@/assets/new_dot_double.jpeg";
import dot_double_green from "@/assets/new_dot_double_green.jpeg";
import new_calender_red_1 from "@/assets/new_calender_red_1.jpeg";
import multicolor_red from "@/assets/new_multi_colour_red.jpeg";
import multicolor_red_2 from "@/assets/new_multicolour_red2.png";
import multicolor_green from "@/assets/new_multicolour_green.jpeg";
import multicolor_green_2 from "@/assets/new_multicolour_green2.png";
import multicolor_dual from "@/assets/new_multicolour_dual.jpeg";
import multicolor_dual_2 from "@/assets/new_multicolour_dual2.png";
import multicolor_dual_3 from "@/assets/new_multicolour_dual3.png";
import multicolor_dual_4 from "@/assets/new_multicolour_dual4.png";
import miniled_red from "@/assets/miniled_red.jpeg";
import miniled_green from "@/assets/minled_green.jpeg";
import jumbolednew from "@/assets/jumbolednew.jpeg";

const imageSources: Record<string, { png?: string; jpeg?: string; webp?: string[]; avif?: string[]; alt: string }> = {};

type ProductColor = "red" | "green" | "multicolor";
type ProductDensity = "Thin" | "Thick";

// -----------------------------
// Utility: highlight place words
// -----------------------------
const placeWordList = [
  "home", "office", "executive", "cabin", "mosque", "temple", "church",
  "hospital", "clinic", "school", "college", "showroom", "shop", "restaurant",
  "hotel", "factory", "warehouse"
] as const;

const placeWordSet = new Set(placeWordList.map(w => w.toLowerCase()));
const placeWordSplitRegex = new RegExp(`\\b(${placeWordList.join("|")})\\b`, "gi");

function renderFeatureText(feature: string, options?: { highlightPlaces?: boolean }) {
  const highlightPlaces = options?.highlightPlaces ?? true;
  return feature.split(placeWordSplitRegex).map((part, index) => {
    if (placeWordSet.has(part.toLowerCase())) {
      return (
        <span
          key={`${index}-${part}`}
          className={highlightPlaces
            ? "inline-block text-[1.06em] font-semibold transition-colors duration-200 hover:text-teal-300 hover:drop-shadow-[0_2px_12px_rgba(45,212,191,0.35)] group-hover:text-teal-300 group-hover:drop-shadow-[0_2px_12px_rgba(45,212,191,0.25)]"
            : "inline-block text-[1.06em] font-semibold"
          }
        >
          {part}
        </span>
      );
    }
    return <span key={`${index}-${part}`}>{part}</span>;
  });
}

// -----------------------------
// Product types & collection
// -----------------------------
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
  colorDensityImages?: Partial<Record<Exclude<ProductColor, "multicolor">, Record<ProductDensity, string[]>>>;
};

const collections: ProductItem[] = [
  {
    images: [miniled_red],
    name: "Mini Clock Red",
    price: "",
    features: [
      "Suitable for home, office, executive cabin",
      "Glassy finish ABS plastic case",
      "1 inch seven segment LED display",
      "Epson RTC and Nuvoton microcontroller",
      "Built in battery memory backup for 5 years & above",
      "User can select seconds blinking option",
      "Wall mountable/table top",
      "5V power supply included",
      "More than 7 years durable with out maintenance",
    ],
    size: "Clock size: 14cm length, 6.5cm height and 3.5cm width",
  },
  {
    images: [miniled_green],
    name: "Mini Clock Green",
    price: "",
    features: [
      "Suitable for home, office, executive cabin",
      "Glassy finish ABS plastic case",
      "1 inch seven segment LED display",
      "Epson RTC and Nuvoton microcontroller",
      "Built in battery memory backup for 5 years & above",
      "User can select seconds blinking option",
      "Wall mountable/table top",
      "5V power supply included",
      "More than 7 years durable with out maintenance",
    ],
    size: "Clock size: 14cm Length, 6.5cm height and 3.5cm width",
  },
  {
    images: [dot_single_red, dot_double_red],
    name: "Red Dot Matrix Clock",
    price: "",
    features: [
      "Suitable for home, office, executive cabin",
      "7x30 LED dot matrix",
      "Epson RTC and Nuvoton microcontroller",
      "User can select font",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 26cm length, 8 cm height",
    densityOptions: ["Thin", "Thick"],
    colorDensityImages: {
      red: {
        Thin: [dot_single_red],
        Thick: [dot_double_red],
      },
    },
  },
  {
    images: [dot_single_red, dot_double_red, dot_single_green, dot_double_green],
    name: "Dual Colour Matrix Clock",
    price: "",
    hasDualColor: true,
    features: [
      "Suitable for home, office, executive cabin",
      "7x30 LED dot matrix",
      "Epson RTC and Nuvoton microcontroller",
      "User can select font",
      "User can select colour",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 26cm length, 8 cm height",
    greenImages: [dot_single_green, dot_double_green],
    densityOptions: ["Thin", "Thick"],
    colorDensityImages: {
      red: { Thin: [dot_single_red], Thick: [dot_double_red] },
      green: { Thin: [dot_single_green], Thick: [dot_double_green] },
    },
  },
  {
    images: [new_calender_red_1],
    name: "Calendar Clock",
    price: "",
    features: [
      "Suitable for executive cabin, home halls, office reception",
      "14x56 3mm dot matrix calendar clock",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 26 cm length, 8 cm height.",
  },
  {
    images: [multicolor_red, multicolor_red_2],
    name: "Multi Colour Calender Clock",
    price: "",
    hasDualColor: true,
    hasTriColor: true,
    greenImages: [multicolor_green, multicolor_green_2],
    multiColorImages: [multicolor_dual, multicolor_dual_2, multicolor_dual_3, multicolor_dual_4],
    features: [
      "Suitable for executive cabin, home halls, office reception",
      "14x56 3mm dot matrix calendar clock",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 26 cm length, 8 cm height.",
  },
  {
    images: [jumbolednew],
    name: "Jumbo Clock",
    price: "",
    features: [
      "Suitable for factory, temple, church, mosque, auditorium.",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / hanging",
      "12v power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 90cm length, 30cm height",
  },
];

// -----------------------------
// Product Images Carousel
// -----------------------------
const ProductImages = ({ images }: { images: string[] }) => {
  const hasMultipleImages = images.length > 1;
  const [api, setApi] = useState<CarouselApi | null>(null);

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api || images.length <= 1) return;
    const interval = setInterval(() => {
      const nextIndex = (api.selectedScrollSnap() + 1) % images.length;
      api.scrollTo(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [api, images.length]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  return (
    <div className="relative overflow-hidden">
      <Carousel opts={{ loop: hasMultipleImages }} setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i}>
              <div className="relative h-64 sm:h-72 md:h-80 w-full flex items-center justify-center bg-white">
                <img src={src} alt={`image-${i}`} className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {hasMultipleImages && (
          <>
            <CarouselPrevious className="top-1/2 left-3 hidden -translate-y-1/2 rounded-full shadow-lg bg-zinc-800/70 text-white hover:bg-zinc-800/90 border border-white/10 backdrop-blur-sm md:inline-flex h-10 w-10" />
            <CarouselNext className="top-1/2 right-3 hidden -translate-y-1/2 rounded-full shadow-lg bg-zinc-800/70 text-white hover:bg-zinc-800/90 border border-white/10 backdrop-blur-sm md:inline-flex h-10 w-10" />
          </>
        )}
      </Carousel>
    </div>
  );
};

// -----------------------------
// Product Card with padding + dynamic WhatsApp
// -----------------------------
const ProductCard = ({ item }: { item: ProductItem }) => {
  const [color, setColor] = useState<ProductColor>("red");
  const [density, setDensity] = useState<ProductDensity>("Thin");
  const phone = "919445887243";

  // WhatsApp URL
  const buildWhatsAppUrl = () => {
    let msg = `Hello! I'm interested in ordering the ${item.name}`;
    if (item.hasDualColor || item.hasTriColor) msg += ` with color: ${color}`;
    if (item.densityOptions?.length) msg += ` and density: ${density}`;
    msg += `. Please provide more details.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  // Determine images based on color/density
  let currentImages = item.images;
  if (item.hasDualColor || item.hasTriColor) {
    currentImages = [...(item.images ?? []), ...(item.greenImages ?? []), ...(item.multiColorImages ?? [])];
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group flex flex-col md:flex-row md:gap-16 p-6 md:p-10 bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:bg-white/[0.03] transition-colors"
    >
      {/* Left Column: Images */}
      <motion.div className="relative w-full md:w-1/2 flex-shrink-0" whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        <ProductImages images={currentImages} />
      </motion.div>

      {/* Right Column: Info */}
      <div className="flex flex-col w-full md:w-1/2 p-4 md:p-6 select-none">
        <motion.h3 layout className="text-3xl md:text-4xl font-semibold text-gray-100 mb-3 md:mb-5">{item.name}</motion.h3>
        {item.size && <p className="bg-white/10 px-4 py-2 rounded-lg text-gray-100 mb-4">{item.size}</p>}
        <ul className="space-y-2 mb-6 text-gray-300">
          {item.features?.map((feature, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-start gap-2 text-[1.05em] leading-tight">
              <span className="text-amber-400 font-bold">•</span>
              {renderFeatureText(feature)}
            </motion.li>
          ))}
        </ul>

        {/* Options */}
        {(item.hasDualColor || item.hasTriColor) && (
          <div className="flex gap-4 mb-4">
            <select value={color} onChange={e => setColor(e.target.value as ProductColor)} className="p-2 rounded bg-white/10 text-white">
              {["red", "green", "multicolor"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {item.densityOptions && (
              <select value={density} onChange={e => setDensity(e.target.value as ProductDensity)} className="p-2 rounded bg-white/10 text-white">
                {item.densityOptions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            )}
          </div>
        )}

        {/* WhatsApp Button */}
        <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors text-center">
          Contact on WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

// -----------------------------
// Featured Collections Component
// -----------------------------
export default function FeaturedCollections() {
  return (
    <div className="space-y-10 md:space-y-16">
      {collections.map((item, i) => (
        <ProductCard key={i} item={item} />
      ))}
    </div>
  );
}
