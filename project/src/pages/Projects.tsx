import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CarouselRow from '@/components/CarouselRow';

interface Project {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  color: string;
}

const categories: { name: string; projects: Project[] }[] = [
  {
    name: 'Backend Projects',
    projects: [
      {
        id: 'digital-e-wallet',
        title: 'Digital E-Wallet',
        desc: 'Microservices-based digital wallet with OTP, transfers, and Kafka events.',
        tags: ['Spring Boot', 'Kafka', 'Redis', 'MySQL'],
        color: '#3b1f1f',
      },
      {
        id: 'movienow',
        title: 'MovieNow',
        desc: 'Event-driven movie ticket booking system with seat validation and async email confirmation.',
        tags: ['Spring Boot', 'Kafka', 'MySQL', 'JPA'],
        color: '#1f2a3b',
      },
      {
        id: 'library-system',
        title: 'Digital Library',
        desc: 'Spring Boot REST API for student borrowing, author deduplication, and overdue fines — built on raw JDBC.',
        tags: ['Java', 'Spring Boot', 'JDBC', 'MySQL'],
        color: '#1f3b2a',
      },
    ],
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-[#141414] pt-20">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="mb-10 text-4xl font-bold text-white">Projects</h1>
        {categories.map((cat) => (
          <CarouselRow key={cat.name} title={cat.name}>
            {cat.projects.map((p) => (
              <article
                key={p.id}
                className="group relative w-64 shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-[#1f1f1f] transition-all duration-200 hover:scale-105 hover:border-[#E50914]"
              >
                <div
                  className="h-36 w-full"
                  style={{ backgroundColor: p.color }}
                />
                <div className="p-4">
                  <h3 className="mb-1 text-lg font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mb-3 text-sm text-[#9b9b9b]">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-[#E50914]/20 px-2 py-1 text-xs text-[#ff5a5f]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to={`/projects/${p.id}`}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  <span className="rounded bg-[#E50914] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#f6121d]">
                    View Project
                  </span>
                </Link>
              </article>
            ))}
          </CarouselRow>
        ))}
      </div>
    </div>
  );
}
