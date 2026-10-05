import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, Github, Maximize2 } from 'lucide-react';
import Billboard from '@/components/Billboard';
import ProjectCard from '@/components/ProjectCard';
import ProjectPoster from '@/components/ProjectPoster';
import ProjectPreviewModal from '@/components/ProjectPreviewModal';
import ImageLightbox from '@/components/ImageLightbox';
import { btnPrimary, btnSecondary, badgeOutline } from '@/components/ui';
import { getProject, projects, projectYear, type Project } from '@/data/projects';
import NotFound from '@/pages/NotFound';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const methodColors: Record<string, string> = {
  GET: 'bg-green-500/20 text-green-400 border-green-500/30',
  POST: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  PUT: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  DELETE: 'bg-red-500/20 text-red-400 border-red-500/30',
};

interface EpisodeItem {
  title: string;
  /** Right-aligned note, like an episode's runtime. */
  note?: string;
  content: ReactNode;
}

/** Netflix episode list where each row expands to show its content. */
function EpisodeList({ items, numbered = true }: { items: EpisodeItem[]; numbered?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ol className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item, i) => (
        <li key={item.title} className={open === i ? 'bg-nf-surface' : ''}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center gap-5 px-3 py-5 text-left transition-colors hover:bg-nf-surface sm:px-5"
          >
            {numbered && (
              <span className="w-8 shrink-0 text-3xl font-light text-nf-muted">{i + 1}</span>
            )}
            <span className="flex-1 text-base font-medium text-white sm:text-lg">{item.title}</span>
            {item.note && <span className="hidden text-sm text-nf-muted sm:inline">{item.note}</span>}
            <ChevronDown
              size={20}
              className={`shrink-0 text-nf-muted transition-transform duration-200 ${
                open === i ? 'rotate-180' : ''
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className={`pb-6 pr-5 ${numbered ? 'pl-3 sm:pl-[4.75rem]' : 'pl-3 sm:pl-5'}`}>
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ol>
  );
}

function SectionTitle({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <div className="mb-5 flex items-baseline justify-between gap-4">
      <h2 className="text-xl font-semibold text-white sm:text-2xl">{children}</h2>
      {note && <span className="text-sm text-nf-muted">{note}</span>}
    </div>
  );
}

function MetaRow({ label, items }: { label: string; items: string[] }) {
  return (
    <p className="text-sm leading-relaxed">
      <span className="text-nf-dim">{label}: </span>
      <span className="text-nf-text">{items.join(', ')}</span>
    </p>
  );
}

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = getProject(projectId);
  useDocumentTitle(project?.cardTitle ?? 'Page Not Found');
  const [preview, setPreview] = useState<Project | null>(null);
  const [shotIndex, setShotIndex] = useState<number | null>(null);

  // Opening another title from the preview navigates here again; close the old preview.
  useEffect(() => {
    setPreview(null);
    setShotIndex(null);
  }, [projectId]);

  if (!project) {
    return <NotFound message="That project isn't in the catalogue. Head back and pick another title." />;
  }

  const others = projects.filter((p) => p.id !== project.id);

  return (
    <>
      <Billboard
        compact
        kicker="Series"
        title={project.cardTitle}
        backdrop={
          <ProjectPoster
            project={project}
            bare
            className="h-full w-full [mask-image:linear-gradient(to_bottom,black_45%,transparent)] md:[mask-image:linear-gradient(to_left,black_45%,transparent)]"
          />
        }
        meta={
          <>
            <span className="font-semibold text-green-500">{projectYear(project)}</span>
            <span className="text-nf-text">{project.period}</span>
            <span className={badgeOutline}>{project.endpoints.length} APIs</span>
            <span className={badgeOutline}>{project.flows.length} flows</span>
          </>
        }
        description={
          <>
            <p className="mb-2 font-medium text-white">{project.title}</p>
            <p>{project.tagline}</p>
          </>
        }
        actions={
          <>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              <Github size={22} />
              View Code
            </a>
            <Link to="/projects" className={btnSecondary}>
              <ArrowLeft size={22} />
              All Projects
            </Link>
          </>
        }
      />

      <div className="mx-auto max-w-5xl px-6 pb-12 sm:px-12">
        {/* Overview */}
        <section className="mb-16 grid gap-8 md:grid-cols-[2fr_1fr]">
          <div>
            <SectionTitle>Overview</SectionTitle>
            <p className="text-base leading-relaxed text-nf-text sm:text-lg">{project.overview}</p>
          </div>
          <div className="space-y-3 md:pt-12">
            <MetaRow label="Tech" items={project.tags} />
            <MetaRow label="Genres" items={project.genres} />
            <MetaRow label="Components" items={project.architecture.services.map((s) => s.name)} />
          </div>
        </section>

        {/* Architecture Diagram */}
        <section className="mb-16">
          <SectionTitle>Architecture</SectionTitle>
          <div className="rounded-lg border border-white/10 bg-nf-panel p-6 sm:p-8">
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-wrap justify-center gap-4">
                {project.architecture.services.map((s) => (
                  <div
                    key={s.name}
                    className="flex h-24 w-32 flex-col items-center justify-center gap-2 rounded-lg border border-white/15 px-2 text-center"
                    style={{ backgroundColor: s.color }}
                  >
                    <span className="text-white/90">{s.icon}</span>
                    <span className="text-xs font-medium text-white">{s.name}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center text-nf-muted">
                <div className="h-8 w-px bg-white/20" />
                <span className="text-xs">{project.architecture.connectorLabel}</span>
                <div className="h-8 w-px bg-white/20" />
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {project.architecture.infra.map((s) => (
                  <div
                    key={s.name}
                    className="flex h-20 w-28 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 px-2 text-center"
                    style={{ backgroundColor: s.color }}
                  >
                    <span className="text-white/90">{s.icon}</span>
                    <span className="text-xs font-medium text-white">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Episodes = key flows */}
        <section className="mb-16">
          <SectionTitle note={`${project.flows.length} key flows`}>Episodes</SectionTitle>
          <EpisodeList
            key={`flows-${project.id}`}
            items={project.flows.map((flow) => ({
              title: flow.title,
              note: `${flow.steps.length} steps`,
              content: (
                <ol className="space-y-3">
                  {flow.steps.map((step, si) => (
                    <li key={si} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-nf-red text-xs font-bold text-white">
                        {si + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-nf-text">{step}</span>
                    </li>
                  ))}
                </ol>
              ),
            }))}
          />
        </section>

        {/* Problems solved */}
        <section className="mb-16">
          <SectionTitle note="Problems solved">Behind the Scenes</SectionTitle>
          <EpisodeList
            key={`problems-${project.id}`}
            numbered={false}
            items={project.problems.map((p) => ({
              title: p.title,
              content: <p className="text-sm leading-relaxed text-nf-text sm:text-base">{p.solution}</p>,
            }))}
          />
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <SectionTitle>Tech Stack</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {project.techStack.map((row) => (
              <div
                key={row.tech}
                className="rounded-md border border-white/10 bg-nf-surface px-4 py-3 transition-colors hover:border-nf-red"
              >
                <p className="font-medium text-white">{row.tech}</p>
                <p className="text-sm text-nf-muted">{row.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* API Endpoints */}
        <section className="mb-16">
          <SectionTitle note={`${project.endpoints.length} endpoints`}>API Endpoints</SectionTitle>
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-nf-surface text-sm text-nf-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Method</th>
                  <th className="px-5 py-3 font-medium">Endpoint</th>
                  <th className="px-5 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {project.endpoints.map((e, i) => (
                  <tr
                    key={`${e.method} ${e.path}`}
                    className={`text-sm ${i % 2 === 0 ? 'bg-nf-bg' : 'bg-nf-panel'}`}
                  >
                    <td className="px-5 py-3">
                      <span
                        className={`inline-block rounded border px-2 py-0.5 text-xs font-bold ${
                          methodColors[e.method] || 'bg-white/10 text-white'
                        }`}
                      >
                        {e.method}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-white">{e.path}</td>
                    <td className="px-5 py-3 text-nf-text">{e.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Screenshots, as Netflix's "Trailers & More" row; click to view full size */}
        {project.screenshots.length > 0 && (
          <section className="mb-16">
            <SectionTitle note={`${project.screenshots.length} screenshots`}>Trailers & More</SectionTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.screenshots.map((shot, i) => (
                <button
                  key={shot.src}
                  onClick={() => setShotIndex(i)}
                  className="group overflow-hidden rounded-md bg-nf-surface text-left"
                >
                  <div className="relative aspect-video overflow-hidden bg-nf-panel">
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white">
                        <Maximize2 size={20} />
                      </span>
                    </span>
                  </div>
                  <p className="px-3 py-2.5 text-sm text-nf-text">{shot.caption}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* More Like This */}
        {others.length > 0 && (
          <section>
            <SectionTitle>More Like This</SectionTitle>
            <div className="flex flex-wrap gap-4 py-2">
              {others.map((p) => (
                <ProjectCard key={p.id} project={p} onMoreInfo={setPreview} />
              ))}
            </div>
          </section>
        )}
      </div>

      {shotIndex !== null && (
        <ImageLightbox
          images={project.screenshots}
          index={shotIndex}
          onIndexChange={setShotIndex}
          onClose={() => setShotIndex(null)}
        />
      )}

      {preview && (
        <ProjectPreviewModal
          project={preview}
          onClose={() => setPreview(null)}
          onSelect={setPreview}
        />
      )}
    </>
  );
}
