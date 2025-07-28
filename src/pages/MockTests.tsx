import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Users, 
  Trophy, 
  Play, 
  Star, 
  BookOpen,
  Target,
  TrendingUp
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';

const MockTests: React.FC = () => {
  const { darkMode } = useAppStore();

  const mockTests = [
    {
      id: '1',
      title: 'Data Structures & Algorithms - Complete Test',
      subject: 'DSA',
      branch: 'Computer Engineering',
      semester: 3,
      questions: 50,
      duration: 180,
      totalMarks: 100,
      difficulty: 'Medium',
      attemptCount: 1250,
      rating: 4.8,
      topics: ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting'],
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      title: 'Database Management Systems - Mid-term',
      subject: 'DBMS',
      branch: 'Information Technology',
      semester: 4,
      questions: 30,
      duration: 120,
      totalMarks: 75,
      difficulty: 'Easy',
      attemptCount: 980,
      rating: 4.6,
      topics: ['SQL', 'Normalization', 'Transactions', 'Indexing'],
      lastUpdated: '2024-01-12'
    },
    {
      id: '3',
      title: 'Computer Networks - External Pattern',
      subject: 'CN',
      branch: 'Computer Engineering',
      semester: 5,
      questions: 45,
      duration: 150,
      totalMarks: 90,
      difficulty: 'Hard',
      attemptCount: 750,
      rating: 4.9,
      topics: ['OSI Model', 'TCP/IP', 'Routing', 'Network Security'],
      lastUpdated: '2024-01-10'
    },
    {
      id: '4',
      title: 'Machine Learning Fundamentals',
      subject: 'ML',
      branch: 'Computer Engineering',
      semester: 7,
      questions: 40,
      duration: 135,
      totalMarks: 80,
      difficulty: 'Hard',
      attemptCount: 450,
      rating: 4.7,
      topics: ['Supervised Learning', 'Neural Networks', 'Classification', 'Regression'],
      lastUpdated: '2024-01-08'
    },
    {
      id: '5',
      title: 'Software Engineering Principles',
      subject: 'SE',
      branch: 'Information Technology',
      semester: 6,
      questions: 35,
      duration: 105,
      totalMarks: 70,
      difficulty: 'Medium',
      attemptCount: 620,
      rating: 4.4,
      topics: ['SDLC', 'Testing', 'Project Management', 'Agile Methodology'],
      lastUpdated: '2024-01-05'
    },
    {
      id: '6',
      title: 'Digital Signal Processing',
      subject: 'DSP',
      branch: 'Electronics & Telecommunication',
      semester: 6,
      questions: 38,
      duration: 140,
      totalMarks: 85,
      difficulty: 'Hard',
      attemptCount: 380,
      rating: 4.5,
      topics: ['Filters', 'FFT', 'Z-Transform', 'Signal Analysis'],
      lastUpdated: '2024-01-03'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'Hard': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  const handleStartTest = (testId: string, title: string) => {
    console.log(`Starting test: ${title}`);
    // Navigate to test interface
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full mb-4"
          >
            <Trophy className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Test Your Knowledge
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-3xl lg:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Mock Tests
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}
          >
            Practice with comprehensive mock tests designed to simulate real exam conditions
          </motion.p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: BookOpen, label: 'Total Tests', value: '156', color: 'text-blue-600' },
            { icon: Users, label: 'Test Attempts', value: '25K+', color: 'text-green-600' },
            { icon: Target, label: 'Avg. Score', value: '76%', color: 'text-purple-600' },
            { icon: TrendingUp, label: 'Success Rate', value: '94%', color: 'text-orange-600' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border rounded-xl p-6 text-center hover:shadow-lg transition-all`}
              >
                <Icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mock Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border rounded-xl p-6 hover:shadow-xl transition-all duration-300`}
            >
              {/* Test Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-semibold text-lg leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {test.title}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {test.rating}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full ${getDifficultyColor(test.difficulty)} text-xs font-medium`}>
                    {test.difficulty}
                  </span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {test.branch} • Sem {test.semester}
                  </span>
                </div>
              </div>

              {/* Test Details */}
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {test.questions} Questions
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {test.duration} min
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {test.totalMarks} Marks
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {test.attemptCount} attempts
                    </span>
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Topics Covered:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {test.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className={`text-xs px-2 py-1 rounded-full ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                    {test.topics.length > 3 && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        +{test.topics.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Start Test Button */}
              <button
                onClick={() => handleStartTest(test.id, test.title)}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-blue-700 transition-all"
              >
                <Play className="h-4 w-4" />
                <span>Start Test</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className={`px-8 py-3 border-2 border-dashed rounded-lg font-medium transition-colors ${
            darkMode 
              ? 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300' 
              : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700'
          }`}>
            Load More Tests
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default MockTests;