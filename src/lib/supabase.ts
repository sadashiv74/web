import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      papers: {
        Row: {
          id: string;
          title: string;
          subject: string;
          branch: string;
          semester: number;
          year: number;
          exam_type: string;
          question_paper_url: string;
          solution_url: string | null;
          upload_date: string;
          download_count: number;
          tags: string[];
          verified: boolean;
          difficulty: string;
          chapters: string[];
          rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          subject: string;
          branch: string;
          semester: number;
          year: number;
          exam_type: string;
          question_paper_url: string;
          solution_url?: string | null;
          upload_date?: string;
          download_count?: number;
          tags?: string[];
          verified?: boolean;
          difficulty?: string;
          chapters?: string[];
          rating?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          subject?: string;
          branch?: string;
          semester?: number;
          year?: number;
          exam_type?: string;
          question_paper_url?: string;
          solution_url?: string | null;
          upload_date?: string;
          download_count?: number;
          tags?: string[];
          verified?: boolean;
          difficulty?: string;
          chapters?: string[];
          rating?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      mock_tests: {
        Row: {
          id: string;
          subject: string;
          branch: string;
          semester: number;
          title: string;
          questions: any[];
          duration: number;
          total_marks: number;
          created_date: string;
          attempt_count: number;
          difficulty: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          subject: string;
          branch: string;
          semester: number;
          title: string;
          questions: any[];
          duration: number;
          total_marks: number;
          created_date?: string;
          attempt_count?: number;
          difficulty?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          subject?: string;
          branch?: string;
          semester?: number;
          title?: string;
          questions?: any[];
          duration?: number;
          total_marks?: number;
          created_date?: string;
          attempt_count?: number;
          difficulty?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_sessions: {
        Row: {
          id: string;
          session_id: string;
          tests_attempted: string[];
          download_history: string[];
          preferences: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          tests_attempted?: string[];
          download_history?: string[];
          preferences?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          tests_attempted?: string[];
          download_history?: string[];
          preferences?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};