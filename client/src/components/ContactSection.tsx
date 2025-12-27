import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Send, CheckCircle } from "lucide-react";

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

  if (isSubmitted) {
    return (
      <section id="contact" className="bg-secondary/50 px-4 py-20 sm:py-24 scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-fade-slide">
            <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-body text-foreground mb-4">Thank You!</h2>
            <p className="text-muted-foreground text-lg">
              Your inquiry has been received. Our team will contact you within 24 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-secondary/50 px-4 py-20 sm:py-24 scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-body text-primary tracking-[0.18em] text-base font-medium">
            Get In Touch
          </span>
          <h2 className="mt-4 mb-6 font-body text-3xl text-foreground sm:text-4xl md:text-5xl">
            Contact Us
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            Have questions about our clocks? We'd love to hear from you. 
            Fill out the form below and our team will respond promptly.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-card border border-border rounded-lg p-6 shadow-[var(--shadow-elegant)] sm:p-8 md:p-12"
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
                className="bg-input border-border focus:border-primary"
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
                placeholder=""
                {...register("email")}
                className="bg-input border-border focus:border-primary"
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
                <SelectTrigger className="bg-input border-border focus:border-primary">
                  <SelectValue placeholder="Select enquiry type" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {enquiryTypes.map((type) => (
                    <SelectItem key={type} value={type} className="hover:bg-secondary">
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
                placeholder="+91"
                {...register("phone")}
                className="bg-input border-border focus:border-primary"
              />
              {errors.phone && (
                <p className="text-destructive text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="location" className="text-foreground">
                Location <span className="text-primary">*</span>
              </Label>
              <Input
                id="location"
                placeholder=""
                {...register("location")}
                className="bg-input border-border focus:border-primary"
              />
              {errors.location && (
                <p className="text-destructive text-sm">{errors.location.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="message" className="text-foreground">
                Message <span className="text-muted-foreground text-sm">(Optional)</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Tell us more about your inquiry..."
                rows={4}
                {...register("message")}
                className="bg-input border-border focus:border-primary resize-none"
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
              className="bg-primary text-primary-foreground hover:bg-[hsl(var(--gold-light))] w-full px-8 py-5 text-base font-medium transition-all duration-300 disabled:opacity-50 sm:w-auto sm:px-12 sm:py-6 sm:text-lg"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>

          {/* Privacy Note */}
          <p className="text-muted-foreground text-sm text-center mt-6">
            By submitting this form, you agree to our privacy policy. 
            We'll never share your information with third parties.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
