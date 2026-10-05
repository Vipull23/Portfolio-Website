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

  const hasOverflow = canScrollLeft || canScrollRight;
  const arrowClass =
    'hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-nf-surface sm:flex text-white shadow-lg transition-all duration-200 hover:bg-nf-red';

  return (
    <section className="mb-10">
      <h2 className="mb-2 text-xl font-semibold text-white sm:text-2xl">
        {title}
      </h2>
      <div className="flex items-center gap-2">
        {hasOverflow && (
          <button
            onClick={() => scroll('left')}
            aria-label={`Scroll ${title} left`}
            disabled={!canScrollLeft}
            className={`${arrowClass} ${canScrollLeft ? '' : 'pointer-events-none opacity-0'}`}
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Padding gives hover-scaled cards room so the scroll container doesn't clip them. */}
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex min-w-0 flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-2 py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {children}
        </div>

        {hasOverflow && (
          <button
            onClick={() => scroll('right')}
            aria-label={`Scroll ${title} right`}
            disabled={!canScrollRight}
            className={`${arrowClass} ${canScrollRight ? '' : 'pointer-events-none opacity-0'}`}
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>
    </section>
  );
}
