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

// ... (Constants placeWordList and renderFeatureText remain exactly the same as your file)

const ProductCard = ({ item }: { item: ProductItem }) => {
  const [color, setColor] = useState<ProductColor>('red');
  const [density, setDensity] = useState<ProductDensity>('Thin');
  const [autoIndex, setAutoIndex] = useState(0); // For cycling multi-color
  const phone = "919445887243";

  // AUTO-ROTATE LOGIC: Every 1 second
  useEffect(() => {
    const timer = setInterval(() => {
      if (item.name === "Dual Colour Matrix Clock") {
        // Cycle: Red-Thin -> Red-Thick -> Green-Thin -> Green-Thick
        setDensity(prev => prev === "Thin" ? "Thick" : "Thin");
        setDensity(currentDensity => {
            if (currentDensity === "Thin") setColor(prev => prev === "red" ? "green" : "red");
            return currentDensity;
        });
      } else if (item.name === "Red Dot Matrix Clock") {
        setDensity(prev => prev === "Thin" ? "Thick" : "Thin");
      } else if (item.name === "Multi Colour Calender Clock") {
        setColor(prev => {
            if (prev === "red") return "green";
            if (prev === "green") return "multicolor";
            return "red";
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [item.name]);

  const isMultiColourCalendar = item.name === "Multi Colour Calender Clock";
  const isRedDotMatrix = item.name === "Red Dot Matrix Clock";
  const isDualColourMatrix = item.name === "Dual Colour Matrix Clock";

  // Determine images based on auto-state
  let currentImages = (item.images as string[]);
  let scrollToIndex: number | undefined = undefined;

  if (isMultiColourCalendar) {
    const redImages = item.images ?? [];
    const greenImages = item.greenImages ?? [];
    const multiImages = item.multiColorImages ?? [];
    currentImages = [...redImages, ...greenImages, ...multiImages];
    scrollToIndex = color === "red" ? 0 : color === "green" ? redImages.length : redImages.length + greenImages.length;
  } else if (isRedDotMatrix) {
    currentImages = item.images ?? [];
    scrollToIndex = density === "Thick" ? 1 : 0;
  } else if (isDualColourMatrix) {
    currentImages = item.images ?? [];
    const colorOffset = color === "green" ? 2 : 0;
    const densityOffset = density === "Thick" ? 1 : 0;
    scrollToIndex = colorOffset + densityOffset;
  }

  return (
    <motion.div
      id={item.name.toLowerCase().replace(/\s+/g, '-')}
      className="group h-full w-full flex flex-col md:flex-row md:items-center md:gap-16 mx-auto glass-effect rounded-2xl md:p-10 overflow-hidden border border-white/5"
    >
      <div className="relative w-full md:w-1/2 flex-shrink-0">
        <ProductImages
          images={currentImages}
          scrollToIndex={scrollToIndex}
          badge={item.hasDualColor ? (
            <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Auto-Switching Display
              </span>
            </div>
          ) : null}
        />
      </div>

      <div className="flex flex-col flex-grow w-full md:w-1/2 p-4 sm:p-5 md:p-0 md:pl-6 select-none">
        <motion.h3 className="mb-3 font-body font-semibold text-3xl text-gray-100 text-center md:text-left md:text-4xl md:mb-5">
          {item.name}
        </motion.h3>

        {item.size && (
          <div className="inline-block max-w-full rounded-lg bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold text-gray-100 text-center md:text-left mb-8">
            {item.size}
          </div>
        )}

        {/* ❌ BUTTONS REMOVED - The toggles that were here are deleted ❌ */}

        <ul className="mt-2 list-none space-y-2 text-center md:text-left text-gray-300 mb-6">
          {item.features?.map((feature, i) => (
            <li key={i} className={`font-body flex items-center justify-center md:justify-start gap-3 ${i === 0 ? "text-xl text-amber-300 font-semibold" : "text-lg text-gray-200"}`}>
              {renderFeatureText(feature)}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-4 flex flex-col items-center md:items-start">
            <a
              href={`https://wa.me/${phone}?text=Enquiry about ${item.name}`}
              target="_blank"
              className="flex w-full md:w-auto items-center justify-center gap-3 bg-zinc-900 border border-white/10 px-8 py-3.5 font-bold text-xs uppercase tracking-[0.2em] text-white rounded-lg"
            >
              Enquire Now
            </a>
        </div>
      </div>
    </motion.div>
  );
};