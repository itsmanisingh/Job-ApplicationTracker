"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchApplications() {
      const response = await fetch("/api/applications");

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      setApplications(data);
    }

    fetchApplications();
  }, []);

  const stats = [
    {
      title: "Total Applications",
      value: applications.length,
    },
    {
      title: "Applied",
      value: applications.filter((app) => app.status === "Applied").length,
    },
    {
      title: "Interviews",
      value: applications.filter((app) => app.status === "Interview").length,
    },
    {
      title: "Rejected",
      value: applications.filter((app) => app.status === "Rejected").length,
    },
    {
      title: "Offers",
      value: applications.filter((app) => app.status === "Offer").length,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Job Application Tracker
          </h1>

          <p className="mt-2 text-gray-600">
            Track and manage your job applications in one place.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} title={stat.title} value={stat.value} />
          ))}
        </section>

        <section className="mt-10 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Applications
            </h2>

            <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
              Add Application
            </button>
          </div>

          <div className="mt-8 space-y-4">
            {applications.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center">
                <p className="font-medium text-gray-700">
                  No applications yet.
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Add your first job application to get started.
                </p>
              </div>
            ) : (
              applications.map((application) => (
                <div
                  key={application._id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {application.company}
                      </h3>

                      <p className="text-sm text-gray-600">
                        {application.position}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {application.location}
                      </p>
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                      {application.status}
                    </span>
                  </div>
                </div>
              ))
            )}
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
