import { Routes, Route } from 'react-router-dom';
import TeamLoginPage from './pages/TeamLoginPage';
import TeamRegisterPage from './pages/TeamRegisterPage';
import TeamIssuesPage from './pages/TeamIssuesPage';
import TeamNavbar from './components/TeamNavbar';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TeamNavbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<TeamLoginPage />} />
          <Route path="/register" element={<TeamRegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TeamIssuesPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
