// src/pages/Live.jsx
import React, { useState, useEffect } from 'react';
import { Clock, Flag, Timer, Activity, Radio, Zap, Trophy, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../hooks/Theme';
import GetImage from '../components/common/GetImage';

const Live = () => {
    const [liveData, setLiveData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [isLive, setIsLive] = useState(false);
    const { isDarkMode } = useTheme();

    const fetchLiveData = async () => {
        try {
            // Using CORS proxy to fetch live data
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const targetUrl = 'https://racingnews365.com/cache/site/RN365EN/json/livetiming/race-results-1315.json?cache_control=1&cache_seconds=2592000&cache_tags%5B0%5D=livetiming';

            const response = await axios.get(proxyUrl + encodeURIComponent(targetUrl));

            setLiveData(response.data);
            setLastUpdate(new Date());
            setIsLive(response.data?.live || false);
            setError(null);
        } catch (err) {
            console.error('Error fetching live data:', err);
            setError('Failed to fetch live timing data');
            setIsLive(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch live data on initial load
        fetchLiveData();

        // Update every 30 seconds
        const interval = setInterval(fetchLiveData, 5000);


        return () => clearInterval(interval);
    }, []);
    console.log(isLive)
    const formatTime = (time) => {
        if (!time) return '--:--:--';
        return time;
    };

    const getPositionColor = (position) => {
        switch (position) {
            case 1:
                return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black';
            case 2:
                return 'bg-gradient-to-r from-gray-300 to-gray-500 text-black';
            case 3:
                return 'bg-gradient-to-r from-amber-600 to-amber-800 text-white';
            default:
                return position <= 10
                    ? 'bg-gradient-to-r from-green-500 to-green-700 text-white'
                    : 'bg-gradient-to-r from-slate-600 to-slate-800 text-white';
        }
    };

    const getDriverStatus = (result) => {
        if (result.abandoned > 0) return 'DNF';
        if (result.tyre?.compound) return `${result.tyre.compound.toUpperCase()} Tyre`;
        return 'Running';
    };

    const getDriverGap = (result, index) => {
        if (index === 0) return 'Leader';
        if (result.abandoned > 0) return 'DNF';
        return result.result ? `+${result.result}` : '--';
    };

    const getTyreColor = (compound) => {
        const tyreColors = {
            'soft': 'bg-red-500',
            'medium': 'bg-yellow-500',
            'hard': 'bg-white',
            'intermediate': 'bg-green-500',
            'wet': 'bg-blue-500'
        };
        return tyreColors[compound?.toLowerCase()] || 'bg-gray-500';
    };

    if (loading) {
        return (
            <div className={`min-h-screen px-4 py-8 ${isDarkMode
                ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
                : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
                }`}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-center items-center min-h-[60vh]">
                        <div className="text-center">
                            <div className="w-20 h-20 border-4 border-t-red-500 border-r-transparent border-b-red-500 border-l-transparent rounded-full animate-spin mx-auto mb-6"></div>
                            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                Loading Live Timing...
                            </p>
                            <p className={`mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                Connecting to race feed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                        <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                        <p className={`text-xl font-medium mb-6 ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
                            {error}
                        </p>
                        <button
                            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            onClick={fetchLiveData}
                        >
                            Retry Connection
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${isDarkMode
            ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
            }`}>
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <h1 className={`text-5xl font-black bg-gradient-to-r bg-clip-text text-transparent ${isDarkMode
                                    ? 'from-white to-slate-300'
                                    : 'from-slate-800 to-slate-600'
                                    }`}>
                                    Live Timing
                                </h1>
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full animate-pulse ${isLive
                                    ? 'bg-red-500/20 border border-red-500/30'
                                    : 'bg-gray-500/20 border border-gray-500/30'
                                    }`}>
                                    <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-500' : 'bg-gray-500'}`}></div>
                                    <span className={`text-sm font-medium ${isLive
                                        ? (isDarkMode ? 'text-red-300' : 'text-red-600')
                                        : (isDarkMode ? 'text-gray-300' : 'text-gray-600')
                                        }`}>
                                        {isLive ? 'LIVE' : 'OFFLINE'}
                                    </span>
                                </div>
                            </div>
                            <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                Real-time race data and results
                            </p>
                        </div>
                    </div>

                    {/* Race Info */}
                    {liveData && (
                        <div className={`backdrop-blur-xl rounded-2xl border p-6 mb-6 ${isDarkMode
                            ? 'bg-slate-800/30 border-slate-700/50'
                            : 'bg-white/80 border-gray-200'
                            }`}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-center gap-3">
                                    <Flag className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                    <div>
                                        <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                            Status
                                        </p>
                                        <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                            {liveData.live ? 'LIVE TIMING' : 'RACE FINISHED'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Timer className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                                    <div>
                                        <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                            Total Drivers
                                        </p>
                                        <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                            {liveData.results?.length || 0}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Activity className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                                    <div>
                                        <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                            Last Update
                                        </p>
                                        <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                            {lastUpdate ? lastUpdate.toLocaleTimeString() : '--:--:--'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results/Timing Table */}
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
                            Race Results
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <div className="space-y-2 p-6">
                            <div className={`flex items-center justify-between rounded-lg p-4
                                ${isDarkMode ? 'border bg-slate-800 border-slate-700/50' : 'border bg-white border-gray-200'}
                                `}>
                                <div className="flex items-center justify-between gap-20">
                                    <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                        Position
                                    </p>
                                    <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                        Driver
                                    </p>
                                </div>
                                <div className="flex items-center justify-between gap-16">
                                    <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                        Tyre
                                    </p>
                                    <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                        Lap Time
                                    </p>
                                    <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                        Laps
                                    </p>
                                </div>
                            </div>
                            {liveData?.results?.map((result, index) => (
                                <>
                                    {index === 10 && <div className='h-12 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center justify-center text-red-300'>Elimanated Zone</div>}
                                    {index === 15 && <div className='h-12 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center justify-center text-red-300'>Elimanated Zone</div>}
                                    <div
                                        key={result.driver?.nameCode || index}
                                        className={`group backdrop-blur-sm rounded-xl p-4 border transition-all duration-300 hover:shadow-xl ${isDarkMode
                                            ? 'bg-slate-800/50 border-slate-700/30 hover:border-slate-600/50 hover:bg-slate-700/50'
                                            : 'bg-white/60 border-gray-200 hover:border-gray-300 hover:bg-white/80'
                                            }`}
                                        style={{
                                            background: `${result.team.color}20`,
                                            borderColor: `${result.team.color}40`,
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                {/* Position */}
                                                <div className={`w-12 h-12 rounded-xl ${getPositionColor(result.rank)} flex items-center justify-center font-bold text-lg shadow-lg`}>
                                                    {result.rank}
                                                </div>

                                                {/* Driver Info */}
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 ${isDarkMode ? 'border-slate-600' : 'border-gray-300'
                                                                } overflow-hidden`}
                                                            style={{ backgroundColor: result.team?.color || '#6B7280' }}
                                                        >
                                                            {result.driver?.profilePicture ? (
                                                                <img
                                                                    src={result.driver.profilePicture}
                                                                    alt={result.driver.name}
                                                                    className="w-full h-full object-cover rounded-full"
                                                                    onError={(e) => {
                                                                        e.target.style.display = 'none';
                                                                        e.target.nextSibling.style.display = 'flex';
                                                                    }}
                                                                />
                                                            ) : null}
                                                            <div
                                                                className={`w-full h-full flex items-center justify-center text-white font-bold text-sm ${result.driver?.profilePicture ? 'hidden' : 'flex'}`}
                                                            >
                                                                {result.driver?.nameCode || 'DR'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                                            {result.driver?.name || `Driver ${index + 1}`}
                                                        </h3>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                                                {result.team?.name || 'Unknown Team'}
                                                            </span>
                                                            {result.abandoned === 1 && (
                                                                <>
                                                                    <span className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>•</span>
                                                                    <span className="text-sm font-medium text-red-500">
                                                                        DNF
                                                                    </span>
                                                                </>
                                                            )}
                                                            {/* {result.tyre?.compound && (
                                                            <>
                                                                <span className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>•</span>
                                                                <span className={`font-medium px-2 py-1 rounded-md text-xs uppercase ${getTyreColor(result.tyre.compound)}`}>
                                                                    {result.tyre.compound}
                                                                </span>
                                                            </>
                                                        )} */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Timing Data */}
                                            <div className="flex gap-4 items-center">
                                                {result.tyre?.compound && (
                                                    <div className={`font-medium px-2 py-1 rounded-md text-xs uppercase`}>
                                                        {/* <GetImage type="tyres" data={result.tyre} /> */}
                                                        <img
                                                            src={`/assets/tyres/${result.tyre.compound.toLowerCase()}-live.png`}
                                                            className="w-auto h-auto object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className="text-right">
                                                    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-blue-500/30"
                                                        style={{
                                                            borderColor: result.rank === 1 && 'green'
                                                        }}
                                                    >
                                                        <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                                            {result.result || '--'}
                                                        </span>
                                                        <div className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                                            {result.rank === 1 && 'BEST TIME'}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-green-500/30">
                                                        <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                                            {result.tyre.lapsOverall || '--'}
                                                        </span>
                                                        <div className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                                            LAPS
                                                        </div>
                                                    </div>
                                                </div>

                                                {result.bestLapRewarded && (
                                                    <div className="text-right">
                                                        <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-yellow-500/30">
                                                            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                                                FL
                                                            </span>
                                                            <div className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                                                FASTEST
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}

                            {/* No data fallback */}
                            {(!liveData?.results || liveData.results.length === 0) && (
                                <div className="text-center py-12">
                                    <Radio className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`} />
                                    <p className={`text-xl font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                        No live timing data available
                                    </p>
                                    <p className={`mt-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                        Check back during race weekend
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Auto-refresh notice */}
                <div className="mt-6 text-center">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border ${isDarkMode
                        ? 'bg-slate-800/50 border-slate-700/50 text-slate-400'
                        : 'bg-white/80 border-gray-200 text-slate-600'
                        }`}>
                        <Zap className="w-4 h-4" />
                        <span className="text-sm font-medium">Auto-refreshing every 5 seconds</span>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Live;