import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import dot_single_red from "@/assets/new_dot_single.jpeg";
import dot_single_green from "@/assets/new_dot_single_green.jpeg";
import dot_double_red from "@/assets/new_multicolour_red.jpeg";
import dot_double_green from "@/assets/new_multicolour_green.jpeg";
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
type ProductItem = {
  images: string[];
  name: string;
  size?: string;
  features?: string[];
  greenImages?: string[];
  multiColorImages?: string[];
};

// ------------------------
// Products Array
// ------------------------
const collections: ProductItem[] = [
  { name: "Mini Clock Red", images: [miniled_red], size: "14 x 6.5 cm", features: ["Suitable for home, office, executive cabin, etc..."] },
  { name: "Mini Clock Green", images: [miniled_green], size: "14 x 6.5 cm", features: ["Suitable for home, office, executive cabin, etc..."] },
  { name: "Red Dot Matrix Clock", images: [dot_single_red, dot_double_red], size: "26 x 8 cm", features: ["Suitable for home, office, executive cabin, etc..."] },
  { name: "Dual Colour Matrix Clock", images: [dot_single_red, dot_double_red], greenImages: [dot_single_green, dot_double_green], size: "26 x 8 cm", features: ["Suitable for home, office, executive cabin, etc..."] },
  { name: "Calendar Clock", images: [new_calender_red_1], size: "26 x 8 cm", features: ["Suitable for executive cabin, home halls, office reception, etc..."] },
  { name: "Multi Colour Calender Clock", images: [multicolor_red, multicolor_red_2], greenImages: [multicolor_green, multicolor_green_2], multiColorImages: [multicolor_dual, multicolor_dual_2, multicolor_dual_3, multicolor_dual_4], size: "65 x 8 cm", features: ["Suitable for executive cabin, home halls, office reception, etc..."] },
  { name: "Jumbo Clock", images: [jumbolednew], size: "90 x 30 cm", features: ["Suitable for factory, temple, church, mosque, auditorium, etc..."] },
];

// ----------------------------
// Smooth Hero-Style Carousel Component
// ----------------------------
const ProductImages = ({ images, isWide }: { images: string[]; isWide?: boolean }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % images.length), 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full flex justify-center overflow-hidden bg-white rounded-xl" style={{ height: isWide ? 320 : 250 }}>
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={images[index]}
          alt={`product-${index}`}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ x: { type: "spring", stiffness: 120, damping: 25 }, opacity: { duration: 0.3 } }}
          className={`absolute top-0 left-1/2 -translate-x-1/2 h-full object-contain rounded-xl ${isWide ? "px-20 md:px-32" : "px-4"}`}
        />
      </AnimatePresence>
    </div>
  );
};

// ----------------------------
// Product Card Component
// ----------------------------
const ProductCard = ({ item }: { item: ProductItem }) => {
  let images = [...item.images];
  if (item.greenImages) images.push(...item.greenImages);
  if (item.multiColorImages) images.push(...item.multiColorImages);
  const isWide = item.name === "Jumbo Clock";

  return (
    <motion.div
      key={item.name}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group flex flex-col md:flex-row md:items-center md:gap-16 mx-auto glass-effect rounded-2xl p-4 md:p-10 overflow-hidden hover:bg-white/[0.03] transition-colors border border-white/5"
    >
      <div className="relative w-full md:w-1/2 flex justify-center">
        <ProductImages images={images} isWide={isWide} />
      </div>

      <div className="flex flex-col flex-grow w-full md:w-1/2 p-2 md:p-0 md:pl-6 select-none">
        <h3 className="mb-3 font-body font-semibold text-3xl text-gray-100 text-center md:text-left md:text-4xl md:mb-5 drop-shadow-lg group-hover:text-amber-400">
          {item.name}
        </h3>
        {item.size && <div className="mb-4 inline-block bg-white/10 px-4 py-2 rounded-lg text-gray-100 font-semibold">{item.size}</div>}
        {item.features?.map((f, i) => (
          <p key={i} className="text-gray-300 mb-1">{f}</p>
        ))}
      </div>
    </motion.div>
  );
};

// ----------------------------
// Featured Collection Component
// ----------------------------
export default function FeaturedCollection() {
  return (
    <div className="space-y-12 px-4 md:px-12 lg:px-24">
      {collections.map((item) => <ProductCard key={item.name} item={item} />)}
    </div>
  );
}
