export const TASK_FILTERS = Object.freeze({
  all: 'all',
  active: 'active',
  completed: 'completed',
})

export const PRIORITIES = Object.freeze(['Low', 'Medium', 'High'])

const makeTaskId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const createTask = ({ title, priority = 'Medium' }) => ({
  id: makeTaskId(),
  title,
  priority,
  completed: false,
  createdAt: new Date().toISOString(),
})
