// src/components/SignupForm.jsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider.jsx";

const SignupForm = () => {
    const { signup } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        await signup(email, password);
    };

    return (
        <form onSubmit={handleSignup}>
            <h2>Înregistrare</h2>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Parolă:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Creează cont</button>
        </form>
    );
};

export default SignupForm;
