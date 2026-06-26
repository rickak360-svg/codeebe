import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { isAuthenticated, setToken } from "../lib/auth";

export function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token } = await api.login(password);
      setToken(token);
      navigate("/", { replace: true });
    } catch {
      setError("Invalid password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrap}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <div style={styles.brand}>
          <span style={styles.eyebrow}>Codeebe</span>
          <strong style={styles.title}>Admin Login</strong>
        </div>
        <label style={styles.label} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          placeholder="Enter admin password"
          autoFocus
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button} disabled={loading || !password}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0d0d0d",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: 360,
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: 16,
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  brand: { marginBottom: 12, display: "flex", flexDirection: "column", gap: 4 },
  eyebrow: {
    color: "#ff6b00",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },
  title: { color: "#fff", fontSize: 22 },
  label: { color: "#999", fontSize: 13 },
  input: {
    background: "#111",
    border: "1px solid #2a2a2a",
    borderRadius: 8,
    padding: "12px 14px",
    color: "#fff",
    fontSize: 14,
  },
  error: { color: "#ff5555", fontSize: 13, margin: 0 },
  button: {
    marginTop: 8,
    background: "#ff6b00",
    color: "#1a0a00",
    fontWeight: 700,
    fontSize: 15,
    padding: "12px",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
};
