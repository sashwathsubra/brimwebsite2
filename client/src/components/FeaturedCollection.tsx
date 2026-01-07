import { motion, AnimatePresence } from "framer-motion";
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
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

type ProductColor = 'red' | 'green' | 'multicolor';
type ProductDensity = 'Thin' | 'Thick';

interface ProductItem {
  name: string;
  size: string;
  features: string[];
  images: string[];
  greenImages?: string[];
  multiColorImages?: string[];
  hasDualColor?: boolean;
}

const products: ProductItem[] = [
  {
    name: "Red Dot Matrix Clock",
    size: "Size: 13\" x 4.5\" (33cm x 11.5cm)",
    features: ["Single Colour (Red)", "Dual Font Support", "High Visibility Display", "USB Powered"],
    images: [dot_single_red, dot_double_red],
    hasDualColor: true,
  },
  {
    name: "Dual Colour Matrix Clock",
    size: "Size: 13\" x 4.5\" (33cm x 11.5cm)",
    features: ["Dual Colour (Red & Green)", "Switchable Display Mode", "Dual Font Support", "USB Powered"],
    images: [dot_single_red, dot_double_red, dot_single_green, dot_double_green],
    hasDualColor: true,
  },
  {
    name: "Multi Colour Calender Clock",
    size: "Size: 15\" x 7\" (38cm x 18cm)",
    features: ["7 Multi Colour Display", "Full Date & Day Display", "Temperature Sensor", "Alarm Function"],
    images: [new_calender_red_1],
    greenImages: [multicolor_green, multicolor_green_2],
    multiColorImages: [multicolor_red, multicolor_red_2, multicolor_dual, multicolor_dual_2, multicolor_dual_3, multicolor_dual_4],
    hasDualColor: true,
  },
  {
    name: "Mini LED Clock",
    size: "Size: 10\" x 3.5\" (25cm x 9cm)",
    features: ["Compact Design", "Red & Green Options", "Crystal Clear Digits", "Table/Wall Mount"],
    images: [miniled_red, miniled_green],
  },
  {
    name: "Jumbo LED Clock",
    size: "Size: 18\" x 7.5\" (45cm x 19cm)",
    features: ["Extra Large Display", "Ideal for Large Halls", "Brightness Control", "Remote Operated"],
    images: [jumbolednew],
  }
];

const ProductImages = ({ images, scrollToIndex, badge }: { images: string[]; scrollToIndex?: number; badge?: React.ReactNode }) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api || scrollToIndex === undefined) return;
    api.scrollTo(scrollToIndex);
  }, [api, scrollToIndex]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-white/5">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
                <img
                  src={src}
                  alt="Product view"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {badge && <div className="absolute left-4 top-4 z-10">{badge}</div>}
    </div>
  );
};

const ProductCard = ({ item }: { item: ProductItem }) => {
  const [color, setColor] = useState<ProductColor>('red');
  const [density, setDensity] = useState<ProductDensity>('Thin');
  const phone = "919445887243";

  // --- AUTO-ROTATE LOGIC: 1 SECOND ---
  useEffect(() => {
    const timer = setInterval(() => {
      if (item.name === "Dual Colour Matrix Clock") {
        setDensity(d => {
          if (d === "Thin") return "Thick";
          setColor(c => c === "red" ? "green" : "red");
          return "Thin";
        });
      } else if (item.name === "Red Dot Matrix Clock") {
        setDensity(d => d === "Thin" ? "Thick" : "Thin");
      } else if (item.name === "Multi Colour Calender Clock") {
        setColor(c => {
          if (c === "red") return "green";
          if (c === "green") return "multicolor";
          return "red";
        });
      } else if (item.name === "Mini LED Clock") {
        setColor(c => c === "red" ? "green" : "red");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [item.name]);

  let currentImages = item.images;
  let scrollToIndex = 0;

  if (item.name === "Multi Colour Calender Clock") {
    currentImages = [...(item.images || []), ...(item.greenImages || []), ...(item.multiColorImages || [])];
    if (color === 'green') scrollToIndex = (item.images?.length || 0);
    else if (color === 'multicolor') scrollToIndex = (item.images?.length || 0) + (item.greenImages?.length || 0);
  } else if (item.name === "Red Dot Matrix Clock") {
    scrollToIndex = density === "Thick" ? 1 : 0;
  } else if (item.name === "Dual Colour Matrix Clock") {
    const colorOffset = color === "green" ? 2 : 0;
    const densityOffset = density === "Thick" ? 1 : 0;
    scrollToIndex = colorOffset + densityOffset;
  } else if (item.name === "Mini LED Clock") {
    scrollToIndex = color === "green" ? 1 : 0;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group h-full w-full flex flex-col md:flex-row md:items-center md:gap-16 mx-auto glass-effect rounded-3xl md:p-10 overflow-hidden border border-white/10"
    >
      <div className="relative w-full md:w-1/2 flex-shrink-0">
        <ProductImages
          images={currentImages}
          scrollToIndex={scrollToIndex}
          badge={
            <div className="flex flex-col gap-2">
              <div className="bg-black/70 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full shadow-2xl">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.2em]">Auto-Display</span>
              </div>
            </div>
          }
        />
      </div>

      <div className="flex flex-col flex-grow w-full md:w-1/2 p-6 sm:p-8 md:p-0">
        <div className="mb-6">
          <h3 className="mb-2 font-body font-bold text-3xl sm:text-4xl text-white text-center md:text-left tracking-tight">
            {item.name}
          </h3>
          <div className="inline-flex items-center justify-center md:justify-start w-full md:w-auto">
            <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-sm font-medium text-gray-400">
              {item.size}
            </span>
          </div>
        </div>

        {/* FEATURE LIST */}
        <div className="space-y-4 mb-10">
          {item.features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 text-gray-300"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              <span className="text-lg font-medium tracking-wide">{feature}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href={`https://wa.me/${phone}?text=Enquiry about ${item.name}`}
            target="_blank"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-black px-10 py-4 font-bold text-xs uppercase tracking-[0.25em] rounded-xl hover:bg-amber-400 transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
          >
            Enquire Now
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedCollection = () => {
  return (
    <section id="products" className="bg-black px-4 py-24 sm:px-6 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.1, scale: 1.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-white pointer-events-none uppercase tracking-widest whitespace-nowrap"
          >
            Collection
          </motion.div>
          <p className="mb-4 font-body text-sm font-bold tracking-[0.4em] text-amber-500 uppercase">
            Premium Timepieces
          </p>
          <h2 className="font-body font-bold text-5xl sm:text-6xl md:text-7xl text-white tracking-tighter">
            Featured <span className="text-zinc-500">Clocks</span>
          </h2>
        </div>

        <div className="flex flex-col gap-12 sm:gap-20 md:gap-32">
          {products.map((product, index) => (
            <ProductCard key={index} item={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;