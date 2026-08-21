// import Navbar from '@/components/Navbar';
// import { Download } from 'lucide-react';

// const experience = [
//   {
//     role: 'Frontend Developer',
//     company: 'Tech Co.',
//     period: '2023 — Present',
//     bullets: [
//       'Built reusable component libraries used across multiple products.',
//       'Improved page load performance by 30% through code splitting.',
//     ],
//   },
//   {
//     role: 'Junior Developer',
//     company: 'Startup Studio',
//     period: '2021 — 2023',
//     bullets: [
//       'Developed and maintained client-facing web applications.',
//       'Collaborated with designers to ship pixel-perfect UIs.',
//     ],
//   },
// ];

// const education = [
//   {
//     degree: 'B.S. Computer Science',
//     school: 'State University',
//     period: '2017 — 2021',
//   },
// ];

// export default function Resume() {
//   return (
//     <div className="min-h-screen bg-[#141414] pt-20">
//       <Navbar />
//       <div className="mx-auto max-w-3xl px-6 py-12">
//         {/* Header */}
//         <header className="mb-12">
//           <h1 className="mb-3 text-4xl font-bold text-white">My Resume</h1>
//           <p className="mb-6 max-w-xl text-lg text-[#cfcfcf]">
//             A summary of my education, work experience, and the skills I've built
//             along the way.
//           </p>
//           <a
//             href="#"
//             className="inline-flex items-center gap-2 rounded bg-[#E50914] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#f6121d]"
//           >
//             <Download size={20} />
//             Download Resume
//           </a>
//         </header>

//         {/* Work Experience */}
//         <h2 className="mb-6 text-2xl font-semibold text-white">
//           Work Experience
//         </h2>
//         <div className="mb-12 space-y-6">
//           {experience.map((e) => (
//             <div
//               key={e.role}
//               className="rounded-xl border border-white/10 bg-[#1f1f1f] p-5"
//             >
//               <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
//                 <h3 className="text-lg font-semibold text-white">{e.role}</h3>
//                 <span className="text-sm text-[#9b9b9b]">{e.period}</span>
//               </div>
//               <p className="mb-3 text-sm text-[#E50914]">{e.company}</p>
//               <ul className="list-disc pl-5 text-[#cfcfcf]">
//                 {e.bullets.map((b) => (
//                   <li key={b}>{b}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Education */}
//         <h2 className="mb-6 text-2xl font-semibold text-white">Education</h2>
//         <div className="space-y-6">
//           {education.map((ed) => (
//             <div
//               key={ed.degree}
//               className="rounded-xl border border-white/10 bg-[#1f1f1f] p-5"
//             >
//               <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
//                 <h3 className="text-lg font-semibold text-white">
//                   {ed.degree}
//                 </h3>
//                 <span className="text-sm text-[#9b9b9b]">{ed.period}</span>
//               </div>
//               <p className="text-sm text-[#E50914]">{ed.school}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CertificateModal from '@/components/CertificateModal';
import { Download, Eye, Briefcase, GraduationCap, Award } from 'lucide-react';

interface ProjectSummary {
  title: string;
  period: string;
  bullets: string[];
}

interface EducationEntry {
  degree: string;
  school: string;
  period: string;
  detail: string;
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
  certUrl: string;
}

const projects: ProjectSummary[] = [
  {
    title: 'Digital E-Wallet Platform (Microservices Architecture)',
    period: 'Dec 2025 — Present',
    bullets: [
      'Designed and built a distributed E-Wallet backend using microservices for user onboarding, wallet management, and real-time transaction processing.',
      'Implemented inter-service communication via Spring Cloud OpenFeign (sync) and Apache Kafka (async event-driven messaging) to decouple services.',
      'Secured REST APIs with Spring Security and JWT-based authentication and authorization across service boundaries.',
    ],
  },
  {
    title: 'Event-Driven Movie Booking Platform',
    period: 'Aug 2025 — Nov 2025',
    bullets: [
      'Developed a Spring Boot backend for movie listings, show scheduling, and ticket booking with relational data modeling via Spring Data JPA and MySQL.',
      'Built an event-driven notification pipeline using Apache Kafka to publish booking events and trigger async email confirmations via JavaMail.',
      'Designed a layered Controller-Service-Repository architecture with role-based authentication via Spring Security.',
    ],
  },
  {
    title: 'Library Resource Management System',
    period: 'Feb 2025 — Jun 2025',
    bullets: [
      'Built a RESTful backend to manage book inventory, student records, and borrowing transactions with a clean, layered architecture.',
      'Integrated MySQL using Spring JDBC (JdbcTemplate) for manual SQL query handling and custom object mapping.',
      'Implemented book issuance and return logic ensuring transactional integrity and data consistency.',
    ],
  },
];

