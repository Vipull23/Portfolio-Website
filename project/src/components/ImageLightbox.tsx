import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useDialog } from '@/hooks/useDialog';

interface LightboxImage {
  src: string;
  caption: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/** Full-screen image viewer with arrow-key navigation, for project screenshots. */
export default function ImageLightbox({ images, index, onIndexChange, onClose }: ImageLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useDialog(onClose, closeRef);

  const count = images.length;
  const go = (delta: number) => onIndexChange((index + delta + count) % count);

  // Keep the latest `go` for the key handler without re-subscribing on every render.
  const goRef = useRef(go);
  goRef.current = go;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goRef.current(-1);
      if (e.key === 'ArrowRight') goRef.current(1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const image = images[index];
  const navClass =
    'absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/90';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.caption}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black/95 p-4 sm:p-10"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close screenshot"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-nf-panel text-white hover:bg-nf-elevated"
      >
        <X size={22} />
      </button>

      <figure className="flex max-h-full max-w-6xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt={image.caption} className="max-h-[80vh] w-auto rounded-md object-contain" />
        <figcaption className="mt-4 text-center text-sm text-nf-text">
          {image.caption}
          {count > 1 && <span className="ml-3 text-nf-dim">{index + 1} / {count}</span>}
        </figcaption>
      </figure>

      {count > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous screenshot"
            className={`${navClass} left-3 sm:left-6`}
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next screenshot"
            className={`${navClass} right-3 sm:right-6`}
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}
    </div>
  );
}
