const priorityStyles = {
  High: 'border-red-200 bg-red-50 text-red-700',
  Medium: 'border-amber-200 bg-amber-50 text-amber-700',
  Low: 'border-sky-200 bg-sky-50 text-sky-700',
}

function TaskItem({ task, onDeleteTask, onToggleTask }) {
  const createdDate = new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
  }).format(new Date(task.createdAt))

  return (
    <li className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <input
          className="mt-1 h-5 w-5 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
          type="checkbox"
          checked={task.completed}
          aria-label={`Mark ${task.title} as ${task.completed ? 'active' : 'completed'}`}
          onChange={() => onToggleTask(task.id)}
        />

        <div className="min-w-0 flex-1">
          <p
            className={`break-words font-semibold ${
              task.completed ? 'text-slate-400 line-through' : 'text-slate-900'
            }`}
          >
            {task.title}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span
              className={`rounded-md border px-2 py-1 font-semibold ${priorityStyles[task.priority]}`}
            >
              {task.priority}
            </span>
            <span>Created {createdDate}</span>
          </div>
        </div>

        <button
          className="rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-300 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-100"
          type="button"
          onClick={() => onDeleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TaskItem
