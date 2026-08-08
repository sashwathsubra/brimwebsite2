import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/lib/seo";

type ProductRouteKey = "mini-led-clock-red" | "jumbo-led-clock" | "calendar-clock";

type ProductPageContent = {
  title: string;
  category: string;
  intro: string;
  features: string[];
  details: Array<{ label: string; value: string }>;
  ctaLabel: string;
  ctaText: string;
};

const productContent: Record<ProductRouteKey, ProductPageContent> = {
  "mini-led-clock-red": {
    title: "Mini LED Digital Clock (Red)",
    category: "Compact LED Wall Clock",
    intro:
      "A compact, high-visibility LED digital wall clock designed for bedrooms, offices, executive cabins, and small business spaces in Chennai.",
    features: [
      "Night-time readable display for smaller rooms and personal workspaces",
      "Reliable 7-segment LED output with clear visibility from a short distance",
      "Built-in lithium battery backup for continued operation during power interruptions",
      "Durable construction with a 1-year guarantee and easy installation",
    ],
    details: [
      { label: "Best for", value: "Homes, offices, executive cabins" },
      { label: "Power", value: "5V DC supply" },
      { label: "Finish", value: "ABS plastic body" },
      { label: "Availability", value: "In Chennai and across India" },
    ],
    ctaLabel: "Contact for pricing",
    ctaText: "Enquire about the Mini LED Digital Clock (Red) for your space.",
  },
  "jumbo-led-clock": {
    title: "Jumbo LED Clock",
    category: "Industrial LED Display",
    intro:
      "Built for large halls, schools, factories, warehouses, temples, churches, and mosques where visibility from a distance matters most.",
    features: [
      "High-bright LED output for long-distance visibility",
      "Ideal for large auditoriums, campuses, industrial spaces, and public institutions",
      "Wall or ceiling mounting friendly design with durable construction",
      "Suitable for environments that need dependable time display across large areas",
    ],
    details: [
      { label: "Best for", value: "Schools, factories, halls, public spaces" },
      { label: "Power", value: "12V DC supply" },
      { label: "Mounting", value: "Wall or ceiling compatible" },
      { label: "Availability", value: "Made in Chennai for delivery across India" },
    ],
    ctaLabel: "Request a bulk quote",
    ctaText: "Get details for the Jumbo LED Clock for your campus, campus, factory, or hall.",
  },
  "calendar-clock": {
    title: "Digital Calendar Clock",
    category: "Date and Time Display",
    intro:
      "A practical choice for homes, shops, offices, and executive cabins where the date and time need to be seen at a glance.",
    features: [
      "Clear date and time display in a compact format",
      "Useful for reception areas, offices, and customer-facing spaces",
      "Reliable battery backup and consistent operation",
      "Simple to install and suited for daily professional use",
    ],
    details: [
      { label: "Best for", value: "Homes, shops, offices, executive cabins" },
      { label: "Display", value: "Time, day, and date" },
      { label: "Power", value: "5V DC supply" },
      { label: "Availability", value: "Available in Chennai and nearby locations" },
    ],
    ctaLabel: "Ask about availability",
    ctaText: "Enquire about the digital calendar clock for your office or home.",
  },
};

const ProductPage = ({ routeKey }: { routeKey: ProductRouteKey }) => {
  useSeo(routeKey);

  const content = productContent[routeKey];
  const whatsappUrl = `https://wa.me/919445887243?text=${encodeURIComponent(
    `Hello! I am looking for the ${content.title} in Chennai. Please share details and pricing.`
  )}`;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow">
        <section className="px-4 pb-16 pt-28 md:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-black/20 p-6 shadow-2xl md:p-10">
            <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.3em] text-amber-400">
              <span>Brim Clocks</span>
              <span>•</span>
              <span>{content.category}</span>
            </div>

            <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
              {content.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {content.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-500"
              >
                <span>WhatsApp Us</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+919445887243"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-foreground transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-white/10 bg-background/70 p-6">
                <h2 className="text-xl font-semibold text-white">Why this product fits your space</h2>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {content.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-background/70 p-6">
                <h3 className="text-lg font-semibold text-white">Quick details</h3>
                <dl className="mt-5 space-y-4 text-sm text-muted-foreground">
                  {content.details.map((detail) => (
                    <div key={detail.label}>
                      <dt className="font-medium text-foreground">{detail.label}</dt>
                      <dd className="mt-1">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">Need help choosing the right display?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Brim Clocks supplies dependable LED clocks for homes, offices, banks, factories, schools, hospitals, and public spaces in Chennai and beyond. Contact us for product guidance, custom requirements, or a quotation.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <a href="mailto:brimdisplay@gmail.com" className="flex items-center gap-2 hover:text-white">
                  <Mail className="h-4 w-4 text-amber-400" />
                  brimdisplay@gmail.com
                </a>
                <a href="tel:+919445887243" className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4 text-amber-400" />
                  +91 94458 87243
                </a>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-400" />
                  Velachery, Chennai
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap gap-3">
              <Link to="/" className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted-foreground transition hover:text-white">
                Back to home
              </Link>
              <Link to="/jumbo-led-clock" className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted-foreground transition hover:text-white">
                View Jumbo LED Clock
              </Link>
              <Link to="/calendar-clock" className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted-foreground transition hover:text-white">
                View Calendar Clock
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
