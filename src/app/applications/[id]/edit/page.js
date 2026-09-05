"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditApplication() {
  const router = useRouter();
  const params = useParams();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    status: "Applied",
    jobUrl: "",
    notes: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApplication() {
      try {
        const response = await fetch(`/api/applications/${params.id}`);

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Failed to load application");
          return;
        }

        setFormData({
          company: data.company || "",
          position: data.position || "",
          location: data.location || "",
          status: data.status || "Applied",
          jobUrl: data.jobUrl || "",
          notes: data.notes || "",
        });
      } catch (error) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchApplication();
  }, [params.id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSaving(true);

    try {
      const response = await fetch(`/api/applications/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to update application");
        return;
      }

      router.push("/");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-2xl px-6 py-10">
          <p className="text-gray-600">Loading application...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Application
          </h1>

          <p className="mt-2 text-gray-600">
            Update your job application details.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl bg-white p-6 shadow-sm"
        >
          <div>
            <label
              htmlFor="company"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Company
            </label>

            <input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="position"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Position
            </label>

            <input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Location
            </label>

            <input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="jobUrl"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Job URL
            </label>

            <input
              id="jobUrl"
              name="jobUrl"
              type="url"
              value={formData.jobUrl}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Notes
            </label>

            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}