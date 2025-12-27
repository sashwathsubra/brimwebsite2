import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      // This is a simplified active link detection. For more accuracy,
      // you might want to use Intersection Observer API.
      const sections = navLinks.map(link => link.id);
      let current = "home";
      for (const section of sections) {
        if (section === "home") continue;
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          current = section;
        }
      }
      setActiveLink(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    // No need to set active link here, scroll handler will do it.
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    { name: "Products", id: "products" },
    { name: "About Us", id: "about" },
    { name: "Contact Us", id: "contact" }
  ];



  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled
        ? "bg-[#000100]/80 backdrop-blur-sm border-b border-[#B6B6B4]/20"
        : "bg-transparent"
        }`}
    >
      <div className="w-[80%] mx-auto px-0">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <button
            onClick={() => handleNavClick("home")}
            className="transition-opacity hover:opacity-80 z-10 flex flex-col items-center select-none group"
          >
            {/* Main Text: Arial Bold */}
            <h1
              className="text-2xl sm:text-3xl font-bold leading-none text-amber-400 tracking-normal"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
            >
              BRIM
            </h1>

            {/* Sub Text: Arial Bold, Spaced to fit width of BRIM */}
            <div className="w-full flex justify-between" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {/* Splitting the string to flex-justify the letters ensures perfect width alignment */}
              {"LED CLOCKS".split("").map((char, i) => (
                <span key={i} className="text-[0.6rem] sm:text-[0.7rem] font-bold text-amber-400/90">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }}
                  className={`relative font-body text-base font-medium tracking-[0.18em] transition-colors hover:text-foreground ${activeLink === link.id
                    ? "text-foreground"
                    : "text-muted-foreground"
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

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button aria-label="Open menu" className="text-foreground p-2">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-3/4 max-w-xs bg-background p-0 border-l border-[#B6B6B4]/20 shadow-none">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-start p-4">
                    <SheetClose asChild>
                      <button aria-label="Close menu" className="text-foreground p-2 rounded-full hover:bg-muted">
                        <X size={20} />
                      </button>
                    </SheetClose>
                  </div>
                  <nav className="flex-grow px-4 pb-4">
                    <ul className="flex flex-col items-start gap-8">
                      {navLinks.map((link) => (
                        <li key={link.name}>
                          <SheetClose asChild>
                            <a
                              href={`#${link.id}`}
                              onClick={() => handleNavClick(link.id)}
                              className={`font-body text-xl transition-colors hover:text-primary ${activeLink === link.id
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
