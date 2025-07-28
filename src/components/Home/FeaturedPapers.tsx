import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Eye, 
  Star, 
  Calendar, 
  BookOpen, 
  FileText,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useAppStore } from '../../stores/appStore';

const FeaturedPapers: React.FC = () => {
  const { darkMode } = useAppStore();

  // Mock data for featured papers
  const featuredPapers = [
    {
      id: '1',
      title: 'Data Structures and Algorithms',
      subject: 'DSA',
      branch: 'Computer Engineering',
      semester: 3,
      year: 2024,
      examType: 'External',
      downloadCount: 1250,
      rating: 4.8,
      difficulty: 'Medium',
      hasSolutions: true,
      isNew: true,
      uploadDate: '2024-01-15',
      tags: ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming']
    },
    {
      id: '2',
      title: 'Database Management Systems',
      subject: 'DBMS',
      branch: 'Information Technology',
      semester: 4,
      year: 2024,
      examType: 'Internal Assessment',
      downloadCount: 980,
      rating: 4.6,
      difficulty: 'Easy',
      hasolutions: true,
      isNew: false,
      uploadDate: '2024-01-10',
      tags: ['SQL', 'Normalization', 'Transactions', 'Indexing']
    },
    {
      id: '3',
      title: 'Computer Networks',
      subject: 'CN',
      branch: 'Computer Engineering',
      semester: 5,
      year: 2023,
      examType: 'External',
      downloadCount: 1450,
      rating: 4.9,
      difficulty: 'Hard',
      hasSolutions: true,
      isNew: false,
      uploadDate: '2024-01-08',
      tags: ['OSI Model', 'TCP/IP', 'Routing', 'Security']
    },
    {
      id: '4',
      title: 'Software Engineering',
      subject: 'SE',
      branch: 'Information Technology',
      semester: 6,
      year: 2024,
      examType: 'External',
      downloadCount: 720,
      rating: 4.4,
      difficulty: 'Medium',
      hasSolutions: false,
      isNew: true,
      uploadDate: '2024-01-12',
      tags: ['SDLC', 'Testing', 'Project Management', 'Agile']
    },
    {
      id: '5',
      title: 'Machine Learning',
      subject: 'ML',
      branch: 'Computer Engineering',
      semester: 7,
      year: 2024,
      examType: 'External',
      downloadCount: 890,
      rating: 4.7,
      difficulty: 'Hard',
      hasSolutions: true,
      isNew: true,
      uploadDate: '2024-01-14',
      tags: ['Neural Networks', 'Deep Learning', 'Algorithms', 'Python']
    },
    {
      id: '6',
      title: 'Digital Signal Processing',
      subject: 'DSP',
      branch: 'Electronics & Telecommunication',
      semester: 6,
      year: 2024,
      examType: 'External',
      downloadCount: 650,
      rating: 4.5,
      difficulty: 'Hard',
      hasSolutions: true,
      isNew: false,
      uploadDate: '2024-01-05',
      tags: ['Filters', 'FFT', 'Z-Transform', 'Applications']
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

  const handleDownload = (paperId: string, title: string) => {
    // In a real app, this would trigger the actual download
    console.log(`Downloading paper: ${title}`);
    // Update download count in database
  };

  const handleQuickView = (paperId: string) => {
    // Open paper preview modal
    console.log(`Quick view for paper: ${paperId}`);
  };

  return (
    <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-orange-100 dark:from-blue-900/30 dark:to-orange-900/30 px-4 py-2 rounded-full mb-4"
          >
            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Most Popular This Week
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-3xl lg:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Featured Question Papers
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}
          >
            Discover the most downloaded and highest-rated question papers from various engineering branches
          </motion.p>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPapers.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer`}
            >
              {/* New Badge */}
              {paper.isNew && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  NEW
                </div>
              )}

              {/* Paper Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-semibold text-lg leading-tight ${darkMode ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
                    {paper.title}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {paper.rating}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <span className={`px-2 py-1 rounded-full ${getDifficultyColor(paper.difficulty)} font-medium`}>
                    {paper.difficulty}
                  </span>
                  {paper.hasSolutions && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full font-medium">
                      Solutions ✓
                    </span>
                  )}
                </div>
              </div>

              {/* Paper Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {paper.branch}
                  </span>
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Sem {paper.semester}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {paper.year} • {paper.examType}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {paper.downloadCount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {paper.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-1 rounded-full ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                  {paper.tags.length > 3 && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      +{paper.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleQuickView(paper.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg border transition-colors ${
                    darkMode
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">View</span>
                </button>
                
                <button
                  onClick={() => handleDownload(paper.id, paper.title)}
                  className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-lg hover:from-blue-700 hover:to-orange-600 transition-all"
                >
                  <Download className="h-4 w-4" />
                  <span className="text-sm font-medium">Download</span>
                </button>
              </div>

              {/* Upload Date */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <Clock className={`h-3 w-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Uploaded {new Date(paper.uploadDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-orange-600 transition-all shadow-lg">
            View All Papers
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPapers;