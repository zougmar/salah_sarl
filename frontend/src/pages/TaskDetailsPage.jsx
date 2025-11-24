import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CommentAPI, TaskAPI } from '../services/api';
import { StatusBadge } from '../components/shared/StatusBadge';

export const TaskDetailsPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    TaskAPI.details(id)
      .then((res) => setTask(res.data))
      .catch(() => toast.error('Task not found'));
    CommentAPI.list(id)
      .then((res) => setComments(res.data))
      .catch(() => setComments([]));
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      const { data } = await CommentAPI.create(id, { content: message });
      setComments((prev) => [...prev, data]);
      setMessage('');
    } catch {
      toast.error('Unable to add comment');
    }
  };

  if (!task) {
    return <p className="text-slate-500">Loading task...</p>;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-6 shadow-card border border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">{task.project}</p>
            <h2 className="text-3xl font-semibold text-slate-900">{task.title}</h2>
          </div>
          <StatusBadge status={task.status} />
        </div>
        <p className="mt-4 text-slate-600">{task.description}</p>
        <dl className="mt-6 grid gap-4 md:grid-cols-3 text-sm text-slate-600">
          <div>
            <dt className="font-semibold text-slate-900">Assignee</dt>
            <dd>{task.assignee?.name || 'Unassigned'}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">Priority</dt>
            <dd className="capitalize">{task.priority}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">Due date</dt>
            <dd>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-card border border-slate-100">
        <h3 className="text-xl font-semibold text-slate-900">Comments</h3>
        <div className="mt-4 space-y-4">
          {comments.map((comment) => (
            <article key={comment._id} className="rounded-xl border border-slate-100 p-4">
              <p className="text-sm font-semibold text-slate-900">
                {comment.authorId?.name}{' '}
                <span className="text-xs font-normal text-slate-500">
                  · {new Date(comment.createdAt).toLocaleString()}
                </span>
              </p>
              <p className="mt-2 text-slate-600">{comment.content}</p>
            </article>
          ))}
          {!comments.length && <p className="text-sm text-slate-500">No comments yet</p>}
        </div>
        <form className="mt-4 space-y-3" onSubmit={handleComment}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
            placeholder="Leave a note for the team..."
          />
          <button
            type="submit"
            className="rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-500"
          >
            Comment
          </button>
        </form>
      </section>
    </div>
  );
};

