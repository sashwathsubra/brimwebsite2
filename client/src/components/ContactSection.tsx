import { Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="sr-only" aria-label="Contact information">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-xl font-semibold text-foreground">Contact Brim Clocks</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Brim Clocks manufactures LED digital clocks and industrial display solutions in Chennai.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            +91 94458 87243
          </span>
          <span className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            brimdisplay@gmail.com
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Velachery, Chennai
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
