import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Download, Play, ChevronRight, Award, GraduationCap } from 'lucide-react';
import Billboard, { OutlineBackdrop } from '@/components/Billboard';
import CertificateModal from '@/components/CertificateModal';
import ProjectPoster from '@/components/ProjectPoster';
import { btnPrimary, btnSecondary, badgeOutline } from '@/components/ui';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { work, education } from '@/data/experience';
import { certifications } from '@/data/certifications';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

function SectionTitle({ children, note }: { children: ReactNode; note?: ReactNode }) {
  return (
    <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
      <h2 className="text-xl font-semibold text-white sm:text-2xl">{children}</h2>
      {note && <span className="text-sm text-nf-muted">{note}</span>}
    </div>
  );
}

export default function Resume() {
  useDocumentTitle('Resume');
  const [activeDoc, setActiveDoc] = useState<{ title: string; url: string } | null>(null);

  return (
    <>
      <Billboard
        compact
        kicker="Document"
        title="My Resume"
        backdrop={<OutlineBackdrop text="CV" />}
        meta={
          <>
            <span className="font-semibold text-green-500">{profile.role}</span>
            <span className={badgeOutline}>{work.length} {work.length === 1 ? 'role' : 'roles'}</span>
            <span className={badgeOutline}>{projects.length} projects</span>
            <span className={badgeOutline}>PDF</span>
          </>
        }
        description="Experience, technical projects, education and certifications, all in one place. Watch it here or take a copy with you."
        actions={
          <>
            <button
              onClick={() => setActiveDoc({ title: 'Resume', url: profile.resumeUrl })}
              className={btnPrimary}
            >
              <Play size={22} fill="currentColor" />
              View Resume
            </button>
            <a href={profile.resumeUrl} download className={btnSecondary}>
              <Download size={22} />
              Download
            </a>
          </>
        }
      />

      <div className="mx-auto max-w-4xl px-6 pb-12 sm:px-12">
        {/* Professional Experience */}
        <section className="mb-14">
          <SectionTitle
            note={
              <Link to="/experience" className="inline-flex items-center gap-1 hover:text-white">
                Full season <ChevronRight size={16} />
              </Link>
            }
          >
            Professional Experience
          </SectionTitle>
          {work.map((w) => (
            <div key={`${w.company}-${w.period}`} className="rounded-md bg-nf-surface p-5">
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-white">{w.role}</h3>
                <span className="text-sm font-semibold text-green-500">{w.period}</span>
              </div>
              <p className="text-sm text-nf-red-soft">
                {w.company} · {w.location}
              </p>
              <p className="mb-4 mt-1 text-sm italic text-nf-muted">{w.context}</p>
              <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-nf-text sm:text-base">
                {w.highlights.map(({ detail }) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Technical Projects, as an episode list with poster thumbnails */}
        <section className="mb-14">
          <SectionTitle note={`${projects.length} titles`}>Technical Projects</SectionTitle>
          <ol className="divide-y divide-white/10">
            {projects.map((p, i) => (
              <li key={p.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:gap-6">
                <div className="flex shrink-0 items-center gap-4">
                  <span className="w-6 text-2xl text-nf-muted">{i + 1}</span>
                  <Link
                    to={`/projects/${p.id}`}
                    aria-label={`Open ${p.cardTitle}`}
                    className="group relative block overflow-hidden rounded"
                  >
                    <ProjectPoster project={p} size="sm" className="aspect-video w-40" />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white">
                        <Play size={18} fill="currentColor" />
                      </span>
                    </span>
                  </Link>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-white">{p.resume.title}</h3>
                    <span className="text-sm text-nf-muted">{p.period}</span>
                  </div>
                  <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-nf-text">
                    {p.resume.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Education */}
        <section className="mb-14">
          <SectionTitle>Education</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            {education.map((ed) => (
              <div key={ed.degree} className="flex gap-4 rounded-md bg-nf-surface p-5">
                <GraduationCap size={28} className="shrink-0 text-nf-red" />
                <div>
                  <h3 className="mb-1 font-semibold text-white">{ed.degree}</h3>
                  <p className="text-sm text-nf-red-soft">{ed.school}</p>
                  <p className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-nf-muted">{ed.period}</span>
                    <span className={badgeOutline}>{ed.detail}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <SectionTitle>Certifications</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((c) => (
              <div key={c.title} className="flex flex-col gap-4 rounded-md bg-nf-surface p-5">
                <div className="flex gap-4">
                  <Award size={28} className="shrink-0 text-amber-400" />
                  <div>
                    <h3 className="mb-1 font-semibold text-white">{c.title}</h3>
                    <p className="text-sm text-nf-red-soft">{c.issuer}</p>
                    <p className="mt-1 text-sm text-nf-muted">{c.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveDoc({ title: c.title, url: c.certUrl })}
                  className="inline-flex w-full items-center justify-center gap-2 rounded bg-white py-2 text-sm font-semibold text-black transition-colors hover:bg-white/75"
                >
                  <Play size={16} fill="currentColor" />
                  View Certificate
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {activeDoc && (
        <CertificateModal
          url={activeDoc.url}
          title={activeDoc.title}
          onClose={() => setActiveDoc(null)}
        />
      )}
    </>
  );
}
