import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Products", id: "products" },
  { name: "About Us", id: "about" },
  { name: "Contact Us", id: "contact" },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll handler (optimized)
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
    handleScroll(); // run once on mount

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
          
          {/* -------------------------------------------------- */}
          {/* LOGO SECTION (No Image File Needed)               */}
          {/* -------------------------------------------------- */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 select-none group hover:opacity-90 transition-opacity"
          >
            {/* The "B" Icon: Black Box + Yellow Text */}
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-black border border-amber-400/30 shadow-sm shadow-amber-400/10">
              <span
                className="text-3xl font-bold text-amber-400 leading-none pt-1"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                B
              </span>
            </div>

            {/* The Text: BRIM */}
            <div className="flex flex-col items-start leading-none">
              <h1
                className="text-2xl font-bold text-amber-400 tracking-wide"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                BRIM
              </h1>
              <span className="text-[0.6rem] font-bold tracking-[0.2em] text-amber-400/80 uppercase">
                LED Clocks
              </span>
            </div>
          </button>
          {/* -------------------------------------------------- */}

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
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

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button aria-label="Open menu" className="p-2 text-white">
                  <Menu size={24} />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-3/4 bg-background p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4">
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