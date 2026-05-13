import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Navigation: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard', roles: ['tasker', 'ql', 'pl'] },
    { path: '/leaderboard', icon: '🏆', label: 'Leaderboard', roles: ['tasker', 'ql', 'pl'] },
    { path: '/analytics', icon: '📈', label: 'Analytics', roles: ['ql', 'pl'] },
    { path: '/review', icon: '📋', label: 'Task Review', roles: ['ql', 'pl'] },
    { path: '/chat', icon: '💬', label: 'Chat', roles: ['tasker', 'ql', 'pl'] },
    { path: '/timeline', icon: '📅', label: 'Timeline', roles: ['pl'] },
    { path: '/badges', icon: '🎖️', label: 'Badges', roles: ['tasker'] },
    { path: '/assignment', icon: '🤖', label: 'Smart Assign', roles: ['pl'] },
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
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-purple-200 hover:bg-white hover:bg-opacity-10'
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
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};
