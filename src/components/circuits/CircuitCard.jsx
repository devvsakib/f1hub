import { Link } from "react-router-dom";

export default function CircuitCard({ circuit }) {
    return (
        <Link to={`/circuits/${circuit.circuitId}`}>
            <div className="card hover:shadow-lg transition-shadow overflow-hidden shadow-md duration-300 rounded-br-2xl rounded-bl-md rounded-tr-md border-b-4 border-r-4 border-(--f1-red)"
                style={{}}
            >
                {circuit.thumbnail && (
                    <img
                        src={circuit.thumbnail}
                        alt={circuit.circuitName}
                        className="w-full h-40 object-cover rounded mb-2"
                    />
                )}
                <div className="mt-4 border-t pt-4 grid items-center justify-between p-3">
                    <h2 className="text-lg font-bold mb-1">{circuit.circuitName}</h2>
                    <p className="text-sm text-gray-600">{circuit.Location.locality}, {circuit.Location.country}</p>
                    <a
                        href={circuit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-f1-red text-sm underline mt-2 block"
                    >
                        View on Wiki
                    </a>
                </div>
            </div>
        </Link>
    );
}
