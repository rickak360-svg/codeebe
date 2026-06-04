export function SettingsPage() {
  const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

  return (
    <div className="page">
      <header className="page-header">
        <h1>Settings</h1>
        <p className="muted">Environment and links for local development.</p>
      </header>

      <section className="panel">
        <h2>API connection</h2>
        <dl className="settings-dl">
          <dt>Admin API URL</dt>
          <dd>
            <code>{apiUrl}</code>
          </dd>
          <dt>Config file</dt>
          <dd>
            <code>apps/admin/.env</code> → <code>VITE_API_URL</code>
          </dd>
        </dl>
      </section>

      <section className="panel">
        <h2>Database & API</h2>
        <ul className="settings-list">
          <li>
            <code>pnpm db:up</code> — start Postgres
          </li>
          <li>
            <code>pnpm db:migrate</code> — apply migrations
          </li>
          <li>
            <code>pnpm db:seed</code> — seed showcase projects
          </li>
          <li>
            <code>pnpm dev:api</code> — NestJS on port 3001
          </li>
        </ul>
      </section>

      <section className="panel">
        <h2>Coming soon</h2>
        <ul className="settings-list muted">
          <li>Admin authentication</li>
          <li>Estimate form options (pricing tiers)</li>
          <li>Homepage content blocks</li>
          <li>Email & notification settings</li>
        </ul>
        <p className="muted small">
          {/* TODO: protect admin with authentication before production. */}
        </p>
      </section>
    </div>
  );
}
