import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const savedData = localStorage.getItem("signupData");
    if (!savedData) {
      setError("No user found. Please sign up first!");
      return;
    }

    const parsedData = JSON.parse(savedData);

    if (parsedData.username === username && parsedData.password === password) {
      setError("");
      alert("Login successful!");
      navigate("/"); 
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Username</label>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      {/* Signup button */}
      <p style={styles.switchText}>
        Don’t have an account?{" "}
        <button onClick={() => navigate("/signup")} style={styles.linkButton}>
          Sign up
        </button>
      </p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#444",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  button: {
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "13px",
    textAlign: "center",
  },
  switchText: {
    marginTop: "15px",
    textAlign: "center",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#007BFF",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "14px",
  },
};

export default Login;
