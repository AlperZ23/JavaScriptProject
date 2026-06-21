import { useState } from 'react'
import { PRIORITIES } from '../Interfaces/task'

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')

  const handleSubmit = (event) => {
    event.preventDefault()

    const cleanTitle = title.trim()
    if (!cleanTitle) return

    onAddTask({ title: cleanTitle, priority })
    setTitle('')
    setPriority('Medium')
  }

  return (
    <form
      className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_160px_auto]"
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor="task-title">
        Task title
      </label>
      <input
        id="task-title"
        className="min-h-11 rounded-md border border-slate-300 px-3 text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
        placeholder="Add a new task"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label className="sr-only" htmlFor="task-priority">
        Priority
      </label>
      <select
        id="task-priority"
        className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        {PRIORITIES.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>

      <button
        className="min-h-11 rounded-md bg-teal-700 px-5 font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-300 disabled:bg-slate-300"
        type="submit"
        disabled={!title.trim()}
      >
        Add
      </button>
    </form>
  )
}

export default TaskForm
