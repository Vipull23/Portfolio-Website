import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Info, Mail, Linkedin, Github, Download, MapPin } from 'lucide-react';
import Billboard, { OutlineBackdrop } from '@/components/Billboard';
import { btnPrimary, btnSecondary, badgeOutline } from '@/components/ui';
import { profile } from '@/data/profile';
import { work } from '@/data/experience';
import { projects } from '@/data/projects';
import { certifications } from '@/data/certifications';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const latestJob = work[0];
const ongoingProject = projects[0];

const stats = [
  { value: '1 yr', label: 'Professional backend experience' },
  { value: '14+', label: 'Production REST APIs shipped' },
  { value: String(projects.length), label: 'Backend projects with case studies' },
  { value: String(certifications.length), label: 'Certifications' },
];

const contacts = [
  { label: 'Email', icon: <Mail size={18} />, href: `mailto:${profile.email}`, external: false },
  { label: 'LinkedIn', icon: <Linkedin size={18} />, href: profile.linkedinUrl, external: true },
  { label: 'GitHub', icon: <Github size={18} />, href: profile.githubUrl, external: true },
];

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-5 text-xl font-semibold text-white sm:text-2xl">{children}</h2>;
}

function MetaRow({ label, items }: { label: string; items: string[] }) {
  return (
    <p className="text-sm leading-relaxed">
      <span className="text-nf-dim">{label}: </span>
      <span className="text-nf-text">{items.join(', ')}</span>
    </p>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

export default function About() {
  useDocumentTitle('About');
  return (
    <>
      <Billboard
        kicker="Profile"
        title={profile.name}
        backdrop={
          profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt=""
              className="h-full w-full object-cover object-top opacity-60 [mask-image:linear-gradient(to_bottom,black_40%,transparent)] md:[mask-image:linear-gradient(to_left,black_40%,transparent)]"
            />
          ) : (
            <OutlineBackdrop text={profile.initials} />
          )
        }
        meta={
          <>
            <span className="font-semibold text-green-500">98% Match</span>
            <span className="text-nf-text">Since 2025</span>
            <span className={badgeOutline}>Java 17</span>
            <span className={badgeOutline}>Spring Boot 3</span>
            <span className="inline-flex items-center gap-1 text-nf-text">
              <MapPin size={14} />
              {profile.location}
            </span>
          </>
        }
        description={
          <>
            <p className="mb-2 text-lg font-medium text-white sm:text-xl">{profile.role}</p>
            <p>{profile.tagline}</p>
          </>
        }
        actions={
          <>
            <Link to="/projects" className={btnPrimary}>
              <Play size={22} fill="currentColor" />
              View Projects
            </Link>
            <Link to="/experience" className={btnSecondary}>
              <Info size={22} />
              My Experience
            </Link>
          </>
        }
      />

      <div className="max-w-6xl px-6 pb-20 sm:px-12">
        {/* Synopsis + details, like a Netflix title's "About" panel */}
        <motion.section {...fadeUp} className="mb-16 grid gap-10 md:grid-cols-[2fr_1fr]">
          <div>
            <SectionTitle>About Me</SectionTitle>
            <div className="space-y-5 text-base leading-relaxed text-nf-text sm:text-lg">
              {profile.bio.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
          </div>
          <aside className="space-y-3 md:pt-12">
            <MetaRow label="Core skills" items={profile.coreSkills} />
            <MetaRow label="Genres" items={profile.genres} />
            <MetaRow label="Latest role" items={[`${latestJob.role}, ${latestJob.brand}`]} />
            <MetaRow label="Currently exploring" items={profile.exploring} />
            <MetaRow label="Based in" items={[profile.location]} />
          </aside>
        </motion.section>

        {/* By the numbers */}
        <motion.section {...fadeUp} className="mb-16">
          <SectionTitle>By the Numbers</SectionTitle>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-white/10 bg-nf-surface p-5 transition-colors hover:border-nf-red"
              >
                <p className="mb-1 text-4xl font-black text-nf-red sm:text-5xl">{s.value}</p>
                <p className="text-sm text-nf-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Continue Watching */}
        <motion.section {...fadeUp} className="mb-16">
          <SectionTitle>Continue Watching for {profile.name.split(' ')[0]}</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            <ContinueCard
              to="/experience"
              kicker="Latest season"
              title={latestJob.brand}
              subtitle={`${latestJob.role} · ${latestJob.period}`}
              status="Season complete"
              progress={100}
            />
            <ContinueCard
              to={`/projects/${ongoingProject.id}`}
              kicker="Now building"
              title={ongoingProject.cardTitle}
              subtitle={ongoingProject.period}
              status="In progress"
              progress={60}
            />
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section {...fadeUp}>
          <SectionTitle>Get in Touch</SectionTitle>
          <div className="flex flex-wrap gap-3">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex items-center gap-2 rounded border border-white/15 bg-nf-surface px-5 py-2.5 text-sm font-medium text-nf-text transition-colors hover:border-nf-red hover:text-white"
              >
                {c.icon}
                {c.label}
              </a>
            ))}
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded bg-nf-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-nf-red-hover"
            >
              <Download size={18} />
              Download Resume
            </a>
          </div>
        </motion.section>
      </div>
    </>
  );
}

interface ContinueCardProps {
  to: string;
  kicker: string;
  title: string;
  subtitle: string;
  status: string;
  progress: number;
}

function ContinueCard({ to, kicker, title, subtitle, status, progress }: ContinueCardProps) {
  return (
    <Link
      to={to}
      className="group overflow-hidden rounded-lg border border-white/10 bg-nf-surface transition-all duration-200 hover:scale-[1.02] hover:border-white/30"
    >
      <div className="relative flex h-32 items-end bg-gradient-to-br from-[#3b1f1f] to-nf-elevated p-4">
        <div className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/80 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Play size={20} fill="currentColor" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-nf-red-soft">{kicker}</p>
          <p className="text-xl font-bold text-white">{title}</p>
        </div>
      </div>
      <div className="h-1 bg-white/20">
        <div className="h-full bg-nf-red" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
        <span className="truncate text-nf-text">{subtitle}</span>
        <span className="shrink-0 text-nf-muted">{status}</span>
      </div>
    </Link>
  );
}
