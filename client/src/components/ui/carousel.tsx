import * as React from "react";

type CarouselProps = {
  children: React.ReactNode;
  interval?: number; // ms
  className?: string;
};

const Carousel: React.FC<CarouselProps> = ({ children, interval = 3000, className }) => {
  const slides = React.Children.toArray(children);
  const count = slides.length;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % count);
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
        {slides.map((child, idx) => (
          <div key={idx} style={{ flex: "0 0 100%" }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
