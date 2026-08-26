export default function Home() {
  const stats = [
    { title: "Total Applications", value: 0 },
    { title: "Applied", value: 0 },
    { title: "Interviews", value: 0 },
    { title: "Offers", value: 0 },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Job Application Tracker
          </h1>

          <p className="mt-2 text-gray-600">
            Track and manage your job applications in one place.
          </p>
        </header>

        {/* Dashboard statistics */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} title={stat.title} value={stat.value} />
          ))}
        </section>

        {/* Recent applications */}
        <section className="mt-10 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Applications
            </h2>

            <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
              Add Application
            </button>
          </div>

          <div className="mt-8 rounded-lg border border-dashed border-gray-300 p-10 text-center">
            <p className="font-medium text-gray-700">No applications yet.</p>

            <p className="mt-2 text-sm text-gray-500">
              Add your first job application to get started.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>

      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
