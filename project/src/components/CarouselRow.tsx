import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselRowProps {
  title: string;
  children: ReactNode;
}

export default function CarouselRow({ title, children }: CarouselRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    const observer = new ResizeObserver(updateArrows);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateArrows]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  // Netflix-style edge arrows: overlaid on the row and revealed on hover (desktop only; phones swipe).
  const arrowClass =
    'absolute inset-y-4 z-20 hidden w-12 items-center justify-center bg-black/60 text-white opacity-0 transition-opacity duration-200 hover:bg-black/80 focus-visible:opacity-100 group-hover/row:opacity-100 sm:flex';

  return (
    <section className="mb-10">
      <h2 className="mb-2 text-xl font-semibold text-white sm:text-2xl">
        {title}
      </h2>
      <div className="group/row relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            aria-label={`Scroll ${title} left`}
            className={`${arrowClass} left-0 rounded-r`}
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Padding gives hover-scaled cards room so the scroll container doesn't clip them;
            the negative margin keeps the first card aligned with the row title. */}
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="-mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-2 py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {children}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            aria-label={`Scroll ${title} right`}
            className={`${arrowClass} right-0 rounded-l`}
          >
            <ChevronRight size={32} />
          </button>
        )}
      </div>
    </section>
  );
}
