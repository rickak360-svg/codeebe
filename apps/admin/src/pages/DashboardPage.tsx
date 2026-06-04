import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import type { AdminOverview } from "@codeebe/shared";

function parseError(message: string): string {
  try {
    const j = JSON.parse(message) as { message?: string };
    return j.message ?? message;
  } catch {
    return message;
  }
}

export function DashboardPage() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    api
      .getAdminOverview()
      .then(setOverview)
      .catch((e: Error) => setError(parseError(e.message)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="page">
      <header className="page-header">
        <h1>Dashboard</h1>
        <p className="muted">
          Overview of leads, portfolio, team, and services.
        </p>
      </header>

      {error && <p className="error banner">{error}</p>}

      {loading && <p className="muted">Loading overview…</p>}

      {overview && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Total leads</span>
              <span className="stat-value">{overview.leads.total}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">New leads</span>
              <span className="stat-value">{overview.leads.new}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Portfolio items</span>
              <span className="stat-value">{overview.projects.total}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Team members</span>
              <span className="stat-value">{overview.team.total}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Services</span>
              <span className="stat-value">{overview.services.total}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Published content</span>
              <span className="stat-value">
                {overview.projects.published +
                  overview.team.published +
                  overview.services.published}
              </span>
            </div>
          </div>

          <div className="quick-actions">
            <Link to="/leads" className="action-card">
              <strong>Leads</strong>
              <span className="muted">Status updates & estimates</span>
            </Link>
            <Link to="/portfolio" className="action-card">
              <strong>Portfolio</strong>
              <span className="muted">Case studies & project showcase</span>
            </Link>
            <Link to="/team" className="action-card">
              <strong>Team</strong>
              <span className="muted">Homepage team members</span>
            </Link>
            <Link to="/services" className="action-card">
              <strong>Services</strong>
              <span className="muted">Service cards & trust badges</span>
            </Link>
          </div>

          <section className="panel">
            <div className="panel-head">
              <h2>Recent leads</h2>
              <Link to="/leads" className="btn-ghost">
                View all
              </Link>
            </div>
            {overview.recentLeads.length === 0 ? (
              <p className="muted">No leads yet.</p>
            ) : (
              <ul className="recent-list">
                {overview.recentLeads.map((l) => (
                  <li key={l.id}>
                    <strong>{l.fullName}</strong>
                    <span className="muted">
                      {l.projectType} · {l.status.replace(/_/g, " ")}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
