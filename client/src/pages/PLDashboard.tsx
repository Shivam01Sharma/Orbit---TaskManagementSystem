import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { apiService } from '../services/api';
import { StatCard } from '../components/StatCard';
import { AssignResourcesModal } from '../components/AssignResourcesModal';
import { TaskAssignmentModal } from '../components/TaskAssignmentModal';
// import { Navigation } from '../components/Navigation';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed';
  taskersCount: number;
  qlCount: number;
  completionPercentage: number;
}

interface QualityLeader {
  id: string;
  name: string;
  projects: number;
  taskers: number;
  status: string;
}

interface Tasker {
  id: string;
  name: string;
  currentProject: string;
  pastProjects: string[];
  assignedQL: string;
  tasksCompleted: number;
  status: string;
}

export const PLDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeProjects: 0,
    taskerCount: 0,
    qlCount: 0,
    pendingAssignments: 0,
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [qualityLeaders, setQualityLeaders] = useState<QualityLeader[]>([]);
  const [taskers, setTaskers] = useState<Tasker[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isTaskAssignmentOpen, setIsTaskAssignmentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'taskers' | 'qls' | 'orgchart'>('overview');
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    deadline: '',
    classification: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch projects
      const projectsResponse = await apiService.getProjects();
      const projectsData = (Array.isArray(projectsResponse) ? projectsResponse : (projectsResponse?.data || [])).filter(
        (proj: any) => proj.status === 'active'
      );
      const enrichedProjects = projectsData.map((proj: any) => ({
        ...proj,
        taskersCount: Math.floor(Math.random() * 50) + 10,
        qlCount: Math.floor(Math.random() * 5) + 1,
        completionPercentage: Math.floor(Math.random() * 100),
      }));
      setProjects(enrichedProjects);

      // Fetch all users
      const usersResponse = await apiService.getUsers();
      const users = usersResponse.data || usersResponse;
      const userList = Array.isArray(users) ? users : [];
      
      // Filter by role
      const qls = userList.filter((u: any) => u.role === 'ql');
      const taskersData = userList.filter((u: any) => u.role === 'tasker');

      // Fetch dashboard stats
      // const dashboardStats = await apiService.getDashboardStats();
      setStats({
        activeProjects: projectsData.filter((p: any) => p.status === 'active').length,
        taskerCount: taskersData.length || 9,
        qlCount: qls.length || 2,
        pendingAssignments: Math.floor(Math.random() * 5) + 1,
      });

      // Enrich Quality Leaders data
      const enrichedQls = qls.map((ql: any) => ({
        id: ql.id,
        name: ql.name,
        projects: Math.floor(Math.random() * 3) + 1,
        taskers: Math.floor(Math.random() * 30) + 5,
        status: 'active',
      }));
      setQualityLeaders(enrichedQls);

      // Enrich Taskers data
      const enrichedTaskers = taskersData.map((tasker: any) => ({
        id: tasker.id,
        name: tasker.name,
        currentProject: enrichedProjects[Math.floor(Math.random() * enrichedProjects.length)]?.name || 'Unassigned',
        pastProjects: ['Project Alpha', 'CloudSync Migration 2026'].slice(0, Math.floor(Math.random() * 3)),
        assignedQL: qls[Math.floor(Math.random() * qls.length)]?.name || 'Unassigned',
        tasksCompleted: Math.floor(Math.random() * 50) + 1,
        status: ['active', 'on-leave', 'idle'][Math.floor(Math.random() * 3)],
      }));
      setTaskers(enrichedTaskers);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAssignModal = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsAssignModalOpen(true);
  };

  const handleAssignSuccess = () => {
    fetchData();
  };

  const handleCreateProject = async () => {
    if (!newProject.name || !newProject.description) {
      alert('Please fill in project name and description');
      return;
    }

    try {
      setLoading(true);
      const projectData = {
        name: newProject.name,
        description: newProject.description,
        startDate: new Date().toISOString(),
        endDate: newProject.deadline ? new Date(newProject.deadline).toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Default 30 days if no deadline
      };

      const response = await apiService.createProject(projectData);
      console.log('Project created:', response);

      // Reset form and close modal
      setNewProject({ name: '', description: '', deadline: '', classification: '' });
      setIsCreateProjectOpen(false);

      // Refresh dashboard data
      await fetchData();
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Project Leader Dashboard
            </h1>
            <p className="text-slate-600 mt-2 text-lg">
              Manage projects, allocate teams, and oversee organizational metrics
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/create-task')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm flex items-center gap-2"
            >
              Create Task
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            label="Active Projects"
            value={stats.activeProjects}
            trend="Running smoothly"
            color="primary"
          />

          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM16 11h4" />
              </svg>
            }
            label="Total Taskers"
            value={stats.taskerCount}
            trend="Platform Capacity"
            color="secondary"
          />

          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 10H9m6 0h.01M9 10h.01" />
              </svg>
            }
            label="Quality Leaders"
            value={stats.qlCount}
            color="accent"
          />

          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            label="Pending Assignments"
            value={stats.pendingAssignments}
            color="warning"
          />
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('taskers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'taskers'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              All Taskers ({stats.taskerCount})
            </button>
            <button
              onClick={() => setActiveTab('qls')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'qls'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Quality Leaders ({stats.qlCount})
            </button>
            <button
              onClick={() => setActiveTab('orgchart')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'orgchart'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Org Chart
            </button>
          </div>
        </div>

        {/* TAB CONTENT: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Projects Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
                  <button
                    onClick={() => setIsCreateProjectOpen(true)}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-medium text-sm"
                  >
                    + Create Project
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg shadow p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            project.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-gray-600 text-sm">Completion</p>
                          <p className="text-2xl font-bold text-primary-600">{project.completionPercentage}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Quality Leaders</p>
                          <p className="text-2xl font-bold text-secondary-600">{project.qlCount}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Taskers</p>
                          <p className="text-2xl font-bold text-accent-600">{project.taskersCount}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenAssignModal(project.id)}
                        className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm mb-2"
                      >
                        + Assign QL & Taskers
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProjectId(project.id);
                          setIsTaskAssignmentOpen(true);
                        }}
                        className="w-full py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition font-medium text-sm"
                      >
                        + Assign Tasks
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality Leaders Overview */}
            <div className="bg-white rounded-lg shadow p-6 h-fit">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quality Leaders</h2>

              <div className="space-y-4">
                {qualityLeaders.map((ql) => (
                  <div key={ql.id} className="p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{ql.name}</h3>
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-1"></span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <p className="text-gray-600">Projects</p>
                        <p className="font-bold text-primary-600">{ql.projects}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Taskers</p>
                        <p className="font-bold text-secondary-600">{ql.taskers}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => alert(`Managing ${ql.name}'s team`)}
                      className="w-full py-1.5 text-xs border border-primary-300 text-primary-600 rounded hover:bg-primary-50 transition font-medium">
                      Manage
                    </button>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsAssignModalOpen(true)}
                className="w-full mt-4 py-2 border border-accent-500 text-accent-600 rounded-lg hover:bg-accent-50 transition font-medium text-sm">
                Allocate Resources
              </button>
            </div>
          </div>
        )}

        {/* TAB CONTENT: ALL TASKERS */}
        {activeTab === 'taskers' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tasker ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Current Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Assigned QL</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tasks Completed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {taskers.map((tasker) => (
                    <tr key={tasker.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-semibold text-primary-600">{tasker.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{tasker.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{tasker.currentProject}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{tasker.assignedQL}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{tasker.tasksCompleted}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            tasker.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : tasker.status === 'on-leave'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {tasker.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB CONTENT: QUALITY LEADERS */}
        {activeTab === 'qls' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">QL ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Assigned Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Team Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {qualityLeaders.map((ql) => (
                    <tr key={ql.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-semibold text-accent-600">{ql.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{ql.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {projects[0]?.name || 'Project Alpha — AI Data Annotation 2025'}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{ql.taskers} Taskers</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {ql.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-primary-600 hover:text-primary-700 font-medium">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB CONTENT: ORG CHART */}
        {activeTab === 'orgchart' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Organization Chart</h2>

            {/* PL (You) */}
            <div className="flex flex-col items-center mb-12">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-lg p-4 min-w-max shadow-lg">
                <p className="text-sm font-medium">Project Leader</p>
                <p className="text-lg font-bold">{user?.name}</p>
                <p className="text-xs text-primary-100 mt-1">{user?.id}</p>
              </div>

              {/* Vertical line */}
              <div className="w-0.5 h-8 bg-gray-300 my-2"></div>
            </div>

            {/* QLs Level */}
            <div className="mb-8">
              <p className="text-center text-xs text-gray-600 font-medium mb-4 uppercase">Quality Leaders ({qualityLeaders.length})</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {qualityLeaders.map((ql) => (
                  <div key={ql.id} className="flex flex-col items-center">
                    <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 text-white rounded-lg p-4 min-w-max text-center shadow-md w-full">
                      <p className="text-sm font-medium">Quality Leader</p>
                      <p className="text-base font-bold">{ql.name.split(' ')[0]}</p>
                      <p className="text-xs text-secondary-100 mt-1">{ql.id}</p>
                      <p className="text-xs text-secondary-200 mt-2">{ql.taskers} Taskers</p>
                    </div>
                    <div className="w-0.5 h-6 bg-gray-300 my-2"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Horizontal line for QLs */}
            <div className="flex justify-center mb-8">
              <div className="h-0.5 bg-gray-300" style={{ width: '80%' }}></div>
            </div>

            {/* Taskers Level */}
            <div>
              <p className="text-center text-xs text-gray-600 font-medium mb-4 uppercase">Taskers ({taskers.length})</p>
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-3">
                {taskers.map((tasker) => (
                  <div key={tasker.id} className="flex flex-col items-center">
                    <div className="bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-lg p-2 min-w-max text-center shadow-sm w-full">
                      <p className="text-xs font-medium truncate">{tasker.name.split(' ')[0]}</p>
                      <p className="text-xs font-bold text-accent-100">{tasker.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-600 font-medium mb-4 uppercase">Legend</p>
              <div className="grid grid-cols-3 gap-6">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-gradient-to-br from-primary-500 to-primary-600"></div>
                  <p className="text-sm text-gray-700">Project Leader (You)</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-gradient-to-br from-secondary-500 to-secondary-600"></div>
                  <p className="text-sm text-gray-700">Quality Leaders</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-gradient-to-br from-accent-500 to-accent-600"></div>
                  <p className="text-sm text-gray-700">Taskers</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Organization Overview */}
        {activeTab === 'overview' && (
          <div className="mt-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg p-8 text-white shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-primary-100 text-sm font-medium">Platform Utilization</p>
                <p className="text-4xl font-bold mt-2">87%</p>
                <p className="text-primary-100 text-xs mt-2">Resources optimally allocated</p>
              </div>
              <div>
                <p className="text-primary-100 text-sm font-medium">Project Success Rate</p>
                <p className="text-4xl font-bold mt-2">94%</p>
                <p className="text-primary-100 text-xs mt-2">On-time project completion</p>
              </div>
              <div>
                <p className="text-primary-100 text-sm font-medium">Team Performance</p>
                <p className="text-4xl font-bold mt-2">9.2/10</p>
                <p className="text-primary-100 text-xs mt-2">Average quality score</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {isCreateProjectOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="Project Alpha — AI Data Annotation 2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Project description..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Classification</label>
                <select
                  value={newProject.classification}
                  onChange={(e) => setNewProject({ ...newProject, classification: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select classification</option>
                  <option value="data-annotation">Data Annotation</option>
                  <option value="content-moderation">Content Moderation</option>
                  <option value="research">Research</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setIsCreateProjectOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      <AssignResourcesModal
        isOpen={isAssignModalOpen}
        projectId={selectedProjectId}
        onClose={() => setIsAssignModalOpen(false)}
        onAssign={handleAssignSuccess}
      />

      <TaskAssignmentModal
        isOpen={isTaskAssignmentOpen}
        projectId={selectedProjectId}
        onClose={() => setIsTaskAssignmentOpen(false)}
        onAssign={() => {
          fetchData();
          setIsTaskAssignmentOpen(false);
        }}
      />
    </div>
  );
};
