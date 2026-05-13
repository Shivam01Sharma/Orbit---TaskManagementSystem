import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';

interface ReviewTask {
  id: string;
  tasker: string;
  taskTitle: string;
  description: string;
  submittedAt: string;
  accuracy?: number;
  feedback?: string;
}

export const TaskReviewPage: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<ReviewTask | null>(null);
  const [reviewFeedback, setReviewFeedback] = useState('');
  const [accuracy, setAccuracy] = useState(5);

  const tasks: ReviewTask[] = [
    {
      id: 'task-1',
      tasker: 'Ribhav Kumar',
      taskTitle: 'Image Annotation - Set A',
      description: '500 images to be labeled for AI training dataset',
      submittedAt: '2 hours ago',
    },
    {
      id: 'task-2',
      tasker: 'Divya Sharma',
      taskTitle: 'Text Classification',
      description: '1000 text samples for sentiment analysis',
      submittedAt: '4 hours ago',
    },
    {
      id: 'task-3',
      tasker: 'Arun Verma',
      taskTitle: 'Audio Transcription',
      description: '50 audio files for transcription',
      submittedAt: '1 day ago',
    },
    {
      id: 'task-4',
      tasker: 'Priyanshu G',
      taskTitle: 'Data Validation',
      description: 'Validate cleaned dataset',
      submittedAt: '3 days ago',
    },
  ];

  const handleApprove = () => {
    alert(`✅ Task approved with ${accuracy * 20}% accuracy score`);
    setSelectedTask(null);
  };

  const handleReject = () => {
    alert(`❌ Task rejected. Feedback sent to tasker.`);
    setSelectedTask(null);
  };

  const handleRequestRevision = () => {
    alert(`🔄 Revision requested. Tasker notified.`);
    setSelectedTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white">Task Quality Review</h1>
          <p className="text-purple-200 text-lg">Review & approve quality of submitted tasks</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review Queue */}
          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
              <h2 className="text-white font-bold text-lg mb-4">⏳ Review Queue ({tasks.length})</h2>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedTask?.id === task.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 ring-2 ring-white'
                        : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                    }`}
                  >
                    <p className="text-white font-semibold text-sm">{task.taskTitle}</p>
                    <p className="text-purple-200 text-xs mt-1">{task.tasker}</p>
                    <p className="text-purple-300 text-xs mt-1">{task.submittedAt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Review Panel */}
          <div className="lg:col-span-2">
            {selectedTask ? (
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-white border-opacity-20">
                {/* Task Info */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedTask.taskTitle}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-purple-200 text-sm">Tasker</p>
                      <p className="text-white font-semibold">{selectedTask.tasker}</p>
                    </div>
                    <div>
                      <p className="text-purple-200 text-sm">Submitted</p>
                      <p className="text-white font-semibold">{selectedTask.submittedAt}</p>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-5 rounded-lg p-4 border border-white border-opacity-10">
                    <p className="text-purple-100 text-sm">{selectedTask.description}</p>
                  </div>
                </div>

                {/* Accuracy Score */}
                <div className="mb-6">
                  <label className="block text-white font-semibold mb-3">Accuracy Score (1-10)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={accuracy}
                      onChange={(e) => setAccuracy(Number(e.target.value))}
                      className="flex-1 h-2 bg-white bg-opacity-20 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-bold min-w-12 text-center">
                      {accuracy * 10}%
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-1 mt-3 text-xs text-purple-300">
                    <span>Poor</span>
                    <span>Fair</span>
                    <span className="text-center">Good</span>
                    <span className="text-right">V.Good</span>
                    <span className="text-right">Perfect</span>
                  </div>
                </div>

                {/* Feedback */}
                <div className="mb-6">
                  <label className="block text-white font-semibold mb-3">Feedback / Comments</label>
                  <textarea
                    value={reviewFeedback}
                    onChange={(e) => setReviewFeedback(e.target.value)}
                    placeholder="Enter your feedback for the tasker..."
                    className="w-full h-32 bg-white bg-opacity-10 border border-purple-300 border-opacity-30 rounded-lg text-white placeholder-purple-300 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500 p-4"
                  />
                </div>

                {/* Decision Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={handleApprove}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition duration-300"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={handleRequestRevision}
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-yellow-700 hover:to-orange-700 transition duration-300"
                  >
                    🔄 Revision
                  </button>
                  <button
                    onClick={handleReject}
                    className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition duration-300"
                  >
                    ❌ Reject
                  </button>
                </div>

                {/* Recent Activity */}
                <div className="mt-8 pt-6 border-t border-white border-opacity-10">
                  <h4 className="text-white font-semibold mb-3">📝 Review History</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-purple-200">
                      <span className="text-green-400">✓</span> Shivam approved · <span className="text-purple-300">2 reviews ago</span>
                    </p>
                    <p className="text-purple-200">
                      <span className="text-yellow-400">⊙</span> Lakshya requested revision · <span className="text-purple-300">5 reviews ago</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-12 border border-white border-opacity-20 text-center">
                <p className="text-purple-200 text-lg">Select a task from the queue to begin review</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
            <p className="text-purple-200 text-sm mb-2">Reviewed Today</p>
            <p className="text-4xl font-bold text-white">24</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
            <p className="text-purple-200 text-sm mb-2">Approved</p>
            <p className="text-4xl font-bold text-green-400">18</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
            <p className="text-purple-200 text-sm mb-2">Revisions Requested</p>
            <p className="text-4xl font-bold text-yellow-400">4</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
            <p className="text-purple-200 text-sm mb-2">Rejected</p>
            <p className="text-4xl font-bold text-red-400">2</p>
          </div>
        </div>
      </div>
    </div>
  );
};
