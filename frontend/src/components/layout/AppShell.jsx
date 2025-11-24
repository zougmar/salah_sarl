import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AppShell = () => (
  <div className="min-h-screen bg-slate-100">
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  </div>
);

