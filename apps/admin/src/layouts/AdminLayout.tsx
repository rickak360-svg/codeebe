import { NavLink, Outlet } from "react-router-dom";
import { ApiBanner } from "../components/ApiBanner";

const nav = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/leads", label: "Leads" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/team", label: "Team" },
  { to: "/services", label: "Services" },
  { to: "/settings", label: "Settings" },
];

export function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <span className="eyebrow">Codeebe</span>
          <strong>Admin</strong>
        </div>
        <nav className="sidebar-nav">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <p className="sidebar-foot">
          Public site:{" "}
          <a href="http://localhost:3000" target="_blank" rel="noreferrer">
            localhost:3000
          </a>
        </p>
      </aside>

      <div className="admin-main">
        <ApiBanner />
        <Outlet />
      </div>
    </div>
  );
}
