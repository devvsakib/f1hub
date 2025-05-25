import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Calendar as CalendarIcon, Flag, ChevronRight, Clock, Trophy } from 'lucide-react';
import { useTheme } from '../hooks/Theme';
import GetImage from '../components/common/GetImage';

const Calendar = () => {
    // const [races, setRaces] = useState([]);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const { isDarkMode } = useTheme();
    const { calendar: races, loading } = useOutletContext();
    console.log(races)
    // Fetch race data from API
    // useEffect(() => {
    //     const fetchRaceData = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await fetch('https://racingnews365.com/cache/site/RN365EN/json/header/match-center.json');
    //             const data = await response.json();
    //             setRaces(data);
    //             setError(null);
    //         } catch (err) {
    //             console.error('Failed to fetch race data:', err);
    //             setError('Failed to load race data');
    //             // Fallback to mock data if API fails
    //             setRaces([
    //                 {
    //                     id: 196,
    //                     title: "Australian GP",
    //                     countryShort: "AUS",
    //                     countryFull: "Australian",
    //                     subEvents: [
    //                         {
    //                             id: 1280,
    //                             title: "race",
    //                             status: "completed",
    //                             dateStart: "2025-03-16T05:00:00+01:00",
    //                             dateEnd: "2025-03-16T07:00:00+01:00",
    //                             result: [
    //                                 { name: "NOR", color: "#FF8000", time: "" },
    //                                 { name: "VER", color: "#3671C6", time: "+0.895" }
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ]);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchRaceData();
    // }, []);

    // Helper function to get driver full names
    const getDriverName = (shortName) => {
        const driverMap = {
            'NOR': 'Lando Norris',
            'VER': 'Max Verstappen',
            'LEC': 'Charles Leclerc',
            'HAM': 'Lewis Hamilton',
            'RUS': 'George Russell',
            'PIA': 'Oscar Piastri',
            'SAI': 'Carlos Sainz',
            'TSU': 'Yuki Tsunoda',
            'ANT': 'Andrea Kimi Antonelli',
            'ALB': 'Alexander Albon',
            'OCO': 'Esteban Ocon',
            'LAW': 'Liam Lawson'
        };
        return driverMap[shortName] || shortName;
    };

    // Helper function to get team name from color
    const getTeamName = (color) => {
        const teamMap = {
            '#FF8000': 'McLaren',
            '#3671C6': 'Red Bull Racing',
            '#E8002D': 'Ferrari',
            '#27F4D2': 'Mercedes',
            '#6692FF': 'Racing Bulls',
            '#64C4FF': 'Williams',
            '#B6BABD': 'Alpine'
        };
        return teamMap[color] || 'Unknown Team';
    };

    // Process races to get race event details
    const processedRaces = races?.map(race => {
        const raceEvent = race.subEvents?.find(event => event.title === 'race');
        const qualifyingEvent = race.subEvents?.find(event => event.title === 'qualification');

        if (!raceEvent) return null;

        const raceDate = new Date(raceEvent.dateStart);
        const now = new Date();
        const isCompleted = raceEvent.status === 'completed';
        const winner = raceEvent.result?.[0];

        return {
            id: race.id,
            name: race.title,
            circuit: `${race.countryFull} Grand Prix Circuit`,
            location: race.countryFull,
            date: raceDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            time: raceDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            }),
            status: isCompleted ? 'completed' : 'upcoming',
            winner: winner ? getDriverName(winner.name) : null,
            winnerTeam: winner ? getTeamName(winner.color) : null,
            flagCode: race.countryShort,
            image: `/api/placeholder/120/64`,
            raceEvent,
            qualifyingEvent,
            rawDate: raceDate
        };
    }).filter(race => race !== null);

    // Sort races by date
    const sortedRaces = processedRaces?.sort((a, b) => a.rawDate - b.rawDate);

    const completedRaces = sortedRaces?.filter(r => r.status === 'completed');
    const upcomingRaces = sortedRaces?.filter(r => r.status === 'upcoming');
    const nextRace = upcomingRaces?.[0];

    // Get displayed races based on active tab
    const getDisplayedRaces = () => {
        switch (activeTab) {
            case 'completed':
                return completedRaces;
            case 'upcoming':
                return upcomingRaces;
            default:
                return sortedRaces;
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading race calendar...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">Race Calendar</h1>

            {error && (
                <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                    <p>{error}. Showing fallback data.</p>
                </div>
            )}

            {/* Next race highlight */}
            {nextRace && (
                <div className={`mb-8 rounded-xl overflow-hidden shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="relative">
                        <div className={`absolute top-0 left-0 px-3 py-1 ${isDarkMode ? 'bg-red-600' : 'bg-red-600'} text-white text-sm font-semibold rounded-br-lg z-10`}>
                            NEXT RACE
                        </div>
                        <div className="h-48 bg-gradient-to-r from-gray-700 to-gray-900 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* <GetImage data={nextRace} type="circuit" className={'absolute -z-0 w-full h-full object-cover opacity-20'} customClass={true} /> */}
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
                            {/* <div className="flex justify-end items-center">
                                <Link
                                    to={`/circuits/${nextRace.id}`}
                                    className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-600 hover:bg-red-700'} text-white flex items-center transition-colors`}
                                >
                                    Circuit details
                                    <ChevronRight size={16} className="ml-1" />
                                </Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            )}

            {/* Calendar Filter Tabs */}
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'all'
                        ? isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                        : isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    All Races ({sortedRaces.length})
                </button>
                <button
                    onClick={() => setActiveTab('completed')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'completed'
                        ? isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                        : isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    Completed ({completedRaces.length})
                </button>
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'upcoming'
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
                        className={`rounded-xl overflow-hidden shadow-md border hover:shadow-lg transition-shadow ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                    >
                        <div className="relative">
                            <div className={`absolute top-0 left-0 px-3 py-1 ${race.status === 'completed'
                                ? 'bg-green-600'
                                : 'bg-blue-600'
                                } text-white text-sm font-semibold rounded-br-lg z-10`}>
                                {race.status === 'completed' ? 'COMPLETED' : 'UPCOMING'}
                            </div>
                            <GetImage data={race} type="circuit" className={'w-full h-32 object-cover rounded'} customClass={true} />
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
                                    <div className="flex items-center mb-2">
                                        <Trophy size={16} className="mr-2 text-yellow-500" />
                                        <span className="text-sm font-semibold">Race Winner:</span>
                                    </div>
                                    <p className="font-bold">{race.winner}</p>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {race.winnerTeam}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                                    <span className="flex items-center text-sm">
                                        <Clock size={16} className="mr-1" />
                                        {race.time}
                                    </span>
                                    <Link
                                        to={`/circuits/${race.id}`}
                                        className={`text-sm ${isDarkMode ? 'text-red-500 hover:text-red-400' : 'text-red-600 hover:text-red-700'} flex items-center transition-colors`}
                                    >
                                        Details <ChevronRight size={14} className="ml-1" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {getDisplayedRaces().length === 0 && !loading && (
                <div className="text-center py-12">
                    <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        No races found for the selected filter.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Calendar;