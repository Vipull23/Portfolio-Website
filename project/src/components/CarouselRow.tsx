// import { useRef } from 'react';
// import type { ReactNode } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface CarouselRowProps {
//   title: string;
//   children: ReactNode;
// }

// export default function CarouselRow({ title, children }: CarouselRowProps) {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: 'left' | 'right') => {
//     const el = scrollRef.current;
//     if (!el) return;
//     const amount = el.clientWidth * 0.8;
//     el.scrollBy({
//       left: direction === 'left' ? -amount : amount,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <section className="mb-10">
//       <h2 className="mb-4 text-xl font-semibold text-white sm:text-2xl">
//         {title}
//       </h2>
//       <div className="group/row relative">
//         <button
//           onClick={() => scroll('left')}
//           aria-label={`Scroll ${title} left`}
//           className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-3 -translate-y-1/2 items-center justify-center rounded-full bg-[#141414]/90 text-white opacity-0 shadow-lg transition-opacity duration-200 hover:bg-[#E50914] group-hover/row:opacity-100"
//         >
//           <ChevronLeft size={22} />
//         </button>

//         <div
//           ref={scrollRef}
//           className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
//         >
//           {children}
//         </div>

//         <button
//           onClick={() => scroll('right')}
//           aria-label={`Scroll ${title} right`}
//           className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 translate-x-3 items-center justify-center rounded-full bg-[#141414]/90 text-white opacity-0 shadow-lg transition-opacity duration-200 hover:bg-[#E50914] group-hover/row:opacity-100"
//         >
//           <ChevronRight size={22} />
//         </button>
//       </div>
//     </section>
//   );
// }

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselRowProps {
  title: string;
  children: ReactNode;
  showArrows?: boolean;
}

export default function CarouselRow({
  title,
  children,
  showArrows = true,
}: CarouselRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-semibold text-white sm:text-2xl">
        {title}
      </h2>
      <div className="flex items-center gap-2">
        {showArrows && (
          <button
            onClick={() => scroll('left')}
            aria-label={`Scroll ${title} left`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f1f1f] text-white shadow-lg transition-colors duration-200 hover:bg-[#E50914]"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex flex-1 gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
        >
          {children}
        </div>

        {showArrows && (
          <button
            onClick={() => scroll('right')}
            aria-label={`Scroll ${title} right`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f1f1f] text-white shadow-lg transition-colors duration-200 hover:bg-[#E50914]"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>
    </section>
  );
}



// import { useRef } from 'react';
// import type { ReactNode } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface CarouselRowProps {
//   title: string;
//   children: ReactNode;
//   showArrows?: boolean;
// }

// export default function CarouselRow({
//   title,
//   children,
//   showArrows = true,
// }: CarouselRowProps) {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: 'left' | 'right') => {
//     const el = scrollRef.current;
//     if (!el) return;
//     const amount = el.clientWidth * 0.8;
//     el.scrollBy({
//       left: direction === 'left' ? -amount : amount,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <section className="mb-10">
//       <h2 className="mb-4 text-xl font-semibold text-white sm:text-2xl">
//         {title}
//       </h2>
//       <div className="flex items-center gap-2">
//         {showArrows && (
//           <button
//             onClick={() => scroll('left')}
//             aria-label={`Scroll ${title} left`}
//             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f1f1f] text-white shadow-lg transition-colors duration-200 hover:bg-[#E50914]"
//           >
//             <ChevronLeft size={22} />
//           </button>
//         )}

//         <div
//           ref={scrollRef}
//           className="flex flex-1 gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
//         >
//           {children}
//         </div>

//         {showArrows && (
//           <button
//             onClick={() => scroll('right')}
//             aria-label={`Scroll ${title} right`}
//             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f1f1f] text-white shadow-lg transition-colors duration-200 hover:bg-[#E50914]"
//           >
//             <ChevronRight size={22} />
//           </button>
//         )}
//       </div>
//     </section>
//   );
// }