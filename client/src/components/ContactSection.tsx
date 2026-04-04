import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle, Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

// --- VALIDATION SCHEMA ---
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  enquiryFor: z.string().min(1, "Please select an enquiry type"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^[\d\s+()-]+$/, "Please enter a valid phone number"),
  location: z
    .string()
    .trim()
    .min(2, "Location must be at least 2 characters")
    .max(200, "Location must be less than 200 characters"),
  message: z
    .string()
    .trim()
    .max(1000, "Message must be less than 1000 characters")
    .optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const enquiryTypes = [
  "Mini Clock Red",
  "Mini Clock Green",
  "Red Dot Matrix Clock",
  "Dual Color Matrix Clock",
  "Calendar Clock",
  "Multi Color Calendar Clock",
  "Jumbo Clock",
  "Custom Orders",
  "Bulk/Corporate Orders",
  "Product Inquiry",
  "Other",
];

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  // Note: It's best practice to use environment variables for keys, but keeping it here as requested
  const web3formsAccessKey = "458466eb-81ec-43aa-803b-cf9e3ad82341";

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      enquiryFor: "",
      email: "",
      phone: "",
      location: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const subject = `New Contact Inquiry - ${data.enquiryFor}`;

      if (!web3formsAccessKey) {
        throw new Error("Missing Web3Forms access key");
      }

      const formData = new FormData();
      formData.append("access_key", web3formsAccessKey);
      formData.append("subject", subject);
      formData.append("from_name", data.name);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("enquiryFor", data.enquiryFor);
      formData.append("location", data.location);
      formData.append("message", data.message || "-");
      formData.append("botcheck", "");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit form");
      }

      setIsSubmitted(true);
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      setTimeout(() => {
        setIsSubmitted(false);
        reset();
      }, 3000);
    } catch (error) {
      const subject = `New Contact Inquiry - ${data.enquiryFor}`;
      const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nLocation: ${data.location}\nMessage: ${data.message || "-"}`;
      const mailto = `mailto:brimdisplay@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      toast({
        title: "Unable to send right now",
        description: "Opening email composer as a fallback.",
        variant: "destructive",
      });

      window.location.href = mailto;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-secondary/50 px-4 py-20 sm:py-24 scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* --- CONTACT INFO CARDS --- */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* ADDRESS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-body font-semibold text-foreground">Address</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>B.R.Electronics</strong><br />
              14/20 Ranganathan Street,<br />
              Velachery, Chennai 600042<br />
            </p>
          </motion.div>

          {/* PHONE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-body font-semibold text-foreground">Talk to Sales</h3>
            <p className="text-sm text-muted-foreground">
              <a href="tel:+919445887243" className="hover:text-primary transition-colors font-medium">
                +91 94458 87243
              </a>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Support available Monday-Saturday
            </p>
          </motion.div>

          {/* EMAIL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-body font-semibold text-foreground">Get a Quote</h3>
            <p className="text-sm text-muted-foreground break-all">
              <a href="mailto:brimdisplay@gmail.com" className="hover:text-primary transition-colors font-medium">
                brimdisplay@gmail.com
              </a>
            </p>
          </motion.div>

          {/* HOURS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-body font-semibold text-foreground">Support</h3>
            <p className="text-sm text-muted-foreground">
              Monday - Saturday<br />
              <span className="font-medium">10:00 AM - 05:00 PM</span>
            </p>
          </motion.div>
        </div>

        {/* --- REGISTRATION BANNER (MSME & GST) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mb-20 flex max-w-3xl flex-col items-center justify-center gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:gap-12"
        >
          {/* MSME details */}
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">MSME Registered</p>
              <p className="font-body text-sm font-semibold text-foreground sm:text-base">UDYAM-TN-02-0055038</p>
            </div>
          </div>

          {/* Divider visible only on larger screens */}
          <div className="hidden h-12 w-px bg-border sm:block"></div>

          {/* GST details */}
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">GSTIN</p>
              <p className="font-body text-sm font-semibold text-foreground sm:text-base">33AJRPS2172H1ZX</p>
            </div>
          </div>
        </motion.div>

        {/* --- FORM SECTION --- */}
        {isSubmitted ? (
          <div className="max-w-2xl mx-auto text-center py-10 bg-card border border-border rounded-lg shadow-sm">
            <div className="animate-fade-slide">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-body text-foreground mb-4">Request Received!</h2>
              <p className="text-muted-foreground text-lg px-4">
                Thank you for contacting <span className="font-semibold text-foreground">BRIM Electronics</span>. 
                Our team will review your requirements and send a quote shortly.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-body font-bold text-foreground">Request Your Quote</h3>
              <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
                Fill out the form below to inquire about <span className="text-foreground font-medium">custom LED displays</span> or bulk corporate orders.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-card border border-border rounded-xl p-6 shadow-[var(--shadow-elegant)] sm:p-8 md:p-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Name <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    {...register("name")}
                    className="bg-input border-border focus:border-primary transition-all duration-300"
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email ID <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    {...register("email")}
                    className="bg-input border-border focus:border-primary transition-all duration-300"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm">{errors.email.message}</p>
                  )}
                </div>

                {/* Enquiry For */}
                <div className="space-y-2">
                  <Label htmlFor="enquiryFor" className="text-foreground">
                    Enquiry For <span className="text-primary">*</span>
                  </Label>
                  <Select onValueChange={(value) => setValue("enquiryFor", value, { shouldDirty: true, shouldValidate: true })}>
                    <SelectTrigger className="bg-input border-border focus:border-primary transition-all duration-300">
                      <SelectValue placeholder="Select Product / Service..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {enquiryTypes.map((type) => (
                        <SelectItem key={type} value={type} className="hover:bg-secondary cursor-pointer">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.enquiryFor && (
                    <p className="text-destructive text-sm">{errors.enquiryFor.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 99999 88888"
                    {...register("phone")}
                    className="bg-input border-border focus:border-primary transition-all duration-300"
                  />
                  {errors.phone && (
                    <p className="text-destructive text-sm">{errors.phone.message}</p>
                  )}
                </div>

                {/* Location */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location" className="text-foreground">
                    Location / City <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g. Anna Nagar, Chennai (For delivery estimate)"
                    {...register("location")}
                    className="bg-input border-border focus:border-primary transition-all duration-300"
                  />
                  {errors.location && (
                    <p className="text-destructive text-sm">{errors.location.message}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="message" className="text-foreground">
                    Specific Requirements <span className="text-muted-foreground text-sm">(Optional)</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about size requirements, LED color preference, or quantity..."
                    rows={4}
                    {...register("message")}
                    className="bg-input border-border focus:border-primary resize-none transition-all duration-300"
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm">{errors.message.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-amber-600 w-full px-8 py-5 text-base font-medium transition-all duration-300 disabled:opacity-50 sm:w-auto sm:px-12 sm:py-6 sm:text-lg shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Inquiry
                    </>
                  )}
                </Button>
              </div>

              <p className="text-muted-foreground text-sm text-center mt-6">
                Your details are secure. We typically respond within 24 hours.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;