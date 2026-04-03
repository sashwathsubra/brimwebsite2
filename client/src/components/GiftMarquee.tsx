import { Sparkles } from "lucide-react";

const giftIdeas = [
  "Personalised Gift",
  "Corporate Gift",
  "Home Gift",
  "Gift for all occasions",
  "The Best Memorable Gift",
  "Gift for Family",
  "Gift for Places of worship",
  "Gift for friend",
  "Gift for Senior Citizens",
  "Gift for employees"
];

const GiftMarquee = () => {
  return (
    <div className="w-full py-3 md:py-8 font-body">
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative overflow-hidden flex">
        
        {/* Subtle gradient fades on the edges so the bubbles disappear smoothly */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling flex container */}
        <div className="animate-marquee whitespace-nowrap flex gap-4 items-center pl-4">
          {/* First set of bubbles */}
          {giftIdeas.map((idea, index) => (
            <span 
              key={index} 
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm md:text-base font-medium tracking-wide text-gray-300 bg-white/5 border border-white/10 rounded-full shrink-0 hover:bg-white/10 hover:text-white transition-colors cursor-default"
            >
              {idea}
            </span>
          ))}
          {/* Exact duplicate for seamless infinite scrolling */}
          {giftIdeas.map((idea, index) => (
            <span 
              key={`dup-${index}`} 
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm md:text-base font-medium tracking-wide text-gray-300 bg-white/5 border border-white/10 rounded-full shrink-0 hover:bg-white/10 hover:text-white transition-colors cursor-default"
            >
              {idea}
            </span>
          ))}
        </div>

        {/* CSS animation directly in the component */}
        <style dangerouslySetInnerHTML={{__html: `
          .animate-marquee {
            animation: marquee 35s linear infinite;
            width: max-content;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 0.5rem)); }
          }
        `}} />
      </div>
    </div>
  );
};

export default GiftMarquee;