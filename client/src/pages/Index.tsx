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
