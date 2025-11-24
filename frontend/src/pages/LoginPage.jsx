import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

export const LoginPage = () => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await login({ email: form.email, password: form.password });
        toast.success('Welcome back');
      } else {
        await register(form);
        toast.success('Account created');
      }
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-slate-100 px-4">
      <div className="grid gap-10 rounded-3xl bg-white p-10 shadow-2xl md:grid-cols-2">
        <section className="space-y-4">
          <p className="inline-flex items-center rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
            SalahElecSarl
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">Workflow that just flows.</h1>
          <p className="text-slate-500">
            Organize tasks, track teams, and keep every project on time with our modern control
            center.
          </p>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>• Secure authentication with role-based access</li>
            <li>• Real-time dashboards and insights</li>
            <li>• Conversations around every task</li>
          </ul>
        </section>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-2 rounded-full bg-slate-100 p-1">
            {['login', 'register'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                  mode === item ? 'bg-white shadow text-primary-600' : 'text-slate-500'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          {mode === 'register' && (
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
              Full name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="rounded-xl border border-slate-200 px-4 py-3"
              />
            </label>
          )}
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="rounded-xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
            Password
            <input
              name="password"
              type="password"
              minLength={6}
              value={form.password}
              onChange={handleChange}
              required
              className="rounded-xl border border-slate-200 px-4 py-3"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-primary-600 py-3 text-lg font-semibold text-white shadow-card hover:bg-primary-500 disabled:opacity-70"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
};

