import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileTile from '@/components/ProfileTile';
import { User, FolderGit2, Award, FileText } from 'lucide-react';

const tiles = [
  {
    to: '/about',
    label: 'About Me',
    icon: <User size={56} />,
    thumbnailClass: 'bg-gradient-to-br from-[#2a1f1f] to-[#3b2a2a]',
  },
  {
    to: '/projects',
    label: 'Projects',
    icon: <FolderGit2 size={56} />,
    thumbnailClass: 'bg-gradient-to-br from-[#1f2a3b] to-[#2a3b4a]',
  },
  {
    to: '/skills',
    label: 'Skills & Certs',
    icon: <Award size={56} />,
    thumbnailClass: 'bg-gradient-to-br from-[#1f3b2a] to-[#2a4a3b]',
  },
  {
    to: '/resume',
    label: 'Resume',
    icon: <FileText size={56} />,
    thumbnailClass: 'bg-gradient-to-br from-[#3b2a1f] to-[#4a3a2a]',
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = useCallback(
    (index: number, to: string) => {
      setSelected(index);
      window.setTimeout(() => navigate(to), 550);
    },
    [navigate],
  );

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#141414] px-4 py-16">
      {/* Profile photo */}
      <div className="absolute left-4 top-4 sm:left-8 sm:top-8">
        <div className="h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-[#2a2a2a]">
          <img
            src="https://images.unsplash.com/photo-1633332755192-723a6f1c9d05?w=80&h=80&fit=crop"
            alt="Vipul Sharma"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Selection overlay */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col items-center"
              initial={{ scale: 1 }}
              animate={{ scale: 1.6 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div
                className={`flex h-32 w-32 items-center justify-center rounded-lg text-white/80 sm:h-40 sm:w-40 ${tiles[selected].thumbnailClass}`}
              >
                {tiles[selected].icon}
              </div>
              <span className="mt-3 text-lg text-white sm:text-2xl">
                {tiles[selected].label}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`flex flex-1 flex-col items-center justify-center transition-opacity duration-300 ${
          selected !== null ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Wordmark */}
        <h1 className="mb-8 animate-fade-up text-5xl font-extrabold tracking-tighter text-[#E50914] sm:text-7xl">
          VIPUL SHARMA
        </h1>

        {/* Heading */}
        <h2 className="mb-3 animate-fade-up text-2xl font-medium text-white sm:text-4xl">
          Choose what you'd like to explore
        </h2>
        <p className="mb-10 animate-fade-up text-base text-[#9b9b9b]">
          Discover my work, experience and technical journey.
        </p>

        {/* Profile tiles */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-10">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.to}
              className="animate-fade-up"
              style={{ animationDelay: `${0.1 * (i + 1)}s` }}
              initial={{ opacity: 1 }}
              animate={{
                opacity: selected === null ? 1 : selected === i ? 0 : 0.2,
                scale: selected === null ? 1 : selected === i ? 1.3 : 0.9,
              }}
              transition={{ duration: 0.4 }}
            >
              <ProfileTile
                label={tile.label}
                icon={tile.icon}
                thumbnailClass={tile.thumbnailClass}
                onClick={() => handleSelect(i, tile.to)}
              />
            </motion.div>
          ))}
        </div>

        {/* Manage profiles link */}
        <button className="mt-12 text-base text-[#9b9b9b] transition-colors hover:text-white">
          Manage Profiles
        </button>
      </div>

      {/* Footer */}
      <footer className="pt-8 text-center text-xs text-[#6b6b6b]">
        © {new Date().getFullYear()} Vipul Sharma. All rights reserved.
      </footer>
    </div>
  );
}
