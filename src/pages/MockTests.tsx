import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Users, 
  Trophy, 
  Play, 
  Star, 
  BookOpen,
  Target,
  TrendingUp,
  Loader2,
  FileText
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { supabase } from '../lib/supabase';
import { MockTest } from '../types';

const MockTests: React.FC = () => {
  const { darkMode } = useAppStore();
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalTests: 0,
    totalAttempts: 0,
    avgScore: 0,
    successRate: 0
  });

  useEffect(() => {
    fetchMockTests();
    fetchStats();
  }, []);

  const fetchMockTests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('mock_tests')
        .select('*')
        .order('created_date', { ascending: false });

      if (error) throw error;
      setMockTests(data || []);
    } catch (err) {
      console.error('Error fetching mock tests:', err);
      setError('Failed to load mock tests');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { count: totalTests } = await supabase
        .from('mock_tests')
        .select('*', { count: 'exact', head: true });

      const { data: testsData } = await supabase
        .from('mock_tests')
        .select('attempt_count');

      const totalAttempts = testsData?.reduce((sum, test) => sum + test.attempt_count, 0) || 0;

      setStats({
        totalTests: totalTests || 0,
        totalAttempts,
        avgScore: 76, // This would need to be calculated from actual test results
        successRate: 94 // This would need to be calculated from actual test results
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'Hard': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  const handleStartTest = async (testId: string, title: string) => {
    try {
      // Update attempt count
      const test = mockTests.find(t => t.id === testId);
      if (test) {
        const { error } = await supabase
          .from('mock_tests')
          .update({ attempt_count: test.attempt_count + 1 })
          .eq('id', testId);

        if (error) throw error;
        
        // Refresh tests to show updated count
        fetchMockTests();
        fetchStats();
      }
      
      console.log(`Starting test: ${title}`);
      // Navigate to test interface
    } catch (err) {
      console.error('Error updating attempt count:', err);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className={`h-8 w-8 animate-spin ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className={`ml-3 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Loading mock tests...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className={`text-lg ${darkMode ? 'text-red-400' : 'text-red-600'} mb-4`}>
              {error}
            </div>
            <button
              onClick={fetchMockTests}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            { icon: BookOpen, label: 'Total Tests', value: stats.totalTests.toString(), color: 'text-blue-600' },
            { icon: Users, label: 'Test Attempts', value: `${Math.floor(stats.totalAttempts / 1000)}K+`, color: 'text-green-600' },
            { icon: Target, label: 'Avg. Score', value: `${stats.avgScore}%`, color: 'text-purple-600' },
            { icon: TrendingUp, label: 'Success Rate', value: `${stats.successRate}%`, color: 'text-orange-600' },
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

        {/* Mock Tests Grid or Empty State */}
        {mockTests.length === 0 ? (
          <div className="text-center py-12">
            <FileText className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              No Mock Tests Available
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Mock tests will appear here once they are created by administrators.
            </p>
          </div>
        ) : (
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
                        4.5
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
                        {test.questions.length} Questions
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
                        {test.total_marks} Marks
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {test.attempt_count} attempts
                      </span>
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
        )}
      </div>
    </div>
  );
};

export default MockTests;