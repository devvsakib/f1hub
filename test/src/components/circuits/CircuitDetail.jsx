import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCircuit } from '../../services/data';
import { ArrowLeft, MapPin, Globe, Calendar, Compass, ZoomOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export default function CircuitDetail() {
    const { circuitId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        data: circuit,
        isLoading,
        error,
    } = useQuery(['circuit', circuitId], () => getCircuit(circuitId));

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-f1-red border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !circuit) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-md">
                    <p className="text-red-700">Error loading circuit data. Please try again later.</p>
                </div>
                <div className="mt-6">
                    <Link
                        to="/circuits"
                        className="inline-flex items-center gap-2 text-sm font-medium text-white bg-f1-red hover:bg-red-700 px-4 py-2 rounded transition"
                    >
                        <ArrowLeft size={18} />
                        Back to Circuits
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 space-y-10">
            {/* Back Link */}
            <div>
                <Link
                    to="/circuits"
                    className="inline-flex items-center gap-2 text-f1-red hover:underline text-sm"
                >
                    <ArrowLeft size={16} />
                    Back to Circuits
                </Link>
            </div>

            {/* Circuit Card */}
            <div className="rounded-xl shadow-xl overflow-hidden bg-white">
                <div className="h-2 bg-(--f1-red)" />
                <div className="p-6 md:p-8 space-y-6 grid grid-cols-2 gap-5">
                    {circuit.thumbnail && (
                        <div className="relative">
                            <motion.img
                                src={circuit.thumbnail}
                                alt={circuit.circuitName}
                                className="w-5/6 h-auto object-cover cursor-pointer"
                                onClick={handleImageClick}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                            <p className="text-center text-gray-500 mt-2 cursor-pointer">Click to zoom in</p>
                        </div>
                    )}
                    {/* Header */}
                    <div className='grid gap-4'>
                        <div className="grid items-start md:items-center justify-between gap-1">
                            <div className="flex items-center gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold">{circuit.circuitName}</h1>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} />
                                    <span>{circuit.Location?.locality}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe size={18} />
                                    <span>{circuit.Location?.country}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} />
                                    <span>Lat: {circuit.Location?.lat} / Long: {circuit.Location?.long}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Compass size={18} />
                                    <a
                                        href={circuit.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        Wikipedia
                                    </a>
                                </div>
                            </div>
                        </div>
                        {circuit.description && (
                            <p className="text-gray-700 leading-relaxed">{circuit.description}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {isModalOpen && (
                <div onClick={handleCloseModal} className="fixed inset-0 flex items-center justify-center bg-(--f1-black)/0 bg-opacity-30 z-50 backdrop-blur-sm w-[90vw] h-[96vh]  mx-auto">
                    <motion.div
                        className="relative bg-white p-6 rounded-md shadow-lg rounded-br-2xl rounded-bl-md rounded-tr-md border-b-4 border-r-4 border-(--f1-red)"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            onClick={handleCloseModal}
                            className="absolute bg-white p-2 rounded-2xl shadow-lg cursor-pointer top-2 right-2 text-(--f1-red) text-xl z-40"
                        >
                            <ZoomOut size={30} />
                        </button>
                        <motion.img
                            src={circuit.thumbnail}
                            alt={circuit.circuitName}
                            className="w-11/12 mx-auto h-auto object-cover"
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    </motion.div>
                </div>
            )}
        </div>
    );
}
