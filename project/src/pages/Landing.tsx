import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, FolderGit2, Award, FileText, Download } from 'lucide-react';
import ProfileTile from '@/components/ProfileTile';
import Intro from '@/components/Intro';
import { profile } from '@/data/profile';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

// Bright, flat profile colours, like Netflix's default avatars.
const tiles = [
  { to: '/about', label: 'About Me', icon: <User />, color: 'bg-[#2563eb]' },
  { to: '/experience', label: 'Experience', icon: <Briefcase />, color: 'bg-[#e5a00d]' },
  { to: '/projects', label: 'Projects', icon: <FolderGit2 />, color: 'bg-nf-red' },
  { to: '/skills', label: 'Skills & Certs', icon: <Award />, color: 'bg-[#0d9488]' },
  { to: '/resume', label: 'Resume', icon: <FileText />, color: 'bg-[#7c3aed]' },
];

const INTRO_KEY = 'intro-seen';

function shouldPlayIntro() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return sessionStorage.getItem(INTRO_KEY) !== '1';
  } catch {
    return false;
  }
}

export default function Landing() {
  useDocumentTitle();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(shouldPlayIntro);

  const finishIntro = useCallback(() => {
    setShowIntro(false);
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      // Storage can be unavailable (private mode); the intro just plays again next time.
    }
  }, []);

  const handleSelect = useCallback(
    (index: number, to: string) => {
      setSelected(index);
      window.setTimeout(() => navigate(to), 550);
    },
    [navigate],
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-nf-bg">
      <AnimatePresence>{showIntro && <Intro key="intro" onDone={finishIntro} />}</AnimatePresence>

      {/* Header: logo top-left, like Netflix */}
      <header className="px-6 py-5 sm:px-12 sm:py-6">
        <span className="text-2xl font-extrabold uppercase tracking-tighter text-nf-red sm:text-3xl">
          {profile.name}
        </span>
      </header>

      {/* Selection overlay: the chosen profile zooms in before navigating */}
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
                className={`flex h-28 w-28 items-center justify-center rounded-md text-white sm:h-36 sm:w-36 [&>svg]:h-1/2 [&>svg]:w-1/2 [&>svg]:stroke-[2.25] ${tiles[selected].color}`}
              >
                {tiles[selected].icon}
              </div>
              <span className="mt-3 text-lg text-white sm:text-2xl">{tiles[selected].label}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main
        className={`flex flex-1 flex-col items-center justify-center px-4 pb-10 transition-opacity duration-300 ${
          selected !== null ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <h1 className="mb-8 text-center text-3xl font-medium text-white motion-safe:animate-fade-up sm:mb-12 sm:text-5xl lg:text-6xl">
          Who's exploring?
        </h1>

        {/* The CSS entrance animation sits on the wrapper so it doesn't fight
            framer-motion's opacity/scale on the inner element. */}
        <div className="flex max-w-[22rem] flex-wrap justify-center gap-x-4 gap-y-6 sm:max-w-5xl sm:gap-x-8 lg:gap-x-10">
          {tiles.map((tile, i) => (
            <div
              key={tile.to}
              className="motion-safe:animate-fade-up"
              style={{ animationDelay: `${0.1 + 0.08 * i}s` }}
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
                  colorClass={tile.color}
                  onClick={() => handleSelect(i, tile.to)}
                />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Netflix's "Manage Profiles" button, put to work */}
        <a
          href={profile.resumeUrl}
          download
          className="mt-12 inline-flex items-center gap-2 border border-nf-muted px-6 py-2 text-sm uppercase tracking-[0.2em] text-nf-muted transition-colors motion-safe:animate-fade-up hover:border-white hover:text-white sm:mt-16 sm:text-base"
          style={{ animationDelay: '0.6s' }}
        >
          <Download size={18} />
          Download Resume
        </a>
      </main>

      <footer className="pb-6 text-center text-xs text-nf-dim">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  );
}
