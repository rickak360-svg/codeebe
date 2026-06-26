import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ApiBanner } from "../components/ApiBanner";
import { clearToken } from "../lib/auth";
import { publicWebUrl } from "../lib/site";

const nav = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/leads", label: "Leads" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/team", label: "Team" },
  { to: "/services", label: "Services" },
  { to: "/settings", label: "Settings" },
];

export function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    clearToken();
    navigate("/login", { replace: true });
  }

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
        <button type="button" className="nav-link" onClick={handleLogout}>
          Log out
        </button>
        <p className="sidebar-foot">
          Public site:{" "}
          <a href={publicWebUrl} target="_blank" rel="noreferrer">
            {publicWebUrl.replace(/^https?:\/\//, "")}
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
