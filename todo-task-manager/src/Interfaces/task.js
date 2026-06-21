// src/Interfaces/task.js

export const STORAGE_KEY = "react-tailwind-task-manager-tasks";

export const TASK_PRIORITIES = ["Low", "Medium", "High"];

export const TASK_FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed"
};

export const DEFAULT_TASK_FORM = {
  title: "",
  description: "",
  category: "General",
  priority: "Medium"
};

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {"Low" | "Medium" | "High"} priority
 * @property {boolean} completed
 * @property {string} createdAt
 * @property {string} updatedAt
 */

export function createTaskId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function buildTask(payload) {
  const now = new Date().toISOString();

  return {
    id: createTaskId(),
    title: payload.title.trim(),
    description: payload.description.trim(),
    category: payload.category.trim() || "General",
    priority: TASK_PRIORITIES.includes(payload.priority) ? payload.priority : "Medium",
    completed: false,
    createdAt: now,
    updatedAt: now
  };
}

export function normalizeTask(task) {
  const now = new Date().toISOString();

  return {
    id: String(task.id || createTaskId()),
    title: String(task.title || "").trim(),
    description: String(task.description || "").trim(),
    category: String(task.category || "General").trim() || "General",
    priority: TASK_PRIORITIES.includes(task.priority) ? task.priority : "Medium",
    completed: Boolean(task.completed),
    createdAt: task.createdAt || now,
    updatedAt: task.updatedAt || task.createdAt || now
  };
}

export function getStoredTasks() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .map(normalizeTask)
      .filter((task) => task.title.length > 0);
  } catch {
    return [];
  }
}

export function saveTasks(tasks) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    return;
  }
}