import { MapPin, Phone, Mail, Clock, ChevronRight, ShieldCheck } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black/90 text-gray-400 border-t border-white/10 pt-16 pb-8 font-body">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
          
          {/* COLUMN 1: Brand Authority */}
          <div className="space-y-5">
            <h3 className="text-2xl font-bold tracking-wider text-white">
              <span className="text-amber-500">BRIM</span> Electronics
            </h3>
            <p className="text-sm leading-relaxed text-gray-400 pr-4">
              The trusted <strong className="text-gray-200">LED digital clock manufacturer</strong> in Chennai since 1989. 
              We engineer premium industrial-grade matrix displays and precision timing solutions, available exclusively for <strong className="text-gray-200">online order and direct delivery</strong> across Tamil Nadu.
            </p>
            <div className="flex items-center gap-2 text-amber-500 text-sm font-semibold">
              <ShieldCheck className="h-5 w-5" />
              <span>35+ Years of Excellence</span>
            </div>
          </div>

          {/* COLUMN 2: Quick Links (SEO Optimized Anchors) */}
          <div className="space-y-5">
            <h3 className="font-semibold text-lg text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#products" className="group flex items-center gap-2 hover:text-amber-400 transition-colors">
                  <ChevronRight className="h-3 w-3 text-amber-500 group-hover:translate-x-1 transition-transform" />
                  <span>Shop Digital Clocks Online</span>
                </a>
              </li>
              <li>
                <a href="#about" className="group flex items-center gap-2 hover:text-amber-400 transition-colors">
                  <ChevronRight className="h-3 w-3 text-amber-500 group-hover:translate-x-1 transition-transform" />
                  <span>About Brim Clocks</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="group flex items-center gap-2 hover:text-amber-400 transition-colors">
                  <ChevronRight className="h-3 w-3 text-amber-500 group-hover:translate-x-1 transition-transform" />
                  <span>Bulk & Custom Orders</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="group flex items-center gap-2 hover:text-amber-400 transition-colors">
                  <ChevronRight className="h-3 w-3 text-amber-500 group-hover:translate-x-1 transition-transform" />
                  <span>Contact Support</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Factory Address */}
          <div className="space-y-5">
            <h3 className="font-semibold text-lg text-white">Manufacturing Unit</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  14/20 Ranganathan Street,<br />
                  Ganesh Nagar, <strong className="text-white">Velachery</strong>,<br />
                  Chennai - 600042<br />
                  <span className="text-amber-500/80 text-xs italic mt-1 inline-block">
                    (Manufacturing & Dispatch Only – No Retail Sales)
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-amber-500 shrink-0" />
                <a href="tel:+919445887243" className="hover:text-white transition-colors font-medium">
                  +91 94458 87243
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-amber-500 shrink-0" />
                <a href="mailto:brimdisplay@gmail.com" className="hover:text-white transition-colors">
                  brimdisplay@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Hours & Delivery */}
          <div className="space-y-5">
            <h3 className="font-semibold text-lg text-white">Service Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium">Online Order Support</span>
                  <span className="text-xs">Mon - Sat: 10:00 AM - 05:00 PM</span>
                </div>
              </li>
              <li>
                <span className="block text-white font-medium mb-2">Delivery Areas</span>
                <p className="text-xs leading-relaxed text-gray-500">
                  Direct shipping to Velachery, Guindy, OMR, Ambattur, Sriperumbudur, and all districts across Tamil Nadu.
                </p>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR: Copyright + SEO Tagline */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
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