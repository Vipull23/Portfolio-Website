// import Navbar from '@/components/Navbar';
// import CarouselRow from '@/components/CarouselRow';
// import {
//   Coffee,
//   Boxes,
//   Globe,
//   Zap,
//   Layers,
//   Sprout,
//   Shield,
//   Cloud,
//   KeyRound,
//   Lock,
//   Fingerprint,
//   Database,
//   Waypoints,
//   CheckCircle2,
//   TestTube,
//   GitBranch,
//   Container,
//   Package,
//   Send,
//   Code2,
//   Award,
// } from 'lucide-react';

// interface Skill {
//   name: string;
//   icon: JSX.Element;
// }

// interface SkillGroup {
//   title: string;
//   skills: Skill[];
// }

// const skillGroups: SkillGroup[] = [
//   {
//     title: 'Languages & Architecture',
//     skills: [
//       { name: 'Java (8 / 11 / 17)', icon: <Coffee size={28} /> },
//       { name: 'Microservices Architecture', icon: <Boxes size={28} /> },
//       { name: 'REST APIs', icon: <Globe size={28} /> },
//       { name: 'Event-Driven Architecture', icon: <Zap size={28} /> },
//       { name: 'Object-Oriented Programming', icon: <Layers size={28} /> },
//     ],
//   },
//   {
//     title: 'Backend Frameworks & Security',
//     skills: [
//       { name: 'Spring Boot 3', icon: <Sprout size={28} /> },
//       { name: 'Spring MVC', icon: <Sprout size={28} /> },
//       { name: 'Spring Security', icon: <Shield size={28} /> },
//       { name: 'Spring Cloud (Eureka, OpenFeign)', icon: <Cloud size={28} /> },
//       { name: 'JWT', icon: <KeyRound size={28} /> },
//       { name: 'OAuth2', icon: <Lock size={28} /> },
//       { name: 'OpenID Connect', icon: <Fingerprint size={28} /> },
//     ],
//   },
//   {
//     title: 'Data, Caching & Messaging',
//     skills: [
//       { name: 'MySQL', icon: <Database size={28} /> },
//       { name: 'Spring Data JPA', icon: <Database size={28} /> },
//       { name: 'Hibernate ORM', icon: <Database size={28} /> },
//       { name: 'Spring JDBC (JdbcTemplate)', icon: <Database size={28} /> },
//       { name: 'Redis', icon: <Zap size={28} /> },
//       { name: 'Apache Kafka', icon: <Waypoints size={28} /> },
//     ],
//   },
//   {
//     title: 'Testing & Tooling',
//     skills: [
//       { name: 'JUnit 5', icon: <CheckCircle2 size={28} /> },
//       { name: 'Mockito', icon: <TestTube size={28} /> },
//       { name: 'Git & GitHub', icon: <GitBranch size={28} /> },
//       { name: 'Docker', icon: <Container size={28} /> },
//       { name: 'Maven', icon: <Package size={28} /> },
//       { name: 'Postman', icon: <Send size={28} /> },
//       { name: 'IntelliJ IDEA', icon: <Code2 size={28} /> },
//     ],
//   },
// ];

// const certs = [
//   {
//     title: 'Data Structures & Algorithms in Java',
//     issuer: 'Apna College',
//     date: 'Feb 2025',
//   },
//   {
//     title: 'Java Backend Development Program',
//     issuer: 'GeeksforGeeks',
//     date: 'Nov 2025',
//   },
// ];

// export default function Skills() {
//   return (
//     <div className="min-h-screen bg-[#141414] pt-20">
//       <Navbar />
//       <div className="mx-auto max-w-6xl px-6 py-12">
//         <h1 className="mb-10 text-4xl font-bold text-white">
//           Skills & Certifications
//         </h1>

//         {skillGroups.map((group) => (
//           <CarouselRow key={group.title} title={group.title}>
//             {group.skills.map((s) => (
//               <article
//                 key={s.name}
//                 className="group w-56 shrink-0 snap-start rounded-xl border border-white/10 bg-[#1f1f1f] p-5 transition-all duration-200 hover:scale-105 hover:border-[#E50914]"
//               >
//                 <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-[#2a2a2a] text-[#E50914]">
//                   {s.icon}
//                 </div>
//                 <h3 className="text-base font-semibold text-white">
//                   {s.name}
//                 </h3>
//               </article>
//             ))}
//           </CarouselRow>
//         ))}

