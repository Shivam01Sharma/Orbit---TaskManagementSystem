import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import AnimatedLogo from './AnimatedLogo';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <AnimatedLogo size={36} />
          </Link>

          {/* Desktop: show only user info (navigation is in sidebar) */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-secondary-400 to-accent-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {user && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700"
              >
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && user && (
          <div className="md:hidden pb-4 border-t">
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <Link
              to="/leaderboard"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              • Leaderboard
            </Link>
            <Link
              to="/chat"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              • Chat
            </Link>
            <Link
              to="/analytics"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              • Analytics
            </Link>
            <Link
              to="/review"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              • Review
            </Link>
            <Link
              to="/assignment"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              • Assignment
            </Link>
            {/* Logout moved to sidebar only; top menu does not include logout */}
          </div>
        )}
      </div>
    </nav>
  );
};
