import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Calendar as CalendarIcon, Flag, ChevronRight, Clock, Trophy, MapPin, ChevronUp, ChevronDown } from 'lucide-react';
import { useTheme } from '../hooks/Theme';
import GetImage from '../components/common/GetImage';
import moment from 'moment';

const Calendars = () => {
    // const [races, setRaces] = useState([]);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('upcoming');
    const { isDarkMode } = useTheme();
    const { calendar: races, loading } = useOutletContext();
    const [expandedCard, setExpandedCard] = useState(null);

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
            allEvents: race.subEvents || [],
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

    const textCorrector = (text) => {
        return text.replaceAll("-", ' ').toUpperCase()
    }
    const getEventTypeColor = (eventType) => {
        const colors = {
            'practice-1': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            'practice-2': 'bg-green-500/20 text-green-400 border-green-500/30',
            'practice-3': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            'qualification': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            'race': 'bg-red-500/20 text-red-400 border-red-500/30'
        };
        return colors[eventType] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short'
        });
    };
    const toggleCardExpansion = (raceId) => {
        setExpandedCard(expandedCard === raceId ? null : raceId);
    };
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    F1 RACE CALENDAR
                </h1>
                <p className="text-slate-400 text-lg">Experience the thrill of Formula 1 racing</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                    <p>{error}. Showing fallback data.</p>
                </div>
            )}

            {/* Next race highlight */}
            {nextRace && (
                // <div className={`mb-8 rounded-xl overflow-hidden shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-orange-500/20 to-transparent rounded-full blur-3xl"></div>
                    <div className="relative p-8 md:p-12">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-semibold text-white">NEXT RACE</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 items-center">

                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    {/* <span className="text-4xl">{getCountryFlag(nextRace.flagCode)}</span> */}
                                    <h2 className="text-4xl md:text-5xl font-black text-white">
                                        {nextRace.name}
                                    </h2>
                                </div>
                                <p className="text-xl text-red-100 mb-6 flex items-center gap-2">
                                    <MapPin size={20} />
                                    {nextRace.circuit}
                                </p>

                                <div className="flex flex-wrap gap-4 mb-8">
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                                        <CalendarIcon size={18} />
                                        <span className="font-semibold">{nextRace.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                                        <Clock size={18} />
                                        <span className="font-semibold">{nextRace.time}</span>
                                    </div>
                                </div>

                                {/* <button className="inline-flex items-center gap-2 bg-white text-red-700 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-all duration-300 transform hover:scale-105">
                                        <Play size={18} />
                                        Watch Live
                                    </button> */}
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-white/90 mb-4">Race Weekend Schedule</h3>
                                {nextRace.allEvents.slice(0, 3).map((event, index) => (
                                    <div key={event.id}
                                        className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300"
                                        style={{ animationDelay: `${index * 100}ms` }}>
                                        <div className="flex items-center gap-3">
                                            <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${getEventTypeColor(event.title)}`}>
                                                {textCorrector(event.title)}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-white font-mono text-sm">
                                                {formatTime(event.dateStart)} - {formatTime(event.dateEnd)}
                                            </div>
                                            <div className="text-white/70 text-xs">
                                                {formatDate(event.dateStart)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* <div className="md:w-1/3 lg:w-1/4">
                                <GetImage data={nextRace} type="circuit" customClass={true} />
                            </div> */}
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 w-fit mx-auto mb-8 bg-slate-800/50 backdrop-blur-sm p-2 rounded-2xl border border-slate-700/50">
                {[
                    { key: 'all', label: 'All Races', count: sortedRaces.length },
                    { key: 'upcoming', label: 'Upcoming', count: upcomingRaces.length },
                    { key: 'completed', label: 'Completed', count: completedRaces.length }
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === tab.key
                            ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transform scale-105'
                            : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                            }`}
                    >
                        {tab.label} ({tab.count})
                    </button>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getDisplayedRaces().map((race, index) => (
                    <div
                        key={race.id}
                        className={`group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-red-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10 hover:transform hover:scale-105 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                        style={{
                            animationDelay: `${index * 100}ms`,
                            animation: 'fadeInUp 0.6s ease-out forwards'
                        }}
                    >
                        <div className="absolute top-4 left-4 z-10">
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${race.status === 'completed'
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : nextRace.id === race.id
                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                    : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                }`}>
                                {nextRace.id === race.id ? 'NEXT RACE' : race.status === 'completed' ? 'COMPLETED' : 'UPCOMING'}
                            </div>
                        </div>
                        <div className="relative">

                            <GetImage data={race} type="circuit" className={'w-full h-32 object-cover rounded'} customClass={true} />
                        </div>
                        <div className="p-6 pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <GetImage data={race} type="flag" className={'w-7! h-auto rounded-sm'} />
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                                        {race.name}
                                    </h3>
                                    <p className="text-slate-400 text-sm">{race.circuit}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-slate-300">
                                    <CalendarIcon size={16} />
                                    <span className="text-sm font-medium">{race.date}</span>
                                </div>
                                {race.status !== 'completed' && (
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Clock size={16} />
                                        <span className="text-sm font-medium">{race.time}</span>
                                    </div>
                                )}
                            </div>
                            {race.status === 'completed' && (
                                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4 mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Trophy size={16} className="text-yellow-400" />
                                        <span className="text-sm font-semibold text-yellow-400">Race Winner</span>
                                    </div>
                                    <p className="font-bold text-white">{race.winner}</p>
                                    <p className="text-slate-300 text-sm">{race.winnerTeam}</p>
                                </div>
                            )}
                            {console.log(race)}

                            <button
                                onClick={() => toggleCardExpansion(race.id)}
                                className="w-full flex items-center justify-between bg-slate-700/30 hover:bg-slate-700/50 rounded-xl p-3 transition-all duration-300"
                            >
                                <span className="text-sm font-medium text-slate-300">Race Weekend Schedule</span>
                                {expandedCard === race.id ?
                                    <ChevronUp size={16} className="text-slate-400" /> :
                                    <ChevronDown size={16} className="text-slate-400" />
                                }
                            </button>
                            <div className={`overflow-hidden transition-all duration-500 ${expandedCard === race.id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                                }`}>
                                <div className="space-y-2">
                                    {race.allEvents.map((event, eventIndex) => (
                                        <div
                                            key={event.id}
                                            className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3 hover:bg-slate-700/50 transition-all duration-300"
                                            style={{
                                                animationDelay: `${eventIndex * 50}ms`,
                                                animation: expandedCard === race.id ? 'slideInLeft 0.3s ease-out forwards' : ''
                                            }}
                                        >
                                            <div className={`px-2 py-1 rounded text-xs font-bold border ${getEventTypeColor(event.title)}`}>
                                                {textCorrector(event.title)}
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white font-mono text-xs">
                                                    {formatTime(event.dateStart)} - {formatTime(event.dateEnd)}
                                                </div>
                                                <div className="text-slate-400 text-xs">
                                                    {formatDate(event.dateStart)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-700/50">
                                <Link
                                    to={`/circuits/${race.id}`}
                                    className={`${isDarkMode ? 'text-red-500 hover:text-red-400' : 'text-red-600 hover:text-red-700'} w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2`}
                                >
                                    Details <ChevronRight size={14} className="ml-1" />
                                </Link>
                            </div>
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

export default Calendars;
