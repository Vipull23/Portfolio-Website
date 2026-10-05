import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Download, Info, Play, Search, X } from 'lucide-react';
import Billboard, { OutlineBackdrop } from '@/components/Billboard';
import CarouselRow from '@/components/CarouselRow';
import CertificateModal from '@/components/CertificateModal';
import { btnCircle, btnPrimary, btnSecondary, badgeOutline } from '@/components/ui';
import { skillGroups, allSkills, topSkills, usedIn, type Skill } from '@/data/skills';
import { certifications, type Certification } from '@/data/certifications';

const iconSize = '[&>svg]:h-full [&>svg]:w-full';

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** A skill as a Netflix title card: icon art, name, and where it was used. */
function SkillCard({ skill }: { skill: Skill }) {
  const uses = usedIn(skill);

  return (
    <article className="group relative w-56 shrink-0 snap-start overflow-hidden rounded-md bg-nf-surface shadow-lg transition-all duration-300 hover:z-10 hover:scale-105 hover:shadow-2xl hover:shadow-black/60">
      <div className="relative flex h-28 items-center justify-center overflow-hidden bg-gradient-to-br from-[#3a0d10] via-nf-elevated to-nf-surface">
        <div className="absolute -bottom-6 -right-4 h-28 w-28 text-white/[0.06] [&>svg]:h-full [&>svg]:w-full">
          {skill.icon}
        </div>
        <div className={`h-11 w-11 text-nf-red transition-transform duration-300 group-hover:scale-110 ${iconSize}`}>
          {skill.icon}
        </div>
        {uses.length >= 3 && (
          <span className="absolute right-0 top-2 rounded-l bg-nf-red px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Top Pick
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="mb-1.5 text-sm font-semibold text-white">{skill.name}</h3>
        {uses.length > 0 ? (
          <>
            <p className="mb-1 text-xs">
              <span className="font-semibold text-green-500">Seen in {uses.length}</span>
              <span className="text-nf-muted"> {uses.length === 1 ? 'title' : 'titles'}</span>
            </p>
            <p className="flex flex-wrap gap-x-1.5 text-xs text-nf-text">
              {uses.map((u, i) => (
                <span key={u.label} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-nf-dim">•</span>}
                  <Link to={u.to} className="hover:text-white hover:underline">
                    {u.label}
                  </Link>
                </span>
              ))}
            </p>
          </>
        ) : (
          <p className="text-xs text-nf-muted">In the toolkit</p>
        )}
      </div>
    </article>
  );
}

/** "Top 10" tile: giant outlined rank beside a portrait card. */
function RankedSkill({ skill, rank }: { skill: Skill; rank: number }) {
  return (
    <div className="group flex shrink-0 snap-start items-end">
      <span
        aria-hidden
        className="-mr-2 select-none text-[8rem] font-black leading-[0.8] tracking-tighter text-nf-bg [-webkit-text-stroke:4px_rgba(255,255,255,0.55)] sm:text-[10rem]"
      >
        {rank}
      </span>
      <div className="relative flex h-48 w-32 flex-col items-center justify-between overflow-hidden rounded-md bg-gradient-to-b from-[#4a0d12] to-nf-surface p-3 shadow-xl transition-transform duration-300 group-hover:scale-105 sm:h-52 sm:w-36">
        <span className="self-start text-lg font-black text-nf-red">V</span>
        <div className={`h-12 w-12 text-white ${iconSize}`}>{skill.icon}</div>
        <p className="text-center text-xs font-bold uppercase leading-tight tracking-tight text-white">
          {skill.name}
        </p>
      </div>
    </div>
  );
}

function CertificateCard({ cert, onView }: { cert: Certification; onView: () => void }) {
  return (
    <article className="group w-72 shrink-0 snap-start overflow-hidden rounded-md bg-nf-surface shadow-lg transition-all duration-300 hover:z-10 hover:scale-105">
      <button onClick={onView} aria-label={`View ${cert.title}`} className="block w-full text-left">
        <div className="relative flex aspect-video flex-col justify-between overflow-hidden bg-gradient-to-br from-[#5c4310] via-[#2a1f08] to-nf-bg p-4">
          <div className="absolute -right-6 -top-4 h-36 w-36 text-amber-300/10 [&>svg]:h-full [&>svg]:w-full">
            <Award />
          </div>
          <span className="w-fit rounded bg-amber-400/90 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
            Certified
          </span>
          <p className="relative text-lg font-black uppercase leading-tight tracking-tight text-white drop-shadow">
            {cert.title}
          </p>
        </div>
      </button>
      <div className="space-y-2 p-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onView}
            aria-label={`View ${cert.title}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-white/80"
          >
            <Play size={16} fill="currentColor" />
          </button>
          <a href={cert.certUrl} download aria-label={`Download ${cert.title}`} className={btnCircle}>
            <Download size={16} />
          </a>
        </div>
        <p className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-green-500">{cert.date}</span>
          <span className={badgeOutline}>PDF</span>
        </p>
        <p className="text-sm text-nf-text">{cert.issuer}</p>
      </div>
    </article>
  );
}

export default function Skills() {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const results = q ? allSkills.filter((s) => s.name.toLowerCase().includes(q)) : [];

  return (
    <>
      <Billboard
        compact
        kicker="Collection"
        title="Skills & Certs"
        backdrop={<OutlineBackdrop text="JAVA" />}
        meta={
          <>
            <span className="font-semibold text-green-500">{allSkills.length} technologies</span>
            <span className={badgeOutline}>{skillGroups.length} categories</span>
            <span className={badgeOutline}>{certifications.length} certifications</span>
          </>
        }
        description="The backend stack I build with: Java and Spring at the core, Kafka for events, Redis for speed, and MySQL underneath. Each card shows where I've actually used it."
        actions={
          <>
            <button onClick={() => scrollToId('top-10')} className={btnPrimary}>
              <Play size={22} fill="currentColor" />
              Top 10
            </button>
            <button onClick={() => scrollToId('certifications')} className={btnSecondary}>
              <Info size={22} />
              Certifications
            </button>
          </>
        }
      />

      <div className="relative z-10 -mt-6 px-4 pb-8 sm:px-10">
        {/* Search, Netflix-style */}
        <div className="mb-8 flex max-w-md items-center gap-3 border border-white/30 bg-black/60 px-3 py-2 focus-within:border-white">
          <Search size={20} className="shrink-0 text-nf-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills: Kafka, Spring, Redis…"
            aria-label="Search skills"
            className="w-full bg-transparent text-white placeholder:text-nf-dim focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Clear search" className="text-nf-muted hover:text-white">
              <X size={18} />
            </button>
          )}
        </div>

        {q ? (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-white sm:text-2xl">
              {results.length > 0 ? `Results for "${query.trim()}"` : `No skills match "${query.trim()}"`}
            </h2>
            <motion.div layout className="flex flex-wrap gap-4 px-2 py-4">
              {results.map((s) => (
                <motion.div key={s.name} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <SkillCard skill={s} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        ) : (
          <>
            <div id="top-10" className="scroll-mt-24">
              <CarouselRow title="Top 10 in My Stack Today">
                {topSkills.map((s, i) => (
                  <RankedSkill key={s.name} skill={s} rank={i + 1} />
                ))}
              </CarouselRow>
            </div>

            {skillGroups.map((group) => (
              <CarouselRow key={group.title} title={group.title}>
                {group.skills.map((s) => (
                  <SkillCard key={s.name} skill={s} />
                ))}
              </CarouselRow>
            ))}
          </>
        )}

        <div id="certifications" className="scroll-mt-24">
          <CarouselRow title="Certifications">
            {certifications.map((c) => (
              <CertificateCard key={c.title} cert={c} onView={() => setActiveCert(c)} />
            ))}
          </CarouselRow>
        </div>
      </div>

      {activeCert && (
        <CertificateModal
          url={activeCert.certUrl}
          title={activeCert.title}
          onClose={() => setActiveCert(null)}
        />
      )}
    </>
  );
}
