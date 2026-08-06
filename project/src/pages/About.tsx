import Navbar from '@/components/Navbar';
import { Mail, Linkedin, Github, MapPin } from 'lucide-react';

const contacts = [
  { label: 'Email', icon: <Mail size={22} />, href: 'mailto:vipulsharma23.vs@gmail.com', external: false },
  { label: 'LinkedIn', icon: <Linkedin size={22} />, href: 'https://linkedin.com/in/vipulsharma23', external: true },
  { label: 'GitHub', icon: <Github size={22} />, href: 'https://github.com/Vipull23', external: true },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      {/* Hero */}
      <header className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#141414] to-[#141414]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(229,9,20,0.18),transparent_60%)]" />
        <div className="relative z-10 px-6 pt-24 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
            Vipul Sharma
          </h1>
          <p className="mt-4 text-lg text-[#cfcfcf] sm:text-2xl">
            Java Backend Developer | Building scalable microservices | Spring Boot | Kafka | Redis
          </p>
        </div>
      </header>

      {/* Bio + contacts */}
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="mb-5 text-2xl font-semibold text-white">About Me</h2>
        <div className="space-y-5 text-lg leading-relaxed text-[#cfcfcf]">
          <p>
            I'm a Java Backend Developer based in Noida, India, specializing in Spring Boot, Microservices, and REST API design. I enjoy building event-driven backend systems using Apache Kafka, Redis, and MySQL, with a strong focus on distributed systems and application security. My recent work includes designing a microservices-based Digital E-Wallet platform and an event-driven Movie Booking system — both built around clean architecture, inter-service communication, and secure, scalable API design. I'm currently expanding into cloud technologies and DevOps practices to round out my backend expertise.
          </p>
        </div>

        <div className="mt-10 flex items-center gap-4">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              aria-label={c.label}
              {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#1f1f1f] text-[#cfcfcf] transition-all duration-200 hover:scale-110 hover:border-[#E50914] hover:text-white"
            >
              {c.icon}
            </a>
          ))}
          <span className="inline-flex items-center gap-2 text-base text-[#9b9b9b]">
            <MapPin size={20} />
            Noida, Uttar Pradesh
          </span>
        </div>
      </div>
    </div>
  );
}
