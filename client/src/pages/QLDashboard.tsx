import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { StatCard } from '../components/StatCard';
import { Navbar } from '../components/Navbar';

interface ProjectDetail {
  id: string;
  name: string;
  description: string;
  status: string;
  teams: any[];
  taskCount: number;
  completedTasks: number;
}

interface TeamDetail {
  id: string;
  name: string;
  projectName: string;
  projectId: string;
  memberCount: number;
  members: any[];
  taskCount: number;
  completedTasks: number;
}

export const QLDashboard: React.FC = () => {
  // const { user } = useAuthStore();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    pendingTasks: 0,
    taskersCount: 0,
    projectsCount: 0,
    teamSize: 0,
  });
  const [projects, setProjects] = useState<ProjectDetail[]>([]);
  const [teams, setTeams] = useState<TeamDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'teams'>('projects');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch stats
      const dashboardStats = await apiService.getDashboardStats();
      setStats(dashboardStats.data);

      // Fetch QL's projects
      const projectsData = await apiService.getQLProjects();
      setProjects(projectsData.data || projectsData);

      // Fetch QL's teams
      const teamsData = await apiService.getQLTeams();
      setTeams(teamsData.data || teamsData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Quality Leader Dashboard 👥
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your teams, assign tasks, and track progress
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
            label="Total Tasks"
            value={stats.totalTasks}
            trend={`${stats.completedTasks} completed`}
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
            value={stats.inProgressTasks}
            trend="Being worked on"
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
                  d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM16 11h4"
                />
              </svg>
            }
            label="Team Members"
            value={stats.taskersCount}
            trend={`${stats.teamSize} team(s)`}
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            label="Completed"
            value={stats.completedTasks}
            trend={`${Math.round((stats.completedTasks / Math.max(stats.totalTasks, 1)) * 100)}% completion`}
            color="accent"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'projects'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('teams')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'teams'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Teams ({teams.length})
          </button>
        </div>

        {/* Projects View */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 gap-6">
            {projects.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-500 text-lg">
                  No projects assigned yet. Wait for the Project Leader to assign projects.
                </p>
              </div>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg card-shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {project.description}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {project.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600 text-sm">Teams</p>
                      <p className="text-2xl font-bold text-primary-600">
                        {project.teams.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Tasks</p>
                      <p className="text-2xl font-bold text-secondary-600">
                        {project.taskCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Completed</p>
                      <p className="text-2xl font-bold text-accent-600">
                        {project.completedTasks}
                      </p>
                    </div>
                  </div>

                  {project.teams.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-medium text-gray-700 mb-3">
                        Teams in this project:
                      </p>
                      <div className="space-y-2">
                        {project.teams.map((team) => (
                          <div
                            key={team.id}
                            className="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
                          >
                            <div>
                              <p className="font-medium text-gray-900">{team.name}</p>
                              <p className="text-xs text-gray-600">
                                {team.memberCount} member(s)
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Teams View */}
        {activeTab === 'teams' && (
          <div className="grid grid-cols-1 gap-6">
            {teams.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-500 text-lg">
                  No teams assigned yet. Wait for the Project Leader to create teams.
                </p>
              </div>
            ) : (
              teams.map((team) => (
                <div key={team.id} className="bg-white rounded-lg card-shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {team.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Project: <span className="font-medium">{team.projectName}</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600 text-sm">Members</p>
                      <p className="text-2xl font-bold text-primary-600">
                        {team.memberCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Tasks</p>
                      <p className="text-2xl font-bold text-secondary-600">
                        {team.taskCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Completed</p>
                      <p className="text-2xl font-bold text-accent-600">
                        {team.completedTasks}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Team Members:
                    </p>
                    <div className="space-y-2">
                      {team.members.map((member) => (
                        <div
                          key={member.id}
                          className="p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-xs text-gray-600">{member.email}</p>
                          </div>
                          <div className="text-right text-sm">
                            <p className="text-gray-700">
                              <span className="font-bold text-secondary-600">
                                {member.assignedTasks}
                              </span>{' '}
                              tasks
                            </p>
                            <p className="text-gray-600">
                              {member.completedTasks} done
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full mt-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium">
                    + Assign Tasks
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
