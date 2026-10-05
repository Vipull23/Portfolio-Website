export interface Certification {
  title: string;
  issuer: string;
  date: string;
  certUrl: string;
}

export const certifications: Certification[] = [
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
