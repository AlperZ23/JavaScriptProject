// src/Pages/Home.jsx
import { useEffect, useMemo, useState } from "react";
import TaskFilters from "../Components/TaskFilters.jsx";
import TaskForm from "../Components/TaskForm.jsx";
import TaskList from "../Components/TaskList.jsx";
import TaskStats from "../Components/TaskStats.jsx";
import {
  TASK_FILTERS,
  buildTask,
  getStoredTasks,
  saveTasks
} from "../Interfaces/task.js";

export default function Home() {
  const [tasks, setTasks] = useState(getStoredTasks);
  const [editingTask, setEditingTask] = useState(null);
  const [activeFilter, setActiveFilter] = useState(TASK_FILTERS.ALL);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const counts = useMemo(() => {
    return {
      all: tasks.length,
      active: tasks.filter((task) => !task.completed).length,
      completed: tasks.filter((task) => task.completed).length,
      highPriority: tasks.filter((task) => task.priority === "High" && !task.completed).length
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return tasks
      .filter((task) => {
        if (activeFilter === TASK_FILTERS.ACTIVE) {
          return !task.completed;
        }

        if (activeFilter === TASK_FILTERS.COMPLETED) {
          return task.completed;
        }

        return true;
      })
      .filter((task) => {
        if (!normalizedSearchTerm) {
          return true;
        }

        const searchableContent = [
          task.title,
          task.description,
          task.category,
          task.priority
        ]
          .join(" ")
          .toLowerCase();

        return searchableContent.includes(normalizedSearchTerm);
      })
      .sort((firstTask, secondTask) => {
        const completedOrder = Number(firstTask.completed) - Number(secondTask.completed);

        if (completedOrder !== 0) {
          return completedOrder;
        }

        return new Date(secondTask.updatedAt).getTime() - new Date(firstTask.updatedAt).getTime();
      });
  }, [tasks, activeFilter, searchTerm]);

  function handleCreateTask(payload) {
    const newTask = buildTask(payload);

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  function handleUpdateTask(taskId, payload) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        return {
          ...task,
          title: payload.title.trim(),
          description: payload.description.trim(),
          category: payload.category.trim() || "General",
          priority: payload.priority,
          updatedAt: new Date().toISOString()
        };
      })
    );

    setEditingTask(null);
  }

  function handleToggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        return {
          ...task,
          completed: !task.completed,
          updatedAt: new Date().toISOString()
        };
      })
    );
  }

  function handleDeleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));

    if (editingTask?.id === taskId) {
      setEditingTask(null);
    }
  }

  function handleEditTask(task) {
    setEditingTask(task);

    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }

  function handleCancelEdit() {
    setEditingTask(null);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-300">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
              ReactJS + Tailwind CSS + LocalStorage
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Task Management TODO App
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Create, list, edit, complete, filter, search, and delete tasks with persistent browser
              storage and a structured frontend folder architecture.
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <aside className="space-y-6">
            <TaskForm
              editingTask={editingTask}
              onCreateTask={handleCreateTask}
              onUpdateTask={handleUpdateTask}
              onCancelEdit={handleCancelEdit}
            />

            <TaskStats counts={counts} />
          </aside>

          <section className="space-y-6">
            <TaskFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              counts={counts}
            />

            <TaskList
              tasks={filteredTasks}
              onToggleTask={handleToggleTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </section>
        </div>
      </div>
    </main>
  );
}