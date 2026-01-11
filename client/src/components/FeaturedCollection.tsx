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

import { useEffect, useState } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// ------------------------
// Hero Images (Top Slideshow)
// ------------------------
const heroImages = [
  miniled_red,
  miniled_green,
  dot_single_red,
  dot_double_red,
];

// ------------------------
// Types
// ------------------------
type ProductColor = "red" | "green" | "multicolor";
type ProductDensity = "Thin" | "Thick";

// ------------------------
// Place words
// ------------------------
const placeWordList = [
  "home","office","executive","cabin","mosque","temple","church","hospital",
  "clinic","school","college","showroom","shop","restaurant","hotel",
  "factory","warehouse","hall","halls","reception","auditorium",
] as const;

const placeWordSet = new Set<string>(placeWordList.map(w => w.toLowerCase()));
const placeWordSplitRegex = new RegExp(`\\b(${placeWordList.join("|")})\\b`, "gi");

// ------------------------
// Render features
// ------------------------
function renderFeatureText(feature: string) {
  return feature.split(placeWordSplitRegex).map((part, index) => {
    if (placeWordSet.has(part.toLowerCase())) {
      return (
        <span
          key={`${index}-${part}`}
          className="font-semibold text-teal-400 whitespace-normal break-words"
        >
          {part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()}
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
// Product Item Type
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
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 14 cm Height x 6.5 cm Width",
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
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 14 cm Height x 6.5 cm Width",
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
    size: "Clock size: 26 cm Height x 8 cm Width",
    densityOptions: ["Thin", "Thick"],
    colorDensityImages: {
      red: { Thin: [dot_single_red], Thick: [dot_double_red] },
    },
  },
  {
    images: [jumbolednew],
    name: "Jumbo Clock",
    price: "",
    category: "",
    features: [
      "Suitable for factory, temple, church, mosque, auditorium",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / hanging",
      "12v power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 90 cm Height x 30 cm Width",
  },
];

// ----------------------------
// HeroCarousel Component
// ----------------------------
const HeroCarousel = ({ images }: { images: string[] }) => {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api || images.length <= 1) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [api, images.length]);

  return (
    <div className="w-full overflow-hidden -mx-4 md:mx-0">
      <Carousel opts={{ loop: images.length > 1 }} setApi={setApi}>
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i}>
              <div className="w-full flex justify-center">
                <img
                  src={src}
                  className="w-full h-[300px] md:h-[400px] object-cover"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 h-10 w-10 bg-black/30 rounded-full text-white flex items-center justify-center hover:bg-black/50" />
            <CarouselNext className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 h-10 w-10 bg-black/30 rounded-full text-white flex items-center justify-center hover:bg-black/50" />
          </>
        )}
      </Carousel>
    </div>
  );
};

// ----------------------------
// ProductImages Component
// ----------------------------
const ProductImages = ({ images }: { images: string[] }) => {
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
    <div className="relative w-full">
      <Carousel opts={{ loop: images.length > 1 }} setApi={setApi}>
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i}>
              <div className="relative w-full flex justify-center items-center bg-white p-2 md:p-4 rounded-xl">
                <img
                  src={src}
                  alt={`product-${i + 1}`}
                  loading="lazy"
                  className="max-h-[300px] md:max-h-[320px] w-auto object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="absolute top-1/2 left-2 md:left-3 -translate-y-1/2 h-10 w-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50" />
            <CarouselNext className="absolute top-1/2 right-2 md:right-3 -translate-y-1/2 h-10 w-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50" />
          </>
        )}
      </Carousel>
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
      `Hello! I'm interested in ordering the ${product}. Please provide more details.`
    )}`;

  let currentImages = item.images ?? [];
  if (item.greenImages) currentImages = [...currentImages, ...item.greenImages];
  if (item.multiColorImages) currentImages = [...currentImages, ...item.multiColorImages];

  return (
    <motion.div
      className="group cursor-pointer flex flex-col md:flex-row md:items-center md:gap-16 mx-auto glass-effect rounded-2xl p-4 md:p-10 overflow-hidden hover:bg-white/[0.03] border border-white/5 -mt-8 md:mt-0"
    >
      <motion.div className="relative w-full md:w-1/2 flex-shrink-0">
        <ProductImages images={currentImages} />
      </motion.div>

      <div className="flex flex-col flex-grow w-full md:w-1/2 p-2 md:p-0 md:pl-6 select-none">
        <motion.h3
          className="mb-3 font-body font-semibold text-3xl text-gray-100 transition-colors group-hover:text-amber-400 text-center md:text-left md:mb-5 drop-shadow-lg"
        >
          {item.name}
        </motion.h3>

        {item.size && (
          <div className="inline-block max-w-full break-words rounded-lg bg-white/10 border border-white/10 px-4 py-2 text-sm sm:text-base font-semibold text-gray-100 text-center md:text-left tracking-wide leading-relaxed backdrop-blur-sm shadow-sm mb-6">
            {item.size}
          </div>
        )}

        {/* Desktop features */}
        <ul className="hidden md:block mt-2 list-none space-y-2 text-left text-gray-300 mb-6">
          {item.features?.map((feature, i) => (
            <motion.li key={i} className="relative pl-5 font-body text-[1.05em] leading-tight">
              <span className="absolute left-0 top-1 font-bold text-amber-400">•</span>
              {renderFeatureText(feature)}
            </motion.li>
          ))}
        </ul>

        {/* Mobile features */}
        <ul className="block md:hidden mt-4 space-y-3 text-gray-300 mb-6">
          {item.features?.map((feature, i) => (
            <motion.li key={i} className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 font-body text-[1em] leading-snug">
              {renderFeatureText(feature)}
            </motion.li>
          ))}
        </ul>

        {/* WhatsApp Button */}
        <div className="mt-auto flex justify-center md:justify-start">
          <a
            href={buildWhatsAppUrl(item.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500/70 hover:bg-green-500/90 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition-colors text-lg"
          >
            Contact on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// ----------------------------
// Products Page
// ----------------------------
export default function Products() {
  return (
    <div className="space-y-8 md:space-y-16 px-0 md:px-12 lg:px-24">
      {/* HERO CAROUSEL */}
      <HeroCarousel images={heroImages} />

      {/* PRODUCTS */}
      {collections.map((item, i) => (
        <ProductCard key={i} item={item} />
      ))}
    </div>
  );
}
