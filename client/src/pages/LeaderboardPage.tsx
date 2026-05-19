import React from 'react';
// Page rendered within DashboardLayout; no top Navbar here.

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
    avatar: '',
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
    avatar: '',
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
    avatar: '',
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
    avatar: '',
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
    avatar: '',
    level: 'Intern',
  },
];

export const LeaderboardPage: React.FC = () => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const renderBadge = (badge: Tasker['badge']) => {
    if (badge === 'Gold') return <span className="px-3 py-1 rounded-full bg-yellow-400 text-sm font-semibold text-black">Gold</span>;
    if (badge === 'Silver') return <span className="px-3 py-1 rounded-full bg-gray-300 text-sm font-semibold text-black">Silver</span>;
    if (badge === 'Bronze') return <span className="px-3 py-1 rounded-full bg-amber-600 text-sm font-semibold text-black">Bronze</span>;
    return <span className="text-purple-200">—</span>;
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Performance Leaderboard</h1>
          <p className="text-slate-600">Top Performers - Accuracy, Speed & Consistency</p>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-slate-700 font-semibold">Rank</th>
                  <th className="px-6 py-4 text-left text-slate-700 font-semibold">Tasker</th>
                  <th className="px-6 py-4 text-center text-slate-700 font-semibold">Tasks</th>
                  <th className="px-6 py-4 text-center text-slate-700 font-semibold">Accuracy</th>
                  <th className="px-6 py-4 text-center text-slate-700 font-semibold">Speed</th>
                  <th className="px-6 py-4 text-center text-slate-700 font-semibold">Consistency</th>
                  <th className="px-6 py-4 text-center text-slate-700 font-semibold">Overall</th>
                  <th className="px-6 py-4 text-center text-slate-700 font-semibold">Badge</th>
                </tr>
              </thead>
              <tbody>
                {taskers.map((tasker, index) => (
                  <tr
                    key={tasker.id}
                    className={`border-b border-gray-100 transition-all duration-300 hover:bg-gray-50 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {tasker.rank === 1 ? '🥇' : tasker.rank === 2 ? '🥈' : tasker.rank === 3 ? '🥉' : ''}
                        </span>
                        <span className="text-slate-900 font-bold text-lg">#{tasker.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-700 text-white flex items-center justify-center font-semibold">
                          {getInitials(tasker.name)}
                        </div>
                        <div>
                          <p className="text-slate-900 font-semibold">{tasker.name}</p>
                          <p className="text-slate-500 text-sm">{tasker.level}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-700 font-semibold">{tasker.tasksCompleted}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                        {tasker.accuracy}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold">
                        {tasker.speed}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-bold">
                        {tasker.consistency}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-bold text-lg">
                        {tasker.overallRating}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">{renderBadge(tasker.badge)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-slate-500 text-sm font-semibold mb-2">Top Accuracy</h3>
            <p className="text-2xl font-bold text-slate-900">98.5%</p>
            <p className="text-slate-500 text-sm mt-2">Ribhav Kumar</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-slate-500 text-sm font-semibold mb-2">Fastest Turnaround</h3>
            <p className="text-2xl font-bold text-slate-900">94%</p>
            <p className="text-slate-500 text-sm mt-2">Ribhav Kumar</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-slate-500 text-sm font-semibold mb-2">Most Consistent</h3>
            <p className="text-2xl font-bold text-slate-900">97%</p>
            <p className="text-slate-500 text-sm mt-2">Ribhav Kumar</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-slate-500 text-sm font-semibold mb-2">Tasks Completed</h3>
            <p className="text-2xl font-bold text-slate-900">156</p>
            <p className="text-slate-500 text-sm mt-2">Ribhav Kumar</p>
          </div>
        </div>
      </div>
    </div>
  );
};
