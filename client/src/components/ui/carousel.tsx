import * as React from "react";

type AutoCarouselProps = {
  children: React.ReactNode[];
  interval?: number; // milliseconds
  className?: string;
};

export const AutoCarousel: React.FC<AutoCarouselProps> = ({ children, interval = 3000, className }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const count = children.length;

  // Auto-scroll effect
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % count); // loop back to first
    }, interval);
    return () => clearInterval(timer);
  }, [count, interval]);

  return (
    <div className={`overflow-hidden relative ${className}`}>
      <div
        style={{
          display: "flex",
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${count * 100}%`,
        }}
      >
        {children.map((child, idx) => (
          <div key={idx} style={{ flex: "0 0 100%" }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
