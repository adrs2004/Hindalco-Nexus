import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateIssuePage from './pages/CreateIssuePage';
import IssueStatusPage from './pages/IssueStatusPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
            <Route path="/contact" element={<Contact />} />

          {/* Redirect base path to /create-issue */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/create-issue" replace />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/create-issue"
            element={
              <ProtectedRoute>
                <CreateIssuePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/issue-status"
            element={
              <ProtectedRoute>
                <IssueStatusPage />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
