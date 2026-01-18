import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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

// SEO: Highlighting keywords for Google & Users
const placeWordList = [
  "home","office","executive","cabin","mosque","temple","church","hospital",
  "clinic","school","college","showroom","shop","restaurant","hotel",
  "factory","warehouse","hall","halls","reception","auditorium",
  "chennai", "india", "tamil nadu", "banks", "industrial", "digital"
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
// Products Array (SEO OPTIMIZED)
// ------------------------
const collections: ProductItem[] = [
  {
    images: [miniled_red],
    name: "Mini LED Digital Clock (Red)", // SEO: Added 'Digital'
    price: "",
    category: "Digital Wall Clocks",
    features: [
      "Ideal for home, office, and executive cabins in Chennai",
      "Glassy finish ABS plastic case",
      "1 inch seven segment LED display",
      "Epson RTC and Nuvoton microcontroller",
      "Built in battery memory backup for 5 years & above",
      "User can select seconds blinking option",
      "Wall mountable / table top",
      "5V power supply included",
      "Local service support in Chennai",
    ],
    size: "Clock size: 14 cm Length x 6.5 cm Height",
  },
  {
    images: [miniled_green],
    name: "Mini LED Digital Clock (Green)", // SEO: Added 'Digital'
    price: "",
    category: "Digital Wall Clocks",
    features: [
      "Ideal for home, office, and executive cabins in Chennai",
      "Glassy finish ABS plastic case",
      "1 inch seven segment LED display",
      "Epson RTC and Nuvoton microcontroller",
      "Built in battery memory backup for 5 years & above",
      "User can select seconds blinking option",
      "Wall mountable / table top",
      "5V power supply included",
      "Proven durability for Indian power conditions",
    ],
    size: "Clock size: 14 cm Length x 6.5 cm Height",
  },
  {
    images: [dot_single_red, dot_double_red],
    name: "Red Dot Matrix LED Clock", // SEO: Added 'LED'
    price: "",
    category: "Industrial Clocks",
    features: [
      "Best seller for corporate offices and banks in Chennai",
      "7x30 LED dot matrix (High Visibility)",
      "Epson RTC and Nuvoton microcontroller",
      "User can select font style",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "Manufactured in Chennai with 7+ years life",
    ],
    size: "Clock size: 26 cm Length x 8 cm Height",
    densityOptions: ["Thin", "Thick"],
    colorDensityImages: {
      red: { Thin: [dot_single_red], Thick: [dot_double_red] },
    },
  },
  {
    images: [dot_single_red, dot_double_red],
    name: "Dual Colour Dot Matrix Clock",
    price: "",
    category: "Executive Clocks",
    features: [
      "Premium choice for executive cabins and showrooms",
      "7x30 LED dot matrix",
      "Epson RTC and Nuvoton microcontroller",
      "User can select font and colour (Red/Green)",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "Direct manufacturer support in Tamil Nadu",
    ],
    size: "Clock size: 26 cm Length x 8 cm Height",
    greenImages: [dot_single_green, dot_double_green],
    densityOptions: ["Thin", "Thick"],
    colorDensityImages: {
      red: { Thin: [dot_single_red], Thick: [dot_double_red] },
      green: { Thin: [dot_single_green], Thick: [dot_double_green] },
    },
  },
  {
    images: [new_calender_red_1],
    name: "Digital Calendar LED Clock", // SEO: Added 'Digital' and 'LED'
    price: "",
    category: "Calendar Clocks",
    features: [
      "Perfect for office reception, hospitals, and halls",
      "14x56 3mm dot matrix digital display",
      "Shows Date, Day, and Time clearly",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "Reliable service across Chennai & India",
    ],
    size: "Clock size: 26 cm Length x 8 cm Height",
  },
  {
    images: [multicolor_red, multicolor_red_2],
    name: "Multicolor Digital Calendar Clock", // SEO: Changed spelling to 'Multicolor' for search
    price: "",
    category: "Premium Clocks",
    hasDualColor: true,
    hasTriColor: true,
    greenImages: [multicolor_green, multicolor_green_2],
    multiColorImages: [
      multicolor_dual, multicolor_dual_2, multicolor_dual_3, multicolor_dual_4,
    ],
    features: [
      "Suitable for luxury hotels, receptions, and cabins",
      "14x56 3mm dot matrix vibrant display",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / table top",
      "5V power supply included",
      "High-quality finish made in Chennai",
    ],
    size: "Clock size: 65 cm Length x 8 cm Height",
  },
  {
    images: [jumbolednew],
    name: "Jumbo Industrial LED Clock", // SEO: Added 'Industrial' and 'LED'
    price: "",
    category: "Industrial Clocks",
    features: [
      "Heavy duty for factories, temples, churches, and auditorium",
      "Long-distance visibility for large halls",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / hanging support",
      "12v power supply included",
      "Trusted by industries across Chennai & Tamil Nadu",
    ],
    size: "Clock size: 90 cm Length x 30 cm Height",
  },
];

// ----------------------------
// ProductImages Component
// ----------------------------
const ProductImages = ({ images, isWide }: { images: string[]; isWide?: boolean }) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload images
  useEffect(() => {
    images.forEach((img) => {
      const i = new Image();
      i.src = img;
    });
  }, [images]);

  // Sync Carousel State & Auto-scroll
  useEffect(() => {
    if (!api) return;

    // Update state when user swipes
    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };
    api.on("select", onSelect);

    // Auto-scroll loop
    let interval: NodeJS.Timeout;
    if (images.length > 1) {
      interval = setInterval(() => {
        api.scrollNext();
      }, 3000);
    }

    return () => {
      api.off("select", onSelect);
      clearInterval(interval);
    };
  }, [api, images.length]);

  return (
    <div className="relative w-full max-w-lg flex flex-col items-center">
      <Carousel 
        setApi={setApi} 
        opts={{ 
          loop: true, 
          align: "center" 
        }} 
        className="w-full"
      >
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i} className="basis-full">
              <div
                className={`flex justify-center items-center bg-white rounded-xl overflow-hidden ${
                  isWide ? "px-8 py-4" : "p-2"
                }`}
              >
                <img
                  src={src}
                  alt={`product-${i + 1}`}
                  loading="eager"
                  className="w-full h-auto max-h-[320px] md:max-h-[340px] object-contain rounded-xl"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? "w-6 bg-amber-400" : "w-2 bg-white/20"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
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
      `Hello! I'm interested in ordering the ${product}. Please provide more details.`
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
      className="group cursor-pointer flex flex-col md:flex-row md:items-center md:gap-16 mx-auto glass-effect rounded-2xl p-4 md:p-10 overflow-hidden hover:bg-white/[0.03] transition-colors border border-white/5"
    >
      <div className="relative w-full md:w-1/2 flex-shrink-0 flex justify-center">
        <ProductImages images={currentImages} isWide={isWide} />
      </div>

      <div className="flex flex-col flex-grow w-full md:w-1/2 p-2 md:p-0 md:pl-6 select-none">
        {/* SEO: H3 is good here as it's a sub-topic of the page */}
        <h3 className="mb-3 font-body font-semibold text-3xl text-gray-100 text-center md:text-left md:text-4xl md:mb-5 drop-shadow-lg group-hover:text-amber-400">
          {item.name}
        </h3>

        {item.size && (
          <div className="inline-block max-w-full break-words rounded-lg bg-white/10 border border-white/10 px-4 py-2 text-sm sm:text-base font-semibold text-gray-100 text-center md:text-left tracking-wide leading-relaxed backdrop-blur-sm shadow-sm mb-6">
            {item.size}
          </div>
        )}

        {/* Desktop List */}
        <ul className="mt-2 list-none space-y-2 text-left text-gray-300 mb-6 hidden md:block">
          {item.features?.map((feature, i) => (
            <li key={i} className="relative pl-5 font-body text-[1.05em] leading-tight">
              <span className="absolute left-0 top-1 font-bold text-amber-400">•</span>
              {renderFeatureText(feature)}
            </li>
          ))}
        </ul>

        {/* Mobile List */}
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
// Products Page Export
// ----------------------------
export default function FeaturedCollection() {
  return (
    <div className="space-y-8 md:space-y-16 px-4 md:px-12 lg:px-24">
      {collections.map((item, i) => (
        <ProductCard key={i} item={item} />
      ))}
    </div>
  );
}