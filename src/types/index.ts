export interface Paper {
  id: string;
  title: string;
  subject: string;
  branch: string;
  semester: number;
  year: number;
  exam_type: string;
  question_paper_url: string;
  solution_url?: string;
  upload_date: string;
  download_count: number;
  tags: string[];
  verified: boolean;
  difficulty: string;
  chapters: string[];
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface MockTest {
  id: string;
  subject: string;
  branch: string;
  semester: number;
  title: string;
  questions: Question[];
  duration: number;
  total_marks: number;
  created_date: string;
  attempt_count: number;
  difficulty: string;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  question: string;
  type: 'MCQ' | 'SHORT' | 'LONG';
  options?: string[];
  correct_answer: string;
  explanation?: string;
  marks: number;
  chapter: string;
}

export interface UserSession {
  id: string;
  session_id: string;
  tests_attempted: string[];
  download_history: string[];
  preferences: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Stats {
  totalPapers: number;
  totalSubjects: number;
  totalDownloads: number;
  totalMockTests: number;
  recentUploads: number;
}

export const BRANCHES = [
  'Computer Engineering',
  'Information Technology',
  'Electronics & Telecommunication',
  'Electronics Engineering', 
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Textile Engineering',
  'Production Engineering',
  'Instrumentation Engineering'
];

export const EXAM_TYPES = [
  'Internal Assessment',
  'External',
  'Practical',
  'Oral',
  'Project',
  'Viva'
];

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export const YEARS = [2024, 2023, 2022, 2021, 2020, 2019, 2018];