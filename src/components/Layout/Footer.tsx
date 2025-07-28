import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Twitter, 
  Mail, 
  Heart, 
  GraduationCap,
  BookOpen,
  Users,
  Shield
} from 'lucide-react';
import { useAppStore } from '../../stores/appStore';

const Footer: React.FC = () => {
  const { darkMode } = useAppStore();
  
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Browse Papers', href: '/' },
        { name: 'Mock Tests', href: '/mock-tests' },
        { name: 'Analytics', href: '/analytics' },
        { name: 'Study Materials', href: '/study-materials' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Previous Year Papers', href: '/papers' },
        { name: 'Solution Keys', href: '/solutions' },
        { name: 'Exam Calendar', href: '/calendar' },
        { name: 'Important Topics', href: '/topics' },
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'Discussion Forum', href: '/forum' },
        { name: 'Study Groups', href: '/groups' },
        { name: 'Contribute', href: '/contribute' },
        { name: 'Feedback', href: '/feedback' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
      ]
    }
  ];

  return (
    <footer className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Mumbai University Papers
                </span>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Engineering Resource Hub
                </span>
              </div>
            </div>
            <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md`}>
              Your comprehensive platform for Mumbai University Engineering question papers, 
              solutions, mock tests, and study materials. Built by students, for students.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <div className="flex items-center space-x-2">
                  <BookOpen className={`h-4 w-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    1000+ Papers
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <div className="flex items-center space-x-2">
                  <Users className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    50K+ Students
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100'} shadow-sm transition-colors`}
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100'} shadow-sm transition-colors`}
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100'} shadow-sm transition-colors`}
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className={`text-sm transition-colors ${
                        darkMode 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Security & Trust Section */}
        <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Shield className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Secure & Trusted
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className={`h-4 w-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Verified Content
                </span>
              </div>
            </div>
            
            <div className="text-center">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © {currentYear} Mumbai University Papers. Made with{' '}
                <Heart className="inline h-4 w-4 text-red-500" />{' '}
                for Engineering Students
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="text-center">
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              This platform is an independent resource for Mumbai University Engineering students. 
              We are not officially affiliated with Mumbai University. All content is user-contributed and verified by our community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;