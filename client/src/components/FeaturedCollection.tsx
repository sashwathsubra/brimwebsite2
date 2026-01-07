import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

// Assets
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
import whatsappLogo from "@/assets/whatsapp-logo.png";

// ---------------------
// Helper: Capitalize places
// ---------------------
const placeWordList = [
  "Home",
  "Office",
  "Executive",
  "Cabin",
  "Mosque",
  "Temple",
  "Church",
  "Hospital",
  "Clinic",
  "School",
  "College",
  "Showroom",
  "Shop",
  "Restaurant",
  "Hotel",
  "Factory",
  "Warehouse",
] as const;

const placeWordSet = new Set(placeWordList.map((w) => w.toLowerCase()));
const placeWordSplitRegex = new RegExp(`\\b(${placeWordList.join("|")})\\b`, "gi");

function renderFeatureText(feature: string) {
  return feature.split(placeWordSplitRegex).map((part, idx) =>
    placeWordSet.has(part.toLowerCase()) ? (
      <span
        key={idx}
        className="inline-block font-semibold text-[1.06em] hover:text-teal-300 transition-colors"
      >
        {part}
      </span>
    ) : (
      <span key={idx}>{part}</span>
    )
  );
}

// ---------------------
// Product type
// ---------------------
type ProductItem = {
  name: string;
  images: string[];
  greenImages?: string[];
  multiColorImages?: string[];
  price?: string;
  features?: string[];
  size?: string;
  hasDualColor?: boolean;
  hasTriColor?: boolean;
};

// ---------------------
// Products list
// ---------------------
const collections: ProductItem[] = [
  {
    name: "Mini Clock Red",
    images: [miniled_red],
    features: [
      "Suitable for Home, Office, Executive Cabin",
      "Glassy finish ABS plastic case",
      "1 inch seven segment LED display",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery memory backup for 5 years & above",
      "User can select seconds blinking option",
      "Wall mountable / table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 14cm length, 6.5cm height, 3.5cm width",
  },
  {
    name: "Mini Clock Green",
    images: [miniled_green],
    features: [
      "Suitable for Home, Office, Executive Cabin",
      "Glassy finish ABS plastic case",
      "1 inch seven segment LED display",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery memory backup for 5 years & above",
      "User can select seconds blinking option",
      "Wall mountable / table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 14cm length, 6.5cm height, 3.5cm width",
  },
  {
    name: "Red Dot Matrix Clock",
    images: [dot_single_red, dot_double_red],
    features: [
      "Suitable for Home, Office, Executive Cabin",
      "7x30 LED dot matrix",
      "Epson RTC and Nuvoton microcontroller",
      "User can select font",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 26cm length, 8 cm height",
  },
  {
    name: "Dual Colour Matrix Clock",
    images: [dot_single_red, dot_double_red, dot_single_green, dot_double_green],
    hasDualColor: true,
    greenImages: [dot_single_green, dot_double_green],
    features: [
      "Suitable for Home, Office, Executive Cabin",
      "7x30 LED dot matrix",
      "Epson RTC and Nuvoton microcontroller",
      "User can select font and colour",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 26cm length, 8 cm height",
  },
  {
    name: "Calendar Clock",
    images: [new_calender_red_1],
    features: [
      "Suitable for Executive Cabin, Home halls, Office reception",
      "14x56 3mm dot matrix calendar clock",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 26cm length, 8cm height",
  },
  {
    name: "Multi Colour Calendar Clock",
    images: [multicolor_red, multicolor_red_2],
    greenImages: [multicolor_green, multicolor_green_2],
    multiColorImages: [multicolor_dual, multicolor_dual_2, multicolor_dual_3, multicolor_dual_4],
    hasDualColor: true,
    hasTriColor: true,
    features: [
      "Suitable for Executive Cabin, Home halls, Office reception",
      "14x56 3mm dot matrix calendar clock",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 26cm length, 8cm height",
  },
  {
    name: "Jumbo Clock",
    images: [jumbolednew],
    features: [
      "Suitable for Factory, Temple, Church, Mosque, Auditorium",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / hanging",
      "12V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 90cm length, 30cm height",
  },
];

// ---------------------
// Carousel component
// ---------------------
const ProductImages = ({ images }: { images: string[] }) => {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api || images.length <= 1) return;
    const interval = setInterval(() => {
      const nextIndex = (api.selectedScrollSnap() + 1) % images.length;
      api.scrollTo(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [api, images.length]);

  return (
    <Carousel opts={{ loop: true }} setApi={setApi} className="w-full">
      <CarouselContent>
        {images.map((src, i) => (
          <CarouselItem key={i}>
            <div className="flex items-center justify-center h-64 md:h-80 bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
              <img src={src} alt={`product-${i + 1}`} className="object-contain max-h-full max-w-full transition-transform duration-700 hover:scale-110" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselPrevious className="absolute top-1/2 left-3 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center" />
          <CarouselNext className="absolute top-1/2 right-3 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center" />
        </>
      )}
    </Carousel>
  );
};

// ---------------------
// ProductCard component
// ---------------------
const ProductCard = ({ item }: { item: ProductItem }) => {
  const allImages = [...(item.images || []), ...(item.greenImages || []), ...(item.multiColorImages || [])];
  const whatsappNumber = "919445887243";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative flex flex-col md:flex-row items-center gap-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-white/10 overflow-hidden hover:bg-white/10 transition-colors"
    >
      <div className="md:w-1/2 w-full">
        <ProductImages images={allImages} />
      </div>
      <div className="md:w-1/2 w-full flex flex-col gap-4">
        <h3 className="text-3xl md:text-4xl font-semibold text-gray-100">{item.name}</h3>
        {item.size && <p className="text-sm md:text-base text-gray-200 bg-black/20 px-3 py-1 rounded-md">{item.size}</p>}
        <ul className="space-y-2">
          {item.features?.map((f, i) => (
            <li key={i} className="text-gray-300 text-[1.05em] flex items-center gap-2">
              <span className="text-amber-400 font-bold">•</span>
              {renderFeatureText(f)}
            </li>
          ))}
        </ul>
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hi! I want to order ${encodeURIComponent(item.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 bg-green-500/70 hover:bg-green-500/90 text-white font-semibold px-5 py-3 rounded-full transition-all shadow-md backdrop-blur-sm"
        >
          <img src={whatsappLogo} alt="WhatsApp" className="w-6 h-6" /> Chat on WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

// ---------------------
// Main Products page
// ---------------------
export default function Products() {
  return (
    <div className="space-y-16 px-4 md:px-10 py-8">
      {collections.map((item, i) => (
        <ProductCard key={i} item={item} />
      ))}
    </div>
  );
}