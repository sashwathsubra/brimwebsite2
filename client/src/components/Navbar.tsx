import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

// SEO-Optimized Nav Links: Added 'title' for keyword weight
const navLinks = [
  { name: "Products", id: "products", title: "View our Industrial LED Digital Clocks" },
  { name: "About Us", id: "about", title: "Leading Digital Clock Manufacturer in Chennai" },
  { name: "Contact Us", id: "contact", title: "Contact Brim Clocks Chennai for Custom LED Displays" },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 10);

    let current = "home";
    for (const link of navLinks) {
      const section = document.getElementById(link.id);
      if (section && scrollY >= section.offsetTop - 120) {
        current = link.id;
      }
    }
    setActiveLink(current);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  const handleNavClick = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-[#000100]/80 backdrop-blur-sm border-b border-[#B6B6B4]/20"
          : "bg-transparent"
      }`}
    >
      <div className="w-[80%] mx-auto">
        <div className="flex items-center justify-between h-20">

          {/* SEO OPTIMIZED LOGO SECTION */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex flex-col items-center select-none group hover:opacity-80 text-left"
            aria-label="BRIM LED Digital Clocks Chennai - Home"
          >
            {/* H1 is the most important SEO tag. We've added your city and product here */}
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-400 leading-none" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
              BRIM
              <span className="sr-only"> - LED Digital Clock Manufacturer Chennai</span>
            </h1>
            
            <div className="flex justify-between w-full" aria-hidden="true">
              {"LED CLOCKS".split("").map((c, i) => (
                <span
                  key={i}
                  className="text-[0.6rem] sm:text-[0.7rem] font-bold text-amber-400/90"
                >
                  {c === " " ? "\u00A0" : c}
                </span>
              ))}
            </div>
            {/* This hidden text tells Google exactly what you do without cluttering the UI */}
            <span className="hidden">Premium Digital Wall Clocks & Industrial LED Displays in Tamil Nadu</span>
          </button>

          {/* Desktop Nav with Title Keywords */}
          <nav aria-label="Main Navigation" className="hidden md:block">
            <ul className="flex gap-10">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    title={link.title}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                    className={`relative font-body tracking-[0.18em] transition-colors ${
                      activeLink === link.id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    {activeLink === link.id && (
                      <span className="absolute -bottom-1 left-0 w-full h-px bg-primary" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button aria-label="Open menu for LED Clocks Chennai" className="p-2">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-3/4 bg-background p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 flex justify-end">
                    <SheetClose asChild>
                      <button aria-label="Close menu">
                        <X size={20} />
                      </button>
                    </SheetClose>
                  </div>
                  <nav className="flex-grow px-6">
                    <ul className="flex flex-col gap-8">
                      {navLinks.map((link) => (
                        <li key={link.id}>
                          <SheetClose asChild>
                            <a
                              href={`#${link.id}`}
                              title={link.title}
                              onClick={() => handleNavClick(link.id)}
                              className={`text-xl transition-colors ${
                                activeLink === link.id
                                  ? "text-primary"
                                  : "text-foreground"
                              }`}
                            >
                              {link.name}
                            </a>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;