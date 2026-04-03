import { Sparkles } from "lucide-react";

const giftIdeas = [
  "Personalised gift",
  "Corporate gift",
  "Home gift",
  "Senior citizen gift",
  "Gift for all occasions",
  "All time gift",
  "The best remembering gift",
  "Gift for Family",
  "Gift for Places of worship",
  "Gift for friend",
  "Gift for employees"
];

const GiftMarquee = () => {
  return (
    <div className="relative flex overflow-x-hidden bg-black/95 border-y border-white/10 py-4 text-gray-300 font-body">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {/* First set of items */}
        {giftIdeas.map((idea, index) => (
          <span key={index} className="flex items-center mx-6 text-sm md:text-base tracking-wide">
            {idea}
            <Sparkles className="w-4 h-4 text-amber-500/60 mx-6 shrink-0" />
          </span>
        ))}
        {/* Exact duplicate for seamless infinite scrolling */}
        {giftIdeas.map((idea, index) => (
          <span key={`dup-${index}`} className="flex items-center mx-6 text-sm md:text-base tracking-wide">
            {idea}
            <Sparkles className="w-4 h-4 text-amber-500/60 mx-6 shrink-0" />
          </span>
        ))}
      </div>

      {/* Adding the CSS animation directly so you don't have to configure Tailwind */}
      <style dangerouslySetInnerHTML={{__html: `
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
};

export default GiftMarquee;