import { StatusBadge } from './StatusBadge';

export const TaskTable = ({ tasks = [], onSelect }) => (
  <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-card">
    <table className="min-w-full divide-y divide-slate-100">
      <thead className="bg-slate-50">
        <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <th className="px-6 py-4">Task</th>
          <th className="px-6 py-4">Assignee</th>
          <th className="px-6 py-4">Priority</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4">Due</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 text-sm">
        {tasks.map((task) => (
          <tr
            key={task._id}
            className="hover:bg-primary-50/40 cursor-pointer"
            onClick={() => onSelect?.(task)}
          >
            <td className="px-6 py-4 font-medium text-slate-900">
              <p>{task.title}</p>
              <p className="text-xs text-slate-500">{task.project}</p>
            </td>
            <td className="px-6 py-4 text-slate-600">{task.assignee?.name || '—'}</td>
            <td className="px-6 py-4 capitalize text-slate-600">{task.priority}</td>
            <td className="px-6 py-4">
              <StatusBadge status={task.status} />
            </td>
            <td className="px-6 py-4 text-slate-600">
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

