import { useQuery } from 'react-query';
import { getDrivers } from '../../services/data';
import DriverCard from '../../components/drivers/DriverCard';

export default function DriversList() {
  const { data: drivers, isLoading, error } = useQuery('drivers', getDrivers);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-f1-red border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !drivers) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">Error loading drivers data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 grid gap-4">
      <h1 className="section-title">F1 Drivers - 2025 Season</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {drivers.map(driver => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
      </div>
    </div>
  );
}