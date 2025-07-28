import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  BookOpen, 
  Users, 
  Download, 
  TrendingUp, 
  Clock,
  Award,
  Target
} from 'lucide-react';
import { useAppStore } from '../../stores/appStore';

const QuickStats: React.FC = () => {
  const { darkMode } = useAppStore();

  const mainStats = [
    {
      icon: FileText,
      label: 'Question Papers',
      value: '1,247',
      change: '+15',
      changeType: 'increase',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: BookOpen,
      label: 'Mock Tests',
      value: '156',
      change: '+8',
      changeType: 'increase',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Users,
      label: 'Active Students',
      value: '52.1K',
      change: '+2.3K',
      changeType: 'increase',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Download,
      label: 'Total Downloads',
      value: '1.2M',
      change: '+125K',
      changeType: 'increase',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600 dark:text-orange-400'
    }
  ];

  const additionalStats = [
    {
      icon: Award,
      label: 'Success Rate',
      value: '94.2%',
      description: 'Students passing after using our platform'
    },
    {
      icon: Clock,
      label: 'Avg. Upload Time',
      value: '< 6 hours',
      description: 'Time to upload papers after exam'
    },
    {
      icon: Target,
      label: 'Accuracy',
      value: '98.7%',
      description: 'Solution accuracy verified by experts'
    },
    {
      icon: TrendingUp,
      label: 'Growth Rate',
      value: '+45%',
      description: 'Monthly active user growth'
    }
  ];

  return (
    <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-3xl lg:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Platform Statistics
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}
          >
            Real-time insights into our growing community and resource library
          </motion.p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden ${
                  darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                } border rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
              >
                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-5 rounded-full transform translate-x-8 -translate-y-8`} />
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.bgColor} rounded-lg mb-4`}>
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>

                {/* Value */}
                <div className="mb-2">
                  <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <motion.div
                    className={`bg-gradient-to-r ${stat.color} h-1.5 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`${
                  darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
                } border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex justify-center mb-3">
                  <Icon className={`h-8 w-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </div>
                <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {stat.label}
                </div>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Live Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`mt-12 ${
            darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gradient-to-r from-blue-50 to-orange-50 border-gray-200'
          } border rounded-xl p-6`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Live Activity
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Real-time updates
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { action: 'New paper uploaded', subject: 'Machine Learning - Sem 7', time: '2 min ago' },
              { action: 'Mock test completed', subject: 'DBMS - 50 questions', time: '5 min ago' },
              { action: 'Solution verified', subject: 'Data Structures - External 2024', time: '8 min ago' },
              { action: 'New student joined', subject: 'Computer Engineering', time: '12 min ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 bg-blue-500 rounded-full`} />
                  <div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {activity.action}:
                    </span>
                    <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {activity.subject}
                    </span>
                  </div>
                </div>
                <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickStats;