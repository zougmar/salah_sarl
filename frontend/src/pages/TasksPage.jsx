import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import { TaskAPI } from '../services/api';
import { TaskTable } from '../components/shared/TaskTable';
import { Modal } from '../components/shared/Modal';
import { TaskForm } from '../components/shared/TaskForm';

export const TasksPage = ({ addMode = false }) => {
  const { user } = useAuth();
  const { tasks, fetchTasks, refreshMyTasks } = useTasks();
  const [createOpen, setCreateOpen] = useState(addMode);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchTasks();
    } else {
      refreshMyTasks();
    }
  }, [user, fetchTasks, refreshMyTasks]);

  const handleCreate = async (payload) => {
    try {
      await TaskAPI.create(payload);
      toast.success('Task created');
      setCreateOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateStatus = async (task, status) => {
    try {
      await TaskAPI.update(task._id, { status });
      toast.success('Task updated');
      if (user.role === 'admin') {
        fetchTasks();
      } else {
        refreshMyTasks();
      }
    } catch {
      toast.error('Unable to update task');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Tasks</h2>
          <p className="text-sm text-slate-500">
            {user?.role === 'admin'
              ? 'Create, assign, and monitor every deliverable'
              : 'Tasks currently assigned to you'}
          </p>
        </div>
        {user?.role === 'admin' && (
          <button
            onClick={() => setCreateOpen(true)}
            className="rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white shadow-card hover:bg-primary-500"
          >
            New task
          </button>
        )}
      </div>

      <TaskTable tasks={tasks} onSelect={(task) => setSelectedTask(task)} />

      {selectedTask && (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">{selectedTask.title}</h3>
              <p className="text-sm text-slate-500">{selectedTask.description}</p>
            </div>
            <div className="flex gap-2">
              {['open', 'in-progress', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleUpdateStatus(selectedTask, status)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                    selectedTask.status === status
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {status.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <Modal title="Create task" open={createOpen} onClose={() => setCreateOpen(false)}>
        <TaskForm onSubmit={handleCreate} />
      </Modal>
    </div>
  );
};

