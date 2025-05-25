import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Flag, Users, Car, Trophy, Moon, Sun, Video } from 'lucide-react';
import { useTheme } from '../../hooks/Theme';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleTheme, isDarkMode } = useTheme(); // Assuming useTheme is defined in your hooks


  const navLinks = [
    { name: 'Teams', path: '/teams', icon: <Users size={20} /> },
    { name: 'Drivers', path: '/drivers', icon: <Flag size={20} /> },
    { name: 'Standings', path: '/standings', icon: <Flag size={20} /> },
    { name: 'Car Gallery', path: '/gallery', icon: <Car size={20} /> },
    { name: 'Circuits', path: '/circuits', icon: <Flag size={20} /> },
    { name: 'Live', path: '/live', icon: <Video size={20} /> },
    // { name: 'Reaction Game', path: '/games/reaction', icon: <Trophy size={20} /> }
  ];

  return (
    <nav className={`bg-f1-black text-white ${isDarkMode
      ? 'bg-slate-900/80' : 'bg-white/80'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-8 w-auto" src="/f1.jpg" alt="F1 Fan Portal" />
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? `${isDarkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'} px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2`
                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'} px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2`
                    }
                  >
                    {link.icon}
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-blue-900'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? `${isDarkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'} block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2`
                    : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'} block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}