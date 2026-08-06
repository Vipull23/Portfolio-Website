import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const links = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/resume', label: 'Resume' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-[#141414]/95 px-4 py-3 shadow-md backdrop-blur sm:px-8">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          aria-label="Back to profile selection"
          className="text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft size={22} />
        </Link>
        <span className="text-2xl font-extrabold tracking-tighter text-[#E50914]">
          VIPUL SHARMA
        </span>
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`text-sm font-medium transition-colors sm:text-base ${
              pathname === l.to
                ? 'text-white'
                : 'text-[#9b9b9b] hover:text-white'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
