import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface BillboardProps {
  /** Small label above the title, shown next to the red "V" mark (e.g. "Series", "Profile"). */
  kicker: string;
  title: ReactNode;
  /** The "98% Match · 2025 · HD" style metadata line. */
  meta?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** Artwork shown on the right, behind the fades (an image, poster art, or giant outlined text). */
  backdrop?: ReactNode;
  /** Shorter variant for pages where the content below matters more than the hero. */
  compact?: boolean;
}

export default function Billboard({
  kicker,
  title,
  meta,
  description,
  actions,
  backdrop,
  compact = false,
}: BillboardProps) {
  return (
    <header
      className={`relative flex items-end overflow-hidden ${
        compact ? 'min-h-[55vh] sm:min-h-[60vh]' : 'min-h-[80vh] sm:min-h-[85vh]'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(229,9,20,0.35),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_90%,rgba(229,9,20,0.12),transparent_50%)]" />

      {backdrop && (
        // Phones: art fills the top of the hero above the text. Desktop: art sits on the right.
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-3/5 md:inset-x-auto md:inset-y-0 md:right-0 md:h-full md:w-3/5"
        >
          {backdrop}
        </div>
      )}

      {/* Netflix-style fades into the page background */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-nf-bg via-nf-bg/70 to-transparent md:block" />
      <div className="absolute inset-0 bg-gradient-to-t from-nf-bg via-nf-bg/60 to-transparent md:hidden" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-nf-bg to-transparent" />

      <motion.div
        className={`relative z-10 w-full max-w-6xl px-6 pt-32 sm:px-12 ${compact ? 'pb-10 sm:pb-14' : 'pb-16 sm:pb-24'}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-nf-muted">
          <span className="text-2xl font-black tracking-normal text-nf-red">V</span>
          {kicker}
        </p>
        <h1 className="mb-4 max-w-3xl text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {meta && (
          <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:text-base">
            {meta}
          </div>
        )}
        {description && (
          <div className="mb-8 max-w-xl text-base leading-relaxed text-nf-text sm:text-lg">
            {description}
          </div>
        )}
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </motion.div>
    </header>
  );
}

/** Giant outlined lettering, used as backdrop art when there's no image. */
export function OutlineBackdrop({ text }: { text: string }) {
  return (
    <span className="absolute -right-10 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[11rem] font-black leading-none sm:text-[16rem] md:text-[22rem] tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.07)]">
      {text}
    </span>
  );
}
