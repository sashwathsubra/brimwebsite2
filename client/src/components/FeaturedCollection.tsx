import { motion } from "framer-motion";
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

import { useCallback, useEffect, useState } from "react";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const imageSources: Record<string, { png?: string; jpeg?: string; webp?: string[]; avif?: string[]; alt: string }> = {};

type ProductColor = "red" | "green" | "multicolor";
type ProductDensity = "Thin" | "Thick";

const placeWordList = [
  "home",
  "office",
  "executive",
  "cabin",
  "mosque",
  "temple",
  "church",
  "hospital",
  "clinic",
  "school",
  "college",
  "showroom",
  "shop",
  "restaurant",
  "hotel",
  "factory",
  "warehouse",
] as const;

const placeWordSet = new Set<string>(placeWordList.map((w) => w.toLowerCase()));
const placeWordSplitRegex = new RegExp(`\\b(${placeWordList.join("|")})\\b`, "gi");

function renderFeatureText(feature: string, options?: { highlightPlaces?: boolean }) {
  const highlightPlaces = options?.highlightPlaces ?? true;
  return feature.split(placeWordSplitRegex).map((part, index) => {
    if (placeWordSet.has(part.toLowerCase())) {
      return (
        <span
          key={`${index}-${part}`}
          className={
            highlightPlaces
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
  sizeOptions?: Partial<Record<ProductColor, string[]>>;
  densityOptions?: ProductDensity[];
  colorDensityImages?: Partial<Record<Exclude<ProductColor, "multicolor">, Record<ProductDensity, string[]>>>;
};

const collections: ProductItem[] = [
  {
    images: [miniled_red],
    name: "Mini Clock Red",
    price: "",
    category: "",
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
    category: "",
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
    category: "",
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
    category: "",
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
      red: {
        Thin: [dot_single_red],
        Thick: [dot_double_red],
      },
      green: {
        Thin: [dot_single_green],
        Thick: [dot_double_green],
      },
    },
  },
  {
    images: [new_calender_red_1],
    name: "Calendar Clock",
    price: "",
    category: "",
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
    category: "",
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
    category: "",
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

const toKebabCase = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const ProductImages = ({
  images,
  label,
  imageStyle,
  badge,
  badgeClassName,
  scrollToIndex,
  onSelectedIndexChange,
}: {
  images: string[];
  label?: string;
  imageStyle?: React.CSSProperties;
  badge?: React.ReactNode;
  badgeClassName?: string;
  scrollToIndex?: number;
  onSelectedIndexChange?: (index: number) => void;
}) => {
  const hasMultipleImages = images.length > 1;
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selected, setSelected] = useState(0);

  // Auto-rotate every 3s
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
    const onSelect = () => {
      const nextSelected = api.selectedScrollSnap();
      setSelected(nextSelected);
      onSelectedIndexChange?.(nextSelected);
    };
    onSelect();
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api, onSelectedIndexChange]);

  useEffect(() => {
    if (!api || !images.length) return;
    api.scrollTo(0);
    setSelected(0);
  }, [api, images]);

  useEffect(() => {
    if (!api || scrollToIndex == null) return;
    if (scrollToIndex < 0 || scrollToIndex >= images.length) return;
    if (api.selectedScrollSnap() === scrollToIndex) return;
    api.scrollTo(scrollToIndex);
  }, [api, images.length, scrollToIndex]);

  return (
    <div className="relative overflow-hidden">
      <Carousel opts={{ loop: hasMultipleImages }} setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i}>
              <div className="relative h-64 sm:h-72 md:h-80 w-full flex items-center justify-center bg-white">
                {imageSources[src] ? (
                  <picture>
                    {imageSources[src].avif?.length && <source type="image/avif" srcSet={imageSources[src].avif.join(", ")} sizes="(min-width: 1280px) 420px, (min-width: 1024px) 33vw, 50vw" />}
                    {imageSources[src].webp?.length && <source type="image/webp" srcSet={imageSources[src].webp.join(", ")} sizes="(min-width: 1280px) 420px, (min-width: 1024px) 33vw, 50vw" />}
                    <img src={imageSources[src].png || imageSources[src].jpeg || src} alt={imageSources[src].alt} className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110" loading="lazy" decoding="async" style={imageStyle} />
                  </picture>
                ) : (
                  <img src={src} alt={`image-${i + 1}`} className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110" style={imageStyle} />
                )}
                {badge && <div className="absolute top-3 right-3 z-20">{badge}</div>}
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
      {label && (
        <div className="absolute bottom-4 left-0 right-0 z-10 flex items-center justify-center">
          <span className="bg-background/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-foreground shadow-md">{label}</span>
        </div>
      )}
      {hasMultipleImages && (
        <div className="pointer-events-auto absolute bottom-3 left-1/2 z-10 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button key={i} onClick={() => api?.scrollTo(i)} aria-label={`View image ${i + 1}`} className={`${selected === i ? "w-6 bg-amber-400" : "w-3 bg-muted-foreground/50 hover:bg-muted-foreground"} h-1.5 transition-all`} />
          ))}
        </div>
      )}
    </div>
  );
};

