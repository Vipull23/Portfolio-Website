import type { ReactNode } from 'react';

interface CarouselRowProps {
  title: string;
  children: ReactNode;
}

export default function CarouselRow({ title, children }: CarouselRowProps) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-semibold text-white sm:text-2xl">
        {title}
      </h2>
      <div className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
        {children}
      </div>
    </section>
  );
}
