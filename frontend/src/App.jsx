import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/TasksPage';
import { TaskDetailsPage } from './pages/TaskDetailsPage';
import { UsersPage } from './pages/UsersPage';
import { ProfilePage } from './pages/ProfilePage';
import { LocationCapturePage } from './pages/LocationCapturePage';
import { QRCodePage } from './pages/QRCodePage';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AppShell } from './components/layout/AppShell';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/location-checkin" element={<LocationCapturePage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/add" element={<TasksPage addMode={true} />} />
          <Route path="/tasks/:id" element={<TaskDetailsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/add" element={<UsersPage addMode={true} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/qr-code" element={<QRCodePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
