// src/Components/TaskItem.jsx
function formatDate(dateValue) {
  if (!dateValue) {
    return "No date";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "No date";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function getPriorityClass(priority) {
  const styles = {
    Low: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Medium: "border-amber-200 bg-amber-50 text-amber-700",
    High: "border-red-200 bg-red-50 text-red-700"
  };

  return styles[priority] || styles.Medium;
}

export default function TaskItem({ task, onToggleTask, onEditTask, onDeleteTask }) {
  return (
    <article
      className={`rounded-3xl border bg-white p-5 shadow-lg shadow-slate-200/70 transition ${
        task.completed ? "border-emerald-200" : "border-slate-200"
      }`}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-bold ${getPriorityClass(
                task.priority
              )}`}
            >
              {task.priority}
            </span>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
              {task.category}
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-bold ${
                task.completed
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-slate-50 text-slate-600"
              }`}
            >
              {task.completed ? "Completed" : "Active"}
            </span>
          </div>

          <h3
            className={`text-xl font-black tracking-tight ${
              task.completed ? "text-slate-400 line-through" : "text-slate-950"
            }`}
          >
            {task.title}
          </h3>

          {task.description ? (
            <p
              className={`mt-3 text-sm leading-6 ${
                task.completed ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {task.description}
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-400">
            <span>Created: {formatDate(task.createdAt)}</span>
            <span>Updated: {formatDate(task.updatedAt)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 xl:justify-end">
          <button
            type="button"
            onClick={() => onToggleTask(task.id)}
            className={`rounded-2xl px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-4 ${
              task.completed
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-200"
                : "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-200"
            }`}
          >
            {task.completed ? "Mark Active" : "Complete"}
          </button>

          <button
            type="button"
            onClick={() => onEditTask(task)}
            className="rounded-2xl bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 transition hover:bg-indigo-100 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDeleteTask(task.id)}
            className="rounded-2xl bg-red-50 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}