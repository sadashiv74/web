import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  Users, 
  Download, 
  TrendingUp,
  FileText,
  Award,
  Clock
} from 'lucide-react';
import { useAppStore } from '../../stores/appStore';

const Hero: React.FC = () => {
  const { darkMode, searchQuery, setSearchQuery } = useAppStore();

  const stats = [
    { icon: FileText, label: 'Question Papers', value: '1,200+', color: 'text-blue-600' },
    { icon: BookOpen, label: 'Mock Tests', value: '150+', color: 'text-green-600' },
    { icon: Users, label: 'Active Students', value: '50K+', color: 'text-purple-600' },
    { icon: Download, label: 'Downloads', value: '1M+', color: 'text-orange-600' },
  ];

  return (
    <div className={`relative ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-orange-50'} overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-orange-500" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-orange-100 dark:from-blue-900/30 dark:to-orange-900/30 px-4 py-2 rounded-full">
              <Award className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Trusted by 50,000+ Engineering Students
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className={`text-4xl lg:text-6xl font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Mumbai University{' '}
                <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  Engineering Papers
                </span>
              </h1>
              <p className={`text-lg lg:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl`}>
                Your complete resource hub for question papers, solutions, mock tests, and study materials. 
                Ace your exams with verified content from the engineering community.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-lg">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search papers, subjects, branches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 text-lg ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all shadow-lg`}
              />
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-3">
              {['Computer Engineering', 'IT', 'EXTC', 'Mechanical', 'Civil'].map((branch) => (
                <button
                  key={branch}
                  onClick={() => setSearchQuery(branch)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
                  }`}
                >
                  {branch}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-orange-600 transition-all shadow-lg"
              >
                Browse Question Papers
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 font-semibold rounded-lg transition-all ${
                  darkMode
                    ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                    : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300 shadow-lg'
                }`}
              >
                Take Mock Test
              </motion.button>
            </div>
          </motion.div>

          {/* Right Content - Stats & Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`p-6 rounded-xl ${
                      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    } shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                      <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {stat.value}
                      </span>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Features List */}
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            } shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Why Choose MU Papers?
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Clock, text: 'Updated within 24 hours of exam' },
                  { icon: Award, text: 'Verified solutions by toppers' },
                  { icon: TrendingUp, text: 'AI-powered difficulty analysis' },
                  { icon: Users, text: 'Community-driven content' },
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon className={`h-4 w-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {feature.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;