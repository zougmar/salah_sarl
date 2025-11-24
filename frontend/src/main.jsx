import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <App />
          <Toaster position="top-right" />
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
