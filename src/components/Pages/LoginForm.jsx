import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Te rugăm să completezi toate câmpurile.");
      return;
    }
    try {
      await login(email, password); // login din context setează userul și avatarul
    } catch (err) {
      setError("Email sau parolă incorectă.");
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      alert("Introdu mai întâi adresa de email pentru a reseta parola.");
      return;
    }
    try {
      await resetPassword(email);
      alert("Ți-am trimis un link pentru resetarea parolei pe email.");
    } catch (err) {
      alert("A apărut o eroare la trimiterea emailului de resetare.");
    }
  };
  axios.get("http://localhost:5000/test")
  .then(res => console.log(res.data))
  .catch(err => console.error("CORS fail:", err));


  return (
    <div>
      <h2>Autentificare</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Parolă</label><br />
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: "2rem" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              style={{
                position: "absolute",
                right: "5px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.2rem"
              }}
              tabIndex={-1}
              aria-label={showPassword ? "Ascunde parola" : "Arată parola"}
              title={showPassword ? "Ascunde parola" : "Arată parola"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <button
              type="button"
              onClick={handleResetPassword}
              style={{
                background: "none",
                border: "none",
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
                padding: 0
              }}
            >
              Ai uitat parola?
            </button>
          </div>
        </div>
        {error && (
          <div style={{ color: "red", marginTop: "1rem" }}>
            {error}
          </div>
        )}
        <button type="submit" style={{ marginTop: "1rem" }}>Autentificare</button>
      </form>
    </div>
  );
};

export default LoginForm;
