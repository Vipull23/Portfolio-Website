import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileTile from '@/components/ProfileTile';
import { User, Briefcase, FolderGit2, Award, FileText } from 'lucide-react';
import { profile } from '@/data/profile';

const tiles = [
  {
    to: '/about',
    label: 'About Me',
    icon: <User size={56} />,
    thumbnailClass: 'bg-gradient-to-br from-[#2a1f1f] to-[#3b2a2a]',
  },
  {
    to: '/experience',
    label: 'Experience',
    icon: <Briefcase size={56} />,
    thumbnailClass: 'bg-gradient-to-br from-[#2a1f3b] to-[#3b2a4a]',
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
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-nf-bg px-4 py-16">
      {/* Profile avatar */}
      <div className="absolute left-4 top-4 sm:left-8 sm:top-8">
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="h-10 w-10 rounded object-cover"
          />
        ) : (
          <div
            aria-label={profile.name}
            className="flex h-10 w-10 items-center justify-center rounded bg-nf-red text-sm font-bold text-white"
          >
            {profile.initials}
          </div>
        )}
      </div>

      {/* Selection overlay */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-nf-bg"
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
        <h1 className="mb-8 animate-fade-up text-center text-5xl font-extrabold uppercase tracking-tighter text-nf-red sm:text-7xl">
          {profile.name}
        </h1>

        {/* Heading */}
        <h2
          className="mb-3 animate-fade-up text-center text-2xl font-medium text-white sm:text-4xl"
          style={{ animationDelay: '0.1s' }}
        >
          Choose what you'd like to explore
        </h2>
        <p
          className="mb-10 animate-fade-up text-center text-base text-nf-muted"
          style={{ animationDelay: '0.2s' }}
        >
          Discover my work, experience and technical journey.
        </p>

        {/* Profile tiles: the CSS entrance animation sits on the wrapper so it
            doesn't fight framer-motion's opacity/scale on the inner element. */}
        <div className="flex max-w-5xl flex-wrap justify-center gap-6 sm:gap-10">
          {tiles.map((tile, i) => (
            <div
              key={tile.to}
              className="animate-fade-up"
              style={{ animationDelay: `${0.3 + 0.1 * i}s` }}
            >
              <motion.div
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
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-8 text-center text-xs text-nf-dim">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </footer>
    </div>
  );
}
