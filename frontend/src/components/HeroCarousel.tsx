"use client";

import { useState, useEffect } from "react";

const carouselItems = [
  {
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    title: "Premium Spices",
    subtitle: "Aromatic & Pure"
  },
  {
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
    title: "Fresh Dairy",
    subtitle: "Straight from Farms"
  },
  {
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    title: "Chakki Atta",
    subtitle: "Ground Daily"
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-80 h-80 group">
      {/* Spinning dashed ring outside the circle */}
      <div className="absolute inset-[-12px] rounded-full border-[2px] border-dashed border-shakti-sarson/60 animate-[spin_15s_linear_infinite]" />
      
      {/* Inner Carousel Container */}
      <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-shakti-cream/20 relative z-10 bg-shakti-dark">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-out ${
                index === currentIndex ? "scale-110" : "scale-100"
              }`}
            />
            {/* Overlay gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end items-center pb-10">
              <h3 className={`text-white font-serif text-3xl font-bold tracking-wide drop-shadow-md transition-all duration-700 delay-300 ${
                index === currentIndex ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}>
                {item.title}
              </h3>
              <p className={`text-shakti-sarson mt-1 text-sm font-semibold tracking-widest uppercase drop-shadow-sm transition-all duration-700 delay-500 ${
                index === currentIndex ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}>
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentIndex ? "bg-shakti-sarson w-5" : "bg-white/50 w-1.5 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