// ----------------------------
// ProductCard component simplified
// ----------------------------
const ProductCard = ({ item }: { item: ProductItem }) => {
  const [color, setColor] = useState<ProductColor>("red");
  const [density, setDensity] = useState<ProductDensity>("Thin");
  const [hasInteractedWithOptions, setHasInteractedWithOptions] = useState(false);
  const phone = "919445887243";

  const buildWhatsAppUrl = (product: string) => {
    return `https://wa.me/${phone}?text=${encodeURIComponent(`Hello! I'm interested in ordering the ${product}. Please provide more details.`)}`;
  };

  // Determine currentImages based on color/density
  let currentImages = item.images ?? [];
  const isMultiColourCalendar = item.name === "Multi Colour Calender Clock";
  const isRedDotMatrix = item.name === "Red Dot Matrix Clock";
  const isDualColourMatrix = item.name === "Dual Colour Matrix Clock";

  if (isMultiColourCalendar) currentImages = [...(item.images ?? []), ...(item.greenImages ?? []), ...(item.multiColorImages ?? [])];
  else if (isRedDotMatrix || isDualColourMatrix) currentImages = item.images ?? [];

  const displayedFeatures = item.features;

  return (
    <motion.div
      id={item.name.toLowerCase().replace(/\s+/g, "-")}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group cursor-pointer h-full w-full flex flex-col md:flex-row md:items-center md:gap-16 mx-auto glass-effect rounded-2xl md:p-10 overflow-hidden hover:bg-white/[0.03] transition-colors border border-white/5"
    >
      {/* Left Column: Image + Badge */}
      <motion.div className="relative w-full md:w-1/2 flex-shrink-0" whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative z-10">
          <ProductImages images={currentImages} />
        </motion.div>
      </motion.div>

      {/* Right Column: Content */}
      <div className="flex flex-col flex-grow w-full md:w-1/2 p-4 sm:p-5 md:p-0 md:pl-6 select-none">
        <motion.h3 layout className="mb-3 font-body font-semibold text-3xl text-gray-100 transition-colors group-hover:text-amber-400 text-center md:text-left md:text-4xl md:mb-5 drop-shadow-lg">{item.name}</motion.h3>
        <p className="font-body text-2xl text-amber-400 text-center md:text-left mb-4 tracking-wide font-medium">{item.price}</p>
        {item.size && <div className="inline-block max-w-full break-words rounded-lg bg-white/10 border border-white/10 px-4 py-2 text-sm sm:text-base font-semibold text-gray-100 text-center md:text-left tracking-wide leading-relaxed backdrop-blur-sm shadow-sm mb-8">{item.size}</div>}
        <ul className="mt-2 list-none space-y-2 text-center md:text-left text-gray-300 mb-6">
          {displayedFeatures?.map((feature, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className={`group font-body flex items-center gap-2 text-[1.05em] leading-tight`}>
              <span className="inline-block font-bold text-amber-400">•</span>
              {renderFeatureText(feature)}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function Products() {
  return (
    <div className="space-y-8 md:space-y-16">
      {collections.map((item, i) => (
        <ProductCard key={i} item={item} />
      ))}
    </div>
  );
}
