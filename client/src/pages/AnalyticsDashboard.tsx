import React from 'react';
import { Navbar } from '../components/Navbar';

export const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">Real-Time Analytics</h1>
          <p className="text-purple-200 text-lg">Comprehensive project insights and team performance</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 hover:border-opacity-40 transition">
            <p className="text-purple-200 text-sm font-semibold mb-2">Total Tasks</p>
            <p className="text-5xl font-bold text-white">487</p>
            <p className="text-green-400 text-sm mt-2">↑ 12% from last month</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 hover:border-opacity-40 transition">
            <p className="text-purple-200 text-sm font-semibold mb-2">Completion Rate</p>
            <p className="text-5xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">94.2%</p>
            <p className="text-green-400 text-sm mt-2">✓ On Track</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 hover:border-opacity-40 transition">
            <p className="text-purple-200 text-sm font-semibold mb-2">Avg Accuracy</p>
            <p className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">96.8%</p>
            <p className="text-green-400 text-sm mt-2">↑ 2.3% improvement</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 hover:border-opacity-40 transition">
            <p className="text-purple-200 text-sm font-semibold mb-2">Active Team Members</p>
            <p className="text-5xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text">42</p>
            <p className="text-green-400 text-sm mt-2">100% engagement</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Tasks Completed Chart */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
            <h3 className="text-white font-bold text-lg mb-6">📈 Tasks Completed Per Day</h3>
            <div className="space-y-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const heights = [65, 72, 68, 85, 92, 78, 55];
                return (
                  <div key={day} className="flex items-end gap-2">
                    <span className="text-purple-200 text-sm w-12">{day}</span>
                    <div className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg" style={{ height: `${heights[i]}px` }}></div>
                    <span className="text-purple-200 text-sm w-12 text-right">{heights[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Accuracy Trends */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
            <h3 className="text-white font-bold text-lg mb-6">📊 Accuracy Trends by Project</h3>
            <div className="space-y-4">
              {[
                { name: 'Project Alpha', accuracy: 98 },
                { name: 'Mobile App Dev', accuracy: 95 },
                { name: 'Data Pipeline', accuracy: 92 },
                { name: 'API Integration', accuracy: 94 },
              ].map((project) => (
                <div key={project.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-purple-200 text-sm font-semibold">{project.name}</span>
                    <span className="text-white font-bold">{project.accuracy}%</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-400 to-emerald-400 h-full rounded-full"
                      style={{ width: `${project.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Top Performers */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
            <h3 className="text-white font-bold text-lg mb-6">🏆 Top 5 Performers This Month</h3>
            <div className="space-y-3">
              {[
                { name: 'Ribhav Kumar', tasks: 45 },
                { name: 'Divya Sharma', tasks: 42 },
                { name: 'Arun Verma', tasks: 38 },
                { name: 'Priyanshu G', tasks: 35 },
                { name: 'Yodi Singh', tasks: 32 },
              ].map((person, i) => (
                <div key={person.name} className="flex items-center gap-3">
                  <span className="text-2xl">{'🥇🥈🥉'[i] || '🎯'}</span>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">{person.name}</p>
                    <p className="text-purple-300 text-xs">{person.tasks} tasks</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Productivity Heatmap */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
            <h3 className="text-white font-bold text-lg mb-6">🔥 Team Activity Heatmap</h3>
            <div className="space-y-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                <div key={day} className="flex gap-1">
                  <span className="text-purple-200 text-sm w-12">{day}</span>
                  {[9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => {
                    const intensity = Math.floor(Math.random() * 4);
                    const colors = ['bg-green-900', 'bg-green-700', 'bg-green-500', 'bg-green-400'];
                    return (
                      <div key={hour} className={`w-6 h-6 rounded ${colors[intensity]} cursor-pointer hover:ring-2 ring-white`}></div>
                    );
                  })}
                </div>
              ))}
              <div className="flex gap-1 text-xs text-purple-300 mt-4 ml-12">
                <span>Low</span>
                <span className="ml-auto">High Activity</span>
              </div>
            </div>
          </div>

          {/* Completion Status */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
            <h3 className="text-white font-bold text-lg mb-6">✓ Project Completion Status</h3>
            <div className="space-y-4">
              {[
                { name: 'Project Alpha', percent: 85, status: 'On Track' },
                { name: 'Mobile App', percent: 72, status: 'On Schedule' },
                { name: 'Data Pipeline', percent: 91, status: 'Ahead' },
                { name: 'API Build', percent: 58, status: '⚠️ At Risk' },
              ].map((project) => (
                <div key={project.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white text-sm font-semibold">{project.name}</span>
                    <span className={`text-xs font-bold ${project.percent > 80 ? 'text-green-400' : project.percent > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="w-full bg-white bg-opacity-10 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        project.percent > 80
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : project.percent > 50
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                          : 'bg-gradient-to-r from-red-500 to-pink-500'
                      }`}
                      style={{ width: `${project.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
