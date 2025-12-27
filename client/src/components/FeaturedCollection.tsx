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


// Map each displayed image to its modern variants - Keeping this for type safety/future extensibility if needed
// For now, new webp images will be rendered directly via the fallback in ProductImages
const imageSources: Record<string, { png?: string; jpeg?: string; webp?: string[]; avif?: string[]; alt: string }> = {};

type ProductColor = "red" | "green" | "multicolor";
type ProductDensity = "Thin" | "Thick";

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
] as const;

const placeWordSet = new Set<string>(placeWordList.map((w) => w.toLowerCase()));

const placeWordSplitRegex = new RegExp(`\\b(${placeWordList.join("|")})\\b`, "gi");

function renderFeatureText(feature: string, options?: { highlightPlaces?: boolean }) {
  const highlightPlaces = options?.highlightPlaces ?? true;
  return feature.split(placeWordSplitRegex).map((part, index) => {
    if (placeWordSet.has(part.toLowerCase())) {
      return (
        <span
          key={`${index}-${part}`}
          className={
            highlightPlaces
              ? "inline-block text-[1.06em] font-semibold transition-colors duration-200 hover:text-teal-300 hover:drop-shadow-[0_2px_12px_rgba(45,212,191,0.35)] group-hover:text-teal-300 group-hover:drop-shadow-[0_2px_12px_rgba(45,212,191,0.25)]"
              : "inline-block text-[1.06em] font-semibold"
          }
        >
          {part}
        </span>
      );
    }
    return <span key={`${index}-${part}`}>{part}</span>;
  });
}

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
  colorDensityImages?: Partial<Record<Exclude<ProductColor, "multicolor">, Record<ProductDensity, string[]>>>;
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
    size: "Clock size: 14cm length, 6.5cm height and 3.5cm width",
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
    size: "Clock size: 14cm Length, 6.5cm height and 3.5cm width",
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
    size: "Clock size: 26cm length, 8 cm height",
    densityOptions: ["Thin", "Thick"],
    colorDensityImages: {
      red: {
        Thin: [dot_single_red],
        Thick: [dot_double_red],
      },
    },
  },
  {
    images: [dot_single_red, dot_double_red, dot_single_green, dot_double_green],
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
    size: "Clock size: 26cm length, 8 cm height",
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
    size: "Clock size: 26 cm length, 8 cm height.",
  },
  {
    images: [multicolor_red, multicolor_red_2],
    name: "Multi Colour Calender Clock",
    price: "",
    category: "",
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
    price: "",
    category: "",
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

const toKebabCase = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const ProductImages = ({
  images,
  label,
  imageStyle,
  badge,
  badgeClassName,
  scrollToIndex,
  onSelectedIndexChange,
}: {
  images: string[];
  label?: string;
  imageStyle?: React.CSSProperties;
  badge?: React.ReactNode;
  badgeClassName?: string;
  scrollToIndex?: number;
  onSelectedIndexChange?: (index: number) => void;
}) => {
  const hasMultipleImages = images.length > 1;
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      const nextSelected = api.selectedScrollSnap();
      setSelected(nextSelected);
      onSelectedIndexChange?.(nextSelected);
    };
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelectedIndexChange]);
  useEffect(() => {
    if (!api) return;
    if (!images.length) return;
    api.scrollTo(0);
    setSelected(0);
  }, [api, images]);

  useEffect(() => {
    if (!api) return;
    if (scrollToIndex == null) return;
    if (scrollToIndex < 0) return;
    if (scrollToIndex >= images.length) return;
    if (api.selectedScrollSnap() === scrollToIndex) return;
    api.scrollTo(scrollToIndex);
  }, [api, images.length, scrollToIndex]);
  return (
    <div className="relative overflow-hidden">
      {/* {badge ? <div className={`absolute top-4 right-4 z-20 ${badgeClassName ?? ""}`}>{badge}</div> : null} */}
      <Carousel opts={{ loop: hasMultipleImages }} setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i}>
              <div className="relative h-64 sm:h-72 md:h-80 w-full flex items-center justify-center bg-white">

                {imageSources[src] ? (
                  <picture>
                    {imageSources[src].avif?.length ? (
                      <source
                        type="image/avif"
                        srcSet={imageSources[src].avif.join(", ")}
                        sizes="(min-width: 1280px) 420px, (min-width: 1024px) 33vw, 50vw"
                      />
                    ) : null}
                    {imageSources[src].webp?.length ? (
                      <source
                        type="image/webp"
                        srcSet={imageSources[src].webp.join(", ")}
                        sizes="(min-width: 1280px) 420px, (min-width: 1024px) 33vw, 50vw"
                      />
                    ) : null}
                    <img
                      src={imageSources[src].png || imageSources[src].jpeg || src}
                      alt={imageSources[src].alt}
                      className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      style={imageStyle}
                    />
                  </picture>
                ) : (
                  <img
                    src={src}
                    alt={`image-${i + 1}`}
                    className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                    style={imageStyle}
                  />
                )}

    {/* ✅ BADGE INSIDE IMAGE (Dual Colour Matrix Clock only) */}
    {badge && (
      <div className="absolute top-3 right-3 z-20">
        {badge}
      </div>
    )}

              </div>
            </CarouselItem>

          ))}
        </CarouselContent>
        {hasMultipleImages ? (
          <>
            <CarouselPrevious className="top-1/2 left-3 hidden -translate-y-1/2 rounded-full shadow-lg bg-zinc-800/70 text-white hover:bg-zinc-800/90 border border-white/10 backdrop-blur-sm md:inline-flex h-10 w-10" />
            <CarouselNext className="top-1/2 right-3 hidden -translate-y-1/2 rounded-full shadow-lg bg-zinc-800/70 text-white hover:bg-zinc-800/90 border border-white/10 backdrop-blur-sm md:inline-flex h-10 w-10" />
          </>
        ) : null}
      </Carousel>

      {/* Product Name Overlay */}
      {label && (
        <div className="absolute bottom-4 left-0 right-0 z-10 flex items-center justify-center">
          <span className="bg-background/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-foreground shadow-md">
            {label}
          </span>
        </div>
      )}

      {hasMultipleImages ? (
        <div className="pointer-events-auto absolute bottom-3 left-1/2 z-10 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`View image ${i + 1}`}
              className={`${selected === i ? "w-6 bg-amber-400" : "w-3 bg-muted-foreground/50 hover:bg-muted-foreground"} h-1.5 transition-all`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

const ProductCard = ({ item }: { item: ProductItem }) => {
  const [color, setColor] = useState<ProductColor>('red');
  const [size, setSize] = useState<string>('');
  const [density, setDensity] = useState<ProductDensity>('Thin');
  const [hasInteractedWithOptions, setHasInteractedWithOptions] = useState(false);
  const phone = "919445887243";

  useEffect(() => {
    if (item.sizeOptions) {
      const options = item.sizeOptions[color];
      if (options && options.length > 0) {
        if (!options.includes(size)) {
          setSize(options[0]);
        }
      }
    }
  }, [color, item, size]);

  const hasDualColor = !!item.hasDualColor;

  const buildWhatsAppUrl = (product: string) => {
    const colorLabel = color === "red" ? "Red" : color === "green" ? "Green" : "Multi";
    let details = product;

    if (hasDualColor && item.name !== "Calendar Clock" && item.name !== "Dual Colour Matrix Clock" && item.name !== "Multi Colour Calender Clock") {
      details = `${colorLabel} Color ${item.name.replace("Clock", "").trim()} Clock`;
    }

    if (item.name === "Multi Colour Calender Clock" && color === "multicolor") {
      details = "Multi Colour Calender Clock";
    }

    if (item.name === "Calendar Clock" && size) {
      details += ` - Size: ${size}`;
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(
      `Hello! I'm interested in ordering the ${details}. Please provide more details.`,
    )}`;
  };

  const isMultiColourCalendar = item.name === "Multi Colour Calender Clock";
  const isRedDotMatrix = item.name === "Red Dot Matrix Clock";
  const isDualColourMatrix = item.name === "Dual Colour Matrix Clock";

  const handleCarouselIndexChange = useCallback((index: number) => {
    if (isRedDotMatrix) {
      const nextDensity: ProductDensity = index === 1 ? "Thick" : "Thin";
      setHasInteractedWithOptions(true);
      setDensity((prev) => (prev === nextDensity ? prev : nextDensity));
      return;
    }

    if (isDualColourMatrix) {
      const nextColor: ProductColor = index >= 2 ? "green" : "red";
      const nextDensity: ProductDensity = index % 2 === 1 ? "Thick" : "Thin";
      setHasInteractedWithOptions(true);
      setColor((prev) => (prev === nextColor ? prev : nextColor));
      setDensity((prev) => (prev === nextDensity ? prev : nextDensity));
      return;
    }

    if (isMultiColourCalendar) {
      const redCount = item.images?.length ?? 0;
      const greenCount = item.greenImages?.length ?? 0;
      const nextColor: ProductColor =
        index < redCount ? "red" : index < redCount + greenCount ? "green" : "multicolor";
      setHasInteractedWithOptions(true);
      setColor((prev) => (prev === nextColor ? prev : nextColor));
    }
  }, [isDualColourMatrix, isMultiColourCalendar, isRedDotMatrix, item.greenImages?.length, item.images?.length]);

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
  } else if (hasInteractedWithOptions) {
    if (hasDualColor && color === 'green' && item.greenImages) {
      currentImages = item.greenImages;
    } else if ('hasTriColor' in item && item.hasTriColor && color === 'multicolor' && item.multiColorImages) {
      currentImages = item.multiColorImages;
    }

    if (item.densityOptions && item.colorDensityImages && (color === "red" || color === "green")) {
      const densityImages = item.colorDensityImages[color]?.[density];
      if (densityImages?.length) currentImages = densityImages;
    }
  }

  const imageStyle = undefined;

  const displayedFeatures =
    item.name === "Calendar Clock" && size
      ? item.features?.map((feature) =>
        feature.toLowerCase().includes("dot matrix calendar clock") ? `${size} dot matrix calendar clock` : feature,
      )
      : item.features;

  return (
    <motion.div
      id={item.name.toLowerCase().replace(/\s+/g, '-')}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group cursor-pointer h-full w-full flex flex-col md:flex-row md:items-center md:gap-16 mx-auto glass-effect rounded-2xl md:p-10 overflow-hidden hover:bg-white/[0.03] transition-colors border border-white/5"
    >
      {/* Left Column: Image + Badges */}
      <motion.div
        className="relative w-full md:w-1/2 flex-shrink-0"
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <ProductImages
            images={currentImages}
            imageStyle={imageStyle}
            scrollToIndex={scrollToIndex}
            onSelectedIndexChange={handleCarouselIndexChange}
            badge={item.name === "Dual Colour Matrix Clock" ? (
              <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  2 Colors in 1 Clock
                </span>
              </div>
            ) : null}
          />

          {/* ✅ OUTSIDE image badge — Multi Colour Calender Clock */}
          {item.name === "Multi Colour Calender Clock" && (
            <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                2 Colors in 1 Clock
              </span>
            </div>
          )}
        </motion.div>

        {/* Decorative Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10 rounded-full" />



        {/* Mini LED Badge */}
        {item.name === "Mini LED Clock" && (
          <div className="absolute top-4 right-4 z-20 bg-primary/20 backdrop-blur-md border border-primary/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Mini LED</span>
          </div>
        )}
      </motion.div>

      {/* Right Column: Content + Toggles */}
      <div className="flex flex-col flex-grow w-full md:w-1/2 p-4 sm:p-5 md:p-0 md:pl-6 select-none">

        {item.category ? (
          <p className="mb-2 font-body text-sm uppercase tracking-widest text-muted-foreground md:text-left text-center">{item.category}</p>
        ) : null}

        <motion.h3
          layout
          className="mb-3 font-body font-semibold text-3xl text-gray-100 transition-colors group-hover:text-amber-400 text-center md:text-left md:text-4xl md:mb-5 drop-shadow-lg"
        >
          {item.name}
        </motion.h3>
        <p className="font-body text-2xl text-amber-400 text-center md:text-left mb-4 tracking-wide font-medium">{item.price}</p>
        {item.size ? (
          <div className="inline-block max-w-full break-words rounded-lg bg-white/10 border border-white/10 px-4 py-2 text-sm sm:text-base font-semibold text-gray-100 text-center md:text-left tracking-wide leading-relaxed backdrop-blur-sm shadow-sm mb-8">
            {item.size}
          </div>
        ) : null}

        {/* Toggles / Options Section */}
        {hasDualColor || item.sizeOptions || item.densityOptions ? (
          <div className="flex flex-col items-center md:items-start justify-center md:justify-start -mt-2 mb-8 md:mb-6 relative z-20 space-y-5">

            {hasDualColor ? (
              item.name === "Multi Colour Calender Clock" ? (
                <div className="flex flex-col items-center md:items-start gap-3">
                  <div
                    className="relative h-9 w-56 cursor-pointer rounded-full bg-black/60 border border-white/10 backdrop-blur-md shadow-inner transition-transform active:scale-95"
                    onClick={() => {
                      setHasInteractedWithOptions(true);
                      setColor((prev) => (prev === "red" ? "green" : prev === "green" ? "multicolor" : "red"));
                    }}
                  >
                    <div className="absolute inset-0 grid grid-cols-3 place-items-center px-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      <span>Red</span>
                      <span>Green</span>
                      <span>Multi</span>
                    </div>
                    <motion.div
                      className={`absolute top-1 h-7 w-[4.5rem] rounded-full shadow-lg flex items-center justify-center ${color === "red"
                        ? "bg-gradient-to-r from-red-600 to-red-500 shadow-red-900/40"
                        : color === "green"
                          ? "bg-gradient-to-r from-green-600 to-green-500 shadow-green-900/40"
                          : "bg-gradient-to-r from-amber-600 to-amber-500 shadow-amber-900/40"
                        }`}
                      initial={false}
                      animate={{
                        x: color === "red" ? 4 : color === "green" ? 76 : 148,
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white drop-shadow-sm">
                        {color === "red" ? "Red" : color === "green" ? "Green" : "Multi"}
                      </span>
                    </motion.div>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium ml-1">TAP TO SWITCH COLOR</span>
                </div>
              ) : item.name === "Dual Colour Matrix Clock" ? (
                <div className="flex flex-col items-center gap-5 md:flex-row md:items-start md:gap-8">
                  <div className="flex flex-col items-center md:items-start gap-3">
                    <div
                      className="relative h-9 w-44 cursor-pointer rounded-full bg-black/60 border border-white/10 backdrop-blur-md shadow-inner transition-transform active:scale-95"
                      onClick={() => { setHasInteractedWithOptions(true); setColor(prev => prev === 'red' ? 'green' : 'red'); }}
                    >
                      <div className="absolute inset-0 flex items-center justify-between px-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        <span>Red</span>
                        <span>Green</span>
                      </div>
                      <motion.div
                        className={`absolute top-1 h-7 w-[5.5rem] rounded-full shadow-lg flex items-center justify-center ${color === 'red' ? 'bg-gradient-to-r from-red-600 to-red-500 shadow-red-900/40' : 'bg-gradient-to-r from-green-600 to-green-500 shadow-green-900/40'
                          }`}
                        initial={false}
                        animate={{
                          x: color === 'red' ? 4 : 84,
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      >
                        <span className="text-[11px] font-bold uppercase tracking-wider text-white drop-shadow-sm">
                          {color === 'red' ? 'Red' : 'Green'}
                        </span>
                      </motion.div>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium ml-1">TAP TO SWITCH COLOR</span>
                  </div>
                  {item.densityOptions ? (
                    <div className="flex flex-col items-center md:items-start gap-3">
                      <div
                        className="relative h-9 w-44 cursor-pointer rounded-full bg-black/60 border border-white/10 backdrop-blur-md shadow-inner transition-transform active:scale-95"
                        onClick={() => { setHasInteractedWithOptions(true); setDensity(prev => prev === 'Thin' ? 'Thick' : 'Thin'); }}
                      >
                        <div className="absolute inset-0 flex items-center justify-between px-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          <span>Thin</span>
                          <span>Thick</span>
                        </div>
                        <motion.div
                          className="absolute top-1 h-7 w-[5.5rem] rounded-full shadow-lg flex items-center justify-center bg-gradient-to-r from-amber-600 to-amber-500 shadow-amber-900/40"
                          initial={false}
                          animate={{
                            x: density === 'Thin' ? 4 : 84,
                          }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        >
                          <span className="text-[11px] font-bold uppercase tracking-wider text-white drop-shadow-sm">
                            {density}
                          </span>
                        </motion.div>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium ml-1">TAP TO SWITCH FONT</span>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="inline-flex items-center p-1.5 rounded-full bg-zinc-950/80 border border-white/10 backdrop-blur-xl shadow-2xl">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setHasInteractedWithOptions(true);
                      setColor('red');
                    }}
                    className={`group flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${color === 'red'
                      ? 'bg-gradient-to-br from-zinc-800 to-zinc-900 text-white shadow-lg border border-white/10'
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                      }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${color === 'red' ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)] scale-110' : 'bg-red-900/30'
                      }`} />
                    Red
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setHasInteractedWithOptions(true);
                      setColor('green');
                    }}
                    className={`group flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${color === 'green'
                      ? 'bg-gradient-to-br from-zinc-800 to-zinc-900 text-white shadow-lg border border-white/10'
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                      }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${color === 'green' ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,1)] scale-110' : 'bg-green-900/30'
                      }`} />
                    Green
                  </button>
                </div>
              )
            ) : null}

            {!hasDualColor && item.name === "Red Dot Matrix Clock" && item.densityOptions ? (
              <div className="flex flex-col items-center md:items-start gap-3">
                <div
                  className="relative h-9 w-44 cursor-pointer rounded-full bg-black/60 border border-white/10 backdrop-blur-md shadow-inner transition-transform active:scale-95"
                  onClick={() => { setHasInteractedWithOptions(true); setDensity(prev => prev === 'Thin' ? 'Thick' : 'Thin'); }}
                >
                  <div className="absolute inset-0 flex items-center justify-between px-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    <span>Thin</span>
                    <span>Thick</span>
                  </div>
                  <motion.div
                    className="absolute top-1 h-7 w-[5.5rem] rounded-full shadow-lg flex items-center justify-center bg-gradient-to-r from-amber-600 to-amber-500 shadow-amber-900/40"
                    initial={false}
                    animate={{
                      x: density === 'Thin' ? 4 : 84,
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white drop-shadow-sm">
                      {density}
                    </span>
                  </motion.div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium ml-1">TAP TO SWITCH FONT</span>
              </div>
            ) : null}

            {/* Size Selector */}
            {item.sizeOptions && (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                {item.sizeOptions[color]?.map((s) => (
                  <button
                    key={s}
                    onClick={(e) => {
                      e.preventDefault();
                      setSize(s);
                    }}
                    className={`px-4 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-300 ${size === s
                      ? 'bg-white text-black border-white shadow-lg scale-105 font-bold'
                      : 'bg-black/20 text-gray-400 border-white/5 hover:border-white/20 hover:text-gray-200 hover:bg-white/5'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {/* Density Selector */}
            {item.densityOptions && item.name !== "Dual Colour Matrix Clock" && item.name !== "Red Dot Matrix Clock" && (
              <div className="flex flex-col items-center md:items-start gap-3 mt-1">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                  {item.densityOptions.map((d) => (
                    <button
                      key={d}
                      onClick={(e) => {
                        e.preventDefault();
                        setDensity(d);
                      }}
                      className={`px-4 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-300 ${density === d
                        ? 'bg-white text-black border-white shadow-lg scale-105 font-bold'
                        : 'bg-black/20 text-gray-400 border-white/5 hover:border-white/20 hover:text-gray-200 hover:bg-white/5'
                        }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium ml-1">TAP TO SWITCH FONTS</span>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:block -mt-2 md:h-6" />
        )}

        <ul className="mt-2 list-none space-y-2 text-center md:text-left text-gray-300 mb-6">
          {displayedFeatures?.map((feature, i) => (
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className={`group font-body flex items-center justify-center md:justify-start gap-3 ${i === 0
                ? "text-xl sm:text-2xl text-amber-300 font-semibold drop-shadow-[0_2px_12px_rgba(251,191,36,0.25)]"
                : "text-lg text-gray-200"
                }`}
            >
              <span className={`w-1 h-1 rounded-full hidden md:block transition-colors duration-200 ${i === 0 ? "bg-primary/60 group-hover:bg-teal-300" : "bg-primary/60"}`} />
              <span
                className={`leading-snug transition-all duration-200 ${i === 0
                  ? "group-hover:text-teal-200 group-hover:drop-shadow-[0_2px_14px_rgba(45,212,191,0.35)]"
                  : "group-hover:text-gray-100 group-hover:drop-shadow-[0_2px_14px_rgba(45,212,191,0.25)]"
                  }`}
              >
                {renderFeatureText(feature, { highlightPlaces: i !== 0 })}
              </span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-auto pt-4 flex flex-col items-center md:items-start gap-5">
          <div className="group/btn relative inline-block w-full md:w-auto">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-amber-300 rounded-lg blur opacity-30 group-hover/btn:opacity-75 transition duration-500"></div>
            <a
              href={buildWhatsAppUrl(item.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex w-full md:w-auto md:inline-flex items-center justify-center gap-3 bg-zinc-900 border border-white/10 px-8 py-3.5 font-body font-bold text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-zinc-800 rounded-lg shadow-lg"
            >
              <motion.svg
                initial={{ rotate: 0 }}
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                viewBox="0 0 16 16" className="h-4 w-4 text-green-500" fill="currentColor" aria-hidden="true"
              >
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
              </motion.svg>
              Enquire Now
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedCollection = () => {


  return (
    <section id="products" className="bg-charcoal px-4 py-20 sm:px-6 sm:py-24 md:py-32 scroll-mt-20 md:scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-3 font-body text-base font-medium tracking-[0.18em] text-primary">
            Complete Range
          </p>
          <h2 className="mb-6 font-body font-semibold text-3xl text-foreground sm:text-4xl md:text-5xl">
            Our Products
          </h2>
          <div className="mx-auto h-px w-20 bg-primary" />
        </div>

        {/* Collection grid: 2 columns on tablet/desktop for 2×2 layout */}
        <div className="grid gap-8 grid-cols-1">
          {collections.map((item) => {
            const id = `product-${toKebabCase(item.name)}`;
            return (
              <div key={id} id={id} className="scroll-mt-24">
                <ProductCard item={item} />
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
};

export default FeaturedCollection;
