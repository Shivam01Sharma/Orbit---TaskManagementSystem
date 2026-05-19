import React from 'react';
// Rendered inside DashboardLayout

interface Milestone {
  id: string;
  name: string;
  phase: string;
  dueDate: string;
  progress: number;
  lead: string;
  status: 'on-track' | 'at-risk' | 'completed';
  tasks: number;
}

export const TimelinePage: React.FC = () => {
  const milestones: Milestone[] = [
    {
      id: '1',
      name: 'Phase 1: Data Collection',
      phase: 'Collection',
      dueDate: '2025-05-15',
      progress: 100,
      lead: 'Mayank',
      status: 'completed',
      tasks: 12,
    },
    {
      id: '2',
      name: 'Phase 2: Data Annotation',
      phase: 'Annotation',
      dueDate: '2025-06-30',
      progress: 85,
      lead: 'Shivam',
      status: 'on-track',
      tasks: 28,
    },
    {
      id: '3',
      name: 'Phase 3: Quality Review',
      phase: 'QA Review',
      dueDate: '2025-07-15',
      progress: 45,
      lead: 'Lakshya',
      status: 'at-risk',
      tasks: 15,
    },
    {
      id: '4',
      name: 'Phase 4: Final Validation',
      phase: 'Validation',
      dueDate: '2025-08-30',
      progress: 10,
      lead: 'Mayank',
      status: 'on-track',
      tasks: 8,
    },
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Project Timeline & Milestones</h1>
          <p className="text-slate-600 text-lg">Track project progress with visual milestones</p>
        </div>

        {/* Project Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-slate-500 text-sm mb-2">Project Duration</p>
            <p className="text-2xl font-bold text-slate-900">120 Days</p>
            <p className="text-slate-400 text-xs mt-2">Jan 1 - May 1, 2025</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-slate-500 text-sm mb-2">Overall Progress</p>
            <p className="text-2xl font-bold text-slate-900">60%</p>
            <p className="text-slate-400 text-xs mt-2">On Schedule</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-slate-500 text-sm mb-2">Completed Phases</p>
            <p className="text-2xl font-bold text-slate-900">1 of 4</p>
            <p className="text-slate-400 text-xs mt-2">Next phase: Annotation</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-slate-500 text-sm mb-2">At Risk Tasks</p>
            <p className="text-2xl font-bold text-amber-500">3</p>
            <p className="text-slate-400 text-xs mt-2">Review QA phase</p>
          </div>
        </div>

        {/* Gantt-style Timeline */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 mb-6">
          <h2 className="text-slate-900 font-bold text-lg mb-4">Project Roadmap</h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => {
              const statusColors = {
                'on-track': 'bg-green-400',
                'at-risk': 'bg-amber-400',
                'completed': 'bg-sky-400',
              };

              const statusIcons = {
                'on-track': 'On Track',
                'at-risk': 'At Risk',
                'completed': 'Completed',
              };

              return (
                <div key={milestone.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-semibold text-slate-700">{statusIcons[milestone.status]}</div>
                      <div>
                        <h3 className="text-slate-900 font-bold">{milestone.name}</h3>
                        <p className="text-slate-500 text-sm">
                          Lead: {milestone.lead} • {milestone.tasks} tasks
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-900 font-bold">{milestone.progress}%</p>
                      <p className="text-slate-400 text-xs">{milestone.dueDate}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden mb-3">
                    <div
                      className={`h-full ${statusColors[milestone.status]} rounded-full transition-all duration-500`}
                      style={{ width: `${milestone.progress}%` }}
                    ></div>
                  </div>

                  {/* Timeline Line */}
                  {index !== milestones.length - 1 && (
                    <div className="flex justify-center mb-4">
                      <div className="w-1 h-8 bg-gray-200"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Milestones */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <h3 className="text-slate-900 font-bold text-lg mb-4">Upcoming Deadlines</h3>
            <div className="space-y-3">
              {[
                { date: 'May 15', milestone: 'Phase 2 - Annotation', alert: 'high' },
                { date: 'Jun 30', milestone: 'Phase 3 - QA Review', alert: 'warning' },
                { date: 'Jul 15', milestone: 'Phase 4 - Validation', alert: 'none' },
              ].map((item) => (
                <div
                  key={item.date}
                  className={`p-3 rounded-lg ${
                    item.alert === 'high'
                      ? 'bg-red-50 border border-red-100'
                      : item.alert === 'warning'
                      ? 'bg-amber-50 border border-amber-100'
                      : 'bg-white border border-gray-100'
                  }`}
                >
                  <div className="flex justify-between">
                    <p className="text-slate-900 font-semibold">{item.milestone}</p>
                    <p className={`font-bold ${item.alert === 'high' ? 'text-red-500' : item.alert === 'warning' ? 'text-amber-500' : 'text-green-500'}`}>
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <h3 className="text-slate-900 font-bold text-lg mb-4">Risk Alerts</h3>
            <div className="space-y-3">
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                <p className="text-amber-700 font-semibold">Phase 3 At Risk</p>
                <p className="text-slate-500 text-sm mt-1">QA phase is 2 days behind schedule. 45% complete, deadline: 15 days</p>
                <button className="mt-3 bg-amber-600 text-white px-3 py-1 rounded text-sm hover:bg-amber-700 transition">
                  View Details
                </button>
              </div>

              <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                <p className="text-green-700 font-semibold">Phase 1 Completed</p>
                <p className="text-slate-500 text-sm mt-1">Data collection finished on schedule with 100% accuracy</p>
              </div>

              <div className="p-4 bg-sky-50 border border-sky-100 rounded-lg">
                <p className="text-sky-700 font-semibold">Phase 2 Progressing</p>
                <p className="text-slate-500 text-sm mt-1">Annotation phase is 85% complete. Maintain current pace to stay on schedule</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
