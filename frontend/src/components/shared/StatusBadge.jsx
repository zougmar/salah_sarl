const statusStyles = {
  open: 'bg-slate-100 text-slate-700',
  'in-progress': 'bg-amber-100 text-amber-700',
  completed: 'bg-emerald-100 text-emerald-700'
};

export const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}>
    {status.replace('-', ' ')}
  </span>
);

