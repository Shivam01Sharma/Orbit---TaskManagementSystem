import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { apiService } from '../services/api';
import { StatCard } from '../components/StatCard';
import { Navbar } from '../components/Navbar';

interface Task {
  id: string;
  title: string;
  projectId: string;
  projectName?: string;
  status: 'pending' | 'in-progress' | 'review' | 'completed';
  dueDate: string;
  completionPercentage: number;
  priority: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
}

export const TaskerDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    assigned: 0,
    inProgress: 0,
    completed: 0,
    pending: 0,
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isPerformingTask, setIsPerformingTask] = useState(false);
  const [taskProgress, setTaskProgress] = useState(0);
  const [workDone, setWorkDone] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch tasker's projects
      const projectsResponse = await apiService.getProjects();
      const projectsData = Array.isArray(projectsResponse) ? projectsResponse : (projectsResponse?.data || []);
      setProjects(projectsData);

      // Fetch dashboard stats
      const statsResponse = await apiService.getDashboardStats();
      setStats(statsResponse.data || statsResponse);

      // Fetch tasker's tasks
      const tasksResponse = await apiService.getTasks();
      const tasksData = Array.isArray(tasksResponse) ? tasksResponse : (tasksResponse?.data || []);
      
      // Enrich tasks with project names
      const enrichedTasks = tasksData.map((task: any) => {
        const project = projectsData.find((p: any) => p.id === task.projectId);
        return {
          ...task,
          projectName: project?.name || 'Unknown Project',
        };
      });

      setRecentTasks(enrichedTasks.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch tasker data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePerformTask = (task: Task) => {
    setSelectedTask(task);
    setTaskProgress(task.completionPercentage);
    setIsPerformingTask(true);
    setWorkDone('');
  };

  const handleSubmitWork = async () => {
    if (!selectedTask || !workDone.trim()) {
      alert('Please add work description');
      return;
    }

    alert(`Work submitted for "${selectedTask.title}":\n\nProgress: ${taskProgress}%\n\n${workDone}`);
    setIsPerformingTask(false);
    setSelectedTask(null);
    setWorkDone('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Here's your daily task overview and progress tracking
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              }
              label="Assigned Tasks"
              value={stats.assigned}
              color="primary"
            />

            <StatCard
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              }
              label="In Progress"
              value={stats.inProgress}
              trend="+2 this week"
              color="secondary"
            />

            <StatCard
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              label="Completed"
              value={stats.completed}
              trend="+5 this month"
              color="accent"
            />

            <StatCard
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              label="Pending"
              value={stats.pending}
              color="warning"
            />
          </div>

          {/* Current Project & Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Current Project */}
            {projects.length > 0 && (
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-lg font-bold mb-2">Current Project</h3>
                  <p className="text-primary-100 text-sm mb-4">{projects[0]?.description}</p>
                  <div>
                    <p className="text-2xl font-bold">{projects[0]?.name}</p>
                    <p className="text-primary-100 text-xs mt-2">Status: {projects[0]?.status}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Tasks */}
            <div className={projects.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3'}>
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Recent Tasks</h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Task</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Project</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Progress</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentTasks.length > 0 ? (
                        recentTasks.map((task) => (
                          <tr key={task.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <p className="font-medium text-gray-900">{task.title}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <p className="text-sm text-gray-600">{task.projectName}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-primary-500 h-2 rounded-full"
                                    style={{ width: `${task.completionPercentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs font-medium text-gray-700">{task.completionPercentage}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  task.status === 'in-progress'
                                    ? 'bg-primary-100 text-primary-800'
                                    : task.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {task.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{task.dueDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handlePerformTask(task)}
                                className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded hover:bg-primary-600 transition"
                              >
                                Perform
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                            No tasks assigned yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Perform Task Modal */}
      {isPerformingTask && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Perform Task</h3>
              <button
                onClick={() => setIsPerformingTask(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Task</p>
                <p className="text-gray-900 font-semibold">{selectedTask.title}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">Current Progress</p>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={taskProgress}
                    onChange={(e) => setTaskProgress(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-bold text-primary-600 w-12">{taskProgress}%</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Work Done</label>
                <textarea
                  value={workDone}
                  onChange={(e) => setWorkDone(e.target.value)}
                  placeholder="Describe what you've accomplished..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={4}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setIsPerformingTask(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitWork}
                  className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
