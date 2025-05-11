import { useQuery } from 'react-query';
import { getCircuits } from '../../services/data';
import CircuitCard from './CircuitCard';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function CircuitsList() {
    const [search, setSearch] = useState('');
    const [season, setSeason] = useState('2024');

    // const { data: circuits, isLoading, error } = useQuery('circuits', getCircuits);
    const { data: circuits, isLoading, error } = useQuery(['circuits', season], () => getCircuits(season),
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        });

    const filteredCircuits = search.trim()
        ? circuits?.filter((circuit) =>
            circuit.circuitName?.toLowerCase().includes(search?.toLowerCase()) ||
            circuit.Location?.locality?.toLowerCase().includes(search?.toLowerCase()) ||
            circuit.Location?.country?.toLowerCase().includes(search?.toLowerCase())
        ) : circuits;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-f1-red border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !circuits) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-red-700">Error loading circuits data. Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 grid gap-4">
            <h1 className="section-title">F1 Circuits</h1>

            <div className="flex flex-col md:flex-row md:items-center gap-4">

                <select
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-f1-red"
                >
                    {[2024, 2023, 2022, 2021].map((year) => (
                        <option key={year} value={year}>{year} Season</option>
                    ))}
                </select>
                <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search by name or location"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-f1-red"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCircuits?.map((circuit) => (
                    <CircuitCard key={circuit.circuitId} circuit={circuit} />
                ))}
                {filteredCircuits?.length === 0 && (
                    <p className="text-gray-600 text-center">No circuits found for your search.</p>
                )}
            </div>
        </div>
    );
}
