import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Import all your images
import dot_single_red from "@/assets/new_dot_single.jpeg";
import dot_single_green from "@/assets/new_dot_single_green.jpeg";
import dot_double_red from "@/assets/new_double_dot.jpeg";
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

// Product type
type ProductItem = {
  images: string[];
  name: string;
  price?: string;
  category?: string;
  features?: string[];
  size?: string;
  hasDualColor?: boolean;
  hasTriColor?: boolean;
  greenImages?: string[];
  multiColorImages?: string[];
};

// Collections (7 clocks)
const collections: ProductItem[] = [
  {
    images: [miniled_red],
    name: "Mini Clock Red",
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
  },
  {
    images: [dot_single_red, dot_double_red, dot_single_green, dot_double_green],
    name: "Dual Colour Matrix Clock",
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
  },
  {
    images: [new_calender_red_1],
    name: "Calendar Clock",
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

// Auto-rotating ProductImages component
const ProductImages = ({ images, badge }: { images: string[]; badge?: React.ReactNode }) => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((prev) => (prev + 1) % images.length);
    }, 3000); // 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative overflow-hidden">
      <motion.img
        key={selected}
        src={images[selected]}
        alt={`image-${selected + 1}`}
        initial={{ opacity: 0, rotate: -5 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 5 }}
        transition={{ duration: 0.8 }}
        className="w-full h-64 sm:h-72 md:h-80 object-contain"
      />
      {badge && <div className="absolute top-3 right-3 z-20">{badge}</div>}
    </div>
  );
};

// ProductCard component
const ProductCard = ({ item }: { item: ProductItem }) => {
  const phone = "919445887243";
  const buildWhatsAppUrl = (product: string) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(`Hello! I'm interested in ordering the ${product}. Please provide more details.`)}`;

  const combinedImages = item.multiColorImages
    ? [...item.images, ...(item.greenImages ?? []), ...item.multiColorImages]
    : item.greenImages
    ? [...item.images, ...item.greenImages]
    : item.images;

  return (
    <motion.div
      className="group cursor-pointer h-full w-full flex flex-col md:flex-row md:items-center md:gap-16 mx-auto glass-effect rounded-2xl md:p-10 overflow-hidden hover:bg-white/[0.03] transition-colors border border-white/5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div className="relative w-full md:w-1/2 flex-shrink-0" whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        <ProductImages
          images={combinedImages}
          badge={item.hasDualColor || item.hasTriColor ? (
            <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">2 Colors in 1 Clock</span>
            </div>
          ) : null}
        />
      </motion.div>
      <div className="flex flex-col flex-grow w-full md:w-1/2 p-4 sm:p-5 md:p-0 md:pl-6 select-none">
        <motion.h3 className="mb-3 font-body font-semibold text-3xl text-gray-100 transition-colors group-hover:text-amber-400 text-center md:text-left md:text-4xl md:mb-5 drop-shadow-lg" layout>
          {item.name}
        </motion.h3>
        {item.size && <div className="inline-block max-w-full break-words rounded-lg bg-white/10 border border-white/10 px-4 py-2 text-sm sm:text-base font-semibold text-gray-100 text-center md:text-left tracking-wide leading-relaxed backdrop-blur-sm shadow-sm mb-8">{item.size}</div>}
        <ul className="mt-2 list-none space-y-2 text-center md:text-left text-gray-300 mb-6">
          {item.features?.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`group font-body flex items-center justify-center md:justify-start gap-3 ${i === 0 ? "text-xl sm:text-2xl text-amber-300 font-semibold drop-shadow-[0_2px_12px_rgba(251,191,36,0.25)]" : "text-lg text-gray-200"}`}
            >
              <span className={`w-1 h-1 rounded-full hidden md:block transition-colors duration-200 ${i === 0 ? "bg-primary/60 group-hover:bg-teal-300" : "bg-primary/60"}`} />
              {feature}
            </motion.li>
          ))}
        </ul>
        <a href={buildWhatsAppUrl(item.name)} target="_blank" rel="noopener noreferrer" className="relative flex w-full md:w-auto md:inline-flex items-center justify-center gap-3 bg-zinc-900 border border-white/10 px-8 py-3.5 font-body font-bold text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-zinc-800 rounded-lg shadow-lg">
          <motion.svg initial={{ rotate: 0 }} whileHover={{ rotate: [0, -10, 10, -10, 0] }} viewBox="0 0 16 16" className="h-4 w-4 text-green-500" fill="currentColor" aria-hidden="true">
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.926a7.85 7.85 0 0 0-2.327-5.602z" />
          </motion.svg>
          Order on WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

export { collections, ProductCard };
