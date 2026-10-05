import { isOngoing, type Project } from '@/data/projects';

interface ProjectPosterProps {
  project: Project;
  /** Text size of the title treatment. */
  size?: 'sm' | 'md' | 'lg';
  /** Hide the title (e.g. when it's already printed beside the art). */
  showTitle?: boolean;
  /** Art only: no title, V mark or ribbon (for billboard backdrops). */
  bare?: boolean;
  className?: string;
}

const titleSize = {
  sm: 'text-lg',
  md: 'text-2xl sm:text-3xl',
  lg: 'text-4xl sm:text-5xl',
};

/**
 * Generated "key art" for a project: gradient, oversized icon, a small V mark,
 * and the title set like a Netflix logo treatment. No image files needed.
 */
export default function ProjectPoster({
  project,
  size = 'sm',
  showTitle = true,
  bare = false,
  className = '',
}: ProjectPosterProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundImage: `linear-gradient(135deg, ${project.poster.from}, ${project.poster.to})` }}
    >
      {/* Soft highlight, oversized icon, and a bottom shade so the title stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.18),transparent_45%)]" />
      <div className="absolute -bottom-[15%] -right-[10%] h-[95%] text-white/15 [&>svg]:h-full [&>svg]:w-auto [&>svg]:stroke-[1.25]">
        {project.poster.icon}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {!bare && <span className="absolute left-3 top-2 text-xl font-black text-nf-red drop-shadow">V</span>}

      {showTitle && !bare && (
        <p
          className={`absolute bottom-3 left-3 right-3 font-black uppercase leading-[0.9] tracking-tight text-white drop-shadow-lg ${titleSize[size]}`}
        >
          {project.cardTitle}
        </p>
      )}

      {isOngoing(project) && !bare && (
        <span className="absolute right-0 top-3 rounded-l bg-nf-red px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          New Episodes
        </span>
      )}
    </div>
  );
}
