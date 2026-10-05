import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info, Play } from 'lucide-react';
import Billboard from '@/components/Billboard';
import CarouselRow from '@/components/CarouselRow';
import ProjectCard from '@/components/ProjectCard';
import ProjectPoster from '@/components/ProjectPoster';
import ProjectPreviewModal from '@/components/ProjectPreviewModal';
import { btnPrimary, btnSecondary, badgeOutline } from '@/components/ui';
import { projects, allGenres, isOngoing, projectYear, type Project } from '@/data/projects';

const featured = projects.find(isOngoing) ?? projects[0];
const kafkaProjects = projects.filter((p) => p.tags.some((t) => /kafka/i.test(t)));

export default function Projects() {
  const [preview, setPreview] = useState<Project | null>(null);
  const [genre, setGenre] = useState<string>('All');

  const browse = genre === 'All' ? projects : projects.filter((p) => p.genres.includes(genre));

  return (
    <>
      <Billboard
        kicker="Series"
        title={featured.cardTitle}
        backdrop={
          <ProjectPoster
            project={featured}
            bare
            className="h-full w-full [mask-image:linear-gradient(to_left,black_45%,transparent)]"
          />
        }
        meta={
          <>
            <span className="font-semibold text-green-500">
              {isOngoing(featured) ? 'New Episodes' : projectYear(featured)}
            </span>
            <span className="text-nf-text">{featured.period}</span>
            <span className={badgeOutline}>{featured.endpoints.length} APIs</span>
            <span className={badgeOutline}>{featured.architecture.services.length} services</span>
          </>
        }
        description={featured.tagline}
        actions={
          <>
            <Link to={`/projects/${featured.id}`} className={btnPrimary}>
              <Play size={22} fill="currentColor" />
              View Case Study
            </Link>
            <button onClick={() => setPreview(featured)} className={btnSecondary}>
              <Info size={22} />
              More Info
            </button>
          </>
        }
      />

      <div className="relative z-10 -mt-10 px-4 pb-8 sm:px-10">
        <CarouselRow title={`Top ${projects.length} Backend Projects`}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} rank={i + 1} onMoreInfo={setPreview} />
          ))}
        </CarouselRow>

        {kafkaProjects.length > 0 && (
          <CarouselRow title="Because You Like Event-Driven Systems">
            {kafkaProjects.map((p) => (
              <ProjectCard key={p.id} project={p} onMoreInfo={setPreview} />
            ))}
          </CarouselRow>
        )}

        {/* Browse by genre */}
        <section className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            <h2 className="text-xl font-semibold text-white sm:text-2xl">Browse by Genre</h2>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by genre">
              {['All', ...allGenres].map((g) => (
                <button
                  key={g}
                  onClick={() => setGenre(g)}
                  aria-pressed={genre === g}
                  className={`rounded-full border px-3.5 py-1 text-sm transition-colors ${
                    genre === g
                      ? 'border-white bg-white text-black'
                      : 'border-white/30 text-nf-text hover:border-white hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <motion.div layout className="flex flex-wrap gap-4 px-2 py-4">
            {browse.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={p} onMoreInfo={setPreview} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

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
