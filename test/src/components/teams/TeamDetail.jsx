import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTeam, getTeamDrivers } from '../../services/data';
import { MapPin, Trophy, Calendar, ArrowLeft, User2 } from 'lucide-react';
import DriverCard from '../../components/drivers/DriverCard';

export default function TeamDetail() {
    const { teamId } = useParams();

    const {
        data: team,
        isLoading: isTeamLoading,
        error: teamError
    } = useQuery(['team', teamId], () => getTeam(teamId));

    const {
        data: drivers,
        isLoading: isDriversLoading,
        error: driversError
    } = useQuery(['teamDrivers', teamId], () => getTeamDrivers(teamId));

    if (isTeamLoading || isDriversLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-f1-red border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (teamError || driversError || !team) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-md">
                    <p className="text-red-700">Error loading team data. Please try again later.</p>
                </div>
                <div className="mt-6">
                    <Link
                        to="/teams"
                        className="inline-flex items-center gap-2 text-sm font-medium text-white bg-f1-red hover:bg-red-700 px-4 py-2 rounded transition"
                    >
                        <ArrowLeft size={18} />
                        Back to Teams
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 space-y-10">
            {/* Back link */}
            <div>
                <Link
                    to="/teams"
                    className="inline-flex items-center gap-2 text-f1-red hover:underline text-sm"
                >
                    <ArrowLeft size={16} />
                    Back to Teams
                </Link>
            </div>

            {/* Team Card */}
            <div className="rounded-xl shadow-xl overflow-hidden bg-white relative">
                <div className="h-2 z-10 relative" style={{ backgroundColor: team.primaryColor }} />
                <img src={team.logo} className='absolute -top-5 -left-10 w-[150px] opacity-25 -rotate-[30deg]' />
                <div className="p-6 md:p-8 space-y-8 z-10 relative">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <img
                                src={team.carImageUrl}
                                alt={team.name}
                                className="h-16 w-auto object-contain"
                            />
                            <div>
                                <h1 className="text-3xl font-bold">{team.name}</h1>
                                <p className="text-gray-600">{team.fullName}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} />
                                <span>{team.base}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Trophy size={18} />
                                <span>{team.world_championships} Championships</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>Founded: {team.first_team_entry}</span>
                            </div>
                        </div>
                    </div>
                    {team.bio && (
                        <p className="text-gray-700 leading-relaxed">
                            {team.bio}
                        </p>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-800">
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <User2 size={18} />
                            <span>
                                <strong>Team Principal:</strong>{' '}
                                {team.team_chief || 'Not available'}
                            </span>
                        </div>
                        {team.technical_chief && (
                            <div><strong>Technical Chief:</strong> {team.technical_chief}</div>
                        )}
                        {team.chassis && (
                            <div><strong>Chassis:</strong> {team.chassis}</div>
                        )}
                        {team.powerUnit && (
                            <div><strong>Power Unit:</strong> {team.powerUnit}</div>
                        )}
                        {team.highestRaceFinish && (
                            <div><strong>Highest Race Finish:</strong> {team.highestRaceFinish}</div>
                        )}
                        {team.polePositions !== undefined && (
                            <div><strong>Pole Positions:</strong> {team.polePositions}</div>
                        )}
                        {team.fastestLaps !== undefined && (
                            <div><strong>Fastest Laps:</strong> {team.fastestLaps}</div>
                        )}
                    </div>

                    {/* Drivers */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Drivers</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {drivers.map((driver) => (
                                <DriverCard key={driver.id} driver={driver} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
