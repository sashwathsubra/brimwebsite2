// ------------------------
// featurecollection.tsx
// ------------------------
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./carousel"; // make sure this points to your carousel file

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

// ------------------------
// Types
// ------------------------
type ProductColor = "red" | "green" | "multicolor";
type ProductDensity = "Thin" | "Thick";

const placeWordList = [
  "home","office","executive","cabin","mosque","temple","church","hospital",
  "clinic","school","college","showroom","shop","restaurant","hotel",
  "factory","warehouse","hall","halls","reception","auditorium",
] as const;

const placeWordSet = new Set<string>(placeWordList.map(w => w.toLowerCase()));
const placeWordSplitRegex = new RegExp(`\\b(${placeWordList.join("|")})\\b`, "gi");

function renderFeatureText(feature: string) {
  if (feature.toLowerCase().startsWith("suitable for")) {
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
    images: [miniled_red],
    name: "Mini Clock Red",
    price: "",
    category: "",
    features: [
      "Suitable for home, office, executive cabin, etc...",
      "Glassy finish ABS plastic case",
      "1 inch seven segment LED display",
      "Epson RTC and Nuvoton microcontroller",
      "Built in battery memory backup for 5 years & above",
      "User can select seconds blinking option",
      "Wall mountable/table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 14 cm Length x 6.5 cm Width",
  },
  {
    images: [miniled_green],
    name: "Mini Clock Green",
    price: "",
    category: "",
    features: [
      "Suitable for home, office, executive cabin, etc...",
      "Glassy finish ABS plastic case",
      "1 inch seven segment LED display",
      "Epson RTC and Nuvoton microcontroller",
      "Built in battery memory backup for 5 years & above",
      "User can select seconds blinking option",
      "Wall mountable/table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 14 cm Length x 6.5 cm Width",
  },
  {
    images: [dot_single_red, dot_double_red],
    name: "Red Dot Matrix Clock",
    price: "",
    category: "",
    features: [
      "Suitable for home, office, executive cabin, etc...",
      "7x30 LED dot matrix",
      "Epson RTC and Nuvoton microcontroller",
      "User can select font",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 26 cm Length x 8 cm Width",
    densityOptions: ["Thin", "Thick"],
    colorDensityImages: {
      red: { Thin: [dot_single_red], Thick: [dot_double_red] },
    },
  },
  {
    images: [dot_single_red, dot_double_red],
    name: "Dual Colour Matrix Clock",
    price: "",
    category: "",
    hasDualColor: true,
    features: [
      "Suitable for home, office, executive cabin, etc...",
      "7x30 LED dot matrix",
      "Epson RTC and Nuvoton microcontroller",
      "User can select font",
      "User can select colour",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 26 cm Length x 8 cm Width",
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
    category: "",
    features: [
      "Suitable for executive cabin, home halls, office reception, etc...",
      "14x56 3mm dot matrix calendar clock",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 26 cm Length x 8 cm Width",
  },
  {
    images: [multicolor_red, multicolor_red_2],
    name: "Multi Colour Calender Clock",
    price: "",
    category: "",
    hasDualColor: true,
    hasTriColor: true,
    greenImages: [multicolor_green, multicolor_green_2],
    multiColorImages: [
      multicolor_dual, multicolor_dual_2, multicolor_dual_3, multicolor_dual_4,
    ],
    features: [
      "Suitable for executive cabin, home halls, office reception, etc...",
      "14x56 3mm dot matrix calendar clock",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 65 cm Length x 8 cm Width",
  },
  {
    images: [jumbolednew],
    name: "Jumbo Clock",
    price: "",
    category: "",
    features: [
      "Suitable for factory, temple, church, mosque, auditorium, etc...",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / hanging",
      "12v power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 90 cm Length x 30 cm Width",
  },
];

// ----------------------------
// ProductImages Component (Fixed)
// ----------------------------
const ProductImages = ({ images, isWide }: { images: string[]; isWide?: boolean }) => {
  const [api, setApi] = useState<CarouselApi | null>(null);

  // Preload all images
  useEffect(() => {
    images.forEach((img) => new Image().src = img);
  }, [images]);

  // Smooth auto-scroll
  useEffect(() => {
    if (!api || images.length <= 1) return;

    let index = 0;
    const interval = setInterval(() => {
      if (!api) return;
      index = (index + 1) % images.length; // loop index
      api.scrollTo(index, true); // smooth scroll to slide
    }, 3000);

    return () => clearInterval(interval);
  }, [api, images]);

  return (
    <div className="relative w-full flex justify-center">
      <Carousel opts={{ loop: true }} setApi={setApi}>
        <CarouselContent className="flex justify-center">
          {images.map((src, i) => (
            <CarouselItem key={i} className="flex justify-center w-full">
              <div
                className={`flex justify-center items-center bg-white p-0 rounded-xl ${
                  isWide ? "px-20 md:px-32" : "px-4"
                }`}
              >
                <img
                  src={src}
                  alt={`product-${i + 1}`}
                  loading="lazy"
                  className="w-auto max-h-[320px] md:max-h-[340px] object-contain rounded-xl"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
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
  if (item.name === "Dual Colour Matrix Clock" && item.greenImages) {
    currentImages = [...item.images, ...item.greenImages];
  }
  if (item.name === "Multi Colour Calender Clock") {
    currentImages = [...item.images];
    if (item.greenImages) currentImages.push(...item.greenImages);
    if (item.multiColorImages) currentImages.push(...item.multiColorImages);
  }

  const isWide = item.name === "Jumbo Clock";

  return (
    <motion.div
      id={item.name.toLowerCase().replace(/\s+/g, "-")}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group cursor-pointer flex flex-col md:flex-row md:items-center md:gap-16 mx-auto glass-effect rounded-2xl p-4 md:p-10 overflow-hidden hover:bg-white/[0.03] transition-colors border border-white/5"
    >
      <div className="relative w-full md:w-1/2 flex-shrink-0 flex justify-center">
        <ProductImages images={currentImages} isWide={isWide} />
      </div>

      <div className="flex flex-col flex-grow w-full md:w-1/2 p-2 md:p-0 md:pl-6 select-none">
        <h3 className="mb-3 font-body font-semibold text-3xl text-gray-100 text-center md:text-left md:text-4xl md:mb-5 drop-shadow-lg group-hover:text-amber-400">
          {item.name}
        </h3>

        {item.size && (
          <div className="inline-block max-w-full break-words rounded-lg bg-white/10 border border-white/10 px-4 py-2 text-sm sm:text-base font-semibold text-gray-100 text-center md:text-left tracking-wide leading-relaxed backdrop-blur-sm shadow-sm mb-6">
            {item.size}
          </div>
        )}

        <ul className="mt-2 list-none space-y-2 text-left text-gray-300 mb-6 hidden md:block">
          {item.features?.map((feature, i) => (
            <li key={i} className="relative pl-5 font-body text-[1.05em] leading-tight">
              <span className="absolute left-0 top-1 font-bold text-amber-400">•</span>
              {renderFeatureText(feature)}
            </li>
          ))}
        </ul>

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
    <div className="space-y-8 md:space-y-16 px-4 md:px-12 lg:px-24">
      {collections.map((item, i) => (
        <ProductCard key={i} item={item} />
      ))}
    </div>
  );
}
