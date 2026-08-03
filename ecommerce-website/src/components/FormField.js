export default function FormField({ label, hint, ...inputProps }) {
  return (
    <div>
      <label
        htmlFor={inputProps.id || inputProps.name}
        className="text-sm font-medium text-ink-600"
      >
        {label}
      </label>
      <input
        id={inputProps.id || inputProps.name}
        {...inputProps}
        className="mt-1.5 w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      />
      {hint && <p className="mt-1.5 text-xs text-ink-400">{hint}</p>}
    </div>
  );
}
