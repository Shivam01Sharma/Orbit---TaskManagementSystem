import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './components/DashboardLayout';
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
import { SmartAssignmentPage } from './pages/SmartAssignmentPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TeamsPage } from './pages/TeamsPage';
import CreateTeamPage from './pages/CreateTeamPage';
import ManageTeamPage from './pages/ManageTeamPage';
import ManageProjectPage from './pages/ManageProjectPage';
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
            <ProtectedRoute>
              <DashboardLayout>{getDashboard()}</DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/leaderboard" element={<ProtectedRoute><DashboardLayout><LeaderboardPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><DashboardLayout><AnalyticsDashboard /></DashboardLayout></ProtectedRoute>} />
        <Route path="/review" element={<ProtectedRoute><DashboardLayout><TaskReviewPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><DashboardLayout><ChatPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/assignment" element={<ProtectedRoute><DashboardLayout><SmartAssignmentPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><DashboardLayout><ProjectsPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/teams" element={<ProtectedRoute><DashboardLayout><TeamsPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/team" element={<Navigate to="/teams" replace />} />
        <Route path="/teams/create" element={<ProtectedRoute><DashboardLayout><CreateTeamPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/teams/:id" element={<ProtectedRoute><DashboardLayout><ManageTeamPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/projects/:id" element={<ProtectedRoute><DashboardLayout><ManageProjectPage /></DashboardLayout></ProtectedRoute>} />
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
