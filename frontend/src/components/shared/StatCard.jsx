export const StatCard = ({ label, value, accent = 'text-primary-600' }) => (
  <div className="rounded-xl bg-white p-5 shadow-card border border-slate-100">
    <p className="text-sm text-slate-500">{label}</p>
    <p className={`mt-2 text-3xl font-semibold ${accent}`}>{value}</p>
  </div>
);

