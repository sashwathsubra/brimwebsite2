import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-muted/50 border-t border-border/50 py-12 text-foreground">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          
          {/* COLUMN 1: Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-primary">
              Brim Clocks
            </h3>
            <p className="text-muted-foreground max-w-sm">
              Premium digital, LED, and matrix clocks manufactured in Chennai. 
              Serving offices, factories, and homes across Tamil Nadu.
            </p>
          </div>

          {/* COLUMN 2: Contact Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>
                  Plot No. 4, Door No. 8, <br />
                  Saraswathi Nagar,<br />
                  Adambakkam, Chennai - 600088
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
                <a href="mailto:brimclocks@gmail.com" className="hover:text-foreground transition-colors">
                  brimclocks@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Business Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Business Hours</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </li>
              <li className="pl-6">Sunday: Closed</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Brim Clocks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;