import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getDriver, getTeam } from '../../services/data';
import { Flag, Trophy, Award, Clock, Activity } from 'lucide-react';

export default function DriverDetail() {
    const { driverId } = useParams();

    const {
        data: driver,
        isLoading: isDriverLoading,
        error: driverError
    } = useQuery(['driver', driverId], () => getDriver(driverId));

    const {
        data: team,
        isLoading: isTeamLoading,
        error: teamError
    } = useQuery(
        ['team', driver?.teamId],
        () => getTeam(driver.teamId),
        { enabled: !!driver }
    );

    if (isDriverLoading || isTeamLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-f1-red border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (driverError || teamError || !driver || !team) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-red-700">Error loading driver data. Please try again later.</p>
                </div>
                <div className="mt-6">
                    <Link to="/drivers" className="btn btn-secondary">
                        Back to Drivers
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-6">
                <Link to="/drivers" className="text-f1-red hover:underline flex items-center gap-2">
                    ← Back to Drivers
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg">
                <div
                    className="h-24 md:h-48 bg-cover bg-center relative overflow-x-clip rounded-t-lg"
                    style={{
                        backgroundColor: team.primaryColor,
                        backgroundImage: `linear-gradient(to right, ${team.primaryColor}, ${team.secondaryColor})`
                    }}
                >
                    <div className="absolute inset-0 flex items-end justify-between p-6">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-16 h-16 md:w-24 md:h-24 bg-white flex items-center justify-center rounded-full font-bold text-2xl md:text-4xl"
                                style={{ color: team.primaryColor }}
                            >
                                {driver.number}
                            </div>
                            <div className="text-white">
                                <h1 className="text-2xl md:text-4xl font-bold">{driver.name}</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <Flag size={18} />
                                    <span>{driver.nationality}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img
                        src={driver.imageUrl}
                        alt={team.name}
                        className="w-1/6 absolute -right-3 bottom-0"
                    />
                </div>

                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3">
                            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={team.logo} alt={team.name} className="h-8" />
                                    <h3 className="font-bold">{team.name}</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Championships</p>
                                        <p className="font-bold text-lg flex items-center gap-1">
                                            <Trophy size={18} className="text-yellow-500" />
                                            {driver.world_championships}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Podiums</p>
                                        <p className="font-bold text-lg flex items-center gap-1">
                                            <Award size={18} className="text-yellow-500" />
                                            {driver.podiums}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Pole Positions</p>
                                        <p className="font-bold text-lg flex items-center gap-1">
                                            <Flag size={18} className="text-green-500" />
                                            {driver.poles}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Podiums</p>
                                        <p className="font-bold text-lg flex items-center gap-1">
                                            <Award size={18} className="text-blue-500" />
                                            {driver.podiums}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Fastest Laps</p>
                                        <p className="font-bold text-lg flex items-center gap-1">
                                            <Clock size={18} className="text-purple-500" />
                                            {driver.fastestLaps}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h3 className="font-bold mb-2">Helmet Design</h3>
                                <img
                                    src={driver.helmet}
                                    alt={`${driver.name}'s helmet`}
                                    className="w-full h-auto rounded"
                                />
                            </div>
                        </div>

                        <div className="md:w-2/3">
                            <h2 className="text-2xl font-bold mb-4">Biography</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">{driver.bio}</p>

                            <h2 className="text-2xl font-bold mb-4">Season Stats</h2>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Poles</p>
                                        <p className="font-bold text-xl">{driver.poles}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Points</p>
                                        <p className="font-bold text-xl">{driver.points}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Highest Finish</p>
                                        <p className="font-bold text-xl">{driver.highest_race_finish}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Grands Prix entered</p>
                                        <p className="font-bold text-xl">{driver.grands_prix_entered}</p>
                                    </div>
                                </div>

                                {/* <div className="mt-4">
                                    <h4 className="text-sm text-gray-500 mb-2">Performance Graph</h4>
                                    <div className="h-24 bg-white rounded p-2 flex items-end gap-1">
                                        {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((position, index) => (
                                            <div
                                                key={index}
                                                className="flex-1 bg-gray-200 relative"
                                                style={{
                                                    height: `${(20 - position * 2)}%`,
                                                    backgroundColor: position === 1 ? '#FFCA28' : '#E0E0E0'
                                                }}
                                            >
                                                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs">
                                                    {position}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2 flex justify-between">
                                        <span>Bahrain</span>
                                        <span>Saudi</span>
                                        <span>Australia</span>
                                        <span>Japan</span>
                                        <span>China</span>
                                        <span>Miami</span>
                                        <span>Imola</span>
                                        <span>Monaco</span>
                                        <span>Canada</span>
                                        <span>Spain</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}