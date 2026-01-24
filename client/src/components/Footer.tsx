import { MapPin, Phone, Mail, Clock, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-muted/50 border-t border-border/50 py-12 text-foreground">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* COLUMN 1: Company Info & Keywords */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-primary">
              B.R. Electronics
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              <strong>Brim Clocks</strong> is a premier <strong>LED digital clock manufacturer in Chennai</strong>. 
              We specialize in industrial-grade matrix displays, seven-segment clocks, and custom 
              timekeeping solutions for offices and factories across <strong>Tamil Nadu</strong>.
            </p>
          </div>

          {/* COLUMN 2: Contact Details (SEO Address) */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>
                  14/20 Ranganathan Street,<br />
                  Ganesh Nagar, <strong>Velachery</strong>,<br />
                  <strong>Chennai</strong> 600042
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+919445887243" className="hover:text-foreground transition-colors">
                  +91 94458 87243
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:brimdisplay@gmail.com" className="hover:text-foreground transition-colors">
                  brimdisplay@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Service Areas (The SEO Powerhouse) */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Areas Served</h3>
            <ul className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-1 hover:text-primary transition-colors cursor-default">• Velachery</li>
              <li className="flex items-center gap-1 hover:text-primary transition-colors cursor-default">• Guindy</li>
              <li className="flex items-center gap-1 hover:text-primary transition-colors cursor-default">• Ambattur</li>
              <li className="flex items-center gap-1 hover:text-primary transition-colors cursor-default">• OMR / ECR</li>
              <li className="flex items-center gap-1 hover:text-primary transition-colors cursor-default">• Anna Nagar</li>
              <li className="flex items-center gap-1 hover:text-primary transition-colors cursor-default">• Sriperumbudur</li>
              <li className="flex items-center gap-1 hover:text-primary transition-colors cursor-default">• Adyar</li>
              <li className="flex items-center gap-1 hover:text-primary transition-colors cursor-default">• Madhavaram</li>
            </ul>
            <p className="text-[10px] text-muted-foreground italic mt-2">
              Supplying Digital Clocks across Chennai and all districts of Tamil Nadu.
            </p>
          </div>

          {/* COLUMN 4: Business Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Business Hours</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Mon - Sat: 10:00 AM - 05:00 PM</span>
              </li>
              <li className="pl-6 italic">Sunday: Closed</li>
              <li className="flex items-center gap-2 pt-2">
                <Globe className="h-4 w-4 text-primary" />
                <span>Made in India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* SEO Hidden Keywords for the bottom of the page */}
        <div className="mt-12 pt-8 border-t border-border/50">
           <div className="sr-only">
             Digital Wall Clocks Chennai, Industrial LED Display Board, GPS Clocks, 
             Token Display Systems, Seven Segment Display Manufacturers, 
             Brim LED Clocks Velachery, Best Digital Clocks for Office India.
           </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} B.R. Electronics (Brim Clocks). All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;