'use client';

import { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Droplet, Moon, Target, HeartPulse, Gauge, Flame } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const Dashboard = () => {
  interface UserData {
    name: string;
    weightProgress: number[];
    calories: { consumed: number; burned: number };
    bmi: number;
    waterIntake: number;
    sleepHours: number;
    heartRate: number;
    stressLevel: number;
    workouts: number[];
    goalsAchieved: number;
    totalGoals: number;
  }

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    setUserData({
      name: 'Juan Pérez',
      weightProgress: [72, 71, 70, 69, 68],
      calories: { consumed: 2200, burned: 2000 },
      bmi: 22.5,
      waterIntake: 2.5,
      sleepHours: 7,
      heartRate: 75,
      stressLevel: 40,
      workouts: [3, 4, 5, 6, 7],
      goalsAchieved: 5,
      totalGoals: 10,
    });
  }, []);

  const handleUpdateData = () => {
    // Simula la actualización de datos
    setUserData((prevData) => ({
      ...prevData!,
      weightProgress: prevData!.weightProgress.map((w) => w - 0.5),
      calories: {
        consumed: prevData!.calories.consumed + 100,
        burned: prevData!.calories.burned + 50,
      },
      goalsAchieved: prevData!.goalsAchieved + 1,
    }));
  };

  const generateRecommendations = () => {
    const recommendations = [];
    if (userData!.bmi > 25) {
      recommendations.push('Considera reducir tu ingesta calórica para mejorar tu IMC.');
    }
    if (userData!.waterIntake < 2) {
      recommendations.push('Aumenta tu consumo de agua para mantenerte hidratado.');
    }
    if (userData!.sleepHours < 7) {
      recommendations.push('Intenta dormir al menos 7 horas para mejorar tu salud.');
    }
    if (userData!.stressLevel > 50) {
      recommendations.push('Practica técnicas de relajación para reducir tu nivel de estrés.');
    }
    return recommendations;
  };

  if (!userData) return <p>Cargando...</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8">Bienvenido, {userData.name}</h1>

        <div className="flex justify-center mb-8">
          <Button onClick={handleUpdateData} className="px-6 py-3 text-lg">
            Actualizar Datos
          </Button>
        </div>

        {/* Tarjetas de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="flex items-center space-x-4 p-6">
              <Target className="w-10 h-10 text-blue-500" />
              <div>
                <p className="text-lg font-semibold">IMC</p>
                <p className="text-2xl font-bold">{userData.bmi}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-4 p-6">
              <Droplet className="w-10 h-10 text-blue-400" />
              <div>
                <p className="text-lg font-semibold">Agua</p>
                <p className="text-2xl font-bold">{userData.waterIntake} L</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-4 p-6">
              <Moon className="w-10 h-10 text-indigo-500" />
              <div>
                <p className="text-lg font-semibold">Sueño</p>
                <p className="text-2xl font-bold">{userData.sleepHours} h</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-4 p-6">
              <HeartPulse className="w-10 h-10 text-red-500" />
              <div>
                <p className="text-lg font-semibold">Frecuencia Cardíaca</p>
                <p className="text-2xl font-bold">{userData.heartRate} bpm</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-4 p-6">
              <Gauge className="w-10 h-10 text-yellow-500" />
              <div>
                <p className="text-lg font-semibold">Nivel de Estrés</p>
                <p className="text-2xl font-bold">{userData.stressLevel}%</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <p className="text-lg font-semibold mb-2">Progreso de Metas</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{
                    width: `${(userData.goalsAchieved / userData.totalGoals) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-sm mt-2">
                {userData.goalsAchieved} de {userData.totalGoals} metas cumplidas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">Progreso de Peso</h2>
            <Line
              data={{
                labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
                datasets: [
                  {
                    label: 'Peso (kg)',
                    data: userData.weightProgress,
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 2,
                    fill: false,
                  },
                ],
              }}
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">Calorías Consumidas vs Quemadas</h2>
            <Bar
              data={{
                labels: ['Consumidas', 'Quemadas'],
                datasets: [
                  {
                    label: 'Calorías',
                    data: [userData.calories.consumed, userData.calories.burned],
                    backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                  },
                ],
              }}
            />
          </div>
        </div>

        {/* Resumen de calorías */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">Resumen de Calorías</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold">Calorías Consumidas</p>
                <p className="text-2xl font-bold text-red-500">{userData.calories.consumed}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold">Calorías Quemadas</p>
                <p className="text-2xl font-bold text-blue-500">{userData.calories.burned}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Balance</p>
                <p
                  className={`text-2xl font-bold ${
                    userData.calories.consumed - userData.calories.burned >= 0
                      ? 'text-red-500'
                      : 'text-green-500'
                  }`}
                >
                  {userData.calories.consumed - userData.calories.burned}
                </p>
              </div>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${
                    userData.calories.consumed - userData.calories.burned >= 0
                      ? 'bg-red-500'
                      : 'bg-green-500'
                  }`}
                  style={{
                    width: `${Math.min(
                      Math.abs(
                        (userData.calories.consumed - userData.calories.burned) /
                          Math.max(userData.calories.consumed, userData.calories.burned) *
                          100
                      ),
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historial y recomendaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">Historial de Progreso</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse rounded-lg overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="px-4 py-3 text-left">Semana</th>
                    <th className="px-4 py-3 text-left">Peso (kg)</th>
                    <th className="px-4 py-3 text-left">Calorías Consumidas</th>
                    <th className="px-4 py-3 text-left">Calorías Quemadas</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.weightProgress.map((weight, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                      } hover:bg-gray-200 transition-colors`}
                    >
                      <td className="px-4 py-3">{`Semana ${index + 1}`}</td>
                      <td className="px-4 py-3">{weight}</td>
                      <td className="px-4 py-3">
                        {userData.calories.consumed - index * 50}
                      </td>
                      <td className="px-4 py-3">
                        {userData.calories.burned - index * 30}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">Recomendaciones Personalizadas</h2>
            <Card>
              <CardContent className="p-6">
                {generateRecommendations().length > 0 ? (
                  <ul className="list-disc list-inside">
                    {generateRecommendations().map((rec, index) => (
                      <li key={index} className="mb-2">
                        {rec}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-green-500">¡Todo parece estar en orden! Sigue así.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
