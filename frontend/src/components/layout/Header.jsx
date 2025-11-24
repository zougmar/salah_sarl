import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Signed out');
  };

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-card sticky top-0 z-10">
      <div>
        <p className="text-sm text-slate-500">Welcome back</p>
        <h1 className="text-2xl font-semibold text-slate-900">{user?.name}</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden md:flex flex-col text-right">
          <span className="font-semibold text-slate-800">{user?.email}</span>
          <span className="text-xs uppercase tracking-wide text-primary-500">{user?.role}</span>
        </span>
        <button
          className="rounded-full border border-primary-500 px-4 py-2 text-primary-600 hover:bg-primary-50 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

