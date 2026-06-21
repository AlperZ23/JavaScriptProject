import { TASK_FILTERS } from '../Interfaces/task'

const filters = [
  { value: TASK_FILTERS.all, label: 'All' },
  { value: TASK_FILTERS.active, label: 'Active' },
  { value: TASK_FILTERS.completed, label: 'Completed' },
]

function TaskFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value

        return (
          <button
            key={filter.value}
            className={`rounded-md border px-3 py-2 text-sm font-semibold transition ${
              isActive
                ? 'border-teal-700 bg-teal-700 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-teal-600 hover:text-teal-700'
            }`}
            type="button"
            aria-pressed={isActive}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}

export default TaskFilters
