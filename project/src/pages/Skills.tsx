import Navbar from '@/components/Navbar';
import CarouselRow from '@/components/CarouselRow';
import { Code2, Award } from 'lucide-react';

const skills = [
  { name: 'JavaScript / TypeScript', level: 90 },
  { name: 'React', level: 88 },
  { name: 'Node.js', level: 75 },
  { name: 'Tailwind CSS', level: 85 },
  { name: 'SQL / Databases', level: 70 },
  { name: 'Python', level: 72 },
];

const certs = [
  { title: 'Meta Front-End Developer', issuer: 'Coursera', date: '2023' },
  { title: 'AWS Cloud Practitioner', issuer: 'Amazon', date: '2022' },
  { title: 'Responsive Web Design', issuer: 'freeCodeCamp', date: '2021' },
  { title: 'Python for Everybody', issuer: 'Coursera', date: '2020' },
];

export default function Skills() {
  return (
    <div className="min-h-screen bg-[#141414] pt-20">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="mb-10 text-4xl font-bold text-white">
          Skills & Certifications
        </h1>

        <CarouselRow title="Skills">
          {skills.map((s) => (
            <article
              key={s.name}
              className="group w-56 shrink-0 snap-start rounded-xl border border-white/10 bg-[#1f1f1f] p-5 transition-all duration-200 hover:scale-105 hover:border-[#E50914]"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-[#2a2a2a] text-[#E50914]">
                <Code2 size={28} />
              </div>
              <h3 className="mb-3 text-base font-semibold text-white">
                {s.name}
              </h3>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#2a2a2a]">
                <div
                  className="h-full rounded-full bg-[#E50914] transition-all duration-500"
                  style={{ width: `${s.level}%` }}
                />
              </div>
              <span className="mt-2 block text-xs text-[#9b9b9b]">
                {s.level}%
              </span>
            </article>
          ))}
        </CarouselRow>

        <CarouselRow title="Certifications">
          {certs.map((c) => (
            <article
              key={c.title}
              className="group w-64 shrink-0 snap-start rounded-xl border border-white/10 bg-[#1f1f1f] p-5 transition-all duration-200 hover:scale-105 hover:border-[#E50914]"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-[#2a2a2a] text-[#E50914]">
                <Award size={28} />
              </div>
              <h3 className="mb-1 text-base font-semibold text-white">
                {c.title}
              </h3>
              <p className="text-sm text-[#9b9b9b]">{c.issuer}</p>
              <p className="mt-1 text-xs text-[#6b6b6b]">{c.date}</p>
            </article>
          ))}
        </CarouselRow>
      </div>
    </div>
  );
}
