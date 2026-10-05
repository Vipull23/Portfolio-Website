import { Link } from 'react-router-dom';
import { ChevronDown, Github, Play } from 'lucide-react';
import ProjectPoster from '@/components/ProjectPoster';
import { btnCircle, badgeOutline } from '@/components/ui';
import { projectYear, type Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  onMoreInfo: (project: Project) => void;
  /** Shows a giant "Top 10" style number beside a portrait poster. */
  rank?: number;
}

export default function ProjectCard({ project, onMoreInfo, rank }: ProjectCardProps) {
  if (rank !== undefined) {
    return (
      <button
        onClick={() => onMoreInfo(project)}
        aria-label={`More info about ${project.cardTitle}`}
        className="group flex shrink-0 snap-start items-end text-left"
      >
        <span
          aria-hidden
          className="-mr-2 select-none text-[9rem] font-black leading-[0.8] tracking-tighter text-nf-bg [-webkit-text-stroke:4px_rgba(255,255,255,0.55)] sm:text-[11rem]"
        >
          {rank}
        </span>
        <ProjectPoster
          project={project}
          className="relative h-52 w-36 rounded-md shadow-xl transition-transform duration-300 group-hover:scale-105 sm:h-60 sm:w-40"
        />
      </button>
    );
  }

  return (
    <article className="group relative w-72 shrink-0 snap-start overflow-hidden rounded-md bg-nf-surface shadow-lg transition-all duration-300 hover:z-10 hover:scale-105 hover:shadow-2xl hover:shadow-black/60">
      <Link to={`/projects/${project.id}`} aria-label={`Open ${project.cardTitle}`}>
        <ProjectPoster project={project} size="md" className="aspect-video w-full" />
      </Link>

      {/* Netflix hover card: controls, metadata and genres */}
      <div className="space-y-2.5 p-3">
        <div className="flex items-center gap-2">
          <Link
            to={`/projects/${project.id}`}
            aria-label={`Open ${project.cardTitle} case study`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-white/80"
          >
            <Play size={16} fill="currentColor" />
          </Link>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.cardTitle} on GitHub`}
            className={btnCircle}
          >
            <Github size={16} />
          </a>
          <button
            onClick={() => onMoreInfo(project)}
            aria-label={`More info about ${project.cardTitle}`}
            className={`${btnCircle} ml-auto`}
          >
            <ChevronDown size={18} />
          </button>
        </div>
        <p className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-green-500">{projectYear(project)}</span>
          <span className={badgeOutline}>{project.endpoints.length} APIs</span>
          <span className="text-nf-text">{project.flows.length} flows</span>
        </p>
        <p className="line-clamp-2 text-sm text-nf-muted">{project.summary}</p>
        <p className="flex flex-wrap items-center gap-x-1.5 text-xs text-white">
          {project.genres.map((g, i) => (
            <span key={g} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-nf-dim">•</span>}
              {g}
            </span>
          ))}
        </p>
      </div>
    </article>
  );
}
