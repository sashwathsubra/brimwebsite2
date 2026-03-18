import React, { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroSlideshow from "@/components/HeroSlideshow";

// Lazy-load non-critical sections below the fold
const FeaturedCollection = lazy(() => import("@/components/FeaturedCollection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSlideshow />

        {/* --- SEO VISIBLE TEXT: UPDATED --- */}
        <div className="container mx-auto px-4 pt-10 pb-6 text-center">
          {/* Main Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-amber-500 drop-shadow-md">
            Buy LED Digital Clocks in Chennai
          </h1>
          
          {/* Description */}
          <p className="max-w-4xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
            High-visibility <span className="text-white font-semibold">LED digital wall clocks</span> designed for banks, factories, hospitals, offices, and public institutions. Built for clear display, reliable performance, and long service life. 
            <br className="hidden md:block mt-2" />
            <span className="text-teal-400 font-medium">Available for purchase in Chennai.</span>
          </p>
        </div>
        {/* --- END SEO --- */}

        <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20 text-muted-foreground flex justify-center">Loading products…</div>}>
          <FeaturedCollection />
        </Suspense>
        <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-muted-foreground flex justify-center">Loading about…</div>}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-muted-foreground flex justify-center">Loading contact…</div>}>
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-muted-foreground flex justify-center">Loading footer…</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;