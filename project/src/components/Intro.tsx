import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntroProps {
  onDone: () => void;
}

const DURATION_MS = 2200;

/**
 * Netflix "ta-dum" style opener: the red V lands, glows, then the camera
 * flies into it. Click or press any key to skip.
 */
export default function Intro({ onDone }: IntroProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, DURATION_MS);
    const skip = () => onDone();
    window.addEventListener('keydown', skip);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', skip);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex cursor-pointer items-center justify-center overflow-hidden bg-black"
      onClick={onDone}
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: DURATION_MS / 1000, times: [0, 0.8, 1] }}
      aria-label="Intro animation, click to skip"
      role="presentation"
    >
      {/* Light streaks that sweep out of the logo */}
      {[-30, -12, 0, 12, 30].map((offset, i) => (
        <motion.span
          key={offset}
          className="absolute h-[140vh] w-3 origin-center rounded-full bg-gradient-to-b from-transparent via-nf-red to-transparent opacity-0 blur-[2px]"
          style={{ left: `calc(50% + ${offset}px)` }}
          animate={{ opacity: [0, 0, 0.9, 0], scaleX: [1, 1, 3, 8], x: [0, 0, offset * 4, offset * 12] }}
          transition={{ duration: 1.6, delay: 0.5 + i * 0.03, times: [0, 0.3, 0.6, 1], ease: 'easeIn' }}
        />
      ))}

      <motion.span
        className="relative select-none text-[9rem] font-black leading-none text-nf-red sm:text-[13rem]"
        style={{ textShadow: '0 0 40px rgba(229,9,20,0.7), 0 0 120px rgba(229,9,20,0.4)' }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1, 1.05, 14], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.9, times: [0, 0.25, 0.55, 1], ease: ['easeOut', 'linear', 'easeIn'] }}
      >
        V
      </motion.span>
    </motion.div>
  );
}
