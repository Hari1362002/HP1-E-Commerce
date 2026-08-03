export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-lg font-semibold tracking-tight text-slate-900">
          Aurel<span className="text-teal-600">Store</span>
        </p>
        <p className="text-sm text-slate-500">
          Demo storefront built for portfolio purposes. No real payments are
          processed.
        </p>
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} AurelStore
        </p>
      </div>
    </footer>
  );
}
