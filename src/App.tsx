import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { FamilyProvider } from './contexts/FamilyContext';
import { Layout } from './components/layout/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Journal from './pages/Journal';
import Dashboard from './pages/Dashboard';
import Families from './pages/Families';
import FamilyDetails from './pages/FamilyDetails';
import { useAuth } from './contexts/AuthContext';

function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/families" element={<Families />} />
        <Route path="/families/:id" element={<FamilyDetails />} />
        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to="/families" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <FamilyProvider>
          <Router>
            <AppRoutes />
          </Router>
        </FamilyProvider>
      </UserProvider>
    </AuthProvider>
  );
}