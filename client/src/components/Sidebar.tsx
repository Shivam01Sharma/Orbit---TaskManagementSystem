import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles?: string[];
}

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard', roles: ['pl','ql','tasker'] },
    { label: 'Team', path: '/team', icon: 'team', roles: ['pl','ql','tasker'] },
    { label: 'Projects', path: '/projects', icon: 'projects', roles: ['pl','ql','tasker'] },
    { label: 'Leaderboard', path: '/leaderboard', icon: 'leaderboard', roles: ['pl','ql','tasker'] },
    { label: 'Analytics', path: '/analytics', icon: 'analytics', roles: ['pl','ql'] },
    { label: 'Chat', path: '/chat', icon: 'chat', roles: ['pl','ql','tasker'] },
    { label: 'Assignment', path: '/assignment', icon: 'assignment', roles: ['pl','ql','tasker'] },
    // Create Task removed from sidebar per UX request
    { label: 'My Tasks', path: '/my-tasks', icon: 'tasks', roles: ['tasker'] },
  ];

  const visibleItems = navItems.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role))
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`fixed left-0 top-0 h-screen transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl z-40`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="flex items-center">
                {/* Use AnimatedLogo compact version */}
                <div className="w-10 h-10 mr-3">
                  <svg width="40" height="40" viewBox="0 0 48 48" className="logo-spin" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <defs>
                      <linearGradient id="g2" x1="0" x2="1">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                    <g transform="translate(24,24)">
                      <circle r="10" fill="#064E3B" opacity="0.95" />
                      <circle r="6" fill="#10B981" />
                      <g className="logo-orbit">
                        <ellipse rx="18" ry="6" fill="none" stroke="url(#g2)" strokeWidth="2" opacity="0.95" />
                        <circle cx="18" cy="0" r="2.2" fill="#A7F3D0" />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold text-white">Orbit</span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-slate-700 rounded-lg transition text-white"
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{user?.name}</p>
              <p className="text-slate-400 text-xs capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
        {visibleItems.map((item) => {
          // replace simple icon keywords with SVGs
          const renderIcon = (key: string) => {
            switch (key) {
              case 'team':
                return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5C23 14.17 18.33 13 16 13z" fill="currentColor"/></svg>);
              case 'projects':
                return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-6H3v6z" fill="currentColor"/></svg>);
              case 'leaderboard':
                return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3v18h2V3H5zm6 6v12h2V9h-2zM17 13v8h2v-8h-2z" fill="currentColor"/></svg>);
              case 'analytics':
                return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3v18h18v-2H5V3H3zm6 6h2v8H9V9zm4-4h2v12h-2V5zm4 8h2v4h-2v-4z" fill="currentColor"/></svg>);
              case 'chat':
                return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4c-1.1 0-2 .9-2 2v14l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor"/></svg>);
              case 'assignment':
                return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h18v2H3V3zm2 4h14v14H5V7zm3 3v8h2v-8H8zm4 0v8h6v-8h-6z" fill="currentColor"/></svg>);
              case 'create':
                return (<svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z" fill="currentColor"/></svg>);
              case 'tasks':
                return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 11H7v2h2v-2zm0-4H7v2h2V7zm0 8H7v2h2v-2zM13 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6v-2z" fill="currentColor"/></svg>);
              case 'dashboard':
              default:
                return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-6H3v6z" fill="currentColor"/></svg>);
            }
          };

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive(item.path)
                  ? 'bg-emerald-50 text-emerald-900'
                  : 'text-slate-300 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <span className="text-xl flex-shrink-0">{renderIcon(item.icon)}</span>
              {!isCollapsed && (
                <span className="font-medium text-sm truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-700">
          <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors group"
          title={isCollapsed ? 'Logout' : ''}
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 13v-2H7V7l-5 5 5 5v-4h9zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="currentColor"/>
          </svg>
          {!isCollapsed && (
            <span className="font-medium text-sm">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};
