import { useState } from 'react';
import { useQuery } from 'react-query';
import { getCars } from '../../services/cars';
import { getTeams } from '../../services/data';
import CarCard from '../../components/gallery/CarCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

export default function CarGallery() {
  const [filters, setFilters] = useState({
    year: 0,
    teamId: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: cars, isLoading: carsLoading } = useQuery(
    ['cars', filters],
    () => getCars(filters.year > 0 || filters.teamId ? filters : undefined)
  );
  
  const { data: teams } = useQuery('teams', getTeams);
  
  const years = [2025, 2024, 2023, 2022, 2021, 2020, 2010, 2004];

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const clearFilters = () => {
    setFilters({ year: 0, teamId: '' });
  };

  if (carsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-f1-red border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="section-title">F1 Car Gallery</h1>
        
        <button 
          className="btn btn-secondary flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          Filters
        </button>
      </div>
      
      {showFilters && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
              <select 
                className="w-full border border-gray-300 rounded-md py-2 px-3"
                value={filters.year}
                onChange={(e) => handleFilterChange('year', parseInt(e.target.value))}
              >
                <option value={0}>All Seasons</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
              <select 
                className="w-full border border-gray-300 rounded-md py-2 px-3"
                value={filters.teamId}
                onChange={(e) => handleFilterChange('teamId', e.target.value)}
              >
                <option value="">All Teams</option>
                {teams?.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>
            <div>
              <button 
                className="btn btn-primary w-full md:w-auto"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cars?.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      
      {cars?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No cars match your filter criteria.</p>
          <button 
            className="btn btn-primary mt-4"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}