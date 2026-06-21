// src/Components/TaskList.jsx
import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onToggleTask, onEditTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-lg shadow-slate-200/70">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          No tasks found
        </p>
        <h2 className="mt-3 text-2xl font-black text-slate-950">
          Create a task or adjust your filters.
        </h2>
        <p className="mt-3 text-sm text-slate-500">
          
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </section>
  );
}