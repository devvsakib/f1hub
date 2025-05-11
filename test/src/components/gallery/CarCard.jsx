import { Link } from 'react-router-dom';
import { Award, Flag, Trophy } from 'lucide-react';
import { teams } from '../../services/data';

export default function CarCard({ car }) {
  const team = teams.find(team => team.id === car.teamId);
  
  return (
    <Link to={`/gallery/${car.id}`}>
      <div 
        className="card hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        style={{ borderBottom: `4px solid ${team?.primaryColor || '#ccc'}` }}
      >
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img 
            src={car.imageUrl} 
            alt={car.name} 
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold">{car.name}</h3>
              <p className="text-sm text-gray-600">{car.teamName} • {car.year}</p>
            </div>
            <div 
              className="text-xs px-2 py-1 rounded font-bold"
              style={{ 
                backgroundColor: team?.primaryColor || '#ccc',
                color: 'white'
              }}
            >
              {car.side.toUpperCase()}
            </div>
          </div>
          
          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Trophy size={16} className="text-yellow-500" />
              <span className="text-sm">{car.wins} wins</span>
            </div>
            <div className="flex items-center gap-1">
              <Flag size={16} className="text-blue-500" />
              <span className="text-sm">{car.poles} poles</span>
            </div>
            {car.championships && (
              <div className="flex items-center gap-1">
                <Award size={16} className="text-yellow-500" />
                <span className="text-sm">Champion</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}