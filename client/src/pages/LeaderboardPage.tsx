import React from 'react';
import { Navbar } from '../components/Navbar';

interface Tasker {
  id: string;
  name: string;
  rank: number;
  tasksCompleted: number;
  accuracy: number;
  speed: number;
  consistency: number;
  overallRating: number;
  badge: 'Gold' | 'Silver' | 'Bronze' | 'None';
  avatar: string;
  level: string;
}

const taskers: Tasker[] = [
  {
    id: '1',
    name: 'Ribhav Kumar',
    rank: 1,
    tasksCompleted: 156,
    accuracy: 98.5,
    speed: 94,
    consistency: 97,
    overallRating: 96.5,
    badge: 'Gold',
    avatar: '👨‍💼',
    level: 'Elite',
  },
  {
    id: '2',
    name: 'Divya Sharma',
    rank: 2,
    tasksCompleted: 142,
    accuracy: 97.2,
    speed: 91,
    consistency: 95,
    overallRating: 94.4,
    badge: 'Silver',
    avatar: '👩‍💼',
    level: 'Expert',
  },
  {
    id: '3',
    name: 'Arun Verma',
    rank: 3,
    tasksCompleted: 128,
    accuracy: 96.1,
    speed: 89,
    consistency: 93,
    overallRating: 92.7,
    badge: 'Bronze',
    avatar: '👨‍💻',
    level: 'Senior',
  },
  {
    id: '4',
    name: 'Priyanshu Gupta',
    rank: 4,
    tasksCompleted: 98,
    accuracy: 94.3,
    speed: 87,
    consistency: 91,
    overallRating: 90.8,
    badge: 'None',
    avatar: '👨‍🎓',
    level: 'Junior',
  },
  {
    id: '5',
    name: 'Yodi Singh',
    rank: 5,
    tasksCompleted: 87,
    accuracy: 93.5,
    speed: 85,
    consistency: 89,
    overallRating: 89.3,
    badge: 'None',
    avatar: '👨‍💼',
    level: 'Intern',
  },
];

export const LeaderboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Performance Leaderboard</h1>
          <p className="text-purple-200 text-lg">Top Performers - Accuracy, Speed & Consistency</p>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white border-opacity-20">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-blue-600 border-b border-white border-opacity-20">
                  <th className="px-6 py-4 text-left text-white font-semibold">Rank</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Tasker</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Tasks</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Accuracy</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Speed</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Consistency</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Overall</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Badge</th>
                </tr>
              </thead>
              <tbody>
                {taskers.map((tasker, index) => (
                  <tr
                    key={tasker.id}
                    className={`border-b border-white border-opacity-10 transition-all duration-300 hover:bg-white hover:bg-opacity-5 ${
                      index % 2 === 0 ? 'bg-white bg-opacity-5' : 'bg-transparent'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {tasker.rank === 1 ? '🥇' : tasker.rank === 2 ? '🥈' : tasker.rank === 3 ? '🥉' : ''}
                        </span>
                        <span className="text-white font-bold text-lg">#{tasker.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{tasker.avatar}</span>
                        <div>
                          <p className="text-white font-semibold">{tasker.name}</p>
                          <p className="text-purple-300 text-sm">{tasker.level}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-purple-200 font-semibold">{tasker.tasksCompleted}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full font-bold">
                        {tasker.accuracy}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full font-bold">
                        {tasker.speed}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full font-bold">
                        {tasker.consistency}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                        {tasker.overallRating}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-2xl">{tasker.badge === 'Gold' ? '🏅' : tasker.badge === 'Silver' ? '⭐' : tasker.badge === 'Bronze' ? '🎖️' : '⭕'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 hover:border-opacity-40 transition">
            <h3 className="text-purple-200 text-sm font-semibold mb-2">Top Accuracy</h3>
            <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">98.5%</p>
            <p className="text-purple-300 text-sm mt-2">Ribhav Kumar</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 hover:border-opacity-40 transition">
            <h3 className="text-purple-200 text-sm font-semibold mb-2">Fastest Turnaround</h3>
            <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">94%</p>
            <p className="text-purple-300 text-sm mt-2">Ribhav Kumar</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 hover:border-opacity-40 transition">
            <h3 className="text-purple-200 text-sm font-semibold mb-2">Most Consistent</h3>
            <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text">97%</p>
            <p className="text-purple-300 text-sm mt-2">Ribhav Kumar</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 hover:border-opacity-40 transition">
            <h3 className="text-purple-200 text-sm font-semibold mb-2">Tasks Completed</h3>
            <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">156</p>
            <p className="text-purple-300 text-sm mt-2">Ribhav Kumar</p>
          </div>
        </div>
      </div>
    </div>
  );
};
