import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import type {
  ServiceItem,
  ServiceKind,
  UpsertServiceItemPayload,
} from "@codeebe/shared";

function parseError(message: string): string {
  try {
    const j = JSON.parse(message) as { message?: string | string[] };
    if (Array.isArray(j.message)) return j.message.join(", ");
    return j.message ?? message;
  } catch {
    return message;
  }
}

const emptyForm = (kind: ServiceKind = "card"): UpsertServiceItemPayload => ({
  kind,
  title: "",
  description: "",
  published: true,
  sortOrder: 0,
});

type ViewMode = "list" | "grid";

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="2" width="14" height="2" rx="1" fill="currentColor" />
      <rect x="1" y="7" width="14" height="2" rx="1" fill="currentColor" />
      <rect x="1" y="12" width="14" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
    </svg>
  );
}

export function ServicesPage() {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<ServiceKind | "all">("all");
  const [editing, setEditing] = useState<ServiceItem | "new" | null>(null);
  const [form, setForm] = useState<UpsertServiceItemPayload>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const load = useCallback(() => {
    setLoading(true);
    api
      .getAdminServices()
      .then(setItems)
      .catch((e: Error) => setError(parseError(e.message)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((i) => i.kind === filter);
  }, [items, filter]);

  function openCreate(kind: ServiceKind) {
    setEditing("new");
    setForm(emptyForm(kind));
  }

  function openEdit(item: ServiceItem) {
    setEditing(item);
    setForm({
      kind: item.kind,
      title: item.title,
      description: item.description,
      published: item.published,
      sortOrder: item.sortOrder,
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
    try {
      if (editing === "new") {
        await api.createServiceItem(form);
      } else if (editing) {
        await api.updateServiceItem(editing.id, form);
      }
      closeForm();
      load();
    } catch (err) {
      setError(err instanceof Error ? parseError(err.message) : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await api.deleteServiceItem(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? parseError(err.message) : "Delete failed");
    }
  }

  async function togglePublished(item: ServiceItem) {
    try {
      await api.updateServiceItem(item.id, { published: !item.published });
      load();
    } catch (err) {
      setError(err instanceof Error ? parseError(err.message) : "Update failed");
    }
  }

  return (
    <div className="page">
      <header className="page-header row-header">
        <div>
          <h1>Services</h1>
          <p className="muted">
            Manage homepage service cards and trust badges shown under the hero.
          </p>
        </div>
        <div className="row-header-actions">
          <button type="button" className="btn-ghost" onClick={() => openCreate("card")}>
            Add service card
          </button>
          <button type="button" className="btn-primary" onClick={() => openCreate("badge")}>
            Add trust badge
          </button>
        </div>
      </header>

      {error && !editing && <p className="error banner">{error}</p>}

      <section className="panel">
        <div className="panel-head">
          <div className="filter-tabs">
            <button
              type="button"
              className={filter === "all" ? "filter-tab active" : "filter-tab"}
              onClick={() => setFilter("all")}
            >
              All ({items.length})
            </button>
            <button
              type="button"
              className={filter === "card" ? "filter-tab active" : "filter-tab"}
              onClick={() => setFilter("card")}
            >
              Service cards
            </button>
            <button
              type="button"
              className={filter === "badge" ? "filter-tab active" : "filter-tab"}
              onClick={() => setFilter("badge")}
            >
              Trust badges
            </button>
          </div>

          <div className="panel-head-right">
            <div className="view-toggle">
              <button
                type="button"
                className={viewMode === "list" ? "view-toggle-btn active" : "view-toggle-btn"}
                onClick={() => setViewMode("list")}
                title="List view"
              >
                <ListIcon />
              </button>
              <button
                type="button"
                className={viewMode === "grid" ? "view-toggle-btn active" : "view-toggle-btn"}
                onClick={() => setViewMode("grid")}
                title="Grid view"
              >
                <GridIcon />
              </button>
            </div>
            <button type="button" className="btn-ghost" onClick={load} disabled={loading}>
              Refresh
            </button>
          </div>
        </div>

        {loading && <p className="muted">Loading…</p>}
        {!loading && filtered.length === 0 && (
          <p className="muted">
            No items yet. Run <code>pnpm db:seed</code> or add one.
          </p>
        )}

        {/* ── Grid view ── */}
        {!loading && filtered.length > 0 && viewMode === "grid" && (
          <div className="services-grid">
            {filtered.map((item) => (
              <div key={item.id} className="service-card">
                <div className="service-card-head">
                  <span className={`badge ${item.kind === "card" ? "badge-kind-card" : "badge-kind-badge"}`}>
                    {item.kind === "card" ? "Card" : "Badge"}
                  </span>
                  <button
                    type="button"
                    className={`badge ${item.published ? "badge-published" : "badge-draft"}`}
                    onClick={() => togglePublished(item)}
                    title="Toggle published"
                  >
                    {item.published ? "Published" : "Draft"}
                  </button>
                </div>
                <div className="service-card-body">
                  <p className="service-card-title">{item.title}</p>
                  {item.kind === "card" && item.description && (
                    <p className="service-card-desc">{item.description}</p>
                  )}
                  {item.kind === "badge" && (
                    <p className="service-card-order">Order: {item.sortOrder}</p>
                  )}
                </div>
                <div className="service-card-foot">
                  <button type="button" className="btn-link" onClick={() => openEdit(item)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-link danger"
                    onClick={() => handleDelete(item.id, item.title)}
                  >
                    Delete
                  </button>
                  <span className="service-card-order-tag">#{item.sortOrder}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── List view ── */}
        {!loading && filtered.length > 0 && viewMode === "list" && (
          <div className="table-wrap">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span className={`badge ${item.kind === "card" ? "badge-kind-card" : "badge-kind-badge"}`}>
                        {item.kind === "card" ? "Card" : "Badge"}
                      </span>
                    </td>
                    <td>
                      <span className="lead-name">{item.title}</span>
                    </td>
                    <td className="muted-cell">
                      {item.kind === "card" ? item.description : "—"}
                    </td>
                    <td className="lead-sub">{item.sortOrder}</td>
                    <td>
                      <button
                        type="button"
                        className={`badge ${item.published ? "badge-published" : "badge-draft"}`}
                        onClick={() => togglePublished(item)}
                      >
                        {item.published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button type="button" className="btn-link" onClick={() => openEdit(item)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn-link danger"
                          onClick={() => handleDelete(item.id, item.title)}
                        >
                          Delete
                        </button>
                      </div>
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
            aria-label="Edit service item"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-head">
              <h2>
                {editing === "new"
                  ? form.kind === "badge"
                    ? "New trust badge"
                    : "New service card"
                  : `Edit — ${form.title}`}
              </h2>
              <button type="button" className="btn-ghost" onClick={closeForm}>
                Close
              </button>
            </div>

            <form className="drawer-body project-form" onSubmit={handleSave}>
              {error && <p className="error banner">{error}</p>}

              <div className="form-grid">
                <div className="field">
                  <label>Type</label>
                  <select
                    value={form.kind}
                    onChange={(e) =>
                      setForm({ ...form, kind: e.target.value as ServiceKind })
                    }
                    disabled={editing !== "new"}
                  >
                    <option value="card">Service card</option>
                    <option value="badge">Trust badge</option>
                  </select>
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
                <label>{form.kind === "badge" ? "Badge label" : "Title"}</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              {form.kind === "card" && (
                <div className="field">
                  <label>Description</label>
                  <textarea
                    required
                    rows={3}
                    value={form.description ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>
              )}

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
                  {saving ? "Saving…" : "Save"}
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
