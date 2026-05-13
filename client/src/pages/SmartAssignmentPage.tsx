import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">AI Smart Task Assignment</h1>
          <p className="text-purple-200 text-lg">Intelligent task matching based on performance history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Batch Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 sticky top-8">
              <h2 className="text-white font-bold text-lg mb-4">📦 Task Batches</h2>
              <div className="space-y-3">
                {batches.map((batch) => (
                  <div
                    key={batch.id}
                    onClick={() => setSelectedBatch(batch)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedBatch?.id === batch.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 ring-2 ring-white'
                        : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                    }`}
                  >
                    <p className="text-white font-semibold text-sm truncate">{batch.title}</p>
                    <p className="text-purple-200 text-xs mt-1">{batch.taskCount} tasks</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-white bg-opacity-20 text-purple-100 px-2 py-1 rounded">
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
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-white border-opacity-20">
                {/* Batch Info */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{selectedBatch.title}</h3>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-purple-200 text-sm">Type</p>
                      <p className="text-white font-semibold">{selectedBatch.type}</p>
                    </div>
                    <div>
                      <p className="text-purple-200 text-sm">Tasks</p>
                      <p className="text-white font-semibold">{selectedBatch.taskCount}</p>
                    </div>
                    <div>
                      <p className="text-purple-200 text-sm">Est. Time</p>
                      <p className="text-white font-semibold">{selectedBatch.estimatedTime}</p>
                    </div>
                    <div>
                      <p className="text-purple-200 text-sm">Deadline</p>
                      <p className="text-white font-semibold">{selectedBatch.deadline}</p>
                    </div>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-white font-bold text-lg">🤖 AI Recommended Team</h4>
                    <div className="flex gap-2">
                      <button className="text-xs bg-white bg-opacity-10 text-purple-200 px-3 py-1 rounded hover:bg-opacity-20 transition">
                        Filter
                      </button>
                      <button className="text-xs bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded hover:from-green-700 hover:to-emerald-700 transition">
                        Load All
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => toggleTasker(rec.id)}
                        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                          selectedTaskers.includes(rec.id)
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-2 border-white'
                            : 'bg-white bg-opacity-10 border-2 border-transparent hover:bg-opacity-20'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={selectedTaskers.includes(rec.id)}
                            onChange={() => toggleTasker(rec.id)}
                            className="mt-1 w-5 h-5 cursor-pointer accent-purple-600"
                          />

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">{rec.avatar}</span>
                                <div>
                                  <p className="text-white font-semibold">{rec.name}</p>
                                  <p className="text-purple-300 text-xs">{rec.level}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                                  {rec.matchScore}% Match
                                </div>
                              </div>
                            </div>

                            <p className="text-purple-200 text-xs mb-2">{rec.reason}</p>

                            <div className="grid grid-cols-4 gap-2 text-xs">
                              <div>
                                <p className="text-purple-300">Accuracy</p>
                                <p className="text-white font-bold">{rec.pastAccuracy}%</p>
                              </div>
                              <div>
                                <p className="text-purple-300">Speed</p>
                                <p className="text-white font-bold">{rec.speedRating}%</p>
                              </div>
                              <div>
                                <p className="text-purple-300">Recent Tasks</p>
                                <p className="text-white font-bold">{rec.recentTasks}</p>
                              </div>
                              <div>
                                <p className="text-purple-300">Specialty</p>
                                <p className="text-white font-bold text-right">{rec.specialization}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assignment Summary */}
                <div className="border-t border-white border-opacity-10 pt-6">
                  <div className="bg-white bg-opacity-5 p-4 rounded-lg mb-4">
                    <p className="text-purple-200 text-sm mb-2">
                      ✓ Selected: {selectedTaskers.length} taskers
                    </p>
                    {selectedTaskers.length > 0 && (
                      <p className="text-green-400 text-xs">
                        Team capacity: {selectedTaskers.length * 100} tasks/week
                      </p>
                    )}
                  </div>

                  <button
                    disabled={selectedTaskers.length === 0}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {selectedTaskers.length === 0
                      ? 'Select taskers to assign'
                      : `Assign to ${selectedTaskers.length} Tasker${selectedTaskers.length !== 1 ? 's' : ''}`}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-12 border border-white border-opacity-20 text-center">
                <p className="text-purple-200 text-lg">Select a task batch to view AI recommendations</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Explanation */}
        <div className="mt-12 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
          <h4 className="text-white font-bold text-lg mb-4">🧠 How AI Matching Works</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-white bg-opacity-5 rounded-lg">
              <p className="text-yellow-400 font-bold">📊 Performance History</p>
              <p className="text-purple-200 text-xs mt-1">Analyzes past accuracy, speed, and consistency scores</p>
            </div>
            <div className="p-3 bg-white bg-opacity-5 rounded-lg">
              <p className="text-blue-400 font-bold">🎯 Task Specialization</p>
              <p className="text-purple-200 text-xs mt-1">Matches tasker specialties with task type requirements</p>
            </div>
            <div className="p-3 bg-white bg-opacity-5 rounded-lg">
              <p className="text-green-400 font-bold">⏱️ Capacity Planning</p>
              <p className="text-purple-200 text-xs mt-1">Considers current workload and deadline constraints</p>
            </div>
            <div className="p-3 bg-white bg-opacity-5 rounded-lg">
              <p className="text-purple-400 font-bold">🚀 Growth Potential</p>
              <p className="text-purple-200 text-xs mt-1">Includes learning opportunities for junior taskers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
