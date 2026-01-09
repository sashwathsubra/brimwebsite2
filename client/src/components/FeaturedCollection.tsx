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

const imageSources: Record<
  string,
  { png?: string; jpeg?: string; webp?: string[]; avif?: string[]; alt: string }
> = {};

type ProductColor = "red" | "green" | "multicolor";
type ProductDensity = "Thin" | "Thick";

// ------------------------
// Full place words list
// ------------------------
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
  "hall",
  "halls",
  "reception",
  "auditorium",
] as const;

const placeWordSet = new Set<string>(
  placeWordList.map((w) => w.toLowerCase())
);
const placeWordSplitRegex = new RegExp(
  `\\b(${placeWordList.join("|")})\\b`,
  "gi"
);

// ------------------------
// FIXED: Highlight place words (NO overflow on mobile)
// ------------------------
function renderFeatureText(feature: string) {
  return feature.split(placeWordSplitRegex).map((part, index) => {
    if (placeWordSet.has(part.toLowerCase())) {
      const capitalized =
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();

      return (
        <span
          key={`${index}-${part}`}
          className="font-semibold text-teal-400 whitespace-normal break-words"
        >
          {capitalized}
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
// Products Collection
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
  sizeOptions?: Partial<Record<ProductColor, string[]>>;
  densityOptions?: ProductDensity[];
  colorDensityImages?: Partial<
    Record<Exclude<ProductColor, "multicolor">, Record<ProductDensity, string[]>>
  >;
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
      "More than 7 years durable with out maintenance",
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
      red: {
        Thin: [dot_single_red],
        Thick: [dot_double_red],
      },
    },
  },

  {
    images: [
      dot_single_red,
      dot_double_red,
      dot_single_green,
      dot_double_green,
    ],
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
    size: "Clock size: 26 cm Height x 8 cm Width",
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
    size: "Clock size: 26 cm Height x 8 cm Width",
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
      multicolor_dual,
      multicolor_dual_2,
      multicolor_dual_3,
      multicolor_dual_4,
    ],
    features: [
      "Suitable for executive cabin, home halls, office reception",
      "14x56 3mm dot matrix calendar clock",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 26 cm Height x 8 cm Width",
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
// ProductImages Component
// ----------------------------
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
    <div className="relative w-full">
      <Carousel opts={{ loop: images.length > 1 }} setApi={setApi}>
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i}>
              <div className="relative w-full flex justify-center items-center bg-white p-4 rounded-xl">
                <img
                  src={src}
                  alt={`product-${i + 1}`}
                  className="max-h-[320px] w-auto object-contain rounded-xl"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 1 && (
          <>
            <CarouselPrevious className="absolute top-1/2 left-3 -translate-y-1/2 h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50" />
            <CarouselNext className="absolute top-1/2 right-3 -translate-y-1/2 h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50" />
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

  return (
    <motion.div
      className="group cursor-pointer h-full w-full flex flex-col md:flex-row md:items-center md:gap-16 mx-auto glass-effect rounded-2xl p-6 md:p-10 overflow-hidden border border-white/5"
    >
      <div className="w-full md:w-1/2">
        <ProductImages images={item.images} />
      </div>

      <div className="flex flex-col flex-grow w-full md:w-1/2 md:pl-6">
        <h3 className="mb-4 font-semibold text-3xl md:text-4xl text-gray-100 text-center md:text-left">
          {item.name}
        </h3>

        {item.size && (
          <div className="mb-6 rounded-lg bg-white/10 px-4 py-2 text-sm sm:text-base font-semibold text-gray-100">
            {item.size}
          </div>
        )}

        <ul className="space-y-2 text-gray-300 mb-6">
          {item.features?.map((feature, i) => (
            <li
              key={i}
              className="flex flex-wrap items-start gap-2 text-[1.05em] leading-tight"
            >
              <span className="font-bold text-amber-400 mt-1">•</span>
              {renderFeatureText(feature)}
            </li>
          ))}
        </ul>
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
