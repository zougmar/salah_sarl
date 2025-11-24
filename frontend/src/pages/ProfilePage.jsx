import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { UserAPI } from '../services/api';

export const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await UserAPI.updateProfile(form);
      setUser(data);
      toast.success('Profile updated');
      setForm((prev) => ({ ...prev, password: '' }));
    } catch {
      toast.error('Unable to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-card border border-slate-100">
      <h2 className="text-2xl font-semibold text-slate-900">My profile</h2>
      <p className="text-sm text-slate-500">Manage your identity inside SalahElecSarl.</p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
          Full name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="rounded-xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
          Email
          <input
            value={user?.email}
            disabled
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
          New password
          <input
            name="password"
            type="password"
            minLength={6}
            value={form.password}
            onChange={handleChange}
            className="rounded-xl border border-slate-200 px-4 py-3"
            placeholder="Leave blank to keep current password"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-500"
        >
          {loading ? 'Saving...' : 'Save changes'}
        </button>
      </form>
    </div>
  );
};

