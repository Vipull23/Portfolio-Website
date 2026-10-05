import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Play } from 'lucide-react';
import Billboard, { OutlineBackdrop } from '@/components/Billboard';
import { btnPrimary, btnSecondary, badgeOutline, tagRed } from '@/components/ui';
import { work } from '@/data/experience';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const episodesId = (i: number) => `episodes-${i}`;

export default function Experience() {
  useDocumentTitle('Experience');
  return (
    <>
      {work.map((job, jobIndex) => (
        <article key={`${job.company}-${job.period}`}>
          {/* Billboard: the company is the "series", each job a season */}
          <Billboard
            compact
            kicker={`Season ${work.length - jobIndex}`}
            title={job.brand}
            backdrop={<OutlineBackdrop text={`S${work.length - jobIndex}`} />}
            meta={
              <>
                <span className="font-semibold text-green-500">{job.period}</span>
                <span className="text-nf-text">{job.location}</span>
                <span className={badgeOutline}>{job.teamSize}</span>
                <span className={badgeOutline}>{job.highlights.length} episodes</span>
              </>
            }
            description={
              <>
                <p className="mb-2 text-lg font-medium text-white sm:text-xl">{job.role}</p>
                <p className="mb-5">{job.context}</p>
                <div className="flex flex-wrap gap-2">
                  {job.stack.map((t) => (
                    <span key={t} className={tagRed}>
                      {t}
                    </span>
                  ))}
                </div>
              </>
            }
            actions={
              <>
                <button
                  onClick={() =>
                    document
                      .getElementById(episodesId(jobIndex))
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  className={btnPrimary}
                >
                  <Play size={22} fill="currentColor" />
                  Watch Episodes
                </button>
                <Link to="/resume" className={btnSecondary}>
                  <FileText size={22} />
                  Resume
                </Link>
              </>
            }
          />

          {/* Episodes: one per highlight */}
          <section id={episodesId(jobIndex)} className="max-w-5xl scroll-mt-24 px-6 pb-16 sm:px-12">
            <div className="mb-4 flex items-baseline justify-between border-b border-white/10 pb-4">
              <h2 className="text-2xl font-semibold text-white">Episodes</h2>
              <span className="text-sm text-nf-muted">{job.highlights.length} highlights</span>
            </div>

            <ol>
              {job.highlights.map((h, i) => (
                <motion.li
                  key={h.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  className="flex gap-5 rounded-lg border-b border-white/10 px-2 py-6 transition-colors hover:bg-nf-surface sm:gap-8 sm:px-5"
                >
                  <span className="w-8 shrink-0 text-3xl font-light text-nf-muted sm:w-12 sm:text-4xl">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <h3 className="text-lg font-semibold text-white">{h.title}</h3>
                      <span className="w-fit shrink-0 rounded bg-nf-elevated px-2.5 py-1 text-xs font-semibold text-white">
                        {h.metric}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-nf-text sm:text-base">{h.detail}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </section>
        </article>
      ))}
    </>
  );
}
