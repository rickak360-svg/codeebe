import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api";
import type { Lead, LeadStatus } from "@codeebe/shared";

const STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "meeting_scheduled",
  "proposal_sent",
  "converted",
  "lost",
];

function formatInr(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}

function statusLabel(s: LeadStatus) {
  return s.replace(/_/g, " ");
}

export function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [updating, setUpdating] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    api
      .getLeads()
      .then(setLeads)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    meeting: leads.filter((l) => l.status === "meeting_scheduled").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  async function handleStatusChange(id: string, status: LeadStatus) {
    setUpdating(true);
    try {
      const updated = await api.updateLeadStatus(id, status);
      setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)));
      setSelected((prev) => (prev?.id === id ? updated : prev));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="dashboard-inner">
      {error && <p className="error banner">{error}</p>}

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total leads</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">New</span>
          <span className="stat-value">{stats.new}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Meeting scheduled</span>
          <span className="stat-value">{stats.meeting}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Converted</span>
          <span className="stat-value">{stats.converted}</span>
        </div>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2>Leads</h2>
          <button type="button" className="btn-ghost" onClick={load} disabled={loading}>
            Refresh
          </button>
        </div>

        {loading && <p className="muted">Loading leads…</p>}
        {!loading && leads.length === 0 && (
          <p className="muted">No leads yet. Submit the estimate form on the web app.</p>
        )}

        {!loading && leads.length > 0 && (
          <div className="table-wrap">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Project</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Budget</th>
                  <th>Estimate</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.fullName}</td>
                    <td>{lead.projectType}</td>
                    <td>{lead.phone}</td>
                    <td>{lead.email}</td>
                    <td>{lead.budgetRange ?? "—"}</td>
                    <td>
                      {lead.estimate
                        ? `${formatInr(lead.estimate.minPrice)} – ${formatInr(lead.estimate.maxPrice)}`
                        : "—"}
                    </td>
                    <td>
                      <span className={`badge badge-${lead.status}`}>
                        {statusLabel(lead.status)}
                      </span>
                    </td>
                    <td className="nowrap">{formatDate(lead.createdAt)}</td>
                    <td>
                      <button
                        type="button"
                        className="btn-link"
                        onClick={() => setSelected(lead)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selected && (
        <div
          className="drawer-backdrop"
          role="presentation"
          onClick={() => setSelected(null)}
        >
          <aside
            className="drawer"
            role="dialog"
            aria-label="Lead details"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-head">
              <h2>{selected.fullName}</h2>
              <button type="button" className="btn-ghost" onClick={() => setSelected(null)}>
                Close
              </button>
            </div>

            <div className="drawer-body">
              <div className="field">
                <label>Status</label>
                <select
                  value={selected.status}
                  disabled={updating}
                  onChange={(e) =>
                    handleStatusChange(selected.id, e.target.value as LeadStatus)
                  }
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {statusLabel(s)}
                    </option>
                  ))}
                </select>
              </div>

              <dl className="detail-list">
                <dt>Email</dt>
                <dd>{selected.email}</dd>
                <dt>Phone</dt>
                <dd>{selected.phone}</dd>
                <dt>Company</dt>
                <dd>{selected.companyName ?? "—"}</dd>
                <dt>Project type</dt>
                <dd>{selected.projectType}</dd>
                <dt>Source</dt>
                <dd>{selected.source ?? "estimate"}</dd>
                <dt>Timeline</dt>
                <dd>{selected.timeline}</dd>
                <dt>Budget range</dt>
                <dd>{selected.budgetRange ?? "—"}</dd>
              </dl>

              <div className="field">
                <label>Description</label>
                <p className="text-block">{selected.description}</p>
              </div>

              {selected.features.length > 0 && (
                <div className="field">
                  <label>Features</label>
                  <ul className="tag-list">
                    {selected.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selected.estimate && (
                <div className="estimate-box">
                  <h3>Estimate</h3>
                  <p className="estimate-range">
                    {formatInr(selected.estimate.minPrice)} –{" "}
                    {formatInr(selected.estimate.maxPrice)}
                  </p>
                  <p>
                    <strong>Package:</strong> {selected.estimate.suggestedPackage}
                  </p>
                  <p>
                    <strong>Summary:</strong> {selected.estimate.summary}
                  </p>
                  <ul className="notes-list">
                    {selected.estimate.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
