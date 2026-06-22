// src/Components/TaskForm.jsx
import { useState } from "react";
import { DEFAULT_TASK_FORM, TASK_PRIORITIES } from "../Interfaces/task.js";

function getInitialFormData(editingTask) {
  if (!editingTask) {
    return DEFAULT_TASK_FORM;
  }

  return {
    title: editingTask.title,
    description: editingTask.description,
    category: editingTask.category,
    priority: editingTask.priority
  };
}

export default function TaskForm({ editingTask, onCreateTask, onUpdateTask, onCancelEdit }) {
  const [formData, setFormData] = useState(() => getInitialFormData(editingTask));
  const [error, setError] = useState("");

  const isEditing = Boolean(editingTask);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const normalizedData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category.trim() || "General",
      priority: formData.priority
    };

    if (!normalizedData.title) {
      setError("Task title is required.");
      return;
    }

    if (isEditing) {
      onUpdateTask(editingTask.id, normalizedData);
    } else {
      onCreateTask(normalizedData);
    }

    setFormData(DEFAULT_TASK_FORM);
    setError("");
  }

  function handleCancel() {
    setFormData(DEFAULT_TASK_FORM);
    setError("");
    onCancelEdit();
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          {isEditing ? "Update task" : "Create task"}
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          {isEditing ? "Edit selected task" : "Add a new task"}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Example: Finish React project"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-semibold text-slate-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Add optional details for this task"
            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              placeholder="General"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label htmlFor="priority" className="mb-2 block text-sm font-semibold text-slate-700">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            >
              {TASK_PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
          >
            {isEditing ? "Save Changes" : "Add Task"}
          </button>

          {isEditing ? (
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              Cancel Edit
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}
