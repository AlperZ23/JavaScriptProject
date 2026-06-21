// src/Components/TaskStats.jsx
export default function TaskStats({ counts }) {
  const stats = [
    {
      label: "Total Tasks",
      value: counts.all,
      helper: "All saved items"
    },
    {
      label: "Active",
      value: counts.active,
      helper: "Remaining work"
    },
    {
      label: "Completed",
      value: counts.completed,
      helper: "Finished items"
    },
    {
      label: "High Priority",
      value: counts.highPriority,
      helper: "Needs attention"
    }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70"
        >
          <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          <p className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            {stat.value}
          </p>
          <p className="mt-2 text-sm text-slate-400">{stat.helper}</p>
        </article>
      ))}
    </section>
  );
}