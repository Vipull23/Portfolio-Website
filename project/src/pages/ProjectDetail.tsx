import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import {
  ArrowLeft,
  ChevronDown,
  Github,
  Mail,
  User,
  Bell,
  Wallet,
  ArrowLeftRight,
  Layers,
  Database,
  Zap,
  Film,
  Ticket,
  Star,
  Search,
  Shield,
  Server,
  Globe,
  Inbox,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';

interface ProjectDetail {
  id: string;
  title: string;
  tagline: string;
  timeframe: string;
  tags: string[];
  overview: string;
  githubUrl: string;
  architecture: {
    services: { name: string; icon: React.ReactNode; color: string }[];
    infra: { name: string; icon: React.ReactNode; color: string }[];
  };
  flows: { title: string; steps: string[] }[];
  problems: { title: string; solution: string }[];
  techStack: { tech: string; role: string }[];
  endpoints: { method: string; path: string; description: string }[];
  screenshots: string[];
}

const projectData: Record<string, ProjectDetail> = {
  'digital-e-wallet': {
    id: 'digital-e-wallet',
    title: 'Digital E-Wallet',
    tagline: 'A microservices-based digital wallet with OTP verification, money transfers, and event-driven notifications.',
    timeframe: '2024 — Present',
    tags: ['Spring Boot', 'Kafka', 'Redis', 'MySQL', 'OpenFeign'],
    overview:
      'The Digital E-Wallet is a microservices-based backend platform that lets users register with OTP verification, load funds, and transfer money to other users. It demonstrates event-driven architecture using Kafka, inter-service communication with OpenFeign, OTP caching with Redis, and persistent storage in MySQL. The system is split into focused services (User, Wallet, Transaction, Notification, Common) that communicate through REST and async events.',
    githubUrl: 'https://github.com/Vipull23/E---Wallet-app',
    architecture: {
      services: [
        { name: 'UserService', icon: <User size={20} />, color: '#2a3b1f' },
        { name: 'WalletService', icon: <Wallet size={20} />, color: '#1f2a3b' },
        { name: 'TransactionService', icon: <ArrowLeftRight size={20} />, color: '#3b1f2a' },
        { name: 'NotificationService', icon: <Bell size={20} />, color: '#1f3b2a' },
        { name: 'CommonService', icon: <Layers size={20} />, color: '#3b2a1f' },
      ],
      infra: [
        { name: 'Kafka', icon: <Zap size={20} />, color: '#1f1f3b' },
        { name: 'Redis', icon: <Zap size={20} />, color: '#3b1f1f' },
        { name: 'MySQL', icon: <Database size={20} />, color: '#1f3b3b' },
      ],
    },
    flows: [
      {
        title: 'User Registration with OTP',
        steps: [
          'Client sends a registration request to UserService with email, phone, and password.',
          'UserService publishes a user.registered event to Kafka and stores the user in MySQL.',
          'NotificationService consumes the event, generates an OTP, and caches it in Redis with a TTL.',
          'NotificationService sends the OTP to the user via email/SMS.',
          'Client submits the OTP to UserService, which validates it against Redis via OpenFeign call to NotificationService.',
          'On success, the user is marked verified and WalletService creates a default wallet via a Kafka event.',
        ],
      },
      {
        title: 'Money Transfer',
        steps: [
          'Client calls TransactionService with sender ID, recipient ID, and amount.',
          'TransactionService validates the sender balance through WalletService via OpenFeign.',
          'A transfer.pending event is published to Kafka.',
          'WalletService consumes the event, debits the sender, and credits the recipient atomically in MySQL.',
          'TransactionService updates the transaction status to COMPLETED.',
          'NotificationService sends a confirmation to both parties.',
        ],
      },
      {
        title: 'Wallet Balance Inquiry',
        steps: [
          'Client requests balance from WalletService.',
          'WalletService checks Redis cache first for the user balance.',
          'On cache miss, WalletService queries MySQL and backfills Redis.',
          'Balance is returned to the client with sub-100ms latency on cache hits.',
        ],
      },
    ],
    problems: [
      {
        title: 'Distributed Transaction Consistency',
        solution:
          'Money transfers touch two separate wallet records across services. I used the Saga pattern with Kafka events — each debit/credit is an idempotent local transaction, and a failure triggers a compensating event to roll back the debit. This keeps services decoupled while preserving eventual consistency.',
      },
      {
        title: 'OTP Expiry and Replay Attacks',
        solution:
          'OTPs are stored in Redis with a strict TTL so they auto-expire. Each OTP is single-use: once verified, it is deleted from Redis. A rate limiter on the resend endpoint prevents brute-force and spam attacks.',
      },
      {
        title: 'Service-to-Service Coupling',
        solution:
          'Instead of direct REST chains, synchronous reads use OpenFeign with retries and circuit breakers, while writes flow through Kafka. This separates the read path (fast, cached) from the write path (durable, async) and prevents cascading failures.',
      },
    ],
    techStack: [
      { tech: 'Spring Boot', role: 'Application framework for all microservices' },
      { tech: 'Apache Kafka', role: 'Event bus for async inter-service communication' },
      { tech: 'Redis', role: 'OTP caching, rate limiting, and balance cache' },
      { tech: 'MySQL', role: 'Primary persistent data store per service' },
      { tech: 'OpenFeign', role: 'Declarative REST client for synchronous service calls' },
      { tech: 'Spring Security', role: 'JWT-based authentication and authorization' },
      { tech: 'Eureka', role: 'Service discovery for dynamic instance lookup' },
      { tech: 'Docker', role: 'Containerization for local and deployment parity' },
    ],
    endpoints: [
      { method: 'POST', path: '/api/users/register', description: 'Register a new user and trigger OTP' },
      { method: 'POST', path: '/api/users/verify-otp', description: 'Verify OTP and activate account' },
      { method: 'GET', path: '/api/wallets/{userId}', description: 'Get wallet balance for a user' },
      { method: 'POST', path: '/api/wallets', description: 'Create a new wallet for a user' },
      { method: 'POST', path: '/api/transactions/transfer', description: 'Transfer funds between wallets' },
      { method: 'GET', path: '/api/transactions/{userId}', description: 'List transactions for a user' },
      { method: 'POST', path: '/api/notifications/send', description: 'Send a notification (internal)' },
    ],
    screenshots: [],
  },
  'movienow': {
    id: 'movienow',
    title: 'MovieNow — Movie Ticket Booking & Reviewing System',
    tagline: 'A full-stack Spring Boot backend powering end-to-end cinema booking, from seat selection to async email confirmation and live movie ratings.',
    timeframe: 'Aug 2025 – Nov 2025',
    tags: ['Java 17', 'Spring Boot', 'Spring Security', 'Apache Kafka', 'MySQL', 'Hibernate ORM', 'JPA', 'JavaMailSender'],
    overview:
      "MovieNow ties together four core actors — Admin, Theater, User, and Movie — into a complete booking lifecycle. A user searches for shows by city or movie, books seats with real-time availability validation, and receives an email confirmation via an asynchronous Kafka pipeline. Separately, users can review movies, with the platform recalculating and persisting the live average rating on every submission.",
    githubUrl: 'https://github.com/Vipull23/Movie-Ticket-and-Review-project',
    architecture: {
      services: [
        { name: 'AdminController', icon: <Shield size={20} />, color: '#3b1f1f' },
        { name: 'MovieController', icon: <Film size={20} />, color: '#1f2a3b' },
        { name: 'ShowController', icon: <Globe size={20} />, color: '#1f3b2a' },
        { name: 'TheaterController', icon: <Server size={20} />, color: '#3b2a1f' },
        { name: 'TicketController', icon: <Ticket size={20} />, color: '#2a1f3b' },
        { name: 'UserController', icon: <User size={20} />, color: '#1f3b3b' },
        { name: 'ReviewController', icon: <Star size={20} />, color: '#3b1f2a' },
      ],
      infra: [
        { name: 'Kafka (TICKET_BOOKED)', icon: <Zap size={20} />, color: '#1f1f3b' },
        { name: 'NotificationConsumer', icon: <Inbox size={20} />, color: '#3b1f1f' },
        { name: 'MySQL', icon: <Database size={20} />, color: '#1f3b3b' },
      ],
    },
    flows: [
      {
        title: 'Ticket Booking Flow',
        steps: [
          'Admin adds a movie via /admin/movie/add',
          'Theater is registered and auto-seeded with 10 seats (5 Regular, 5 Recliner)',
          'Show is created linking a movie + theater + time; seats are cloned per-show via generateShowSeats()',
          'User searches shows by city/movie/theater',
          'User books a ticket — backend validates seat type, availability, and requested seat numbers match exactly before writing anything',
          'Ticket is saved, seats marked booked, and a TicketMessage is published to Kafka topic TICKET_BOOKED',
          'NotificationConsumer picks up the event asynchronously and sends an email confirmation (plus a logged SMS stub)',
        ],
      },
      {
        title: 'Review & Live Rating Flow',
        steps: [
          'User submits a star rating + text review for a movie',
          'Review is saved to review_table',
          'A native AVG(rating) SQL query recalculates the movie\'s average immediately',
          'New average is persisted back to the movie record — future reads are O(1), no runtime aggregation needed',
        ],
      },
    ],
    problems: [
      {
        title: 'Seat Inventory Consistency',
        solution:
          'ShowSeats are cloned fresh per show rather than shared, so booking conflicts are resolved at the row level. A booking is only accepted if every requested seat matches type, availability, and seat number simultaneously — if even one seat is unavailable, the entire booking is rejected before any write happens.',
      },
      {
        title: 'Asynchronous Notification via Kafka',
        solution:
          "The booking API doesn't wait on email delivery. Once the ticket is saved, a Kafka event is published and the response returns immediately. The notification consumer runs on its own group, so email failures never surface as booking failures.",
      },
      {
        title: 'Live Movie Rating at Write-Time',
        solution:
          'Instead of computing an average across potentially thousands of reviews on every read, the system recalculates and persists the average directly on the movie row whenever a review is submitted — keeping read performance constant regardless of review volume.',
      },
    ],
    techStack: [
      { tech: 'Spring Boot 4.x', role: 'Core framework' },
      { tech: 'Spring Data JPA + Hibernate', role: 'Persistence layer' },
      { tech: 'MySQL', role: 'Database' },
      { tech: 'Apache Kafka (spring-kafka)', role: 'Async messaging' },
      { tech: 'Spring Security', role: 'HTTP Basic auth, custom AuthProvider' },
      { tech: 'Spring Mail (JavaMailSender)', role: 'Email dispatch via Gmail SMTP' },
      { tech: 'Jackson', role: 'JSON serialization' },
      { tech: 'Lombok', role: 'Boilerplate reduction' },
      { tech: 'Maven', role: 'Build tool' },
    ],
    endpoints: [
      { method: 'POST', path: '/admin/movie/add', description: 'Add a new movie (ADMIN)' },
      { method: 'POST', path: '/user/signup', description: 'Register a new user (open)' },
      { method: 'GET', path: '/user/{id}', description: 'Fetch user profile + ticket history (USER)' },
      { method: 'GET', path: '/movie/title?title=', description: 'Find movie by exact title (open)' },
      { method: 'GET', path: '/movie/genre?genre=', description: 'Top movies by genre, sorted by rating (open)' },
      { method: 'POST', path: '/show/add', description: 'Create a new show (open)' },
      { method: 'GET', path: '/show/search?city=&movieName=&theaterName=', description: 'Search shows with flexible filters (open)' },
      { method: 'POST', path: '/ticket/book', description: 'Book a ticket — seat validation + Kafka publish (open)' },
      { method: 'GET', path: '/ticket/{id}', description: 'Fetch a booked ticket (open)' },
      { method: 'POST', path: '/review/add', description: 'Submit a review — triggers rating recalculation (open)' },
      { method: 'GET', path: '/review/find?reviewId=', description: 'Fetch a single review (open)' },
    ],
    screenshots: [],
  },
  'library-system': {
    id: 'library-system',
    title: 'Digital Library — Backend System',
    tagline: 'A Spring Boot REST API managing student borrowing, author deduplication, and overdue fine calculation — built on raw JDBC for full data-layer transparency.',
    timeframe: 'Feb 2025 – Jun 2025',
    tags: ['Java', 'Spring Boot', 'Spring MVC', 'Spring JDBC (JdbcTemplate)', 'MySQL'],
    overview:
      'This system manages a digital library where students borrow and return books, authors are created automatically as their books are published, and every transaction is tracked end to end. Unlike the other two projects, this one intentionally uses raw JDBC instead of an ORM — every SQL query is written by hand, making the data layer fully explicit and visible. It includes custom validation (age-gated student registration) and a working fine-calculation engine for overdue returns.',
    githubUrl: 'https://github.com/Vipull23/Library-Project',
    architecture: {
      services: [
        { name: 'BookController', icon: <BookOpen size={20} />, color: '#1f2a3b' },
        { name: 'StudentController', icon: <User size={20} />, color: '#2a3b1f' },
        { name: 'TransactionController', icon: <ArrowLeftRight size={20} />, color: '#3b1f2a' },
      ],
      infra: [
        { name: 'Custom Validation (@ValidAge)', icon: <ShieldCheck size={20} />, color: '#3b2a1f' },
        { name: 'JdbcTemplate Repositories', icon: <Layers size={20} />, color: '#1f1f3b' },
        { name: 'MySQL (jbdl8_library)', icon: <Database size={20} />, color: '#1f3b3b' },
      ],
    },
    flows: [
      {
        title: 'Book Creation with Author Deduplication',
        steps: [
          'Request comes in with book details plus author name, email, mobile',
          'Service queries the Author table by email + mobile',
          'If found, the existing author is reused; if not found (query throws on zero results), a new author is created',
          'Book is inserted and linked to the author',
        ],
      },
      {
        title: 'Student Registration',
        steps: [
          'Request hits the controller with student details including date of birth',
          '@ValidAge custom validator checks DOB is not in the future and the student is at least 8 years old — rejects at the boundary if invalid',
          'SimpleJdbcInsert inserts the student and returns the auto-generated ID immediately',
          "That ID is used right away to insert the student's address in the same request",
        ],
      },
      {
        title: 'Issue, Renew, or Return a Book',
        steps: [
          'Single endpoint /transaction/book/initiate handles all three via a requestType field',
          'ISSUE — book\'s STUDENT_ID is claimed, transaction record inserted',
          'RENEW — existing transaction row\'s type and timestamp updated',
          'RETURN — book\'s STUDENT_ID cleared, fine calculated from days held × 2 minus amount already paid, transaction updated with final cost',
        ],
      },
    ],
    problems: [
      {
        title: 'Author Deduplication Without Duplicate Records',
        solution:
          'Rather than blindly inserting a new author for every book, the service checks for an existing match by email and mobile number first. Only when no match exists is a new author created — preventing the same author from being duplicated across multiple book submissions.',
      },
      {
        title: 'Transparent Data Layer via Raw JDBC',
        solution:
          'Every SQL query is written explicitly with JdbcTemplate, avoiding ORM abstractions like lazy loading or hidden N+1 queries. The trade-off is more verbose repository code, but the exact SQL executed is always visible and predictable.',
      },
      {
        title: 'Fine Calculation Computed Server-Side',
        solution:
          'Overdue fines are always calculated fresh from the ISSUED_TIME stored in the database — never trusted from client input. The formula charges ₹2 per day held, minus the amount already paid upfront, ensuring the charge can\'t be manipulated by the request.',
      },
    ],
    techStack: [
      { tech: 'Java', role: 'Core language' },
      { tech: 'Spring Boot', role: 'Application framework' },
      { tech: 'Spring MVC', role: 'REST controller layer' },
      { tech: 'Spring JDBC (JdbcTemplate)', role: 'Raw SQL data access' },
      { tech: 'MySQL', role: 'Database' },
    ],
    endpoints: [
      { method: 'POST', path: '/books/create/book', description: 'Create a new book (and author if needed) — BookCreationRequest' },
      { method: 'POST', path: '/students/create/student', description: 'Register a new student — StudentCreationRequest' },
      { method: 'POST', path: '/transaction/book/initiate', description: 'Issue, renew, or return a book — BookTransactionRequest' },
    ],
    screenshots: [],
  },
};

const methodColors: Record<string, string> = {
  GET: 'bg-green-500/20 text-green-400 border-green-500/30',
  POST: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  PUT: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  DELETE: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? projectData[projectId] : null;
  const [openFlow, setOpenFlow] = useState<number | null>(0);
  const [openProblem, setOpenProblem] = useState<number | null>(0);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#141414] pt-20">
        <Navbar />
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white">Project not found</h1>
          <Link to="/projects" className="text-[#E50914] hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] pt-20">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Back link */}
        <Link
          to="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#9b9b9b] transition-colors hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Projects
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="mb-2 text-4xl font-bold text-white">{project.title}</h1>
          <p className="mb-4 max-w-2xl text-lg text-[#cfcfcf]">{project.tagline}</p>
          <p className="mb-5 text-sm text-[#9b9b9b]">{project.timeframe}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded bg-[#E50914]/20 px-3 py-1 text-xs text-[#ff5a5f]"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        {/* Overview */}
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-semibold text-white">Overview</h2>
          <p className="text-lg leading-relaxed text-[#cfcfcf]">{project.overview}</p>
        </section>

        {/* Architecture Diagram */}
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-semibold text-white">Architecture Diagram</h2>
          <div className="rounded-xl border border-white/10 bg-[#1a1a1a] p-6 sm:p-8">
            <div className="flex flex-col items-center gap-8">
              {/* Services row */}
              <div className="flex flex-wrap justify-center gap-4">
                {project.architecture.services.map((s) => (
                  <div
                    key={s.name}
                    className="flex h-24 w-32 flex-col items-center justify-center gap-2 rounded-lg border border-white/15 px-2 text-center"
                    style={{ backgroundColor: s.color }}
                  >
                    <span className="text-white/90">{s.icon}</span>
                    <span className="text-xs font-medium text-white">{s.name}</span>
                  </div>
                ))}
              </div>

              {/* Connector */}
              <div className="flex flex-col items-center text-[#9b9b9b]">
                <div className="h-8 w-px bg-white/20" />
                <span className="text-xs">REST / OpenFeign</span>
                <div className="h-8 w-px bg-white/20" />
              </div>

              {/* Infra row */}
              <div className="flex flex-wrap justify-center gap-4">
                {project.architecture.infra.map((s) => (
                  <div
                    key={s.name}
                    className="flex h-20 w-28 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 px-2 text-center"
                    style={{ backgroundColor: s.color }}
                  >
                    <span className="text-white/90">{s.icon}</span>
                    <span className="text-xs font-medium text-white">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Flows */}
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-semibold text-white">Key Flows</h2>
          <div className="space-y-3">
            {project.flows.map((flow, i) => (
              <div
                key={flow.title}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#1f1f1f]"
              >
                <button
                  onClick={() => setOpenFlow(openFlow === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-base font-medium text-white">{flow.title}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#9b9b9b] transition-transform duration-200 ${
                      openFlow === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFlow === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ol className="space-y-4 px-5 pb-5">
                        {flow.steps.map((step, si) => (
                          <li key={si} className="flex gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E50914] text-xs font-bold text-white">
                              {si + 1}
                            </span>
                            <span className="text-sm leading-relaxed text-[#cfcfcf]">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Problems Solved */}
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-semibold text-white">Problems Solved</h2>
          <div className="space-y-3">
            {project.problems.map((p, i) => (
              <div
                key={p.title}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#1f1f1f]"
              >
                <button
                  onClick={() => setOpenProblem(openProblem === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-base font-medium text-white">{p.title}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#9b9b9b] transition-transform duration-200 ${
                      openProblem === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openProblem === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-[#cfcfcf]">
                        {p.solution}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-semibold text-white">Tech Stack</h2>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-[#1f1f1f] text-sm text-[#9b9b9b]">
                <tr>
                  <th className="px-5 py-3 font-medium">Technology</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                </tr>
              </thead>
              <tbody>
                {project.techStack.map((row, i) => (
                  <tr
                    key={row.tech}
                    className={`text-sm ${i % 2 === 0 ? 'bg-[#141414]' : 'bg-[#1a1a1a]'}`}
                  >
                    <td className="px-5 py-3 font-medium text-white">{row.tech}</td>
                    <td className="px-5 py-3 text-[#cfcfcf]">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-semibold text-white">API Endpoints</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-[#1f1f1f] text-sm text-[#9b9b9b]">
                <tr>
                  <th className="px-5 py-3 font-medium">Method</th>
                  <th className="px-5 py-3 font-medium">Endpoint</th>
                  <th className="px-5 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {project.endpoints.map((e, i) => (
                  <tr
                    key={e.path}
                    className={`text-sm ${i % 2 === 0 ? 'bg-[#141414]' : 'bg-[#1a1a1a]'}`}
                  >
                    <td className="px-5 py-3">
                      <span
                        className={`inline-block rounded border px-2 py-0.5 text-xs font-bold ${
                          methodColors[e.method] || 'bg-white/10 text-white'
                        }`}
                      >
                        {e.method}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-white">
                      {e.path}
                    </td>
                    <td className="px-5 py-3 text-[#cfcfcf]">{e.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Screenshots */}
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-semibold text-white">Screenshots</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((slot) => (
              <div
                key={slot}
                className="flex h-48 items-center justify-center rounded-xl border border-dashed border-white/15 bg-[#1a1a1a] text-sm text-[#6b6b6b]"
              >
                Postman screenshot {slot + 1}
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="mb-8">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-[#E50914] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#f6121d]"
          >
            <Github size={20} />
            View on GitHub
          </a>
        </section>
      </div>
    </div>
  );
}
