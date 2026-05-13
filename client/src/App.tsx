import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TaskerDashboard } from './pages/TaskerDashboard';
import { QLDashboard } from './pages/QLDashboard';
import { PLDashboard } from './pages/PLDashboard';
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
import { TaskReviewPage } from './pages/TaskReviewPage';
import { ChatPage } from './pages/ChatPage';
import { TimelinePage } from './pages/TimelinePage';
import { GamificationPage } from './pages/GamificationPage';
import { SmartAssignmentPage } from './pages/SmartAssignmentPage';
import './index.css';

function App() {
  const { isAuthenticated, checkAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const getDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case 'tasker':
        return <TaskerDashboard />;
      case 'ql':
        return <QLDashboard />;
      case 'pl':
        return <PLDashboard />;
      default:
        return null;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>{getDashboard()}</ProtectedRoute>
          }
        />
        <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><AnalyticsDashboard /></ProtectedRoute>} />
        <Route path="/review" element={<ProtectedRoute><TaskReviewPage /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/timeline" element={<ProtectedRoute><TimelinePage /></ProtectedRoute>} />
        <Route path="/badges" element={<ProtectedRoute><GamificationPage /></ProtectedRoute>} />
        <Route path="/assignment" element={<ProtectedRoute><SmartAssignmentPage /></ProtectedRoute>} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
