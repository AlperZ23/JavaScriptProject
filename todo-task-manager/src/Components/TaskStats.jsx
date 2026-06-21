function TaskStats({ active, completed, total }) {
  const stats = [
    { label: 'Total', value: total },
    { label: 'Active', value: active },
    { label: 'Completed', value: completed },
  ]

  return (
    <section className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
        >
          <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
          <p className="mt-1 text-3xl font-bold text-slate-950">{stat.value}</p>
        </div>
      ))}
    </section>
  )
}

export default TaskStats
