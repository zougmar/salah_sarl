export const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required,
  textarea = false
}) => (
  <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
    {label}
    {textarea ? (
      <textarea
        className="rounded-lg border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        rows={4}
      />
    ) : (
      <input
        className="rounded-lg border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
        name={name}
        type={type}
        value={value}
        required={required}
        onChange={onChange}
      />
    )}
  </label>
);

