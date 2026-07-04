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
    background: "#0a0b0c",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: 380,
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: 16,
    padding: "36px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    boxShadow: "0 24px 64px rgba(0,0,0,0.55)",
  },
  brand: { marginBottom: 8, display: "flex", flexDirection: "column", gap: 6 },
  eyebrow: {
    color: "#ff6600",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
  },
  title: { color: "#fff", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" },
  label: { color: "#a1a1aa", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" },
  input: {
    background: "#111111",
    border: "1px solid #2a2a2a",
    borderRadius: 10,
    padding: "13px 14px",
    color: "#e3e2e2",
    fontSize: 14,
    outline: "none",
    width: "100%",
    fontFamily: "inherit",
    transition: "border-color 0.15s, box-shadow 0.15s",
  },
  error: { color: "#f87171", fontSize: 13, margin: 0 },
  button: {
    marginTop: 6,
    background: "#ff6600",
    color: "#1a0a00",
    fontWeight: 700,
    fontSize: 15,
    padding: "13px",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    transition: "background 0.15s, box-shadow 0.15s",
    width: "100%",
  },
};
