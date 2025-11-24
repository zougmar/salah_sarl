import { useEffect, useState } from 'react';
import { FormInput } from './FormInput';
import { UserAPI } from '../../services/api';

const defaultState = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  status: 'open',
  project: 'General',
  assignee: ''
};

export const TaskForm = ({ initialData = {}, onSubmit, submitText = 'Save Task' }) => {
  const [form, setForm] = useState({ ...defaultState, ...initialData });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  useEffect(() => {
    UserAPI.list()
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <FormInput label="Title" name="title" value={form.title} onChange={handleChange} required />
      <FormInput
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        textarea
      />
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput
          label="Due Date"
          type="date"
          name="dueDate"
          value={form.dueDate ? form.dueDate.substring(0, 10) : ''}
          onChange={handleChange}
        />
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
          Priority
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="rounded-lg border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
          Status
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="rounded-lg border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <FormInput
          label="Project"
          name="project"
          value={form.project}
          onChange={handleChange}
          required
        />
      </div>
      <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
        Assignee
        <select
          name="assignee"
          value={form.assignee || ''}
          onChange={handleChange}
          className="rounded-lg border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="">Unassigned</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.role})
            </option>
          ))}
        </select>
      </label>
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white shadow-card hover:bg-primary-500"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
};

