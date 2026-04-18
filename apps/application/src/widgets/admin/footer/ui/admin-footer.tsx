import { getYear } from "date-fns";

export function AdminFooter() {
  const year = getYear(new Date());

  return (
    <footer className="mt-auto rounded-xl border bg-card px-5 py-4 shadow-sm">
      <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-semibold text-foreground">
            TableReserve Admin
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Панель для бронювань, керування столами та базою гостей.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">© {year} · v0.1.0</p>
      </div>
    </footer>
  );
}
