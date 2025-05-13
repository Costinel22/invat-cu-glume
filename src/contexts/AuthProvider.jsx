// // src/context/AuthProvider.jsx
// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const login = async (email, password) => {
//         try {
//             const response = await fetch("http://localhost:5000/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email, password }),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 localStorage.setItem("token", data.token);
//                 setUser({ email, token: data.token });
//             } else {
//                 const data = await response.json();
//                 throw new Error(data.message || "Eroare la autentificare");
//             }
//         } catch (err) {
//             console.error(err.message);
//         }
//     };

//     const signup = async (email, password) => {
//         try {
//             const response = await fetch("http://localhost:5000/signup", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email, password }),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 localStorage.setItem("token", data.token);
//                 setUser({ email, token: data.token });
//             } else {
//                 const data = await response.json();
//                 throw new Error(data.message || "Eroare la înregistrare");
//             }
//         } catch (err) {
//             console.error(err.message);
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem("token");
//         setUser(null);
//     };

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             setUser({ token });
//         }
//         setLoading(false);
//     }, []);

//     if (loading) return <div>Loading...</div>;

//     return (
//         <AuthContext.Provider value={{ user, login, logout, signup }}>
//             {children}
//         </AuthContext.Provider>
//     );

//     async function updateAvatar(file) {S
//         const formData = new FormData();
//         formData.append('avatar', file);
//         const res = await fetch('/api/user/avatar', {
//           method: 'POST',
//           body: formData,
//           credentials: 'include'
//         });
//         const data = await res.json();
//         return data.avatarUrl; // sau ce returnează backendul tău
//       }

// };

// export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            setUser({ email, token: data.token, avatar: data.avatar });
        } else {
            throw new Error(data.message || "Eroare la autentificare");
        }
    };


    const signup = async (email, password, avatarUrl = null) => {
        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, avatar: avatarUrl }),
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            setUser({ email, token: data.token, avatar: data.avatar });
        } else {
            throw new Error(data.message || "Eroare la înregistrare");
        }
    };

    const updateAvatar = async (file) => {
        const formData = new FormData();
        formData.append('avatar', file);
        const token = localStorage.getItem("token");
        const res = await fetch('http://localhost:5000/api/user/avatar', {
            method: 'POST',
            body: formData,
            credentials: 'include',
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        const data = await res.json();
        if (data.avatarUrl) {
            setUser(prev => ({ ...prev, avatar: data.avatarUrl }));
        }
        return data.avatarUrl;
    };


    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ token });
        }
        setLoading(false);
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            signup,
            updateAvatar // <-- ADĂUGAT ÎN CONTEXT!
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
