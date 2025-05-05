"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

interface HealthTopic {
    id: number;
    name: string;
}

const TopicList = ({ onTopicSelect }: { onTopicSelect: (topicId: number) => void }) => {
    const [topics, setTopics] = useState<HealthTopic[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopics = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("/api/topics", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTopics(response.data);
            } catch (err: any) {
                console.error("Error fetching topics:", err);
                setError("Error al cargar los temas.");
                toast.error("No se pudieron cargar los temas.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopics();
    }, [onTopicSelect]);

    if (isLoading) return <p>Cargando temas...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Selecciona un tema:</h2>
            <ul>
                {topics.map(topic => (
                    <li key={topic.id} className="py-2 cursor-pointer hover:underline text-blue-500" onClick={() => onTopicSelect(topic.id)}>
                        {topic.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const TopicInsights = ({ topicId }: { topicId: number }) => {
    const [insights, setInsights] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopicInsights = async (id: number) => {
            setIsLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`/api/topics/${id}/insights`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInsights(response.data);
            } catch (err: any) {
                console.error(`Error fetching insights for topic ${id}:`, err);
                setError(`Error al cargar los insights para el tema ${id}.`);
                toast.error(`No se pudieron cargar los insights para el tema seleccionado.`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopicInsights(topicId);
    }, [topicId]);

    if (isLoading) return <p>Cargando insights del tema...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Insights del tema:</h2>
            {insights.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {Object.keys(insights[0] || {}).map((key) => (
                                    <th key={key} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {key.replace(/_/g, ' ')}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {insights.map(insight => (
                                <tr key={insight.id}>
                                    {Object.values(insight).map((value, index) => (
                                        <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No hay insights para este tema.</p>
            )}
        </div>
    );
};

const AllInsights = () => {
    const [insights, setInsights] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAllInsights = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("/api/insights", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInsights(response.data);
            } catch (err: any) {
                console.error("Error fetching all insights:", err);
                setError("Error al cargar todos los insights.");
                toast.error("No se pudieron cargar todos los insights.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllInsights();
    }, []);

    if (isLoading) return <p>Cargando todos los insights...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Todos los Insights:</h2>
            {insights.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {Object.keys(insights[0] || {}).map((key) => (
                                    <th key={key} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {key.replace(/_/g, ' ')}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {insights.map(insight => (
                                <tr key={insight.id}>
                                    {Object.values(insight).map((value, index) => (
                                        <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No hay insights disponibles.</p>
            )}
        </div>
    );
};

const InsightsPage: React.FC = () => {
    const [activeView, setActiveView] = useState<'topics' | 'topicInsights' | 'allInsights'>('topics');
    const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
    const [darkMode, setDarkMode] = useState(false); // Aquí está la definición de darkMode
    const router = useRouter();

    const handleTopicSelect = (topicId: number) => {
        setSelectedTopicId(topicId);
        setActiveView('topicInsights');
    };

    const handleViewChange = (view: 'topics' | 'allInsights') => {
        setActiveView(view);
        setSelectedTopicId(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("No estás autenticado. Redirigiendo al login.");
            router.push('/login');
        }
    }, [router]);

    return (
        <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <ToastContainer position="top-center" autoClose={1500} hideProgressBar />
            <Navbar />
            <p>Para cargar datos: php artisan pubmed:fetch-insights</p>
            <main className="flex-grow p-6">
                <div className="mb-4">
                    <button
                        onClick={() => handleViewChange('topics')}
                        className={`mr-4 py-2 px-4 rounded ${activeView === 'topics' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
                    >
                        Ver Temas
                    </button>
                    <button
                        onClick={() => handleViewChange('allInsights')}
                        className={`py-2 px-4 rounded ${activeView === 'allInsights' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
                    >
                        Ver Todos los Insights
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-md p-6">
                    {activeView === 'topics' && <TopicList onTopicSelect={handleTopicSelect} />}
                    {activeView === 'topicInsights' && selectedTopicId !== null && <TopicInsights topicId={selectedTopicId} />}
                    {activeView === 'allInsights' && <AllInsights />}
                </div>
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center">
                <p className="text-sm">© 2023 Dieta AI. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default InsightsPage;