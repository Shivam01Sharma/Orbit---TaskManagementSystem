import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'tasker' | 'ql' | 'pl'>('tasker');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  const { register } = useAuthStore();
  const navigate = useNavigate();

  const roleDescriptions = {
    tasker: {
      title: 'Tasker',
      description: 'Execute assigned tasks and update progress',
      badge: 'ID: T-001',
      color: 'from-accent-500 to-accent-600',
    },
    ql: {
      title: 'Quality Leader',
      description: 'Manage teams and assign tasks to taskers',
      badge: 'ID: QL-01',
      color: 'from-primary-500 to-primary-600',
    },
    pl: {
      title: 'Project Leader',
      description: 'Create projects and assign QLS to manage teams',
      badge: 'ID: PL-1',
      color: 'from-secondary-500 to-secondary-600',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    if (!email.includes('@')) {
      setError('Valid email is required');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await register(name, email, password, selectedRole);
      setGeneratedId(response.user.id);
      setRegistrationSuccess(true);

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-success-50 via-white to-accent-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl p-8 text-center card-shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome, {name}!
            </h2>

            <div className="bg-primary-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Your Unique User ID:</p>
              <p className="text-3xl font-bold text-primary-600">{generatedId}</p>
              <p className="text-xs text-gray-500 mt-2">Save this ID for your records</p>
            </div>

            <p className="text-gray-600 mb-6">
              Your account has been created successfully. Redirecting to dashboard...
            </p>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Role Selection */}
          <div>
            <div className="mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-white font-bold text-3xl">O</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Orbit</h1>
              <p className="text-lg text-gray-600">Join the platform</p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-600 uppercase">
                Select Your Role
              </p>
              {Object.entries(roleDescriptions).map(([role, desc]) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role as 'tasker' | 'ql' | 'pl')}
                  className={`w-full p-4 rounded-xl text-left transition ${
                    selectedRole === role
                      ? `bg-gradient-to-r ${desc.color} text-white shadow-lg scale-105`
                      : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-primary-400'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{desc.title}</p>
                      <p className={`text-sm ${selectedRole === role ? 'text-white/90' : 'text-gray-600'}`}>
                        {desc.description}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-mono px-2 py-1 rounded ${
                        selectedRole === role
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {desc.badge}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 p-6 bg-accent-50 rounded-xl border border-accent-200">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Selected Role:</span>
              </p>
              <p className="text-lg font-bold text-accent-700">
                {roleDescriptions[selectedRole].title}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {roleDescriptions[selectedRole].description}
              </p>
            </div>
          </div>

          {/* Right: Registration Form */}
          <div className="bg-white rounded-2xl card-shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Account</h2>

            {error && (
              <div className="mb-4 p-4 bg-danger-50 border border-danger-200 rounded-lg">
                <p className="text-sm text-danger-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  disabled={isLoading}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@company.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  At least 8 characters
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  disabled={isLoading}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </form>

            {/* Features */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-600 uppercase mb-3">
                Platform Features
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <svg
                    className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Real-time collaboration</span>
                </div>
                <div className="flex items-start space-x-2">
                  <svg
                    className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Task tracking & analytics</span>
                </div>
                <div className="flex items-start space-x-2">
                  <svg
                    className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Team management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