//         <CarouselRow title="Certifications">
//           {certs.map((c) => (
//             <article
//               key={c.title}
//               className="group w-64 shrink-0 snap-start rounded-xl border border-white/10 bg-[#1f1f1f] p-5 transition-all duration-200 hover:scale-105 hover:border-[#E50914]"
//             >
//               <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-[#2a2a2a] text-[#E50914]">
//                 <Award size={28} />
//               </div>
//               <h3 className="mb-1 text-base font-semibold text-white">
//                 {c.title}
//               </h3>
//               <p className="text-sm text-[#9b9b9b]">{c.issuer}</p>
//               <p className="mt-1 text-xs text-[#6b6b6b]">{c.date}</p>
//             </article>
//           ))}
//         </CarouselRow>
//       </div>
//     </div>
//   );
// }



import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CarouselRow from '@/components/CarouselRow';
import CertificateModal from '@/components/CertificateModal';
import {
  Coffee,
  Boxes,
  Globe,
  Zap,
  Layers,
  Sprout,
  Shield,
  Cloud,
  KeyRound,
  Lock,
  Fingerprint,
  Database,
  Waypoints,
  CheckCircle2,
  TestTube,
  GitBranch,
  Container,
  Package,
  Send,
  Code2,
  Award,
} from 'lucide-react';

interface Skill {
  name: string;
  icon: JSX.Element;
}

interface SkillGroup {
  title: string;
  skills: Skill[];
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
  certUrl: string;
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Languages & Architecture',
    skills: [
      { name: 'Java (8 / 11 / 17)', icon: <Coffee size={28} /> },
      { name: 'Microservices Architecture', icon: <Boxes size={28} /> },
      { name: 'REST APIs', icon: <Globe size={28} /> },
      { name: 'Event-Driven Architecture', icon: <Zap size={28} /> },
      { name: 'Object-Oriented Programming', icon: <Layers size={28} /> },
    ],
  },
  {
    title: 'Backend Frameworks & Security',
    skills: [
      { name: 'Spring Boot 3', icon: <Sprout size={28} /> },
      { name: 'Spring MVC', icon: <Sprout size={28} /> },
      { name: 'Spring Security', icon: <Shield size={28} /> },
      { name: 'Spring Cloud (Eureka, OpenFeign)', icon: <Cloud size={28} /> },
      { name: 'JWT', icon: <KeyRound size={28} /> },
      { name: 'OAuth2', icon: <Lock size={28} /> },
      { name: 'OpenID Connect', icon: <Fingerprint size={28} /> },
    ],
  },
  {
    title: 'Data, Caching & Messaging',
    skills: [
      { name: 'MySQL', icon: <Database size={28} /> },
      { name: 'Spring Data JPA', icon: <Database size={28} /> },
      { name: 'Hibernate ORM', icon: <Database size={28} /> },
      { name: 'Spring JDBC (JdbcTemplate)', icon: <Database size={28} /> },
      { name: 'Redis', icon: <Zap size={28} /> },
      { name: 'Apache Kafka', icon: <Waypoints size={28} /> },
    ],
  },
  {
    title: 'Testing & Tooling',
    skills: [
      { name: 'JUnit 5', icon: <CheckCircle2 size={28} /> },
      { name: 'Mockito', icon: <TestTube size={28} /> },
      { name: 'Git & GitHub', icon: <GitBranch size={28} /> },
      { name: 'Docker', icon: <Container size={28} /> },
      { name: 'Maven', icon: <Package size={28} /> },
      { name: 'Postman', icon: <Send size={28} /> },
      { name: 'IntelliJ IDEA', icon: <Code2 size={28} /> },
    ],
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

export default function Skills() {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <div className="min-h-screen bg-[#141414] pt-20">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="mb-10 text-4xl font-bold text-white">
          Skills & Certifications
        </h1>

        {skillGroups.map((group) => (
          <CarouselRow key={group.title} title={group.title}>
            {group.skills.map((s) => (
              <article
                key={s.name}
                className="group w-56 shrink-0 snap-start rounded-xl border border-white/10 bg-[#1f1f1f] p-5 transition-all duration-200 hover:scale-105 hover:border-[#E50914]"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-[#2a2a2a] text-[#E50914]">
                  {s.icon}
                </div>
                <h3 className="text-base font-semibold text-white">
                  {s.name}
                </h3>
              </article>
            ))}
          </CarouselRow>
        ))}

        <CarouselRow title="Certifications" showArrows={false}>
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
              <button
                onClick={() => setActiveCert(c)}
                className="mt-4 w-full rounded bg-[#E50914] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#f6121d]"
              >
                View Certificate
              </button>
            </article>
          ))}
        </CarouselRow>
      </div>

      {activeCert && (
        <CertificateModal
          url={activeCert.certUrl}
          title={activeCert.title}
          onClose={() => setActiveCert(null)}
        />
      )}
    </div>
  );
}