import { motion } from "framer-motion";

import dot_single_red from "@/assets/new_dot_single.jpeg";
import dot_single_green from "@/assets/new_dot_single_green.jpeg";
import dot_double_red from "@/assets/new_dot_double.jpeg";
import dot_double_green from "@/assets/new_dot_double_green.jpeg";
import new_calender_red_1 from "@/assets/new_calender_red_1.jpeg";
import multicolor_red from "@/assets/new_multi_colour_red.jpeg";
import multicolor_green from "@/assets/new_multicolour_green.jpeg";
import multicolor_dual from "@/assets/new_multicolour_dual.jpeg";
import miniled_red from "@/assets/miniled_red.jpeg";
import miniled_green from "@/assets/minled_green.jpeg";
import jumbolednew from "@/assets/jumbolednew.jpeg";

/* ---------------- TYPES ---------------- */

type ProductItem = {
  images: string[];
  name: string;
  features: string[];
  size?: string;
};

/* ---------------- DATA ---------------- */

const collections: ProductItem[] = [
  {
    images: [miniled_red],
    name: "Mini Clock Red",
    features: [
      "Suitable for home, office, executive cabin",
      "1 inch seven segment LED display",
      "Wall mountable / table top",
    ],
    size: "14 × 6.5 × 3.5 cm",
  },
  {
    images: [miniled_green],
    name: "Mini Clock Green",
    features: [
      "Suitable for home, office, executive cabin",
      "1 inch seven segment LED display",
      "Wall mountable / table top",
    ],
    size: "14 × 6.5 × 3.5 cm",
  },
  {
    images: [dot_single_red],
    name: "Red Dot Matrix Clock",
    features: [
      "7×30 LED dot matrix",
      "User selectable font",
      "Wall mountable / table top",
    ],
    size: "26 × 8 cm",
  },
  {
    images: [dot_single_green],
    name: "Green Dot Matrix Clock",
    features: [
      "7×30 LED dot matrix",
      "User selectable font",
      "Wall mountable / table top",
    ],
    size: "26 × 8 cm",
  },
  {
    images: [new_calender_red_1],
    name: "Calendar Clock",
    features: [
      "14×56 dot matrix calendar",
      "Reception & office use",
      "Wall mountable / table top",
    ],
    size: "26 × 8 cm",
  },
  {
    images: [multicolor_red, multicolor_green, multicolor_dual],
    name: "Multi Colour Calendar Clock",
    features: [
      "Red / Green / Dual colour",
      "Calendar + Time display",
      "Wall mountable / table top",
    ],
    size: "26 × 8 cm",
  },
  {
    images: [jumbolednew],
    name: "Jumbo Clock",
    features: [
      "Factory / temple / mosque use",
      "High visibility LEDs",
      "Wall mountable / hanging",
    ],
    size: "90 × 30 cm",
  },
];

/* ---------------- COMPONENTS ---------------- */

const ProductCard = ({ product }: { product: ProductItem }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group rounded-lg border border-border bg-card p-4 shadow-sm"
    >
      <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>

      {product.size && (
        <p className="mt-1 text-sm text-muted-foreground">
          Size: {product.size}
        </p>
      )}

      <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
        {product.features.map((f, i) => (
          <li key={i}>• {f}</li>
        ))}
      </ul>
    </motion.div>
  );
};

/* ---------------- MAIN ---------------- */

const FeaturedCollection = () => {
  return (
    <section
      id="products"
      className="mx-auto max-w-7xl px-4 py-20"
    >
      <h2 className="mb-10 text-center text-3xl font-semibold">
        Featured Collection
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollection;
