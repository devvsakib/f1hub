import { Link } from 'react-router-dom';
import { Flag, ChevronRight } from 'lucide-react';
import { teams } from '../../services/data';

export default function DriverCard({ driver }) {
    const team = teams.find(team => team.id === driver.teamId);

    return (
        <Link to={`/drivers/${driver.name}`}>
            <div
                className="card hover:shadow-lg transition-shadow duration-300 rounded-2xl"
                style={{ borderLeft: `4px solid ${team?.primaryColor || '#ccc'}` }}
            >
                <div className="p-5">
                    <div className="flex justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span
                                className="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold"
                                style={{ backgroundColor: team?.primaryColor || '#ccc' }}
                            >
                                {driver.number}
                            </span>
                            <Flag size={18} className="text-gray-500" />
                            <span className="text-sm text-gray-600">{driver.nationality}</span>
                        </div>

                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: team?.primaryColor || '#ccc' }}
                        >
                            <ChevronRight size={20} color="white" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 overflow-hidden rounded-full bg-gray-100">
                            <img
                                src={driver.imageUrl}
                                alt={driver.name}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold">{driver.name}</h3>
                            <p className="text-sm text-gray-600">{team?.name}</p>
                        </div>
                    </div>

                    <div className="mt-4 border-t pt-4 grid grid-cols-4 gap-2 text-center">
                        <div>
                            <p className="text-xs text-gray-500">Champ.</p>
                            <p className="font-bold">{driver.world_championships}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Wins</p>
                            <p className="font-bold">{driver.wins}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Poles</p>
                            <p className="font-bold">{driver.poles}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Podiums</p>
                            <p className="font-bold">{driver.podiums}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
