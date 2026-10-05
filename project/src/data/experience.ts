export interface WorkHighlight {
  title: string;
  metric: string;
  detail: string;
}

export interface WorkEntry {
  role: string;
  company: string;
  /** Short name for titles and labels. */
  brand: string;
  location: string;
  period: string;
  teamSize: string;
  context: string;
  stack: string[];
  highlights: WorkHighlight[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
  detail: string;
}

export const work: WorkEntry[] = [
  {
    role: 'Java Backend Developer',
    company: 'Syntara Tech Private Limited',
    brand: 'Syntara Tech',
    location: 'Chandigarh',
    period: 'June 2025 — June 2026',
    teamSize: 'Team of 8',
    context: 'Backend for Jatayu, an AI-powered disaster response drone platform',
    stack: ['Spring Boot', 'Apache Kafka', 'Redis', 'MySQL', 'Spring Security', 'Spring Data JPA'],
    highlights: [
      {
        title: 'Mission-critical REST APIs',
        metric: '14+ APIs · <250 ms',
        detail:
          'Designed and developed 14+ RESTful APIs using Spring Boot for mission management, sensor data ingestion, geo-tagged alerts, and dashboard services, achieving average response times under 250 ms.',
      },
      {
        title: 'Real-time alert pipeline',
        metric: 'Sub-second',
        detail:
          'Built Kafka-based event pipelines for real-time victim-detection and hazard alerts, delivering sub-second updates to the central dashboard for 6+ concurrent field operator teams without blocking core API throughput.',
      },
      {
        title: 'Telemetry caching',
        metric: '~30% less DB load',
        detail:
          'Integrated Redis caching for high-frequency telemetry and live mission data, reducing average database read load by ~30% and improving dashboard responsiveness during peak sensor ingestion.',
      },
      {
        title: 'Role-based security',
        metric: '3 user roles',
        detail:
          'Implemented Spring Security with JWT authentication and role-based access control across 3 user roles (field operator, command center, admin), reducing unauthorized access risk to sensitive mission data.',
      },
      {
        title: 'Data model & query tuning',
        metric: '16 entities · ~25% faster',
        detail:
          'Modeled relational data structures with Spring Data JPA and MySQL across 16 entities for mission records, survivor locations, and sensor logs, applying indexing strategies that improved key query performance by ~25%.',
      },
      {
        title: 'Shipping as a team',
        metric: 'Dev → Prod',
        detail:
          'Collaborated within a cross-functional engineering team of 8 using Agile practices (Jira, Sprint Planning, code reviews, Git feature-branch workflow) to deliver features through Dev → SIT → UAT → Production on schedule.',
      },
    ],
  },
];

export const education: EducationEntry[] = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'Amity University, Noida, Uttar Pradesh',
    period: 'July 2021 — November 2024',
    detail: 'CGPA: 7.2',
  },
  {
    degree: 'Senior Secondary Certificate (Class XII)',
    school: 'Bal Bharati Public School, Noida, Uttar Pradesh',
    period: 'April 2016 — April 2017',
    detail: 'Percentage: 76%',
  },
];
