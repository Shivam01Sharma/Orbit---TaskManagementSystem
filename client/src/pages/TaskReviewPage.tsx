import React, { useState } from 'react';
// Rendered inside DashboardLayout

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
    alert(`Task approved with ${accuracy * 20}% accuracy score`);
    setSelectedTask(null);
  };

  const handleReject = () => {
    alert('Task rejected. Feedback sent to tasker.');
    setSelectedTask(null);
  };

  const handleRequestRevision = () => {
    alert('Revision requested. Tasker notified.');
    setSelectedTask(null);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Task Quality Review</h1>
          <p className="text-slate-600 text-lg">Review & approve quality of submitted tasks</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review Queue */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <h2 className="text-slate-900 font-bold text-lg mb-4">Review Queue ({tasks.length})</h2>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedTask?.id === task.id
                        ? 'bg-slate-100 ring-2 ring-slate-200'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <p className="text-slate-900 font-semibold text-sm">{task.taskTitle}</p>
                    <p className="text-slate-500 text-xs mt-1">{task.tasker}</p>
                    <p className="text-slate-400 text-xs mt-1">{task.submittedAt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Review Panel */}
          <div className="lg:col-span-2">
            {selectedTask ? (
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                {/* Task Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{selectedTask.taskTitle}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-slate-500 text-sm">Tasker</p>
                      <p className="text-slate-900 font-semibold">{selectedTask.tasker}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Submitted</p>
                      <p className="text-slate-900 font-semibold">{selectedTask.submittedAt}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <p className="text-slate-700 text-sm">{selectedTask.description}</p>
                  </div>
                </div>

                {/* Accuracy Score */}
                <div className="mb-4">
                  <label className="block text-slate-900 font-semibold mb-2">Accuracy Score (1-10)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={accuracy}
                      onChange={(e) => setAccuracy(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                    <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold min-w-12 text-center">
                      {accuracy * 10}%
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-1 mt-3 text-xs text-slate-500">
                    <span>Poor</span>
                    <span>Fair</span>
                    <span className="text-center">Good</span>
                    <span className="text-right">V.Good</span>
                    <span className="text-right">Perfect</span>
                  </div>
                </div>

                {/* Feedback */}
                <div className="mb-4">
                  <label className="block text-slate-900 font-semibold mb-2">Feedback / Comments</label>
                  <textarea
                    value={reviewFeedback}
                    onChange={(e) => setReviewFeedback(e.target.value)}
                    placeholder="Enter your feedback for the tasker..."
                    className="w-full h-32 bg-white border border-gray-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-600 p-4"
                  />
                </div>

                {/* Decision Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={handleApprove}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleRequestRevision}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
                  >
                    Request Revision
                  </button>
                  <button
                    onClick={handleReject}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
                  >
                    Reject
                  </button>
                </div>

                {/* Recent Activity */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h4 className="text-slate-900 font-semibold mb-2">Review History</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-700">
                      <span className="text-green-500">✓</span> Shivam approved · <span className="text-slate-500">2 reviews ago</span>
                    </p>
                    <p className="text-slate-700">
                      <span className="text-yellow-500">⊙</span> Lakshya requested revision · <span className="text-slate-500">5 reviews ago</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 border border-gray-100 text-center">
                <p className="text-slate-500 text-lg">Select a task from the queue to begin review</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-slate-500 text-sm mb-2">Reviewed Today</p>
            <p className="text-2xl font-bold text-slate-900">24</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-slate-500 text-sm mb-2">Approved</p>
            <p className="text-2xl font-bold text-green-600">18</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-slate-500 text-sm mb-2">Revisions Requested</p>
            <p className="text-2xl font-bold text-amber-500">4</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-slate-500 text-sm mb-2">Rejected</p>
            <p className="text-2xl font-bold text-red-600">2</p>
          </div>
        </div>
      </div>
    </div>
  );
};
