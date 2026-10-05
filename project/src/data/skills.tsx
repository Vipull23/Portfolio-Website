import type { ReactNode } from 'react';
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
} from 'lucide-react';
import { projects } from '@/data/projects';
import { work } from '@/data/experience';

export interface Skill {
  name: string;
  icon: ReactNode;
  /** Words to look for in projects and work history. Empty = don't link it to anything. */
  match: string[];
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages & Architecture',
    skills: [
      { name: 'Java (8 / 11 / 17)', icon: <Coffee />, match: ['Java', 'Spring Boot'] },
      { name: 'Microservices Architecture', icon: <Boxes />, match: ['microservices'] },
      { name: 'REST APIs', icon: <Globe />, match: ['REST', 'RESTful'] },
      { name: 'Event-Driven Architecture', icon: <Zap />, match: ['event-driven'] },
      { name: 'Object-Oriented Programming', icon: <Layers />, match: [] },
    ],
  },
  {
    title: 'Backend Frameworks & Security',
    skills: [
      { name: 'Spring Boot 3', icon: <Sprout />, match: ['Spring Boot'] },
      { name: 'Spring MVC', icon: <Sprout />, match: ['Spring MVC'] },
      { name: 'Spring Security', icon: <Shield />, match: ['Spring Security'] },
      { name: 'Spring Cloud (Eureka, OpenFeign)', icon: <Cloud />, match: ['OpenFeign', 'Eureka'] },
      { name: 'JWT', icon: <KeyRound />, match: ['JWT'] },
      { name: 'OAuth2', icon: <Lock />, match: ['OAuth2'] },
      { name: 'OpenID Connect', icon: <Fingerprint />, match: ['OpenID Connect'] },
    ],
  },
  {
    title: 'Data, Caching & Messaging',
    skills: [
      { name: 'MySQL', icon: <Database />, match: ['MySQL'] },
      { name: 'Spring Data JPA', icon: <Database />, match: ['JPA'] },
      { name: 'Hibernate ORM', icon: <Database />, match: ['Hibernate'] },
      { name: 'Spring JDBC (JdbcTemplate)', icon: <Database />, match: ['JdbcTemplate', 'JDBC'] },
      { name: 'Redis', icon: <Zap />, match: ['Redis'] },
      { name: 'Apache Kafka', icon: <Waypoints />, match: ['Kafka'] },
    ],
  },
  {
    title: 'Testing & Tooling',
    skills: [
      { name: 'JUnit 5', icon: <CheckCircle2 />, match: ['JUnit'] },
      { name: 'Mockito', icon: <TestTube />, match: ['Mockito'] },
      { name: 'Git & GitHub', icon: <GitBranch />, match: ['Git'] },
      { name: 'Docker', icon: <Container />, match: ['Docker'] },
      { name: 'Maven', icon: <Package />, match: ['Maven'] },
      { name: 'Postman', icon: <Send />, match: ['Postman'] },
      { name: 'IntelliJ IDEA', icon: <Code2 />, match: ['IntelliJ'] },
    ],
  },
];

export const allSkills = skillGroups.flatMap((g) => g.skills);

/** The "Top 10" row, in order. Names must match entries above. */
const topSkillNames = [
  'Java (8 / 11 / 17)',
  'Spring Boot 3',
  'Apache Kafka',
  'Microservices Architecture',
  'Redis',
  'MySQL',
  'Spring Security',
  'REST APIs',
  'Spring Data JPA',
  'Docker',
];

export const topSkills = topSkillNames
  .map((name) => allSkills.find((s) => s.name === name))
  .filter((s): s is Skill => s !== undefined);

export interface SkillUsage {
  label: string;
  to: string;
}

// Searchable text for every title (projects + jobs), built once.
const sources = [
  ...work.map((w) => ({
    label: w.brand,
    to: '/experience',
    text: [w.context, ...w.stack, ...w.highlights.map((h) => h.detail)].join(' \n '),
  })),
  ...projects.map((p) => ({
    label: p.cardTitle,
    to: `/projects/${p.id}`,
    text: [p.summary, p.tagline, p.overview, ...p.resume.bullets, ...p.tags, ...p.techStack.map((t) => `${t.tech} ${t.role}`)].join(' \n '),
  })),
];

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Where a skill shows up in real work: projects and jobs whose text mentions it. */
export function usedIn(skill: Skill): SkillUsage[] {
  if (skill.match.length === 0) return [];
  const re = new RegExp(`\\b(${skill.match.map(escapeRegExp).join('|')})\\b`, 'i');
  return sources.filter((s) => re.test(s.text)).map(({ label, to }) => ({ label, to }));
}
