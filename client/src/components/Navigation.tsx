import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Navigation: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const DashboardIcon = (
    <svg className="w-5 h-5 text-purple-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-6H3v6z" fill="currentColor" />
    </svg>
  );

  const LeaderboardIcon = (
    <svg className="w-5 h-5 text-purple-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3v18h2V3H5zm6 6v12h2V9h-2zM17 13v8h2v-8h-2z" fill="currentColor" />
    </svg>
  );

  const AnalyticsIcon = (
    <svg className="w-5 h-5 text-purple-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3v18h18v-2H5V3H3zm6 6h2v8H9V9zm4-4h2v12h-2V5zm4 8h2v4h-2v-4z" fill="currentColor" />
    </svg>
  );

  const ReviewIcon = (
    <svg className="w-5 h-5 text-purple-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 5v14h18V5H3zm2 2h14v10H5V7zm3 2v6l5-3-5-3z" fill="currentColor" />
    </svg>
  );

  const ChatIcon = (
    <svg className="w-5 h-5 text-purple-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v14l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor" />
    </svg>
  );

  const TimelineIcon = (
    <svg className="w-5 h-5 text-purple-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 10h2V7H7v3zm4 7h2v-7h-2v7zM3 21h18v-2H3v2zm4-14h2V3H7v4z" fill="currentColor" />
    </svg>
  );

  const BadgesIcon = (
    <svg className="w-5 h-5 text-purple-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3 6 6 .5-4.5 3.5L18 20l-6-3-6 3 .5-7-4.5-3.5L9 8l3-6z" fill="currentColor" />
    </svg>
  );

  const AssignmentIcon = (
    <svg className="w-5 h-5 text-purple-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3h18v2H3V3zm2 4h14v14H5V7zm3 3v8h2v-8H8zm4 0v8h6v-8h-6z" fill="currentColor" />
    </svg>
  );

  const TeamIcon = (
    <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5C23 14.17 18.33 13 16 13z" fill="currentColor" />
    </svg>
  );

  const ProjectsIcon = (
    <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-6H3v6z" fill="currentColor" />
    </svg>
  );

  const MyTasksIcon = (
    <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 11H7v2h2v-2zm0-4H7v2h2V7zm0 8H7v2h2v-2zM13 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6v-2z" fill="currentColor" />
    </svg>
  );

  const CreateIcon = (
    <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z" fill="currentColor" />
    </svg>
  );

  const navItems = [
    { path: '/dashboard', icon: DashboardIcon, label: 'Dashboard', roles: ['pl', 'ql', 'tasker'] },
    { path: '/team', icon: TeamIcon, label: 'Team', roles: ['pl', 'ql', 'tasker'] },
    { path: '/projects', icon: ProjectsIcon, label: 'Projects', roles: ['pl', 'ql', 'tasker'] },
    { path: '/leaderboard', icon: LeaderboardIcon, label: 'Leaderboard', roles: ['pl', 'ql', 'tasker'] },
    { path: '/analytics', icon: AnalyticsIcon, label: 'Analytics', roles: ['pl', 'ql'] },
    { path: '/chat', icon: ChatIcon, label: 'Chat', roles: ['pl', 'ql', 'tasker'] },
    { path: '/assignment', icon: AssignmentIcon, label: 'Assignment', roles: ['pl', 'ql', 'tasker'] },
    { path: '/my-tasks', icon: MyTasksIcon, label: 'My Tasks', roles: ['tasker'] },
  ];

  const filteredItems = navItems.filter((item) => item.roles.includes(user?.role || ''));
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-r border-white border-opacity-10 shadow-2xl z-50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white border-opacity-10">
        <Link to="/dashboard" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
          </div>
          <div>
            <p className="text-white font-bold text-lg">Orbit</p>
            <p className="text-purple-300 text-xs">AI Platform</p>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="px-6 py-4 border-b border-white border-opacity-10">
        <p className="text-purple-200 text-xs uppercase tracking-wider mb-2">Logged in as</p>
        <p className="text-white font-semibold">{user?.name}</p>
        <p className="text-purple-300 text-xs capitalize mt-1">{user?.role === 'pl' ? 'Project Lead' : user?.role === 'ql' ? 'Quality Lead' : 'Tasker'}</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive(item.path)
                  ? 'bg-white text-gray-900 font-semibold shadow-sm'
                  : 'text-slate-300 hover:bg-white hover:text-gray-900'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white border-opacity-10">
        <button
          onClick={() => logout()}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white bg-opacity-10 text-gray-900 rounded-lg font-semibold hover:bg-opacity-20 transition-all duration-300"
        >
          <svg className="w-5 h-5 text-gray-900 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 13v-2H7V7l-5 5 5 5v-4h9zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="currentColor"/>
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};
