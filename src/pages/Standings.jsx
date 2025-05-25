// src/pages/Standings.jsx
import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/common/Tabs';
import { Trophy, Users, ArrowUp, ArrowDown, Minus, Crown, Medal, Award } from 'lucide-react';
import axios from 'axios';
import GetImage from '../components/common/GetImage';
import { useTheme } from '../hooks/Theme';
import { drivers, getTeamDrivers, teams } from '../services/data';

const Standings = () => {
    const [activeTab, setActiveTab] = useState('drivers');
    // const getTeam = () => {}
    const { driversStandings, constructorsStandings, loading, error, season, setSeason } = useOutletContext();
    const { isDarkMode, setIsDarkMode } = useTheme();

    const teamName = (team) => {
        const teamMap = {
            'Haas F1 Team': 'Haas',
            'Alpine F1 Team': 'Alpine',
            'RB F1 Team': 'Red Bull',
            'Sauber': 'Kick Sauber'
        }
        return teamMap[team] || team;
    }


    const handleSeasonChange = (e) => {
        setSeason(parseInt(e.target.value));
    };

    const getPositionIcon = (position) => {
        switch (position) {
            case 1:
                return <Crown className="w-5 h-5 text-yellow-400" />;
            case 2:
                return <Medal className="w-5 h-5 text-gray-300" />;
            case 3:
                return <Award className="w-5 h-5 text-amber-600" />;
            default:
                return null;
        }
    };

    const getPositionBadgeColor = (position) => {
        switch (position) {
            case 1:
                return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg shadow-yellow-400/25';
            case 2:
                return 'bg-gradient-to-r from-gray-300 to-gray-500 text-black shadow-lg shadow-gray-400/25';
            case 3:
                return 'bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-lg shadow-amber-600/25';
            default:
                return position <= 10
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-gradient-to-r from-slate-600 to-slate-800 text-white shadow-lg shadow-slate-600/25';
        }
    };

    if (error) {
        return (
            <div className={`min-h-screen px-4 py-8 ${isDarkMode
                ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
                : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
                }`}>
                <div className="max-w-7xl mx-auto">
                    <div className={`backdrop-blur-xl border rounded-2xl p-8 text-center shadow-2xl ${isDarkMode
                        ? 'bg-gradient-to-r from-red-900/20 to-red-800/20 border-red-500/30'
                        : 'bg-gradient-to-r from-red-50 to-red-100 border-red-200'
                        }`}>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'bg-red-500/20' : 'bg-red-100'
                            }`}>
                            <Trophy className={`w-8 h-8 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                        </div>
                        <p className={`text-xl font-medium mb-6 ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>{error}</p>
                        <button
                            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const getTeamColor = driver => teams.find(team => team.drivers.includes(driver))?.primaryColor

    return (
        <div className={`min-h-screen ${isDarkMode
            ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
            }`}>
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
                    <div className="mb-6 sm:mb-0">
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className={`text-5xl font-black bg-gradient-to-r bg-clip-text text-transparent mb-2 ${isDarkMode
                                ? 'from-white to-slate-300'
                                : 'from-slate-800 to-slate-600'
                                }`}>
                                Championship Standings
                            </h1>
                        </div>
                        <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Track the race to glory</p>
                    </div>

                    <div className={`flex items-center gap-3 backdrop-blur-xl rounded-xl p-4 border shadow-xl ${isDarkMode
                        ? 'bg-slate-800/50 border-slate-700/50'
                        : 'bg-white/80 border-gray-200'
                        }`}>
                        <label htmlFor="season" className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Season:</label>
                        <select
                            id="season"
                            value={season}
                            onChange={handleSeasonChange}
                            className={`border py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${isDarkMode
                                ? 'bg-slate-700/80 border-slate-600 text-white'
                                : 'bg-white border-gray-300 text-slate-700'
                                }`}
                        >
                            {Array.from({ length: 11 }, (_, i) => 2015 + i).map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="relative">
                    <Tabs defaultValue="drivers" className="mb-8" onValueChange={setActiveTab}>
                        <TabsList className={`grid grid-cols-2 max-w-md mx-auto mb-8 backdrop-blur-xl rounded-2xl p-2 border shadow-xl ${isDarkMode
                            ? 'bg-slate-800/50 border-slate-700/50'
                            : 'bg-white/80 border-gray-200'
                            }`}>
                            <TabsTrigger
                                value="drivers"
                                className={`flex items-center gap-2 rounded-xl py-3 px-6 font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-800'
                                    }`}
                            >
                                <Trophy size={18} /> Drivers
                            </TabsTrigger>
                            <TabsTrigger
                                value="teams"
                                className={`flex items-center gap-2 rounded-xl py-3 px-6 font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-800'
                                    }`}
                            >
                                <Users size={18} /> Constructors
                            </TabsTrigger>
                        </TabsList>
                        {loading && (
                            <div className={`absolute inset-0 backdrop-blur-sm rounded-2xl flex justify-center items-center z-10 ${isDarkMode ? 'bg-slate-900/80' : 'bg-white/80'
                                }`}>
                                <div className="text-center">
                                    <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin mx-auto mb-6"></div>
                                    <p className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Loading standings...</p>
                                    <p className={`mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Fetching latest championship data</p>
                                </div>
                            </div>
                        )}
                        <TabsContent value="drivers">
                            <div className={`backdrop-blur-xl rounded-2xl border shadow-2xl overflow-hidden ${isDarkMode
                                ? 'bg-slate-800/30 border-slate-700/50'
                                : 'bg-white/80 border-gray-200'
                                }`}>
                                <div className={`px-6 py-4 border-b ${isDarkMode
                                    ? 'bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-slate-700/50'
                                    : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
                                    }`}>
                                    <h2 className={`text-2xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-800'
                                        }`}>
                                        <Trophy className="w-6 h-6 text-yellow-400" />
                                        Driver Championship
                                    </h2>
                                </div>

                                <div className="overflow-x-auto">
                                    <div className="space-y-2 p-6">
                                        {driversStandings?.standings?.entries?.map((driver, index) => {
                                            const position = parseInt(driver.stats[0]?.value || index + 1);
                                            return (
                                                <div
                                                    key={index}
                                                    className={`group backdrop-blur-sm rounded-xl p-4 border transition-all duration-300 hover:shadow-xl ${isDarkMode
                                                        ? 'bg-slate-800/50 border-slate-700/30 hover:border-slate-600/50 hover:bg-slate-700/50 hover:shadow-slate-900/20'
                                                        : 'bg-white/60 border-gray-200 hover:border-gray-300 hover:bg-white/80 hover:shadow-gray-500/10'
                                                        }`}
                                                    style={{ borderLeft: `5px solid ${getTeamColor(driver.athlete.name)}` }}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            {/* Position Badge */}
                                                            <div className={`w-12 h-12 rounded-xl ${getPositionBadgeColor(position)} flex items-center justify-center font-bold text-lg`}>
                                                                {position <= 3 ? getPositionIcon(position) : position}
                                                            </div>
                                                            {/* {console.log()} */}
                                                            {/* Driver Info */}
                                                            <div className="flex items-center gap-4">
                                                                <div className={`w-14 h-14 rounded-full overflow-hidden border-2 shadow-lg ${isDarkMode
                                                                    ? 'bg-slate-700 border-slate-600'
                                                                    : 'bg-gray-100 border-gray-300'
                                                                    }`}>
                                                                    <GetImage data={driver.athlete} className="w-full h-full object-cover" />
                                                                </div>

                                                                <div>
                                                                    <Link
                                                                        to={`/drivers/${driver.athlete.displayName}`}
                                                                        className={`transition-colors duration-200 ${isDarkMode
                                                                            ? 'text-white hover:text-blue-400'
                                                                            : 'text-slate-800 hover:text-blue-600'
                                                                            }`}
                                                                    >
                                                                        <h3 className="font-bold text-lg group-hover:text-blue-400 transition-colors duration-200">
                                                                            {driver.athlete.name}
                                                                        </h3>
                                                                    </Link>
                                                                    <div className="flex items-center gap-2 mt-1">
                                                                        <img
                                                                            className='w-5 h-5 rounded shadow-sm object-cover'
                                                                            alt={driver.athlete.flag.alt}
                                                                            src={driver.athlete.flag.href}
                                                                        />
                                                                        <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'
                                                                            }`}>
                                                                            {driver.team?.displayName}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Points */}
                                                        <div className="text-right">
                                                            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-500/30">
                                                                <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'
                                                                    }`}>
                                                                    {driver.stats[1]?.value ?? "0"}
                                                                </span>
                                                                <div className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'
                                                                    }`}>POINTS</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="teams">
                            <div className={`backdrop-blur-xl rounded-2xl border shadow-2xl overflow-hidden ${isDarkMode
                                ? 'bg-slate-800/30 border-slate-700/50'
                                : 'bg-white/80 border-gray-200'
                                }`}>
                                <div className={`px-6 py-4 border-b ${isDarkMode
                                    ? 'bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-slate-700/50'
                                    : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
                                    }`}>
                                    <h2 className={`text-2xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-800'
                                        }`}>
                                        <Users className="w-6 h-6 text-blue-400" />
                                        Constructor Championship
                                    </h2>
                                </div>

                                <div className="overflow-x-auto">
                                    <div className="space-y-2 p-6">
                                        {constructorsStandings?.standings?.entries?.map((team, index) => {
                                            const position = parseInt(team.stats[0]?.value || index + 1);
                                            return (
                                                <div
                                                    key={position || index}
                                                    className={`group backdrop-blur-sm rounded-xl p-4 border transition-all duration-300 hover:shadow-xl ${isDarkMode
                                                        ? 'bg-slate-800/50 border-slate-700/30 hover:border-slate-600/50 hover:bg-slate-700/50 hover:shadow-slate-900/20'
                                                        : 'bg-white/60 border-gray-200 hover:border-gray-300 hover:bg-white/80 hover:shadow-gray-500/10'
                                                        }`}
                                                         style={{ borderLeft: `5px solid ${teams.find((t) => t.name === teamName(team.team.name))?.primaryColor}` }}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            {/* Position Badge */}
                                                            <div className={`w-12 h-12 rounded-xl ${getPositionBadgeColor(position)} flex items-center justify-center font-bold text-lg`}>
                                                                {position <= 3 ? getPositionIcon(position) : position}
                                                            </div>

                                                            {/* Team Info */}
                                                            <div className="flex items-center gap-4">
                                                                <div
                                                                    className={`w-14 h-14 rounded-full ${team.team.color} flex items-center justify-center shadow-lg border-2 ${isDarkMode ? 'border-slate-600' : 'border-gray-300'
                                                                        }`}
                                                                >
                                                                    <GetImage
                                                                        type="team"
                                                                        data={['Haas F1 Team', 'Alpine F1 Team', 'RB F1 Team', 'Sauber'].includes(team.team.name)
                                                                            ? { ...team, name: teamName(team.team.name) }
                                                                            : team.team
                                                                        }
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <h3 className={`font-bold text-lg group-hover:text-blue-400 transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-slate-800'
                                                                        }`}>
                                                                        {team.team.name}
                                                                    </h3>
                                                                    <div className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'
                                                                        }`}>
                                                                        {drivers?.filter(driver => driver.teamId == team.team.name.replaceAll(' ', '').toLowerCase())?.map(driver => driver.name).join(', ')}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Points */}
                                                        <div className="text-right">
                                                            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-500/30">
                                                                <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'
                                                                    }`}>
                                                                    {team.stats[1]?.value}
                                                                </span>
                                                                <div className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'
                                                                    }`}>POINTS</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Standings;