import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Github, Play, X } from 'lucide-react';
import ProjectPoster from '@/components/ProjectPoster';
import { btnPrimary, badgeOutline } from '@/components/ui';
import { useDialog } from '@/hooks/useDialog';
import { projects, projectYear, type Project } from '@/data/projects';

interface ProjectPreviewModalProps {
  project: Project;
  onClose: () => void;
  /** Switch the preview to another title (from "More Like This"). */
  onSelect: (project: Project) => void;
}

function MetaRow({ label, items }: { label: string; items: string[] }) {
  return (
    <p className="text-sm leading-relaxed">
      <span className="text-nf-dim">{label}: </span>
      <span className="text-nf-text">{items.join(', ')}</span>
    </p>
  );
}

export default function ProjectPreviewModal({ project, onClose, onSelect }: ProjectPreviewModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  useDialog(onClose, closeRef);

  const others = projects.filter((p) => p.id !== project.id);

  const select = (p: Project) => {
    onSelect(p);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  return (
    <div
      ref={scrollRef}
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/75 px-2 py-6 sm:px-4 sm:py-10"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
        className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-lg bg-nf-panel shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Key art header */}
        <div className="relative">
          <ProjectPoster project={project} bare className="aspect-video w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-nf-panel via-nf-panel/30 to-transparent" />
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close preview"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-nf-panel text-white transition-colors hover:bg-nf-elevated"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10">
            <h2
              id="preview-title"
              className="mb-4 text-3xl font-black uppercase leading-[0.9] tracking-tight text-white drop-shadow-lg sm:text-5xl"
            >
              {project.cardTitle}
            </h2>
            <div className="flex items-center gap-3">
              <Link to={`/projects/${project.id}`} className={btnPrimary}>
                <Play size={20} fill="currentColor" />
                View Case Study
              </Link>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on GitHub"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white/50 bg-black/40 text-white transition-colors hover:border-white"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid gap-6 px-6 pb-8 sm:grid-cols-[2fr_1fr] sm:px-10">
          <div>
            <p className="mb-3 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold text-green-500">{projectYear(project)}</span>
              <span className="text-nf-text">{project.period}</span>
              <span className={badgeOutline}>{project.endpoints.length} APIs</span>
              <span className={badgeOutline}>HD</span>
            </p>
            <p className="mb-3 font-medium text-white">{project.tagline}</p>
            <p className="text-sm leading-relaxed text-nf-text">{project.overview}</p>
          </div>
          <div className="space-y-3">
            <MetaRow label="Tech" items={project.tags} />
            <MetaRow label="Genres" items={project.genres} />
            <MetaRow
              label="Services"
              items={project.architecture.services.map((s) => s.name)}
            />
          </div>
        </div>

        {/* Episodes = key flows */}
        <section className="px-6 pb-8 sm:px-10">
          <div className="mb-3 flex items-baseline justify-between">
            <h3 className="text-xl font-semibold text-white">Episodes</h3>
            <span className="text-sm text-nf-muted">Key flows</span>
          </div>
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {project.flows.map((flow, i) => (
              <li key={flow.title} className="flex items-start gap-5 py-4">
                <span className="w-6 shrink-0 text-2xl text-nf-muted">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-baseline justify-between gap-3">
                    <p className="font-medium text-white">{flow.title}</p>
                    <span className="shrink-0 text-xs text-nf-muted">{flow.steps.length} steps</span>
                  </div>
                  <p className="line-clamp-2 text-sm text-nf-muted">{flow.steps[0]}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* More Like This */}
        {others.length > 0 && (
          <section className="px-6 pb-10 sm:px-10">
            <h3 className="mb-4 text-xl font-semibold text-white">More Like This</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {others.map((p) => (
                <button
                  key={p.id}
                  onClick={() => select(p)}
                  className="overflow-hidden rounded-md bg-nf-elevated text-left transition-transform hover:scale-[1.02]"
                >
                  <ProjectPoster project={p} size="sm" className="aspect-video w-full" />
                  <div className="p-3">
                    <p className="mb-1 flex items-center gap-2 text-xs">
                      <span className="font-semibold text-green-500">{projectYear(p)}</span>
                      <span className={badgeOutline}>{p.endpoints.length} APIs</span>
                    </p>
                    <p className="line-clamp-3 text-sm text-nf-muted">{p.summary}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
