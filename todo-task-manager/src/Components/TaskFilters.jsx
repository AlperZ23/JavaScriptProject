// src/Components/TaskFilters.jsx
import { TASK_FILTERS } from "../Interfaces/task.js";

export default function TaskFilters({
  activeFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  counts
}) {
  const filters = [
    {
      value: TASK_FILTERS.ALL,
      label: "All",
      count: counts.all
    },
    {
      value: TASK_FILTERS.ACTIVE,
      label: "Active",
      count: counts.active
    },
    {
      value: TASK_FILTERS.COMPLETED,
      label: "Completed",
      count: counts.completed
    }
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => onFilterChange(filter.value)}
                className={`rounded-2xl px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? "bg-slate-950 text-white shadow-lg shadow-slate-300"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter.label}{" "}
                <span className={isActive ? "text-slate-200" : "text-slate-400"}>
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-full lg:max-w-sm">
          <label htmlFor="search" className="sr-only">
            Search tasks
          </label>
          <input
            id="search"
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by title, description, or category"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </div>
      </div>
    </section>
  );
}