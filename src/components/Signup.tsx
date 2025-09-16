import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignupProps {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string; // string hi rakho, regex test easily ho jata hai
}

const Signup: React.FC = () => {
    const [formData, setFormData] = useState<SignupProps>({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
    });

    const [error, setError] = useState<string>("");
    const navigate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, username, email, password, confirmPassword, phoneNumber } =
            formData;

        // 🔹 Name validation: only uppercase alphabets
        if (!/^[A-Z]+$/.test(name)) {
            setError("Name must be in UPPERCASE letters only.");
            return;
        }

        // 🔹 Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email.");
            return;
        }

        // 🔹 Username validation (Uppercase + contains Name + Special char)
        const usernameRegex = new RegExp(`^(${name})(?=.*[!@#$%^&*._-])[A-Z0-9!@#$%^&*._-]+$`);

        if (!usernameRegex.test(username)) {
            setError(
                "Username must start with NAME (uppercase) and contain at least one special character."
            );
            return;
        }


        // 🔹 Password validation
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }
        if (password === username) {
            setError("Password cannot be the same as username.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Password and Confirm Password do not match.");
            return;
        }

        // 🔹 Phone number validation (India only)
        const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setError("Please enter a valid Indian phone number (+91 and 10 digits).");
            return;
        }

   
        setError("");
        alert("Signup successful!");

        // Save data to localStorage
        localStorage.setItem("signupData", JSON.stringify(formData));
        navigate("/login");
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Signup Form</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>Name (UPPERCASE only)</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter NAME in UPPERCASE"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                />

                <label style={styles.label}>
                    Username (Alphabet + Special Char required)
                </label>
                <input
                    type="text"
                    name="username"
                    placeholder="e.g. JOHN@123"
                    value={formData.username}
                    onChange={handleChange}
                    style={styles.input}
                />

                <label style={styles.label}>Email (Valid Google email)</label>
                <input
                    type="email"
                    name="email"
                    placeholder="e.g. example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                />

                <label style={styles.label}>Password (min 8 chars)</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                />

                <label style={styles.label}>Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={styles.input}
                />

                <label style={styles.label}>Phone Number (India only)</label>
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="+91 XXXXXXXXXX"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    style={styles.input}
                />

                {error && <p style={styles.error}>{error}</p>}

                <button type="submit" style={styles.button}>
                    Sign Up
                </button>
                <p style={{ textAlign: "center", marginTop: "15px" }}>
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#007BFF",
                            cursor: "pointer",
                            textDecoration: "underline",
                            fontSize: "14px",
                        }}
                    >
                        Login
                    </button>
                </p>
            </form>
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
};

export default Signup;
