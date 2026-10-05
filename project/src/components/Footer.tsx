import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/data/profile';

const columns = [
  [
    { label: 'About', to: '/about' },
    { label: 'Experience', to: '/experience' },
  ],
  [
    { label: 'Projects', to: '/projects' },
    { label: 'Skills & Certifications', to: '/skills' },
  ],
  [
    { label: 'Resume', to: '/resume' },
    { label: 'Switch Profile', to: '/' },
  ],
];

export default function Footer() {
  return (
    <footer className="max-w-5xl px-6 pb-12 pt-16 text-sm text-nf-dim sm:px-12">
      <div className="mb-6 flex gap-5 text-nf-text">
        <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-white">
          <Github size={22} />
        </a>
        <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-white">
          <Linkedin size={22} />
        </a>
        <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-colors hover:text-white">
          <Mail size={22} />
        </a>
      </div>
      <div className="mb-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
        {columns.flat().map((l) => (
          <Link key={l.to} to={l.to} className="w-fit transition-colors hover:underline">
            {l.label}
          </Link>
        ))}
      </div>
      <p className="mb-2">
        Questions? <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
      </p>
      <p>© {new Date().getFullYear()} {profile.name}</p>
    </footer>
  );
}
