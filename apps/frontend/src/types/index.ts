export type Role = 'ADMIN' | 'MENTOR' | 'STUDENT';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string | null;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  duration: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  coverImage?: string | null;
  _count?: { cohorts: number };
};

export type Assignment = {
  id: string;
  title: string;
  instructions: string;
  dueDate: string;
  maxMarks: number;
  cohort?: { name: string; course?: Course };
  _count?: { submissions: number };
};
