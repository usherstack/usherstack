import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Testimonial } from "@/types";
import { testimonials } from "@/data/data";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTheme } from "next-themes";

interface TestimonialsSliderProps {
  testimonials: any[];
}

export function TestimonialsSlider({
  testimonials: propTestimonials,
}: TestimonialsSliderProps) {
  const { theme: currentTheme } = useTheme();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const testimonials = useMemo(() => {
    return propTestimonials.map((t) => ({
      ...t,
      content:
        currentTheme === "dark"
          ? (t as any).contentDark || t.content
          : (t as any).contentLight || t.content,
    })) as Testimonial[];
  }, [propTestimonials, currentTheme]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || isHovered) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi, isHovered]);

  return (
    <div
      className="relative w-full max-w-5xl mx-auto px-4 md:px-12 py-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        ref={emblaRef}
        role="region"
        aria-label="Testimonial carousel"
      >
        <div className="flex touch-pan-y">
          {testimonials.map((testimonial, idx) => (
            <div
              className="flex-[0_0_100%] min-w-0"
              key={`${testimonial.id}-${idx}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center px-4 md:px-8 py-6"
              >
                <Quote className="w-12 h-12 text-primary/40 mb-6 flex-shrink-0" />
                <p
                  className="text-lg md:text-2xl font-medium text-foreground mb-10 leading-relaxed max-w-4xl"
                  aria-label={`Testimonial quote: ${testimonial.content}`}
                >
                  "{testimonial.content}"
                </p>
                <div className="flex items-center flex-col gap-2">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0 bg-background/50 backdrop-blur-sm p-1">
                    <img
                      src={testimonial.avatar}
                      alt={`${testimonial.name} - ${testimonial.role}`}
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                      decoding="async"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-foreground">
                      {testimonial.name}
                    </h3>
                    <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1 font-mono">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-8">
        <button
          onClick={scrollPrev}
          className={`w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-foreground hover:bg-muted transition-colors hover:border-primary/50 ${
            !canScrollPrev ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Previous testimonial"
          disabled={!canScrollPrev}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className={`w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-foreground hover:bg-muted transition-colors hover:border-primary/50 ${
            !canScrollNext ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Next testimonial"
          disabled={!canScrollNext}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div
        className="flex justify-center gap-2 mt-6"
        role="tablist"
        aria-label="Testimonial indicators"
      >
        {testimonials.map((_, idx) => (
          <button
            key={`indicator-${idx}`}
            role="tab"
            aria-selected={idx === selectedIndex}
            aria-label={`Go to testimonial ${idx + 1}`}
            className={`min-w-[2rem] h-8 rounded-full transition-all duration-300 flex items-center justify-center ${
              idx === selectedIndex
                ? "bg-primary"
                : "bg-border/50 hover:bg-border"
            }`}
            onClick={() => emblaApi && emblaApi.scrollTo(idx)}
          />
        ))}
      </div>
    </div>
  );
}
