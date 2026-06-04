import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api";
import type { TeamMember, UpsertTeamMemberPayload } from "@codeebe/shared";

function parseError(message: string): string {
  try {
    const j = JSON.parse(message) as { message?: string | string[] };
    if (Array.isArray(j.message)) return j.message.join(", ");
    return j.message ?? message;
  } catch {
    return message;
  }
}

const emptyForm = (): UpsertTeamMemberPayload => ({
  name: "",
  role: "",
  bio: "",
  imageUrl: "",
  linkedInUrl: "",
  published: true,
  sortOrder: 0,
});

export function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<TeamMember | "new" | null>(null);
  const [form, setForm] = useState<UpsertTeamMemberPayload>(emptyForm());
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    api
      .getAdminTeam()
      .then(setMembers)
      .catch((e: Error) => setError(parseError(e.message)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing("new");
    setForm(emptyForm());
  }

  function openEdit(m: TeamMember) {
    setEditing(m);
    setForm({
      name: m.name,
      role: m.role,
      bio: m.bio,
      imageUrl: m.imageUrl ?? "",
      linkedInUrl: m.linkedInUrl ?? "",
      published: m.published,
      sortOrder: m.sortOrder,
    });
  }

  function closeForm() {
    setEditing(null);
    setError(null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload: UpsertTeamMemberPayload = {
      ...form,
      imageUrl: form.imageUrl?.trim() || undefined,
      linkedInUrl: form.linkedInUrl?.trim() || undefined,
    };
    try {
      if (editing === "new") {
        await api.createTeamMember(payload);
      } else if (editing) {
        await api.updateTeamMember(editing.id, payload);
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
    if (!confirm(`Delete team member "${name}"?`)) return;
    try {
      await api.deleteTeamMember(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? parseError(err.message) : "Delete failed");
    }
  }

  async function togglePublished(m: TeamMember) {
    try {
      await api.updateTeamMember(m.id, { published: !m.published });
      load();
    } catch (err) {
      setError(err instanceof Error ? parseError(err.message) : "Update failed");
    }
  }

  return (
    <div className="page">
      <header className="page-header row-header">
        <div>
          <h1>Team</h1>
          <p className="muted">
            Manage team members shown on the homepage team section.
          </p>
        </div>
        <button type="button" className="btn-primary" onClick={openCreate}>
          Add member
        </button>
      </header>

      {error && !editing && <p className="error banner">{error}</p>}

      <section className="panel">
        <div className="panel-head">
          <h2>All members ({members.length})</h2>
          <button type="button" className="btn-ghost" onClick={load} disabled={loading}>
            Refresh
          </button>
        </div>

        {loading && <p className="muted">Loading…</p>}
        {!loading && members.length === 0 && (
          <p className="muted">
            No team members yet. Run <code>pnpm db:seed</code> or add one.
          </p>
        )}

        {!loading && members.length > 0 && (
          <div className="table-wrap">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.id}>
                    <td>{m.name}</td>
                    <td>{m.role}</td>
                    <td>{m.sortOrder}</td>
                    <td>
                      <button
                        type="button"
                        className={`badge ${m.published ? "badge-published" : "badge-draft"}`}
                        onClick={() => togglePublished(m)}
                      >
                        {m.published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="actions-cell">
                      <button
                        type="button"
                        className="btn-link"
                        onClick={() => openEdit(m)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-link danger"
                        onClick={() => handleDelete(m.id, m.name)}
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
        <div className="drawer-backdrop" role="presentation" onClick={closeForm}>
          <aside
            className="drawer drawer-wide"
            role="dialog"
            aria-label="Edit team member"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-head">
              <h2>{editing === "new" ? "New team member" : `Edit ${form.name}`}</h2>
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
                  <label>Role</label>
                  <input
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Sort order</label>
                  <input
                    type="number"
                    value={form.sortOrder ?? 0}
                    onChange={(e) =>
                      setForm({ ...form, sortOrder: Number(e.target.value) })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label>Bio</label>
                <textarea
                  required
                  rows={4}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Photo URL (optional)</label>
                <input
                  value={form.imageUrl ?? ""}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://…"
                />
              </div>

              <div className="field">
                <label>LinkedIn URL (optional)</label>
                <input
                  value={form.linkedInUrl ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, linkedInUrl: e.target.value })
                  }
                  placeholder="https://linkedin.com/in/…"
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
                  {saving ? "Saving…" : "Save member"}
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
