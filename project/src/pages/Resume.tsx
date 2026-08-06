import Navbar from '@/components/Navbar';
import { Download } from 'lucide-react';

const experience = [
  {
    role: 'Frontend Developer',
    company: 'Tech Co.',
    period: '2023 — Present',
    bullets: [
      'Built reusable component libraries used across multiple products.',
      'Improved page load performance by 30% through code splitting.',
    ],
  },
  {
    role: 'Junior Developer',
    company: 'Startup Studio',
    period: '2021 — 2023',
    bullets: [
      'Developed and maintained client-facing web applications.',
      'Collaborated with designers to ship pixel-perfect UIs.',
    ],
  },
];

const education = [
  {
    degree: 'B.S. Computer Science',
    school: 'State University',
    period: '2017 — 2021',
  },
];

export default function Resume() {
  return (
    <div className="min-h-screen bg-[#141414] pt-20">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="mb-3 text-4xl font-bold text-white">My Resume</h1>
          <p className="mb-6 max-w-xl text-lg text-[#cfcfcf]">
            A summary of my education, work experience, and the skills I've built
            along the way.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded bg-[#E50914] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#f6121d]"
          >
            <Download size={20} />
            Download Resume
          </a>
        </header>

        {/* Work Experience */}
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Work Experience
        </h2>
        <div className="mb-12 space-y-6">
          {experience.map((e) => (
            <div
              key={e.role}
              className="rounded-xl border border-white/10 bg-[#1f1f1f] p-5"
            >
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-white">{e.role}</h3>
                <span className="text-sm text-[#9b9b9b]">{e.period}</span>
              </div>
              <p className="mb-3 text-sm text-[#E50914]">{e.company}</p>
              <ul className="list-disc pl-5 text-[#cfcfcf]">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education */}
        <h2 className="mb-6 text-2xl font-semibold text-white">Education</h2>
        <div className="space-y-6">
          {education.map((ed) => (
            <div
              key={ed.degree}
              className="rounded-xl border border-white/10 bg-[#1f1f1f] p-5"
            >
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-white">
                  {ed.degree}
                </h3>
                <span className="text-sm text-[#9b9b9b]">{ed.period}</span>
              </div>
              <p className="text-sm text-[#E50914]">{ed.school}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
