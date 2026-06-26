import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api";
import { publicWebUrl } from "../lib/site";
import type { ShowcaseProject, UpsertShowcaseProjectPayload } from "@codeebe/shared";

function linesToArray(text: string): string[] {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function arrayToLines(arr: string[]): string {
  return arr.join("\n");
}

const emptyForm = (): UpsertShowcaseProjectPayload => ({
  slug: "",
  name: "",
  category: "",
  shortDescription: "",
  techStack: [],
  overview: "",
  problemSolved: "",
  keyFeatures: [],
  businessValue: "",
  costRange: "",
  published: true,
  sortOrder: 0,
});

function parseError(message: string): string {
  try {
    const j = JSON.parse(message) as { message?: string | string[] };
    if (Array.isArray(j.message)) return j.message.join(", ");
    return j.message ?? message;
  } catch {
    return message;
  }
}

export function ProjectsPage() {
  const [projects, setProjects] = useState<ShowcaseProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<ShowcaseProject | "new" | null>(null);
  const [form, setForm] = useState<UpsertShowcaseProjectPayload>(emptyForm());
  const [techText, setTechText] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    api
      .getAdminProjects()
      .then(setProjects)
      .catch((e: Error) => setError(parseError(e.message)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing("new");
    setForm(emptyForm());
    setTechText("");
    setFeaturesText("");
  }

  function openEdit(p: ShowcaseProject) {
    setEditing(p);
    setForm({
      slug: p.slug,
      name: p.name,
      category: p.category,
      shortDescription: p.shortDescription,
      techStack: p.techStack,
      overview: p.overview,
      problemSolved: p.problemSolved,
      keyFeatures: p.keyFeatures,
      businessValue: p.businessValue,
      costRange: p.costRange,
      published: p.published,
      sortOrder: p.sortOrder,
    });
    setTechText(arrayToLines(p.techStack));
    setFeaturesText(arrayToLines(p.keyFeatures));
  }

  function closeForm() {
    setEditing(null);
    setError(null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload: UpsertShowcaseProjectPayload = {
      ...form,
      techStack: linesToArray(techText),
      keyFeatures: linesToArray(featuresText),
    };
    try {
      if (editing === "new") {
        await api.createProject(payload);
      } else if (editing) {
        await api.updateProject(editing.id, payload);
      }
      closeForm();
      load();
    } catch (err) {
      setError(err instanceof Error ? parseError(err.message) : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete project "${name}"?`)) return;
    try {
      await api.deleteProject(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? parseError(err.message) : "Delete failed");
    }
  }

  async function togglePublished(p: ShowcaseProject) {
    try {
      await api.updateProject(p.id, { published: !p.published });
      load();
    } catch (err) {
      setError(err instanceof Error ? parseError(err.message) : "Update failed");
    }
  }

  return (
    <div className="page">
      <header className="page-header row-header">
        <div>
          <h1>Portfolio</h1>
          <p className="muted">
            Manage case studies shown on the public website projects page.
          </p>
        </div>
        <button type="button" className="btn-primary" onClick={openCreate}>
          Add project
        </button>
      </header>

      {error && !editing && <p className="error banner">{error}</p>}

      <section className="panel">
        <div className="panel-head">
          <h2>All portfolio items ({projects.length})</h2>
          <button type="button" className="btn-ghost" onClick={load} disabled={loading}>
            Refresh
          </button>
        </div>

        {loading && <p className="muted">Loading…</p>}
        {!loading && projects.length === 0 && (
          <p className="muted">
            No projects in database. Run <code>pnpm db:seed</code> or add one.
          </p>
        )}

        {!loading && projects.length > 0 && (
          <div className="table-wrap">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Slug</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>
                      <code>{p.slug}</code>
                    </td>
                    <td>{p.sortOrder}</td>
                    <td>
                      <button
                        type="button"
                        className={`badge ${p.published ? "badge-published" : "badge-draft"}`}
                        onClick={() => togglePublished(p)}
                      >
                        {p.published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="actions-cell">
                      <a
                        href={`${publicWebUrl}/projects/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-link"
                      >
                        View
                      </a>
                      <button
                        type="button"
                        className="btn-link"
                        onClick={() => openEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-link danger"
                        onClick={() => handleDelete(p.id, p.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {editing && (
        <div
          className="drawer-backdrop"
          role="presentation"
          onClick={closeForm}
        >
          <aside
            className="drawer drawer-wide"
            role="dialog"
            aria-label="Edit project"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-head">
              <h2>{editing === "new" ? "New project" : `Edit ${form.name}`}</h2>
              <button type="button" className="btn-ghost" onClick={closeForm}>
                Close
              </button>
            </div>

            <form className="drawer-body project-form" onSubmit={handleSave}>
              {error && <p className="error banner">{error}</p>}

              <div className="form-grid">
                <div className="field">
                  <label>Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Slug</label>
                  <input
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Category</label>
                  <input
                    required
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  />
                </div>
                <div className="field">
                  <label>Sort order</label>
                  <input
                    type="number"
                    value={form.sortOrder ?? 0}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sortOrder: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label>Short description</label>
                <textarea
                  required
                  rows={2}
                  value={form.shortDescription}
                  onChange={(e) =>
                    setForm({ ...form, shortDescription: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>Overview</label>
                <textarea
                  required
                  rows={3}
                  value={form.overview}
                  onChange={(e) =>
                    setForm({ ...form, overview: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>Problem solved</label>
                <textarea
                  required
                  rows={2}
                  value={form.problemSolved}
                  onChange={(e) =>
                    setForm({ ...form, problemSolved: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>Business value</label>
                <textarea
                  required
                  rows={2}
                  value={form.businessValue}
                  onChange={(e) =>
                    setForm({ ...form, businessValue: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>Cost range</label>
                <input
                  required
                  value={form.costRange}
                  onChange={(e) =>
                    setForm({ ...form, costRange: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>Tech stack (one per line)</label>
                <textarea
                  rows={3}
                  value={techText}
                  onChange={(e) => setTechText(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Key features (one per line)</label>
                <textarea
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                />
              </div>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={form.published ?? true}
                  onChange={(e) =>
                    setForm({ ...form, published: e.target.checked })
                  }
                />
                Published on website
              </label>

              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? "Saving…" : "Save project"}
                </button>
                <button type="button" className="btn-ghost" onClick={closeForm}>
                  Cancel
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
}
