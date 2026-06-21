import { useMemo, useState } from 'react'
import TaskFilters from '../Components/TaskFilters'
import TaskForm from '../Components/TaskForm'
import TaskList from '../Components/TaskList'
import TaskStats from '../Components/TaskStats'
import { createTask, TASK_FILTERS } from '../Interfaces/task'

const initialTasks = [
  {
    id: 'task-1',
    title: 'Finish the Vite project setup',
    priority: 'High',
    completed: true,
    createdAt: '2026-06-21T09:00:00.000Z',
  },
  {
    id: 'task-2',
    title: 'Create task manager components',
    priority: 'Medium',
    completed: false,
    createdAt: '2026-06-21T10:30:00.000Z',
  },
  {
    id: 'task-3',
    title: 'Test the production build',
    priority: 'Low',
    completed: false,
    createdAt: '2026-06-21T12:00:00.000Z',
  },
]

function Home() {
  const [tasks, setTasks] = useState(initialTasks)
  const [activeFilter, setActiveFilter] = useState(TASK_FILTERS.all)

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length

    return {
      total: tasks.length,
      completed,
      active: tasks.length - completed,
    }
  }, [tasks])

  const filteredTasks = useMemo(() => {
    if (activeFilter === TASK_FILTERS.active) {
      return tasks.filter((task) => !task.completed)
    }

    if (activeFilter === TASK_FILTERS.completed) {
      return tasks.filter((task) => task.completed)
    }

    return tasks
  }, [activeFilter, tasks])

  const handleAddTask = (taskInput) => {
    setTasks((currentTasks) => [createTask(taskInput), ...currentTasks])
  }

  const handleDeleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  const handleToggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-teal-700">
              Task Manager
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-normal text-slate-950">
              Plan today with a clear list.
            </h1>
          </div>
          <TaskFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </header>

        <div className="grid gap-5">
          <TaskStats
            active={stats.active}
            completed={stats.completed}
            total={stats.total}
          />
          <TaskForm onAddTask={handleAddTask} />
          <TaskList
            tasks={filteredTasks}
            onDeleteTask={handleDeleteTask}
            onToggleTask={handleToggleTask}
          />
        </div>
      </div>
    </main>
  )
}

export default Home
