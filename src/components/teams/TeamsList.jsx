import { useQuery } from 'react-query';
import { getTeams } from '../../services/data';
import TeamCard from '../../components/teams/TeamCard';

export default function TeamsList() {
    const { data: teams, isLoading, error } = useQuery('teams', getTeams);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-f1-red border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !teams) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-red-700">Error loading teams data. Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 grid gap-4">
            <h1 className="section-title">F1 Teams - 2025 Season</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {teams.map(team => (
                    <TeamCard key={team.id} team={team} />
                ))}
            </div>
        </div>
    );
}
