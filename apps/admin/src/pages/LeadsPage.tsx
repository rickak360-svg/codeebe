import { LeadsDashboard } from "../components/LeadsDashboard";

export function LeadsPage() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Leads</h1>
        <p className="muted">
          View and update leads from the public estimate and contact forms.
        </p>
      </header>
      <LeadsDashboard />
    </div>
  );
}
