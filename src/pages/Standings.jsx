// src/pages/Standings.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/common/Tabs';
import { Trophy, Users, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import axios from 'axios';
import GetImage from '../components/common/GetImage';

const Standings = () => {
    const [activeTab, setActiveTab] = useState('drivers');
    const [driversStandings, setDriversStandings] = useState([]);
    const [teamStandings, setTeamStandings] = useState([]);
    const [constructorsStandings, setConstructorsStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [season, setSeason] = useState('2025');
    const [previousData, setPreviousData] = useState({ drivers: [], constructors: [] });
    const linkToFetch = "https://site.web.api.espn.com/apis/v2/sports/racing/f1/standings?region=us&lang=en&contentorigin=espn&seasontype=2&group=0&sort=points%3Adesc"
    const linkToFetchConstructors = "https://site.web.api.espn.com/apis/v2/sports/racing/f1/standings?region=us&lang=en&contentorigin=espn&seasontype=2&group=1&sort=points%3Adesc"
    // https://site.web.api.espn.com/apis/v2/sports/racing/f1/standings?region=us&lang=en&contentorigin=espn&seasontype=2&group=0&sort=points%3Adesc&season=2023
    useEffect(() => {
        setLoading(true);
        const fetchDriverStanding = async () => {
            try {
                const response = await axios.get(linkToFetch + `&season=${season}`);
                const responseConstructors = await axios.get(linkToFetchConstructors);
                setDriversStandings(response?.data);
                console.log("responseConstructors", responseConstructors)
                setConstructorsStandings(responseConstructors?.data);
            }
            catch (error) {
                console.error("Error fetching driver standings:", error);
                setError("Failed to load driver standings. Please try again later.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchDriverStanding();
    }, [season]);

    // useEffect(() => {
    //     const fetchStandings = async () => {
    //         try {
    //             setLoading(true);

    //             // Fetch current driver standings
    //             const driversResponse = await axios.get(`https://ergast.com/api/f1/${season}/driverStandings.json`);
    //             const driversData = driversResponse.data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];

    //             // Fetch current constructor standings
    //             const constructorsResponse = await axios.get(`https://ergast.com/api/f1/${season}/constructorStandings.json`);
    //             const constructorsData = constructorsResponse.data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];

    //             // Process drivers data
    //             const processedDriversData = driversData.map((driver) => {
    //                 // Find position in previous data to determine change
    //                 const previousPosition = previousData.drivers.find(
    //                     (prev) => prev.Driver?.driverId === driver.Driver.driverId
    //                 )?.position;

    //                 // Determine position change
    //                 let change = 'same';
    //                 if (previousPosition) {
    //                     const currentPosition = parseInt(driver.position);
    //                     if (currentPosition < parseInt(previousPosition)) {
    //                         change = 'up';
    //                     } else if (currentPosition > parseInt(previousPosition)) {
    //                         change = 'down';
    //                     }
    //                 }

    //                 // Get nationality for flag emoji
    //                 const nationality = driver.Driver.nationality;

    //                 return {
    //                     position: parseInt(driver.position),
    //                     change: change,
    //                     name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
    //                     number: driver.Driver.permanentNumber || 'N/A',
    //                     team: driver.Constructors[0]?.name || 'N/A',
    //                     points: parseInt(driver.points),
    //                     wins: parseInt(driver.wins),
    //                     nationality: nationality,
    //                     driverId: driver.Driver.driverId
    //                 };
    //             });

    //             // Process constructors data
    //             const processedConstructorsData = constructorsData.map((constructor) => {
    //                 // Find position in previous data to determine change
    //                 const previousPosition = previousData.constructors.find(
    //                     (prev) => prev.Constructor?.constructorId === constructor.Constructor.constructorId
    //                 )?.position;

    //                 // Determine position change
    //                 let change = 'same';
    //                 if (previousPosition) {
    //                     const currentPosition = parseInt(constructor.position);
    //                     if (currentPosition < parseInt(previousPosition)) {
    //                         change = 'up';
    //                     } else if (currentPosition > parseInt(previousPosition)) {
    //                         change = 'down';
    //                     }
    //                 }

    //                 // Map constructor to color
    //                 const colorMap = {
    //                     'red_bull': 'bg-blue-600',
    //                     'mercedes': 'bg-cyan-600',
    //                     'ferrari': 'bg-red-600',
    //                     'mclaren': 'bg-orange-500',
    //                     'aston_martin': 'bg-green-600',
    //                     'alpine': 'bg-blue-500',
    //                     'williams': 'bg-blue-800',
    //                     'haas': 'bg-gray-600',
    //                     'rb': 'bg-indigo-600',
    //                     'sauber': 'bg-green-800'
    //                 };

    //                 return {
    //                     position: parseInt(constructor.position),
    //                     change: change,
    //                     name: constructor.Constructor.name,
    //                     points: parseInt(constructor.points),
    //                     wins: parseInt(constructor.wins),
    //                     color: colorMap[constructor.Constructor.constructorId] || 'bg-gray-500',
    //                     constructorId: constructor.Constructor.constructorId
    //                 };
    //             });

    //             // Update state
    //             setDriversStandings(processedDriversData);
    //             setTeamStandings(processedConstructorsData);

    //             // Save for comparison next time
    //             setPreviousData({
    //                 drivers: driversData,
    //                 constructors: constructorsData
    //             });

    //             setLoading(false);
    //         } catch (err) {
    //             console.error("Failed to fetch standings:", err);
    //             setError("Failed to load standings data. Please try again later.");
    //             setLoading(false);
    //         }
    //     };

    //     fetchStandings();

    //     // Fetch previous round data for position change comparison
    //     const fetchPreviousRoundData = async () => {
    //         try {
    //             // Get current round
    //             const seasonsResponse = await axios.get(`https://ergast.com/api/f1/${season}.json`);
    //             const currentRound = parseInt(seasonsResponse.data.MRData.total);

    //             if (currentRound > 1) {
    //                 // Fetch previous round data
    //                 const prevDriversResponse = await axios.get(`https://ergast.com/api/f1/${season}/${currentRound - 1}/driverStandings.json`);
    //                 const prevDriversData = prevDriversResponse.data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];

    //                 const prevConstructorsResponse = await axios.get(`https://ergast.com/api/f1/${season}/${currentRound - 1}/constructorStandings.json`);
    //                 const prevConstructorsData = prevConstructorsResponse.data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];

    //                 setPreviousData({
    //                     drivers: prevDriversData,
    //                     constructors: prevConstructorsData
    //                 });
    //             }
    //         } catch (err) {
    //             console.error("Failed to fetch previous round data:", err);
    //         }
    //     };

    //     fetchPreviousRoundData();
    // }, [season]);

    // Determine the icon for position change

    const teamName = (team) => {
        const teamMap = {
            'Haas F1 Team': 'Haas',
            'Alpine F1 Team': 'Alpine',
            'RB F1 Team': 'Red Bull',
            'Sauber': 'Kick Sauber'
        }
        return teamMap[team] || team;
    }

    // Theme detection (simplified)
    const isDarkMode = false;

    // Handle season change
    const handleSeasonChange = (e) => {
        setSeason(parseInt(e.target.value));
    };

    // if (loading) {
    //     return (
    //         <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex justify-center items-center h-64">
    //             <div className="text-center">
    //                 <div className="w-12 h-12 border-4 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
    //                 <p className="text-lg font-medium">Loading standings...</p>
    //             </div>
    //         </div>
    //     );
    // }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600 text-lg font-medium">{error}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h1 className="text-3xl font-bold mb-4 sm:mb-0">Championship Standings</h1>

                <div className="flex items-center gap-2">
                    <label htmlFor="season" className="font-medium text-gray-700">Season:</label>
                    <select
                        id="season"
                        value={season}
                        onChange={handleSeasonChange}
                        className={`rounded-md border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                        {Array.from({ length: 11 }, (_, i) => 2015 + i).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            <Tabs defaultValue="drivers" className="mb-8 relative" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 max-w-md mx-auto mb-6">
                    <TabsTrigger value="drivers" className="flex items-center gap-2">
                        <Trophy size={18} /> Driver Standings
                    </TabsTrigger>
                    <TabsTrigger value="teams" className="flex items-center gap-2">
                        <Users size={18} /> Constructor Standings
                    </TabsTrigger>
                </TabsList>
                {loading && <div className="absolute top-12 left-0 right-0 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex justify-center items-center h-full bg-white/5 backdrop-blur rounded-t-4xl">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-lg font-medium">Loading standings...</p>
                    </div>
                </div>}

                <TabsContent value="drivers">
                    <div className={`rounded-xl overflow-hidden shadow-md border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                        <th className="py-3 px-4 text-left">Pos.</th>
                                        <th className="py-3 px-4 text-left">Driver</th>
                                        <th className="py-3 px-4 text-left">Team</th>
                                        <th className="py-3 px-4 text-right">Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {driversStandings?.standings?.entries?.map((driver) => (
                                        <tr
                                            key={driver.position}
                                            className={`border-b last:border-0 ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                                        >
                                            <td className="py-4 px-4 text-left">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold">{driver.stats[0]?.value}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                                        <GetImage data={driver.athlete} type='drivers' />
                                                    </div>
                                                    <div className=''>
                                                        <Link to={`/drivers/${driver.athlete.displayName}`} className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'} hover:underline`}>
                                                            <p className="font-semibold">{driver.athlete.name}</p>
                                                        </Link>
                                                        {/* <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>#{driver.number}</p> */}
                                                        <img
                                                            className='w-4 h-4'
                                                            alt={driver.athlete.flag.alt}
                                                            src={driver.athlete.flag.href}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            {console.log(driver)}
                                            <td className="py-4 px-4">{driver.team?.displayName}</td>
                                            <td className="py-4 px-4 text-right font-bold">{driver.stats[1]?.value ?? "#"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="teams">
                    <div className={`rounded-xl overflow-hidden shadow-md border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                        <th className="py-3 px-4 text-left">Pos.</th>
                                        <th className="py-3 px-4 text-left">Team</th>
                                        <th className="py-3 px-4 text-right">Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {constructorsStandings?.standings?.entries?.map((data) => (
                                        <tr
                                            key={data?.team.position}
                                            className={`border-b last:border-0 ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                                        >
                                            <td className="py-4 px-4 text-left">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold">{data.stats[0].value}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full ${data.team.color} flex items-center justify-center`}>
                                                        <GetImage type="team" data={['Haas F1 Team', 'Alpine F1 Team', 'RB F1 Team', 'Sauber'].includes(data.team.name) ? { ...data, name: teamName(data.team.name) } : data.team} />
                                                    </div>
                                                    <span className="font-semibold">{data.team.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-right font-bold">{data.stats[1].value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Standings;