import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { apiService } from '../services/api';

interface TaskerOption {
  id: string;
  name: string;
  email: string;
}

interface ProjectOption {
  id: string;
  name: string;
}

export const CreateTaskPage: React.FC = () => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    assignedTo: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    dueDate: '',
  });

  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [taskers, setTaskers] = useState<TaskerOption[]>([]);
  const [filteredTaskers, setFilteredTaskers] = useState<TaskerOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchTaskers();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await apiService.getProjects();
      const data = Array.isArray(response) ? response : (response?.data || []);
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };

  const fetchTaskers = async () => {
    try {
      const response = await apiService.getUsers();
      const users = response.data || response;
      const taskerList = Array.isArray(users)
        ? users.filter((u: any) => u.role === 'tasker')
        : [];
      setTaskers(taskerList);
      setFilteredTaskers(taskerList);
    } catch (err) {
      console.error('Failed to fetch taskers:', err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      projectId: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.title || !formData.projectId || !formData.assignedTo || !formData.dueDate) {
      setError('Please fill in all required fields (Title, Project, Tasker, Due Date)');
      return;
    }

    try {
      setLoading(true);
      await apiService.createTask({
        title: formData.title,
        description: formData.description,
        projectId: formData.projectId,
        assignedTo: formData.assignedTo,
        priority: formData.priority,
        dueDate: formData.dueDate,
      });

      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        projectId: '',
        assignedTo: '',
        priority: 'medium',
        dueDate: '',
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Failed to create task:', err);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'pl' && user?.role !== 'ql') {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-slate-600 mt-2">Only Project Leads and Quality Leads can create tasks.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Create New Task</h1>
          <p className="text-slate-600 mt-2">
            {user?.role === 'pl'
              ? 'As Project Lead, you can create tasks for any tasker'
              : 'As Quality Lead, you can create tasks for your team members'}
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-emerald-600 font-semibold">✓ Task created successfully!</span>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-red-600 font-semibold">✕ {error}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          {/* Task Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Database Schema Design"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">A clear, concise title for the task</p>
          </div>

          {/* Task Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Task Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe what needs to be done..."
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Detailed instructions and requirements</p>
          </div>

          {/* Project Selection */}
          <div className="mb-6">
            <label htmlFor="projectId" className="block text-sm font-semibold text-gray-700 mb-2">
              Project *
            </label>
            <select
              id="projectId"
              name="projectId"
              value={formData.projectId}
              onChange={handleProjectChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            {projects.length === 0 && (
              <p className="text-xs text-orange-600 mt-1">No projects available. Contact admin.</p>
            )}
          </div>

          {/* Tasker Assignment */}
          <div className="mb-6">
            <label htmlFor="assignedTo" className="block text-sm font-semibold text-gray-700 mb-2">
              Assign To *
            </label>
            <select
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="">Select a tasker</option>
              {filteredTaskers.map((tasker) => (
                <option key={tasker.id} value={tasker.id}>
                  {tasker.name} ({tasker.email})
                </option>
              ))}
            </select>
            {filteredTaskers.length === 0 && (
              <p className="text-xs text-orange-600 mt-1">No taskers available.</p>
            )}
          </div>

          {/* Grid for Priority and Due Date */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-700 mb-2">
                Due Date *
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Task Summary */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Task Summary</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                <strong>Title:</strong> {formData.title || '—'}
              </li>
              <li>
                <strong>Project:</strong>{' '}
                {projects.find((p) => p.id === formData.projectId)?.name || '—'}
              </li>
              <li>
                <strong>Assigned To:</strong>{' '}
                {filteredTaskers.find((t) => t.id === formData.assignedTo)?.name || '—'}
              </li>
              <li>
                <strong>Priority:</strong>{' '}
                <span className={`font-semibold capitalize ${
                  formData.priority === 'critical'
                    ? 'text-red-600'
                    : formData.priority === 'high'
                    ? 'text-orange-600'
                    : 'text-blue-600'
                }`}>
                  {formData.priority}
                </span>
              </li>
              <li>
                <strong>Due Date:</strong> {formData.dueDate || '—'}
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 cursor-pointer"
            >
              {loading ? 'Creating Task...' : 'Create Task'}
            </button>
            <button
              type="reset"
              onClick={() => {
                setFormData({
                  title: '',
                  description: '',
                  projectId: '',
                  assignedTo: '',
                  priority: 'medium',
                  dueDate: '',
                });
                setError('');
              }}
              className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Clear Form
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">📋 Task Creation Guidelines</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>✓ Be clear and specific in task descriptions</li>
            <li>✓ Set realistic due dates based on task complexity</li>
            <li>✓ Choose appropriate priority levels</li>
            <li>✓ Assign to taskers based on their specialization</li>
            <li>✓ {user?.role === 'ql' ? 'You can only assign to your team members' : 'As PL, you can assign to any tasker'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
