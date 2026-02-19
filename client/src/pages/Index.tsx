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

        {/* --- SEO VISIBLE TEXT: PERFECTED (GOLD VERSION) --- */}
        <div className="container mx-auto px-4 pt-10 pb-2 text-center">
          {/* Main Title: Clear & Direct for Google */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-amber-500 drop-shadow-md">
            Buy Premium LED Digital Clocks in Chennai
          </h1>
          
          {/* Description: Catchy, Neat, & Keyword Rich */}
          <p className="max-w-4xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
            Elevate your space with a high-visibility <span className="text-white font-semibold">LED digital clock wall</span> display. 
            As the trusted experts in <span className="text-teal-400 font-medium">LED clock Chennai</span> manufacturing, we combine precision with durability. 
            Whether you want to <span className="text-teal-400 font-medium">buy clock Chennai</span> locally or order a <span className="text-white font-semibold">digital clock online</span>, 
            Brim Clocks delivers superior industrial and home solutions across Tamil Nadu.
          </p>
        </div>
        {/* --- END SEO --- */}

        <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20 text-muted-foreground">Loading products…</div>}>
          <FeaturedCollection />
        </Suspense>
        <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-muted-foreground">Loading about…</div>}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-muted-foreground">Loading contact…</div>}>
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-muted-foreground">Loading footer…</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;