import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Eye, 
  Star, 
  Calendar, 
  BookOpen, 
  FileText,
  Clock,
  TrendingUp,
  Loader2
} from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { supabase } from '../../lib/supabase';
import { Paper } from '../../types';

const FeaturedPapers: React.FC = () => {
  const { darkMode } = useAppStore();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeaturedPapers();
  }, []);

  const fetchFeaturedPapers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('papers')
        .select('*')
        .eq('verified', true)
        .order('download_count', { ascending: false })
        .limit(6);

      if (error) throw error;
      setPapers(data || []);
    } catch (err) {
      console.error('Error fetching papers:', err);
      setError('Failed to load papers');
    } finally {
      setLoading(false);
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

  const handleDownload = async (paperId: string, title: string) => {
    try {
      // Update download count
      const { error } = await supabase
        .from('papers')
        .update({ download_count: papers.find(p => p.id === paperId)?.download_count + 1 || 1 })
        .eq('id', paperId);

      if (error) throw error;

      // Refresh papers to show updated count
      fetchFeaturedPapers();
      
      console.log(`Downloading paper: ${title}`);
    } catch (err) {
      console.error('Error updating download count:', err);
    }
  };

  const handleQuickView = (paperId: string) => {
    console.log(`Quick view for paper: ${paperId}`);
  };

  if (loading) {
    return (
      <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className={`h-8 w-8 animate-spin ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className={`ml-3 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Loading featured papers...
            </span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className={`text-lg ${darkMode ? 'text-red-400' : 'text-red-600'} mb-4`}>
              {error}
            </div>
            <button
              onClick={fetchFeaturedPapers}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (papers.length === 0) {
    return (
      <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <FileText className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              No Papers Available
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Papers will appear here once they are uploaded by administrators.
            </p>
          </div>
        </div>
      </section>
    );
  }

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
          {papers.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer`}
            >
              {/* Paper Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-semibold text-lg leading-tight ${darkMode ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
                    {paper.title}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {paper.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <span className={`px-2 py-1 rounded-full ${getDifficultyColor(paper.difficulty)} font-medium`}>
                    {paper.difficulty}
                  </span>
                  {paper.solution_url && (
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
                      {paper.year} • {paper.exam_type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {paper.download_count.toLocaleString()}
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
                    Uploaded {new Date(paper.upload_date).toLocaleDateString()}
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