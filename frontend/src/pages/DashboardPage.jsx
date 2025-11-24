import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { DashboardAPI } from '../services/api';
import { StatCard } from '../components/shared/StatCard';
import { TasksPerEmployeeChart } from '../components/charts/TasksPerEmployeeChart';
import { useAuth } from '../hooks/useAuth';

export const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role !== 'admin') return;
    setLoading(true);
    DashboardAPI.stats()
      .then((res) => setStats(res.data))
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, [user]);

  if (user?.role !== 'admin') {
    return (
      <div className="rounded-2xl bg-white p-10 shadow-card">
        <h2 className="text-2xl font-semibold text-slate-900">Dashboard</h2>
        <p className="mt-2 text-slate-600">
          Dashboard insights are available for administrators. Ask your admin if you need access.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        {['Total', 'Completed', 'In Progress', 'Open', 'Overdue'].map((label, index) => (
          <div key={label} className="min-w-[180px] flex-1">
            <StatCard
              label={label}
              value={
                stats?.totals?.[
                  ['total', 'completed', 'inProgress', 'open', 'overdue'][index]
                ] ?? (loading ? '...' : 0)
              }
            />
          </div>
        ))}
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-card border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">Tasks per employee</h3>
          {loading ? (
            <p className="text-sm text-slate-500">Loading...</p>
          ) : (
            <TasksPerEmployeeChart data={stats?.tasksPerEmployee || []} />
          )}
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-card border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">Upcoming deadlines</h3>
          <div className="mt-4 space-y-4">
            {(stats?.upcomingDeadlines || []).map((task) => (
              <article key={task._id} className="rounded-xl border border-slate-100 p-4">
                <h4 className="font-semibold text-slate-900">{task.title}</h4>
                <p className="text-sm text-slate-500">
                  Due {new Date(task.dueDate).toLocaleDateString()} · {task.assignee?.name || '—'}
                </p>
              </article>
            ))}
            {!stats?.upcomingDeadlines?.length && !loading && (
              <p className="text-sm text-slate-500">No upcoming tasks</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

