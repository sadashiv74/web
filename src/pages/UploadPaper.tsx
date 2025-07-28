import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Upload, 
  FileText, 
  Save, 
  X, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Plus
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../lib/supabase';
import { BRANCHES, EXAM_TYPES, DIFFICULTIES, SEMESTERS, YEARS } from '../types';

interface PaperForm {
  title: string;
  subject: string;
  branch: string;
  semester: number;
  year: number;
  exam_type: string;
  difficulty: string;
  tags: string;
  chapters: string;
  question_paper: FileList;
  solution: FileList;
}

const UploadPaper: React.FC = () => {
  const { darkMode } = useAppStore();
  const { isAuthenticated } = useAuthStore();
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<PaperForm>();

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <AlertCircle className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-red-400' : 'text-red-500'}`} />
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Access Denied
            </h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
              You need to be logged in as an administrator to upload papers.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const uploadFile = async (file: File, bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;
    return data;
  };

  const onSubmit = async (data: PaperForm) => {
    try {
      setUploading(true);
      setUploadError(null);

      // Upload question paper file
      const questionPaperFile = data.question_paper[0];
      const questionPaperPath = `papers/${Date.now()}_${questionPaperFile.name}`;
      await uploadFile(questionPaperFile, 'papers', questionPaperPath);

      // Get public URL for question paper
      const { data: questionPaperUrl } = supabase.storage
        .from('papers')
        .getPublicUrl(questionPaperPath);

      // Upload solution file if provided
      let solutionUrl = null;
      if (data.solution && data.solution[0]) {
        const solutionFile = data.solution[0];
        const solutionPath = `solutions/${Date.now()}_${solutionFile.name}`;
        await uploadFile(solutionFile, 'papers', solutionPath);

        const { data: solutionUrlData } = supabase.storage
          .from('papers')
          .getPublicUrl(solutionPath);
        solutionUrl = solutionUrlData.publicUrl;
      }

      // Parse tags and chapters
      const tags = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      const chapters = data.chapters.split(',').map(chapter => chapter.trim()).filter(chapter => chapter.length > 0);

      // Insert paper data into database
      const { error: insertError } = await supabase
        .from('papers')
        .insert({
          title: data.title,
          subject: data.subject,
          branch: data.branch,
          semester: data.semester,
          year: data.year,
          exam_type: data.exam_type,
          difficulty: data.difficulty,
          question_paper_url: questionPaperUrl.publicUrl,
          solution_url: solutionUrl,
          tags,
          chapters,
          upload_date: new Date().toISOString(),
          download_count: 0,
          verified: true,
          rating: 0
        });

      if (insertError) throw insertError;

      setUploadSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setUploadSuccess(false), 5000);

    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Failed to upload paper');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3 mb-4"
          >
            <div className="p-2 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Upload Question Paper
              </h1>
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Add new question papers and solutions to the platform
              </p>
            </div>
          </motion.div>
        </div>

        {/* Success Message */}
        {uploadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                  Paper uploaded successfully!
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  The question paper has been added to the platform and is now available for students.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {uploadError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Upload failed
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {uploadError}
                </p>
              </div>
              <button
                onClick={() => setUploadError(null)}
                className="text-red-400 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Upload Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border rounded-xl p-8`}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Paper Title *
                </label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  type="text"
                  placeholder="e.g., Data Structures and Algorithms"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.title
                      ? 'border-red-500 focus:ring-red-500'
                      : darkMode
                      ? 'border-gray-600 focus:ring-blue-500 bg-gray-700 text-white'
                      : 'border-gray-300 focus:ring-blue-500 bg-white text-gray-900'
                  } focus:ring-2 focus:border-transparent transition-colors`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject Code *
                </label>
                <input
                  {...register('subject', { required: 'Subject is required' })}
                  type="text"
                  placeholder="e.g., DSA, DBMS, CN"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.subject
                      ? 'border-red-500 focus:ring-red-500'
                      : darkMode
                      ? 'border-gray-600 focus:ring-blue-500 bg-gray-700 text-white'
                      : 'border-gray-300 focus:ring-blue-500 bg-white text-gray-900'
                  } focus:ring-2 focus:border-transparent transition-colors`}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                )}
              </div>
            </div>

            {/* Branch and Academic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Branch *
                </label>
                <select
                  {...register('branch', { required: 'Branch is required' })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.branch
                      ? 'border-red-500 focus:ring-red-500'
                      : darkMode
                      ? 'border-gray-600 focus:ring-blue-500 bg-gray-700 text-white'
                      : 'border-gray-300 focus:ring-blue-500 bg-white text-gray-900'
                  } focus:ring-2 focus:border-transparent transition-colors`}
                >
                  <option value="">Select Branch</option>
                  {BRANCHES.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
                {errors.branch && (
                  <p className="mt-1 text-sm text-red-500">{errors.branch.message}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Semester *
                </label>
                <select
                  {...register('semester', { required: 'Semester is required', valueAsNumber: true })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.semester
                      ? 'border-red-500 focus:ring-red-500'
                      : darkMode
                      ? 'border-gray-600 focus:ring-blue-500 bg-gray-700 text-white'
                      : 'border-gray-300 focus:ring-blue-500 bg-white text-gray-900'
                  } focus:ring-2 focus:border-transparent transition-colors`}
                >
                  <option value="">Select Semester</option>
                  {SEMESTERS.map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>
                {errors.semester && (
                  <p className="mt-1 text-sm text-red-500">{errors.semester.message}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Year *
                </label>
                <select
                  {...register('year', { required: 'Year is required', valueAsNumber: true })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.year
                      ? 'border-red-500 focus:ring-red-500'
                      : darkMode
                      ? 'border-gray-600 focus:ring-blue-500 bg-gray-700 text-white'
                      : 'border-gray-300 focus:ring-blue-500 bg-white text-gray-900'
                  } focus:ring-2 focus:border-transparent transition-colors`}
                >
                  <option value="">Select Year</option>
                  {YEARS.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.year && (
                  <p className="mt-1 text-sm text-red-500">{errors.year.message}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Exam Type *
                </label>
                <select
                  {...register('exam_type', { required: 'Exam type is required' })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.exam_type
                      ? 'border-red-500 focus:ring-red-500'
                      : darkMode
                      ? 'border-gray-600 focus:ring-blue-500 bg-gray-700 text-white'
                      : 'border-gray-300 focus:ring-blue-500 bg-white text-gray-900'
                  } focus:ring-2 focus:border-transparent transition-colors`}
                >
                  <option value="">Select Type</option>
                  {EXAM_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.exam_type && (
                  <p className="mt-1 text-sm text-red-500">{errors.exam_type.message}</p>
                )}
              </div>
            </div>

            {/* Difficulty and Tags */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Difficulty *
                </label>
                <select
                  {...register('difficulty', { required: 'Difficulty is required' })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.difficulty
                      ? 'border-red-500 focus:ring-red-500'
                      : darkMode
                      ? 'border-gray-600 focus:ring-blue-500 bg-gray-700 text-white'
                      : 'border-gray-300 focus:ring-blue-500 bg-white text-gray-900'
                  } focus:ring-2 focus:border-transparent transition-colors`}
                >
                  <option value="">Select Difficulty</option>
                  {DIFFICULTIES.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
                {errors.difficulty && (
                  <p className="mt-1 text-sm text-red-500">{errors.difficulty.message}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tags
                </label>
                <input
                  {...register('tags')}
                  type="text"
                  placeholder="Arrays, Trees, Graphs (comma separated)"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? 'border-gray-600 focus:ring-blue-500 bg-gray-700 text-white'
                      : 'border-gray-300 focus:ring-blue-500 bg-white text-gray-900'
                  } focus:ring-2 focus:border-transparent transition-colors`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Chapters
                </label>
                <input
                  {...register('chapters')}
                  type="text"
                  placeholder="Chapter 1, Chapter 2 (comma separated)"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? 'border-gray-600 focus:ring-blue-500 bg-gray-700 text-white'
                      : 'border-gray-300 focus:ring-blue-500 bg-white text-gray-900'
                  } focus:ring-2 focus:border-transparent transition-colors`}
                />
              </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Question Paper File *
                </label>
                <div className={`relative border-2 border-dashed rounded-lg p-6 ${
                  errors.question_paper
                    ? 'border-red-500'
                    : darkMode
                    ? 'border-gray-600 hover:border-gray-500'
                    : 'border-gray-300 hover:border-gray-400'
                } transition-colors`}>
                  <input
                    {...register('question_paper', { required: 'Question paper file is required' })}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <FileText className={`h-8 w-8 mx-auto mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Click to upload question paper
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      PDF, DOC, DOCX up to 10MB
                    </p>
                  </div>
                </div>
                {errors.question_paper && (
                  <p className="mt-1 text-sm text-red-500">{errors.question_paper.message}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Solution File (Optional)
                </label>
                <div className={`relative border-2 border-dashed rounded-lg p-6 ${
                  darkMode
                    ? 'border-gray-600 hover:border-gray-500'
                    : 'border-gray-300 hover:border-gray-400'
                } transition-colors`}>
                  <input
                    {...register('solution')}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <FileText className={`h-8 w-8 mx-auto mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Click to upload solution
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      PDF, DOC, DOCX up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => reset()}
                className={`px-6 py-3 border rounded-lg font-medium transition-colors ${
                  darkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Reset Form
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-orange-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Upload Paper</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadPaper;