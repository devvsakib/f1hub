import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function TeamCard({ team }) {
    return (
        <Link to={`/teams/${team.id}`}>
            <div
                className="card hover:shadow-lg transition-shadow duration-300 rounded-2xl"
                style={{ borderTop: `4px solid ${team.primaryColor}`, boxShadow: `0 5px 30px ${team.primaryColor}40` }}
            >
                <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                        <img src={team.logo} alt={team.name} className="h-10" />
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: team.primaryColor }}
                        >
                            <ChevronRight size={20} color="white" />
                        </div>
                    </div>

                    <h3 className="text-xl font-bold">{team.name}</h3>
                    <p className="text-gray-600 text-sm">{team.full_team_name}</p>

                    <div className="mt-4 border-t pt-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">World Championships</p>
                            <p className="font-bold text-lg">{team.world_championships}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">First Team Entry</p>
                            <p className="font-bold text-lg">{team.first_team_entry}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}