import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/profile', label: 'My Profile' }
];

const adminItems = [
  { to: '/users', label: 'Users' },
  { to: '/qr-code', label: 'QR Code' }
];

export const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-slate-950 text-white min-h-screen shadow-card">
      <div className="p-6 border-b border-white/10">
        <p className="text-xl font-semibold">SalahElecSarl</p>
        <p className="text-sm text-white/70">Workflow Platform</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {[...navItems, ...(user?.role === 'admin' ? adminItems : [])].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-md px-4 py-3 font-medium ${
                isActive ? 'bg-primary-500 text-white' : 'text-white/80 hover:bg-white/10'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10 text-sm text-white/70">
        Signed in as <span className="font-semibold">{user?.name}</span>
      </div>
    </aside>
  );
};

