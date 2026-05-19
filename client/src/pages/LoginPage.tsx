import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoadingSplash from '../components/LoadingSplash';
import { useAuthStore } from '../store/authStore';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSplash, setShowSplash] = React.useState(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      // show splash for 1s then go to dashboard
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        navigate('/dashboard');
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (username: string) => {
    setError('');
    setIsLoading(true);
    // Map demo buttons to server-seeded demo users
    const mapping: { [key: string]: { email: string; password: string } } = {
      pldemo: { email: 'mayank@orbit.com', password: 'Password@123456' },
      qldemo: { email: 'shivam@orbit.com', password: 'Password@123456' },
      takserdemo: { email: 'ribhav@orbit.com', password: 'Password@123456' },
    };

    const creds = mapping[username] || { email: `${username}@example.com`, password: 'password' };
    const demoEmail = creds.email;
    const demoPassword = creds.password;

    try {
      await login(demoEmail, demoPassword);
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        navigate('/dashboard');
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Demo login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Brand Section - Centered */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse-slow"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-4xl">O</span>
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2 animate-slideInDown">Orbit</h1>
          <p className="text-lg text-purple-200 animate-slideInUp">
            Task Management Platform
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-20 animate-slideUp">
          {/* Welcome Text */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-purple-200 text-sm">Sign in to your account to continue</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg text-red-200 text-sm animate-shake">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="group">
              <label className="block text-sm font-medium text-purple-100 mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-5 py-3 bg-white bg-opacity-10 border border-purple-300 border-opacity-30 rounded-lg text-white placeholder-purple-300 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-opacity-20 transition duration-300 hover:border-opacity-50"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <label className="block text-sm font-medium text-purple-100 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-5 py-3 bg-white bg-opacity-10 border border-purple-300 border-opacity-30 rounded-lg text-white placeholder-purple-300 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-opacity-20 transition duration-300 hover:border-opacity-50"
                />
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl animate-fadeIn"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-purple-300 bg-opacity-20"></div>
            <span className="px-3 text-purple-200 text-sm">OR</span>
            <div className="flex-1 h-px bg-purple-300 bg-opacity-20"></div>
          </div>

          {/* Demo Logins */}
          <div className="mb-6 text-center">
            <p className="text-sm text-purple-200 mb-3">Quick demo logins</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleDemoLogin('pldemo')}
                disabled={isLoading}
                className="px-3 py-2 bg-white bg-opacity-10 text-white rounded-md hover:bg-white hover:text-gray-900 transition"
              >
                PL (pldemo)
              </button>
              <button
                onClick={() => handleDemoLogin('qldemo')}
                disabled={isLoading}
                className="px-3 py-2 bg-white bg-opacity-10 text-white rounded-md hover:bg-white hover:text-gray-900 transition"
              >
                QL (qldemo)
              </button>
              <button
                onClick={() => handleDemoLogin('takserdemo')}
                disabled={isLoading}
                className="px-3 py-2 bg-white bg-opacity-10 text-white rounded-md hover:bg-white hover:text-gray-900 transition"
              >
                Tasker (takserdemo)
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-purple-200 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-purple-400 hover:text-purple-300 font-semibold transition duration-300">
              Create one now
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-purple-300 text-xs animate-fadeIn animation-delay-500">
          <p>© 2024 Orbit. Professional Task Management Platform.</p>
        </div>
      </div>
      {showSplash && <LoadingSplash message={isLoading ? 'Signing in' : 'Launching'} />}
    </div>
  );
};
