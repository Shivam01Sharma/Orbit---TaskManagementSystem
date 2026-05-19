import React, { useState, useMemo } from 'react';
// Page rendered inside DashboardLayout

interface Recommendation {
  id: string;
  name: string;
  level: string;
  matchScore: number;
  specialization: string;
  pastAccuracy: number;
  speedRating: number;
  recentTasks: number;
  avatar: string;
  reason: string;
}

interface TaskBatch {
  id: string;
  title: string;
  type: 'Image Annotation' | 'Text Labeling' | 'Audio Transcription' | 'Data Validation';
  taskCount: number;
  estimatedTime: string;
  deadline: string;
}

export const SmartAssignmentPage: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<TaskBatch | null>(null);
  const [selectedTaskers, setSelectedTaskers] = useState<string[]>([]);

  const batches: TaskBatch[] = [
    {
      id: 'batch-1',
      title: 'Product Image Annotation - Q2 Collection',
      type: 'Image Annotation',
      taskCount: 500,
      estimatedTime: '5-7 days',
      deadline: '2025-06-15',
    },
    {
      id: 'batch-2',
      title: 'Customer Review Sentiment Analysis',
      type: 'Text Labeling',
      taskCount: 1000,
      estimatedTime: '3-4 days',
      deadline: '2025-06-20',
    },
    {
      id: 'batch-3',
      title: 'Voice Command Transcription',
      type: 'Audio Transcription',
      taskCount: 200,
      estimatedTime: '6-8 days',
      deadline: '2025-07-01',
    },
  ];

  const recommendations: Recommendation[] = [
    {
      id: '1',
      name: 'Ribhav Kumar',
      level: 'Elite',
      matchScore: 98,
      specialization: 'Image Annotation',
      pastAccuracy: 98.5,
      speedRating: 94,
      recentTasks: 45,
      avatar: '👨‍💼',
      reason: 'Perfect fit - Image specialist with 98.5% accuracy',
    },
    {
      id: '2',
      name: 'Divya Sharma',
      level: 'Expert',
      matchScore: 96,
      specialization: 'Image & Text Annotation',
      pastAccuracy: 97.2,
      speedRating: 91,
      recentTasks: 42,
      avatar: '👩‍💼',
      reason: 'Multi-specialist with consistent performance',
    },
    {
      id: '3',
      name: 'Arun Verma',
      level: 'Senior',
      matchScore: 92,
      specialization: 'Image Annotation',
      pastAccuracy: 96.1,
      speedRating: 89,
      recentTasks: 38,
      avatar: '👨‍💻',
      reason: 'Strong match - Image specialist, reliable',
    },
    {
      id: '4',
      name: 'Priyanshu G',
      level: 'Junior',
      matchScore: 85,
      specialization: 'Image & Text',
      pastAccuracy: 94.3,
      speedRating: 87,
      recentTasks: 35,
      avatar: '👨‍🎓',
      reason: 'Good learning opportunity - solid fundamentals',
    },
    {
      id: '5',
      name: 'Yodi Singh',
      level: 'Junior',
      matchScore: 82,
      specialization: 'Text Labeling',
      pastAccuracy: 93.5,
      speedRating: 85,
      recentTasks: 32,
      avatar: '👨‍💻',
      reason: 'Capable performer, growing specialty match',
    },
  ];

  const toggleTasker = (id: string) => {
    setSelectedTaskers((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const [search, setSearch] = useState('');

  const filteredRecommendations = useMemo(() => {
    if (!search) return recommendations;
    const q = search.toLowerCase();
    return recommendations.filter(
      (r) => r.name.toLowerCase().includes(q) || r.specialization.toLowerCase().includes(q)
    );
  }, [search]);

  const loadAll = () => {
    setSelectedTaskers(recommendations.map((r) => r.id));
  };

  const matchBadgeClass = (score: number) => {
    if (score >= 95) return 'bg-green-100 text-green-800';
    if (score >= 85) return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-1">AI Smart Task Assignment</h1>
          <p className="text-slate-700 leading-6">Intelligent task matching based on performance history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Batch Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-4 border border-gray-100 sticky top-8 shadow-sm">
              <h2 className="text-slate-900 font-bold text-lg mb-4">Task Batches</h2>
              <div className="space-y-3">
                {batches.map((batch) => (
                  <div
                    key={batch.id}
                    onClick={() => setSelectedBatch(batch)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedBatch?.id === batch.id
                        ? 'bg-slate-100 ring-2 ring-slate-200'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <p className="text-slate-900 font-semibold text-sm truncate">{batch.title}</p>
                    <p className="text-slate-600 text-sm mt-1">{batch.taskCount} tasks</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-gray-100 text-slate-700 px-2 py-1 rounded">
                        {batch.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations Panel */}
          <div className="lg:col-span-2">
            {selectedBatch ? (
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                {/* Batch Info */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{selectedBatch.title}</h3>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-slate-500 text-sm">Type</p>
                      <p className="text-slate-900 font-semibold">{selectedBatch.type}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Tasks</p>
                      <p className="text-slate-900 font-semibold">{selectedBatch.taskCount}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Est. Time</p>
                      <p className="text-slate-900 font-semibold">{selectedBatch.estimatedTime}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Deadline</p>
                      <p className="text-slate-900 font-semibold">{selectedBatch.deadline}</p>
                    </div>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-slate-900 font-bold text-lg">AI Recommended Team</h4>
                    <div className="flex gap-2 items-center">
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search name or skill"
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-56"
                      />
                      <button className="text-xs bg-gray-100 text-slate-700 px-3 py-1 rounded hover:bg-gray-200 transition">
                        Filter
                      </button>
                      <button onClick={loadAll} className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
                        Select All
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredRecommendations.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => toggleTasker(rec.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                          selectedTaskers.includes(rec.id)
                            ? 'bg-slate-50 border-2 border-slate-200'
                            : 'bg-white border border-gray-100'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={selectedTaskers.includes(rec.id)}
                            onChange={() => toggleTasker(rec.id)}
                            className="mt-1 w-5 h-5 cursor-pointer accent-green-600"
                          />

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-semibold">{rec.name[0]}</div>
                                <div>
                                  <p className="text-slate-900 font-semibold">{rec.name}</p>
                                  <p className="text-slate-500 text-xs">{rec.level} • {rec.specialization}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`px-3 py-1 rounded-full font-semibold text-sm ${matchBadgeClass(rec.matchScore)}`}>
                                  {rec.matchScore}% Match
                                </div>
                              </div>
                            </div>

                            <p className="text-slate-600 text-sm mb-2">{rec.reason}</p>

                            <div className="grid grid-cols-4 gap-2 text-xs">
                              <div>
                                <p className="text-slate-500">Accuracy</p>
                                <p className="text-slate-900 font-bold">{rec.pastAccuracy}%</p>
                              </div>
                              <div>
                                <p className="text-slate-500">Speed</p>
                                <p className="text-slate-900 font-bold">{rec.speedRating}%</p>
                              </div>
                              <div>
                                <p className="text-slate-500">Recent Tasks</p>
                                <p className="text-slate-900 font-bold">{rec.recentTasks}</p>
                              </div>
                              <div>
                                <p className="text-slate-500">Specialty</p>
                                <p className="text-slate-900 font-bold text-right">{rec.specialization}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assignment Summary */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <p className="text-slate-700 text-sm mb-1">
                      Selected: {selectedTaskers.length} taskers
                    </p>
                    {selectedTaskers.length > 0 && (
                      <p className="text-slate-600 text-xs">
                        Team capacity: {selectedTaskers.length * 100} tasks/week
                      </p>
                    )}
                  </div>

                  <button
                    disabled={selectedTaskers.length === 0}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {selectedTaskers.length === 0
                      ? 'Select taskers to assign'
                      : `Assign to ${selectedTaskers.length} Tasker${selectedTaskers.length !== 1 ? 's' : ''}`}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 border border-gray-100 text-center">
                <p className="text-slate-500 text-lg">Select a task batch to view AI recommendations</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Explanation */}
        <div className="mt-8 bg-white rounded-xl p-4 border border-gray-100">
          <h4 className="text-slate-900 font-bold text-lg mb-3">How AI Matching Works</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-yellow-600 font-bold">Performance History</p>
              <p className="text-slate-500 text-xs mt-1">Analyzes past accuracy, speed, and consistency scores</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-slate-700 font-bold">Task Specialization</p>
              <p className="text-slate-500 text-xs mt-1">Matches tasker specialties with task type requirements</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-green-600 font-bold">Capacity Planning</p>
              <p className="text-slate-500 text-xs mt-1">Considers current workload and deadline constraints</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-slate-700 font-bold">Growth Potential</p>
              <p className="text-slate-500 text-xs mt-1">Includes learning opportunities for junior taskers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
