import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { profile } from '@/data/profile';

const links = [
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/resume', label: 'Resume' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Like Netflix: transparent over the billboard, solid once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);
  const solid = scrolled || menuOpen;

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-colors duration-300 ${
        solid ? 'bg-nf-bg/95 shadow-md backdrop-blur' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3 sm:px-12 sm:py-4">
        <div className="flex items-center gap-4 lg:gap-10">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              aria-label="Back to profile selection"
              className="text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft size={22} />
            </Link>
            <span className="text-xl font-extrabold uppercase tracking-tighter text-nf-red sm:text-2xl">
              {profile.name}
            </span>
          </div>

          <div className="hidden items-center gap-5 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm transition-colors ${
                  isActive(l.to) ? 'font-semibold text-white' : 'text-nf-text hover:text-nf-muted'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Profile avatar, as in Netflix's top-right corner */}
          <Link
            to="/"
            aria-label="Switch profile"
            className="hidden h-8 w-8 items-center justify-center overflow-hidden rounded bg-nf-red text-xs font-bold text-white md:flex"
          >
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              profile.initials
            )}
          </Link>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded text-white md:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 px-6 pb-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`block py-3 text-base font-medium transition-colors ${
                isActive(l.to) ? 'text-white' : 'text-nf-muted hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