const education: EducationEntry[] = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'Amity University, Noida, Uttar Pradesh',
    period: 'July 2021 — September 2024',
    detail: 'CGPA: 7.2',
  },
  {
    degree: 'Senior Secondary Certificate (Class XII)',
    school: 'Bal Bharati Public School, Noida, Uttar Pradesh',
    period: 'April 2016 — April 2017',
    detail: 'Percentage: 76%',
  },
];

const certs: Certification[] = [
  {
    title: 'Data Structures & Algorithms in Java',
    issuer: 'Apna College',
    date: 'Feb 2025',
    certUrl: '/certificates/dsa-apna-college.pdf',
  },
  {
    title: 'Java Backend Development Program',
    issuer: 'GeeksforGeeks',
    date: 'Nov 2025',
    certUrl: '/certificates/java-backend-gfg.pdf',
  },
];

const RESUME_URL = '/resume/resume.pdf';

export default function Resume() {
  const [activeDoc, setActiveDoc] = useState<{
    title: string;
    url: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-[#141414] pt-20">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="mb-3 text-4xl font-bold text-white">
            My Resume
          </h1>

          <p className="mb-6 max-w-xl text-lg text-[#cfcfcf]">
            A summary of my education, technical projects, and the skills
            I've built along the way.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() =>
                setActiveDoc({
                  title: 'Resume',
                  url: RESUME_URL,
                })
              }
              className="inline-flex items-center gap-2 rounded border border-white/15 bg-[#1f1f1f] px-6 py-3 text-base font-semibold text-white transition-colors hover:border-[#E50914]"
            >
              <Eye size={20} />
              View Resume
            </button>

            <a
              href={RESUME_URL}
              download
              className="inline-flex items-center gap-2 rounded bg-[#E50914] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#f6121d]"
            >
              <Download size={20} />
              Download Resume
            </a>
          </div>
        </header>

        {/* Technical Projects */}
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-white">
          <Briefcase
            size={22}
            className="text-[#E50914]"
          />
          Technical Projects
        </h2>

        <div className="mb-12 space-y-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-white/10 bg-[#1f1f1f] p-5"
            >
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-white">
                  {p.title}
                </h3>

                <span className="text-sm text-[#9b9b9b]">
                  {p.period}
                </span>
              </div>

              <ul className="list-disc space-y-1 pl-5 text-[#cfcfcf]">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education */}
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-white">
          <GraduationCap
            size={22}
            className="text-[#E50914]"
          />
          Education
        </h2>

        <div className="mb-12 space-y-6">
          {education.map((ed) => (
            <div
              key={ed.degree}
              className="rounded-xl border border-white/10 bg-[#1f1f1f] p-5"
            >
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-white">
                  {ed.degree}
                </h3>

                <span className="text-sm text-[#9b9b9b]">
                  {ed.period}
                </span>
              </div>

              <p className="text-sm text-[#E50914]">
                {ed.school}
              </p>

              <p className="mt-1 text-sm text-[#9b9b9b]">
                {ed.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-white">
          <Award
            size={22}
            className="text-[#E50914]"
          />
          Certifications
        </h2>

        <div className="space-y-6">
          {certs.map((c) => (
            <div
              key={c.title}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#1f1f1f] p-5"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {c.title}
                </h3>

                <p className="text-sm text-[#E50914]">
                  {c.issuer}
                </p>

                <p className="mt-1 text-sm text-[#9b9b9b]">
                  {c.date}
                </p>
              </div>

              <button
                onClick={() =>
                  setActiveDoc({
                    title: c.title,
                    url: c.certUrl,
                  })
                }
                className="shrink-0 rounded bg-[#E50914] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#f6121d]"
              >
                View Certificate
              </button>
            </div>
          ))}
        </div>
      </div>

      {activeDoc && (
        <CertificateModal
          url={activeDoc.url}
          title={activeDoc.title}
          onClose={() => setActiveDoc(null)}
        />
      )}
    </div>
  );
}