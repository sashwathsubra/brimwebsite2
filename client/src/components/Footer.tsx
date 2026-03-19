import { MapPin, Phone, Mail, ChevronRight, ShieldCheck } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black/90 text-gray-400 border-t border-white/10 pt-16 pb-8 font-body">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-3 mb-12">
          
          {/* COLUMN 1: Brand Authority */}
          <div className="space-y-5 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold tracking-wider text-white">
              <span className="text-amber-500">BRIM</span> Clocks
            </h3>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              The trusted <strong className="text-gray-200">LED digital clock manufacturer</strong> in Chennai since 1989. 
              We engineer premium industrial-grade matrix displays and precision timing solutions.
            </p>
            {/* UPDATED: Bigger and bolder badge */}
            <div className="flex items-center justify-center gap-2 text-amber-500 text-base md:text-lg font-bold mt-2">
              <ShieldCheck className="h-6 w-6" />
              <span className="tracking-wide">35+ Years of Excellence</span>
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div className="space-y-5 flex flex-col items-center text-center">
            <h3 className="font-semibold text-lg text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#products" className="group flex items-center justify-center gap-2 hover:text-amber-400 transition-colors">
                  <ChevronRight className="h-3 w-3 text-amber-500 group-hover:translate-x-1 transition-transform" />
                  <span>Shop Digital Clocks Online</span>
                </a>
              </li>
              <li>
                <a href="#about" className="group flex items-center justify-center gap-2 hover:text-amber-400 transition-colors">
                  <ChevronRight className="h-3 w-3 text-amber-500 group-hover:translate-x-1 transition-transform" />
                  <span>About Brim Clocks</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="group flex items-center justify-center gap-2 hover:text-amber-400 transition-colors">
                  <ChevronRight className="h-3 w-3 text-amber-500 group-hover:translate-x-1 transition-transform" />
                  <span>Bulk & Custom Orders</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="group flex items-center justify-center gap-2 hover:text-amber-400 transition-colors">
                  <ChevronRight className="h-3 w-3 text-amber-500 group-hover:translate-x-1 transition-transform" />
                  <span>Contact Support</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Factory Address */}
          <div className="space-y-5 flex flex-col items-center text-center">
            {/* UPDATED: Moved icon next to the "Location" text */}
            <h3 className="font-semibold text-lg text-white flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-amber-500" />
              Location
            </h3>
            <ul className="space-y-4 text-sm flex flex-col items-center">
              <li className="flex flex-col items-center gap-2">
                <span className="leading-relaxed">
                  14/20 Ranganathan Street,<br />
                  Ganesh Nagar, <strong className="text-white">Velachery</strong>,<br />
                  Chennai - 600042<br />
                </span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <Phone className="h-5 w-5 text-amber-500 shrink-0" />
                <a href="tel:+919445887243" className="hover:text-white transition-colors font-medium">
                  +91 94458 87243
                </a>
              </li>
              <li className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5 text-amber-500 shrink-0" />
                <a href="mailto:brimdisplay@gmail.com" className="hover:text-white transition-colors">
                  brimdisplay@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR: Centered Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col items-center justify-center gap-4 text-xs text-gray-500 text-center">
          <p>&copy; {currentYear} B.R. Electronics (Brim Clocks). All rights reserved.</p>
          <p className="hidden md:block">
            Premium <span className="text-gray-400">LED Digital Clock Wall</span> Solutions Delivered Across India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;