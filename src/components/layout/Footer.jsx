import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/Theme';

export default function Footer() {
  const { isDarkMode } = useTheme();
  return (
    <footer className={`bg-f1-black text-white py-8 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">F1 Fan Portal</h3>
            <p className="text-gray-400">
              Your ultimate destination for Formula 1 content, stats, and interactive experiences.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-black dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/teams" className="text-gray-400 hover:text-white">Teams</Link></li>
              <li><Link to="/drivers" className="text-gray-400 hover:text-white">Drivers</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-white">Car Gallery</Link></li>
              <li><Link to="/games/reaction" className="text-gray-400 hover:text-white">Reaction Game</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-black dark:text-white">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="text-gray-400 hover:text-white">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} F1 Fan Hub. This is a fan-made website and is not affiliated with Formula 1.</p>
        </div>
      </div>
    </footer>
  );
}
