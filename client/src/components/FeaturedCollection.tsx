import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { FaWhatsapp } from "react-icons/fa";

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

const placeWordMap: Record<string, string> = {
  home: "Home",
  office: "Office",
  executive: "Executive",
  cabin: "Cabin",
  mosque: "Mosque",
  temple: "Temple",
  church: "Church",
  hospital: "Hospital",
  clinic: "Clinic",
  school: "School",
  college: "College",
  showroom: "Showroom",
  shop: "Shop",
  restaurant: "Restaurant",
  hotel: "Hotel",
  factory: "Factory",
  warehouse: "Warehouse",
};

const placeWordRegex = new RegExp(`\\b(${Object.keys(placeWordMap).join('|')})\\b`, 'gi');

function renderFeatureText(text: string) {
  return text.split(placeWordRegex).map((part, idx) => {
    const capitalized = placeWordMap[part.toLowerCase()];
    if (capitalized) {
      return (
        <span
          key={idx}
          className="inline-block font-semibold text-[1.06em] transition-colors duration-200 hover:text-teal-300 hover:drop-shadow-[0_2px_12px_rgba(45,212,191,0.35)]"
        >
          {capitalized}
        </span>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

type ProductItem = {
  name: string;
  images: string[];
  features: string[];
  size?: string;
};

const collections: ProductItem[] = [
  {
    name: "Mini Clock Red",
    images: [miniled_red],
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
    size: "Clock size: 14cm length, 6.5cm height, 3.5cm width",
  },
  {
    name: "Mini Clock Green",
    images: [miniled_green],
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
    size: "Clock size: 14cm length, 6.5cm height, 3.5cm width",
  },
  {
    name: "Red Dot Matrix Clock",
    images: [dot_single_red, dot_double_red],
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
    size: "Clock size: 26cm length, 8cm height",
  },
  {
    name: "Dual Colour Matrix Clock",
    images: [dot_single_red, dot_double_red, dot_single_green, dot_double_green],
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
    size: "Clock size: 26cm length, 8cm height",
  },
  {
    name: "Calendar Clock",
    images: [new_calender_red_1],
    features: [
      "Suitable for executive cabin, home halls, office reception",
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
    name: "Multi Colour Calender Clock",
    images: [multicolor_red, multicolor_red_2, multicolor_green, multicolor_green_2, multicolor_dual, multicolor_dual_2, multicolor_dual_3, multicolor_dual_4],
    features: [
      "Suitable for executive cabin, home halls, office reception",
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
      "Suitable for factory, temple, church, mosque, auditorium",
      "Epson RTC and Nuvoton microcontroller",
      "Built-in battery backup for 7 years and above",
      "Wall mountable / hanging",
      "12V power supply included",
      "More than 7 years durable without maintenance",
    ],
    size: "Clock size: 90cm length, 30cm height",
  },
];

const ProductImages = ({ images }: { images: string[] }) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api || images.length <= 1) return;
    const interval = setInterval(() => {
      api.scrollTo((api.selectedScrollSnap() + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [api, images]);

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg">
      <Carousel opts={{ loop: true }} setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i} className="h-64 sm:h-72 md:h-80 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl">
              <img src={src} alt={`carousel-${i}`} className="object-contain max-h-full max-w-full transition-transform duration-700 hover:scale-110" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 z-20 rounded-full p-2 bg-white/30 hover:bg-white/50" />
        <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 z-20 rounded-full p-2 bg-white/30 hover:bg-white/50" />
      </Carousel>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <div key={idx} className={`w-3 h-1.5 rounded-full transition-all ${selected === idx ? 'bg-amber-400 w-6' : 'bg-gray-400/50 hover:bg-gray-400'}`}></div>
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ item }: { item: ProductItem }) => {
  const phone = "919445887243";
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(`Hello! I'm interested in ordering the ${item.name}. Please provide more details.`)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10"
    >
      <div className="w-full md:w-1/2">
        <ProductImages images={item.images} />
      </div>
      <div className="w-full md:w-1/2 flex flex-col">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-3">{item.name}</h2>
        {item.size && <p className="mb-4 font-semibold text-gray-100 bg-white/10 px-4 py-2 rounded-lg shadow-sm">{item.size}</p>}
        <ul className="list-none space-y-2 mb-6">
          {item.features.map((f, idx) => (
            <li key={idx} className="flex items-start gap-2 text-gray-200">
              <span className="text-amber-400 font-bold">•</span>
              <span>{renderFeatureText(f)}</span>
            </li>
          ))}
        </ul>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-green-500/50 hover:bg-green-500/70 text-white font-semibold px-6 py-3 rounded-xl transition-all w-fit">
          <FaWhatsapp size={24} /> WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

export default function FeaturedCollections() {
  return (
    <div className="space-y-12 md:space-y-16 px-4 md:px-16 py-8">
      {collections.map((item, idx) => (
        <ProductCard key={idx} item={item} />
      ))}
    </div>
  );
}
