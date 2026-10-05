import type { ReactNode } from 'react';
import {
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
  Shield,
  Server,
  Globe,
  Inbox,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';

interface ArchNode {
  name: string;
  icon: ReactNode;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  period: string;
  tags: string[];
  overview: string;
  githubUrl: string;
  architecture: {
    connectorLabel: string;
    services: ArchNode[];
    infra: ArchNode[];
  };
  flows: { title: string; steps: string[] }[];
  problems: { title: string; solution: string }[];
  techStack: { tech: string; role: string }[];
  endpoints: { method: string; path: string; description: string }[];
  /** Images in public/ (e.g. /screenshots/wallet-1.png). The section is hidden while empty. */
  screenshots: { src: string; caption: string }[];
  /** Shown on the Projects carousel card. */
  cardTitle: string;
  summary: string;
  cardTags: string[];
  /** Generated poster art: an icon over a gradient, used on cards, billboards and previews. */
  poster: { icon: ReactNode; from: string; to: string };
  /** Used by the genre filter on the Projects page. */
  genres: string[];
  /** Shown on the Resume page. */
  resume: { title: string; bullets: string[] };
}

export const projects: Project[] = [
  {
    id: 'digital-e-wallet',
    title: 'Digital E-Wallet',
    tagline: 'A microservices-based digital wallet with OTP verification, money transfers, and event-driven notifications.',
    period: 'Dec 2025 — Present',
    tags: ['Spring Boot', 'Kafka', 'Redis', 'MySQL', 'OpenFeign'],
    overview:
      'The Digital E-Wallet is a microservices-based backend platform that lets users register with OTP verification, load funds, and transfer money to other users. It demonstrates event-driven architecture using Kafka, inter-service communication with OpenFeign, OTP caching with Redis, and persistent storage in MySQL. The system is split into focused services (User, Wallet, Transaction, Notification, Common) that communicate through REST and async events.',
    githubUrl: 'https://github.com/Vipull23/E---Wallet-app',
    architecture: {
      connectorLabel: 'OpenFeign (sync) · Kafka (async)',
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
    cardTitle: 'Digital E-Wallet',
    summary: 'Microservices-based digital wallet with OTP, transfers, and Kafka events.',
    cardTags: ['Spring Boot', 'Kafka', 'Redis', 'MySQL'],
    poster: { icon: <Wallet />, from: '#7a1212', to: '#1a0505' },
    genres: ['Microservices', 'Event-Driven', 'Caching', 'Security'],
    resume: {
      title: 'Digital E-Wallet Platform (Microservices Architecture)',
      bullets: [
        'Designed and built a distributed E-Wallet backend using microservices for user onboarding, wallet management, and real-time transaction processing.',
        'Implemented inter-service communication via Spring Cloud OpenFeign (sync) and Apache Kafka (async event-driven messaging) to decouple services.',
        'Secured REST APIs with Spring Security and JWT-based authentication and authorization across service boundaries.',
      ],
    },
  },
  {
    id: 'movienow',
    title: 'MovieNow — Movie Ticket Booking & Reviewing System',
    tagline: 'A full-stack Spring Boot backend powering end-to-end cinema booking, from seat selection to async email confirmation and live movie ratings.',
    period: 'Aug 2025 — Nov 2025',
    tags: ['Java 17', 'Spring Boot', 'Spring Security', 'Apache Kafka', 'MySQL', 'Hibernate ORM', 'JPA', 'JavaMailSender'],
    overview:
      "MovieNow ties together four core actors — Admin, Theater, User, and Movie — into a complete booking lifecycle. A user searches for shows by city or movie, books seats with real-time availability validation, and receives an email confirmation via an asynchronous Kafka pipeline. Separately, users can review movies, with the platform recalculating and persisting the live average rating on every submission.",
    githubUrl: 'https://github.com/Vipull23/Movie-Ticket-and-Review-project',
    architecture: {
      connectorLabel: 'Spring Data JPA · Kafka events',
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
    cardTitle: 'MovieNow',
    summary: 'Event-driven movie ticket booking system with seat validation and async email confirmation.',
    cardTags: ['Spring Boot', 'Kafka', 'MySQL', 'JPA'],
    poster: { icon: <Film />, from: '#123a73', to: '#050a1a' },
    genres: ['Event-Driven', 'Security', 'JPA / ORM'],
    resume: {
      title: 'Event-Driven Movie Booking Platform',
      bullets: [
        'Developed a Spring Boot backend for movie listings, show scheduling, and ticket booking with relational data modeling via Spring Data JPA and MySQL.',
        'Built an event-driven notification pipeline using Apache Kafka to publish booking events and trigger async email confirmations via JavaMail.',
        'Designed a layered Controller-Service-Repository architecture with role-based authentication via Spring Security.',
      ],
    },
  },
  {
    id: 'library-system',
    title: 'Digital Library — Backend System',
    tagline: 'A Spring Boot REST API managing student borrowing, author deduplication, and overdue fine calculation — built on raw JDBC for full data-layer transparency.',
    period: 'Feb 2025 — Jun 2025',
    tags: ['Java', 'Spring Boot', 'Spring MVC', 'Spring JDBC (JdbcTemplate)', 'MySQL'],
    overview:
      'This system manages a digital library where students borrow and return books, authors are created automatically as their books are published, and every transaction is tracked end to end. Unlike the other two projects, this one intentionally uses raw JDBC instead of an ORM — every SQL query is written by hand, making the data layer fully explicit and visible. It includes custom validation (age-gated student registration) and a working fine-calculation engine for overdue returns.',
    githubUrl: 'https://github.com/Vipull23/Library-Project',
    architecture: {
      connectorLabel: 'JdbcTemplate (raw SQL)',
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
    cardTitle: 'Digital Library',
    summary: 'Spring Boot REST API for student borrowing, author deduplication, and overdue fines — built on raw JDBC.',
    cardTags: ['Java', 'Spring Boot', 'JDBC', 'MySQL'],
    poster: { icon: <BookOpen />, from: '#0f5a36', to: '#04140c' },
    genres: ['Raw SQL', 'Validation'],
    resume: {
      title: 'Library Resource Management System',
      bullets: [
        'Built a RESTful backend to manage book inventory, student records, and borrowing transactions with a clean, layered architecture.',
        'Integrated MySQL using Spring JDBC (JdbcTemplate) for manual SQL query handling and custom object mapping.',
        'Implemented book issuance and return logic ensuring transactional integrity and data consistency.',
      ],
    },
  },];

export function getProject(id: string | undefined): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function isOngoing(project: Project) {
  return /present/i.test(project.period);
}

/** Year label for metadata lines: "New" while ongoing, otherwise the end year. */
export function projectYear(project: Project) {
  if (isOngoing(project)) return 'New';
  const years = project.period.match(/\d{4}/g);
  return years ? years[years.length - 1] : project.period;
}

export const allGenres = Array.from(new Set(projects.flatMap((p) => p.genres)));
