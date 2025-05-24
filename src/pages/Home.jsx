import React, { useState } from 'react';
import { Link, NavLink, useOutletContext } from 'react-router-dom';
import { Menu, X, Users, Target, Camera, Car, Flag, Trophy, ChevronRight, Clock, Calendar, Sun, Moon } from 'lucide-react';
import GetImage from '../components/common/GetImage';
import { useTheme } from '../hooks/Theme';

const Home = () => {
  const { driversStandings, constructorsStandings, loading } = useOutletContext();
  const { isDarkMode } = useTheme(false);

  const nextRace = {
    name: 'Monaco Grand Prix',
    circuit: 'Circuit de Monaco',
    date: 'May 25, 2025',
    time: '15:00 UTC'
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section with Background */}
      <div className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full bg-gradient-to-r from-red-600 to-red-900 opacity-80"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Formula 1 2025</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Experience the thrill of the world's most exciting motorsport
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Next Race */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Next Race</h2>
                <Calendar className={`${isDarkMode ? 'text-red-500' : 'text-red-600'}`} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Grand Prix:</span>
                  <span className="font-bold">{nextRace.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Circuit:</span>
                  <span>{nextRace.circuit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Date:</span>
                  <span>{nextRace.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Time:</span>
                  <span className="flex items-center"><Clock size={16} className="mr-1" /> {nextRace.time}</span>
                </div>
              </div>
              <Link to="/calendar" className={`mt-6 inline-flex items-center ${isDarkMode ? 'text-red-500' : 'text-red-600'} font-medium`}>
                View full calendar <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>

          {/* Driver Standings */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Driver Standings</h2>
                <Trophy className={`${isDarkMode ? 'text-red-500' : 'text-red-600'}`} />
              </div>
              <div className="space-y-4">
                {driversStandings?.standings?.entries?.slice(0, 3)?.map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        <GetImage data={driver.athlete} />
                      </div>
                      <div>
                        <p className="font-semibold">{driver.athlete.name}</p>
                        {/* <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{driver.team.name}</p> */}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${isDarkMode ? 'text-red-500' : 'text-red-600'}`}>{driver.stats[0]?.value}</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{driver.stats[1]?.value} pts</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/standings" className={`mt-6 inline-flex items-center ${isDarkMode ? 'text-red-500' : 'text-red-600'} font-medium`}>
                View full standings <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>

          {/* Team Standings */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Constructor Standings</h2>
                <Car className={`${isDarkMode ? 'text-red-500' : 'text-red-600'}`} />
              </div>
              <div className="space-y-4">
                {constructorsStandings?.standings?.entries?.slice(0, 3)?.map((team) => (
                  <div key={team.position} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`mr-3 w-8 h-8 flex items-center justify-center rounded-full ${team.name === 'Red Bull Racing' ? 'bg-blue-600' :
                        team.team.name === 'McLaren' ? 'bg-orange-500' :
                          team.team.name === 'Ferrari' ? 'bg-red-600' : 'bg-cyan-600'
                        }`}>
                        <span className="text-white font-bold text-sm">{team.stats[0]?.value}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className="font-semibold">{team.team.name}</span>
                        {/* <GetImage data={team.name === 'Red Bull Racing' ? { ...team, name: 'red-bull' } : team} type='team' /> */}
                        <GetImage
                          type="team"
                          data={['Haas F1 Team', 'Alpine F1 Team', 'RB F1 Team', 'Sauber'].includes(team.team.name)
                            ? { ...team, name: teamName(team.team.name) }
                            : team.team
                          }
                          className="w-8 h-auto object-cover"
                        />
                      </div>
                    </div>
                    <span className="font-bold">{team.stats[1]?.value} pts</span>
                  </div>
                ))}
              </div>
              <Link to="/teams" className={`mt-6 inline-flex items-center ${isDarkMode ? 'text-red-500' : 'text-red-600'} font-medium`}>
                View all teams <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Cards */}
        <h2 className="text-2xl font-bold mb-6">Explore Formula 1</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/teams"
            className={`group overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              } hover:shadow-xl`}
          >
            <div className="h-48 bg-gradient-to-r from-red-600 to-red-700 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="w-20 h-20 text-white/80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Teams</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Explore the competitive teams of Formula 1</p>
              </div>
              <ChevronRight className={`transition-transform duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} group-hover:translate-x-1`} />
            </div>
          </Link>

          <Link
            to="/drivers"
            className={`group overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              } hover:shadow-xl`}
          >
            <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="w-20 h-20 text-white/80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Drivers</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Meet the talented drivers behind the wheel</p>
              </div>
              <ChevronRight className={`transition-transform duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} group-hover:translate-x-1`} />
            </div>
          </Link>

          <Link
            to="/circuits"
            className={`group overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              } hover:shadow-xl`}
          >
            <div className="h-48 bg-gradient-to-r from-purple-600 to-purple-700 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Flag className="w-20 h-20 text-white/80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Circuits</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Explore the world's most challenging tracks</p>
              </div>
              <ChevronRight className={`transition-transform duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} group-hover:translate-x-1`} />
            </div>
          </Link>

          <Link
            to="/game"
            className={`group overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              } hover:shadow-xl`}
          >
            <div className="h-48 bg-gradient-to-r from-green-500 to-green-600 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Target className="w-20 h-20 text-white/80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Reaction Game</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Test your reflexes like a Formula 1 driver</p>
              </div>
              <ChevronRight className={`transition-transform duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} group-hover:translate-x-1`} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;