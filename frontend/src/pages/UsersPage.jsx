import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserAPI } from '../services/api';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });
  const [loading, setLoading] = useState(false);

  const loadUsers = () =>
    UserAPI.list()
      .then((res) => setUsers(res.data))
      .catch(() => toast.error('Unable to load users'));

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await UserAPI.create(form);
      toast.success('User created');
      setForm({ name: '', email: '', password: '', role: 'employee' });
      loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not create user');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await UserAPI.remove(id);
      toast.success('User removed');
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {
      toast.error('Unable to delete user');
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl bg-white p-6 shadow-card border border-slate-100">
        <h2 className="text-2xl font-semibold text-slate-900">Invite teammate</h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
          />
          <input
            name="password"
            type="password"
            minLength={6}
            value={form.password}
            onChange={handleChange}
            placeholder="Temporary password"
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary-600 py-3 font-semibold text-white hover:bg-primary-500"
          >
            {loading ? 'Creating...' : 'Create user'}
          </button>
        </form>
      </section>
      <section className="rounded-2xl bg-white p-6 shadow-card border border-slate-100">
        <h2 className="text-2xl font-semibold text-slate-900">Team directory</h2>
        <div className="mt-4 space-y-3">
          {users.map((user) => (
            <article
              key={user._id}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
            >
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase">
                  {user.role}
                </span>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

