// src/pages/Calendar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Flag, ChevronRight, Check, Clock } from 'lucide-react';

const Calendar = () => {
    // Theme detection (simplified for this example)
    const isDarkMode = false;

    // Calendar data with race status
    const races = [
        {
            id: 1,
            name: 'Bahrain Grand Prix',
            circuit: 'Bahrain International Circuit',
            location: 'Sakhir, Bahrain',
            date: 'March 5, 2025',
            status: 'completed',
            winner: 'Max Verstappen',
            winnerTeam: 'Red Bull Racing',
            flagCode: 'BH',
            image: '/api/placeholder/120/64'
        },
        {
            id: 2,
            name: 'Saudi Arabian Grand Prix',
            circuit: 'Jeddah Corniche Circuit',
            location: 'Jeddah, Saudi Arabia',
            date: 'March 19, 2025',
            status: 'completed',
            winner: 'Lando Norris',
            winnerTeam: 'McLaren',
            flagCode: 'SA',
            image: '/api/placeholder/120/64'
        },
        {
            id: 3,
            name: 'Australian Grand Prix',
            circuit: 'Albert Park Circuit',
            location: 'Melbourne, Australia',
            date: 'April 2, 2025',
            status: 'completed',
            winner: 'Charles Leclerc',
            winnerTeam: 'Ferrari',
            flagCode: 'AU',
            image: '/api/placeholder/120/64'
        },
        {
            id: 4,
            name: 'Japanese Grand Prix',
            circuit: 'Suzuka International Racing Course',
            location: 'Suzuka, Japan',
            date: 'April 16, 2025',
            status: 'completed',
            winner: 'Max Verstappen',
            winnerTeam: 'Red Bull Racing',
            flagCode: 'JP',
            image: '/api/placeholder/120/64'
        },
        {
            id: 5,
            name: 'Chinese Grand Prix',
            circuit: 'Shanghai International Circuit',
            location: 'Shanghai, China',
            date: 'April 30, 2025',
            status: 'completed',
            winner: 'Lewis Hamilton',
            winnerTeam: 'Mercedes',
            flagCode: 'CN',
            image: '/api/placeholder/120/64'
        },
        {
            id: 6,
            name: 'Miami Grand Prix',
            circuit: 'Miami International Autodrome',
            location: 'Miami, USA',
            date: 'May 14, 2025',
            status: 'upcoming',
            time: '20:00 UTC',
            flagCode: 'US',
            image: '/api/placeholder/120/64'
        },
        {
            id: 7,
            name: 'Emilia Romagna Grand Prix',
            circuit: 'Autodromo Enzo e Dino Ferrari',
            location: 'Imola, Italy',
            date: 'May 7, 2025',
            status: 'upcoming',
            time: '14:00 UTC',
            flagCode: 'IT',
            image: '/api/placeholder/120/64'
        },
        {
            id: 8,
            name: 'Monaco Grand Prix',
            circuit: 'Circuit de Monaco',
            location: 'Monte Carlo, Monaco',
            date: 'May 25, 2025',
            status: 'upcoming',
            time: '14:00 UTC',
            flagCode: 'MC',
            image: '/api/placeholder/120/64'
        },
        {
            id: 9,
            name: 'Canadian Grand Prix',
            circuit: 'Circuit Gilles Villeneuve',
            location: 'Montreal, Canada',
            date: 'June 25, 2025',
            status: 'upcoming',
            time: '18:00 UTC',
            flagCode: 'CA',
            image: '/api/placeholder/120/64'
        },
        {
            id: 10,
            name: 'Spanish Grand Prix',
            circuit: 'Circuit de Barcelona-Catalunya',
            location: 'Barcelona, Spain',
            date: 'July 9, 2025',
            status: 'upcoming',
            time: '14:00 UTC',
            flagCode: 'ES',
            image: '/api/placeholder/120/64'
        },
        {
            id: 11,
            name: 'Austrian Grand Prix',
            circuit: 'Red Bull Ring',
            location: 'Spielberg, Austria',
            date: 'July 23, 2025',
            status: 'upcoming',
            time: '14:00 UTC',
            flagCode: 'AT',
            image: '/api/placeholder/120/64'
        },
        {
            id: 12,
            name: 'British Grand Prix',
            circuit: 'Silverstone Circuit',
            location: 'Silverstone, UK',
            date: 'August 6, 2025',
            status: 'upcoming',
            time: '15:00 UTC',
            flagCode: 'GB',
            image: '/api/placeholder/120/64'
        }
    ];

    const getRaceStatus = (dateStr, timeStr = '00:00 UTC') => {
        const raceDateTime = new Date(`${dateStr} ${timeStr}`);
        const now = new Date();
        return now > raceDateTime ? 'completed' : 'upcoming';
    };

    const racesWithStatus = races.map(race => ({
        ...race,
        status: getRaceStatus(race.date, race.time),
    }));

    const completedRaces = racesWithStatus.filter(r => r.status === 'completed');
    const upcomingRaces = racesWithStatus.filter(r => r.status === 'upcoming');
    const nextRace = upcomingRaces[0];



    // Tabs state
    const [activeTab, setActiveTab] = useState('all');

    // Get displayed races based on active tab
    const getDisplayedRaces = () => {
        switch (activeTab) {
            case 'completed':
                return completedRaces;
            case 'upcoming':
                return upcomingRaces;
            default:
                return racesWithStatus;
        }
    };




    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">Race Calendar</h1>

            {/* Next race highlight */}
            {nextRace && (
                <div className={`mb-8 rounded-xl overflow-hidden shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="relative">
                        <div className={`absolute top-0 left-0 px-3 py-1 ${isDarkMode ? 'bg-red-600' : 'bg-red-600'} text-white text-sm font-semibold rounded-br-lg`}>
                            NEXT RACE
                        </div>
                        <div className="h-48 bg-gradient-to-r from-gray-700 to-gray-900 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={nextRace.image}
                                    alt={nextRace.circuit}
                                    className="w-full h-full object-cover opacity-40"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                            <div className="absolute inset-0 flex items-center justify-center flex-col text-white">
                                <h2 className="text-3xl font-bold text-center">{nextRace.name}</h2>
                                <p className="flex items-center mt-2">
                                    <Flag size={16} className="mr-2" />
                                    {nextRace.location}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">{nextRace.circuit}</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <CalendarIcon size={18} className={`mr-2 ${isDarkMode ? 'text-red-500' : 'text-red-600'}`} />
                                        <span>{nextRace.date}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock size={18} className={`mr-2 ${isDarkMode ? 'text-red-500' : 'text-red-600'}`} />
                                        <span>{nextRace.time}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end items-center">
                                <Link
                                    to={`/circuits/${nextRace.id}`}
                                    className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-600 hover:bg-red-700'} text-white flex items-center`}
                                >
                                    Circuit details
                                    <ChevronRight size={16} className="ml-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Calendar Filter Tabs */}
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'all'
                        ? isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                        : isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    All Races
                </button>
                <button
                    onClick={() => setActiveTab('completed')}
                    className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'completed'
                        ? isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                        : isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    Completed ({completedRaces.length})
                </button>
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'upcoming'
                        ? isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                        : isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    Upcoming ({upcomingRaces.length})
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getDisplayedRaces().map((race) => (
                    <div
                        key={race.id}
                        className={`rounded-xl overflow-hidden shadow-md border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                    >
                        <div className="relative">
                            <div className={`absolute top-0 left-0 px-3 py-1 ${race.status === 'completed'
                                ? 'bg-green-600'
                                : 'bg-blue-600'
                                } text-white text-sm font-semibold rounded-br-lg`}>
                                {race.status === 'completed' ? 'COMPLETED' : 'UPCOMING'}
                            </div>
                            <img
                                src={race.image}
                                alt={race.circuit}
                                className="w-full h-32 object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">{race.name}</h3>
                            <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{race.circuit}</p>

                            <div className="flex items-center mb-3">
                                <CalendarIcon size={16} className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                <span className="text-sm">{race.date}</span>
                            </div>

                            {race.status === 'completed' ? (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <p className="text-sm font-semibold">Race Winner:</p>
                                    <p className="font-bold">{race.winner} <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>({race.winnerTeam})</span></p>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                                    <span className="flex items-center text-sm">
                                        <Clock size={16} className="mr-1" />
                                        {race.time}
                                    </span>
                                    <Link
                                        to={`/circuits/${race.id}`}
                                        className={`text-sm ${isDarkMode ? 'text-red-500 hover:text-red-400' : 'text-red-600 hover:text-red-700'} flex items-center`}
                                    >
                                        Details <ChevronRight size={14} className="ml-1" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;