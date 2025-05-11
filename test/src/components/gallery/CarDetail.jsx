import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { getCar } from '../../services/cars';
import { getTeam } from '../../services/data';
import { ChevronLeft, ChevronRight, Award, Flag, Trophy, Info } from 'lucide-react';

export default function CarDetail() {
    const { carId } = useParams();
    const [isZoomed, setIsZoomed] = useState(false);

    const {
        data: car,
        isLoading: isCarLoading,
        error: carError
    } = useQuery(['car', carId], () => getCar(carId));

    const {
        data: team,
        isLoading: isTeamLoading
    } = useQuery(
        ['team', car?.teamId],
        () => getTeam(car?.teamId),
        { enabled: !!car }
    );

    if (isCarLoading || isTeamLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-f1-red border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (carError || !car || !team) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-red-700">Error loading car data. Please try again later.</p>
                </div>
                <div className="mt-6">
                    <Link to="/gallery" className="btn btn-secondary">
                        Back to Gallery
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-6">
                <Link to="/gallery" className="text-f1-red hover:underline flex items-center gap-2">
                    <ChevronLeft size={20} />
                    Back to Gallery
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div
                    className="h-2"
                    style={{ backgroundColor: team.primaryColor }}
                ></div>

                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-2/3">
                            <div
                                className={`bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in relative ${isZoomed ? 'h-96' : 'h-64'}`}
                                onClick={() => setIsZoomed(!isZoomed)}
                            >
                                <img
                                    src={car.imageUrl}
                                    alt={car.name}
                                    className={`w-full h-full object-contain transition-transform duration-300 ${isZoomed ? 'scale-125' : 'scale-100'}`}
                                />
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                                    Click to {isZoomed ? 'zoom out' : 'zoom in'}
                                </div>
                            </div>

                            <div className="mt-6">
                                <h2 className="text-xl font-bold mb-2">Specifications</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                    <div className="bg-gray-100 p-3 rounded">
                                        <p className="text-sm text-gray-600">Name</p>
                                        <p className="font-bold">{car.name}</p>
                                    </div>
                                    <div className="bg-gray-100 p-3 rounded">
                                        <p className="text-sm text-gray-600">Team</p>
                                        <p className="font-bold">{team.name}</p>
                                    </div>
                                    <div className="bg-gray-100 p-3 rounded">
                                        <p className="text-sm text-gray-600">Year</p>
                                        <p className="font-bold">{car.year}</p>
                                    </div>
                                    <div className="bg-gray-100 p-3 rounded">
                                        <p className="text-sm text-gray-600">Chassis</p>
                                        <p className="font-bold">{car.chassis}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/3">
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="text-sm text-gray-600">Description</p>
                                <p className="font-bold">{car.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-2">Gallery</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            {car?.images?.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-full object-cover rounded"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-6 p-5">
                    <Link to="/gallery" className="btn btn-secondary">
                        Back to Gallery
                    </Link>
                </div>
            </div>
        </div>
    );
};
