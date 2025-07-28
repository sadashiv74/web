import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Download, 
  Users, 
  FileText, 
  BarChart3,
  Calendar,
  Clock,
  Award
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';

const Analytics: React.FC = () => {
  const { darkMode } = useAppStore();

  const downloadTrends = [
    { month: 'Jan', downloads: 45000, papers: 120 },
    { month: 'Feb', downloads: 52000, papers: 135 },
    { month: 'Mar', downloads: 48000, papers: 128 },
    { month: 'Apr', downloads: 61000, papers: 145 },
    { month: 'May', downloads: 55000, papers: 132 },
    { month: 'Jun', downloads: 67000, papers: 158 },
  ];

  const topSubjects = [
    { subject: 'Data Structures & Algorithms', downloads: 25420, percentage: 18.5 },
    { subject: 'Database Management Systems', downloads: 22150, percentage: 16.1 },
    { subject: 'Computer Networks', downloads: 19800, percentage: 14.4 },
    { subject: 'Software Engineering', downloads: 17650, percentage: 12.8 },
    { subject: 'Machine Learning', downloads: 15320, percentage: 11.1 },
    { subject: 'Operating Systems', downloads: 13890, percentage: 10.1 },
  ];

  const topBranches = [
    { branch: 'Computer Engineering', papers: 425, students: 15200 },
    { branch: 'Information Technology', papers: 380, students: 12800 },
    { branch: 'Electronics & Telecommunication', papers: 295, students: 8900 },
    { branch: 'Mechanical Engineering', papers: 245, students: 7600 },
    { branch: 'Civil Engineering', papers: 210, students: 6400 },
  ];

  const recentActivity = [
    { type: 'upload', action: 'New paper uploaded', details: 'Machine Learning - External 2024', time: '5 min ago' },
    { type: 'download', action: 'High download activity', details: 'DSA papers - 150 downloads in last hour', time: '12 min ago' },
    { type: 'test', action: 'Mock test completed', details: 'DBMS test by 25 students', time: '18 min ago' },
    { type: 'user', action: 'New students joined', details: '15 new registrations today', time: '25 min ago' },
    { type: 'verification', action: 'Solution verified', details: 'Computer Networks - Sem 5', time: '35 min ago' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3 mb-4"
          >
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Analytics Dashboard
              </h1>
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Real-time insights and platform statistics
              </p>
            </div>
          </motion.div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              icon: FileText, 
              label: 'Total Papers', 
              value: '1,247', 
              change: '+12%', 
              color: 'from-blue-500 to-blue-600',
              bgColor: 'bg-blue-50 dark:bg-blue-900/20' 
            },
            { 
              icon: Download, 
              label: 'Monthly Downloads', 
              value: '67.2K', 
              change: '+18%', 
              color: 'from-green-500 to-green-600',
              bgColor: 'bg-green-50 dark:bg-green-900/20' 
            },
            { 
              icon: Users, 
              label: 'Active Students', 
              value: '52.1K', 
              change: '+7%', 
              color: 'from-purple-500 to-purple-600',
              bgColor: 'bg-purple-50 dark:bg-purple-900/20' 
            },
            { 
              icon: Award, 
              label: 'Success Rate', 
              value: '94.2%', 
              change: '+2%', 
              color: 'from-orange-500 to-orange-600',
              bgColor: 'bg-orange-50 dark:bg-orange-900/20' 
            },
          ].map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border rounded-xl p-6 hover:shadow-lg transition-all`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${metric.bgColor} rounded-lg`}>
                    <Icon className={`h-6 w-6 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`} />
                  </div>
                  <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">{metric.change}</span>
                  </div>
                </div>
                <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {metric.value}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {metric.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Download Trends */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-xl p-6`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Download Trends
              </h3>
              <Calendar className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
            
            <div className="space-y-4">
              {downloadTrends.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm font-medium w-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {data.month}
                    </span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 w-32">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(data.downloads / 70000) * 100}%` }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {(data.downloads / 1000).toFixed(0)}K
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {data.papers} papers
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Subjects */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-xl p-6`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Top Subjects
              </h3>
              <TrendingUp className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
            
            <div className="space-y-4">
              {topSubjects.map((subject, index) => (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} truncate`}>
                      {subject.subject}
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {subject.percentage}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.percentage}%` }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      />
                    </div>
                    <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} min-w-max`}>
                      {(subject.downloads / 1000).toFixed(1)}K downloads
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Branch Statistics & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Branch Statistics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className={`lg:col-span-2 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-xl p-6`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Branch Statistics
              </h3>
              <FileText className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
            
            <div className="space-y-4">
              {topBranches.map((branch, index) => (
                <div key={branch.branch} className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {branch.branch}
                    </h4>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className={`text-sm font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          {branch.papers}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Papers
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-sm font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                          {(branch.students / 1000).toFixed(1)}K
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Students
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(branch.papers / 425) * 100}%` }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-xl p-6`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Recent Activity
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <Clock className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex space-x-3">
                  <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                    activity.type === 'upload' ? 'bg-blue-500' :
                    activity.type === 'download' ? 'bg-green-500' :
                    activity.type === 'test' ? 'bg-purple-500' :
                    activity.type === 'user' ? 'bg-orange-500' :
                    'bg-yellow-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {activity.action}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                      {activity.details}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;