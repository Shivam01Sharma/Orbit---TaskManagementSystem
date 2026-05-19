import React from 'react';
export const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Real-Time Analytics</h1>
          <p className="text-slate-600 text-lg">Comprehensive project insights and team performance</p>
        </div>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <p className="text-slate-500 text-sm font-semibold mb-2">Total Tasks</p>
            <p className="text-3xl font-bold text-slate-900">487</p>
            <p className="text-green-600 text-sm mt-2">↑ 12% from last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <p className="text-slate-500 text-sm font-semibold mb-2">Completion Rate</p>
            <p className="text-3xl font-bold text-slate-900">94.2%</p>
            <p className="text-green-600 text-sm mt-2">✓ On Track</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <p className="text-slate-500 text-sm font-semibold mb-2">Avg Accuracy</p>
            <p className="text-3xl font-bold text-slate-900">96.8%</p>
            <p className="text-green-600 text-sm mt-2">↑ 2.3% improvement</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <p className="text-slate-500 text-sm font-semibold mb-2">Active Team Members</p>
            <p className="text-3xl font-bold text-slate-900">42</p>
            <p className="text-green-600 text-sm mt-2">100% engagement</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Tasks Completed Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-slate-900 font-bold text-lg mb-4">Tasks Completed Per Day</h3>
            <div className="space-y-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const heights = [65, 72, 68, 85, 92, 78, 55];
                return (
                  <div key={day} className="flex items-end gap-2">
                    <span className="text-slate-600 text-sm w-12">{day}</span>
                    <div className="flex-1 bg-gray-100 rounded-lg" style={{ height: `${heights[i]}px` }}></div>
                    <span className="text-slate-600 text-sm w-12 text-right">{heights[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Accuracy Trends */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-slate-900 font-bold text-lg mb-4">Accuracy Trends by Project</h3>
            <div className="space-y-4">
              {[
                { name: 'Project Alpha', accuracy: 98 },
                { name: 'Mobile App Dev', accuracy: 95 },
                { name: 'Data Pipeline', accuracy: 92 },
                { name: 'API Integration', accuracy: 94 },
              ].map((project) => (
                <div key={project.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700 text-sm font-semibold">{project.name}</span>
                    <span className="text-slate-900 font-bold">{project.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-green-400 h-full rounded-full"
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
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-slate-900 font-bold text-lg mb-4">Top 5 Performers This Month</h3>
            <div className="space-y-3">
              {[
                { name: 'Ribhav Kumar', tasks: 45 },
                { name: 'Divya Sharma', tasks: 42 },
                { name: 'Arun Verma', tasks: 38 },
                { name: 'Priyanshu G', tasks: 35 },
                { name: 'Yodi Singh', tasks: 32 },
              ].map((person, i) => (
                <div key={person.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-semibold">{i+1}</div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-semibold text-sm">{person.name}</p>
                    <p className="text-slate-500 text-xs">{person.tasks} tasks</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Productivity Heatmap */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-slate-900 font-bold text-lg mb-4">Team Activity Heatmap</h3>
            <div className="space-y-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                <div key={day} className="flex gap-1 items-center">
                  <span className="text-slate-600 text-sm w-12">{day}</span>
                  {[9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => {
                    const intensity = Math.floor(Math.random() * 4);
                    const colors = ['bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500'];
                    return (
                      <div key={hour} className={`w-6 h-6 rounded ${colors[intensity]} cursor-pointer`}></div>
                    );
                  })}
                </div>
              ))}
              <div className="flex gap-1 text-xs text-slate-500 mt-4 ml-12">
                <span>Low</span>
                <span className="ml-auto">High Activity</span>
              </div>
            </div>
          </div>

          {/* Completion Status */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-slate-900 font-bold text-lg mb-4">Project Completion Status</h3>
            <div className="space-y-4">
              {[
                { name: 'Project Alpha', percent: 85, status: 'On Track' },
                { name: 'Mobile App', percent: 72, status: 'On Schedule' },
                { name: 'Data Pipeline', percent: 91, status: 'Ahead' },
                { name: 'API Build', percent: 58, status: 'At Risk' },
              ].map((project) => (
                <div key={project.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-900 text-sm font-semibold">{project.name}</span>
                    <span className={`text-xs font-bold ${project.percent > 80 ? 'text-green-600' : project.percent > 50 ? 'text-amber-500' : 'text-red-600'}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        project.percent > 80
                          ? 'bg-green-500'
                          : project.percent > 50
                          ? 'bg-amber-400'
                          : 'bg-red-500'
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
