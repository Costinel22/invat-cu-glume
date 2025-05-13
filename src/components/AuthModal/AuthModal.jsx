import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthProvider';
import { FaUserCircle } from "react-icons/fa";
import './AuthModal.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const AuthModal = ({ show, handleClose, userAvatarUrl }) => {
    const { t } = useTranslation();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const { login, signup, resetPassword, updateAvatar } = useAuth();

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);
            setAvatarPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setInfo('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
                setLoading(false);
                handleClose();
            } else {
                let avatarUrl = null;
                if (avatar) {
                    avatarUrl = await updateAvatar(avatar);
                }
                await signup(email, password, avatarUrl);
                setLoading(false);
                handleClose();
            }
        } catch (err) {
            setLoading(false);
            setError(isLogin ? t('error.invalid_credentials') : t('error.signup_failed'));
        }
    };

    const handleResetPassword = async () => {
        setError('');
        setInfo('');
        if (!email) {
            setError(t('error.enter_email_for_reset'));
            return;
        }
        try {
            await resetPassword(email);
            setInfo(t('info.reset_email_sent'));
        } catch (err) {
            setError(t('error.reset_email_failed'));
        }
    };

    let displayAvatar = avatarPreview || userAvatarUrl || null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{isLogin ? t('login.title') : t('signup.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="avatar-display">
                    {displayAvatar ? (
                        <img src={displayAvatar} alt="Avatar" />
                    ) : (
                        email ? email[0].toUpperCase() : <FaUserCircle size={32} color="#bbb" />
                    )}
                </div>

                {!isLogin && (
                    <Form.Group controlId="formAvatar" className="mt-2 mb-2 text-center">
                        <Form.Label className="avatar-label">
                            {t('signup.choose_avatar')}
                        </Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            style={{ display: "inline-block" }}
                        />
                    </Form.Group>
                )}

                {isLogin && userAvatarUrl && (
                    <div className="text-center mb-2">
                        <Button variant="link" onClick={() => { setIsLogin(false); setAvatar(null); setAvatarPreview(null); }}>
                            {t('login.change_avatar')}
                        </Button>
                    </div>
                )}

                <Form onSubmit={handleSubmit}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {info && <Alert variant="success">{info}</Alert>}

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder={t("form.email_placeholder")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mt-3 auth-password-group">
                        <Form.Label>{t('form.password')}</Form.Label>
                        <div style={{ position: 'relative' }}>
                            <Form.Control
                                className="auth-password-input"
                                type={showPassword ? 'text' : 'password'}
                                placeholder={t("form.password_placeholder")}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="auth-toggle-password-btn"
                                onClick={() => setShowPassword(v => !v)}
                                aria-label={t("form.toggle_password")}
                                title={t("form.toggle_password")}
                                tabIndex={-1}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </Form.Group>

                    <div className="mt-2">
                        <Button variant="link" type="button" onClick={handleResetPassword}>
                            {t('form.forgot_password')}
                        </Button>
                    </div>

                    <Button variant="primary" type="submit" className="w-100 mt-4" disabled={loading}>
                        {loading ? t('form.processing') : (isLogin ? t('login.button') : t('signup.button'))}
                    </Button>
                </Form>

                <div className="text-center mt-3">
                    {isLogin ? (
                        <span>
                            {t('login.no_account')}{" "}
                            <Button variant="link" onClick={() => { setIsLogin(false); setError(''); setInfo(''); }}>
                                {t('signup.title')}
                            </Button>
                        </span>
                    ) : (
                        <span>
                            {t('signup.have_account')}{" "}
                            <Button variant="link" onClick={() => { setIsLogin(true); setError(''); setInfo(''); }}>
                                {t('login.title')}
                            </Button>
                        </span>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AuthModal;


// import React, { useState } from 'react';
// import { Modal, Button, Form, Alert } from 'react-bootstrap';
// import { useAuth } from '../../contexts/AuthProvider';
// import { FaUserCircle } from "react-icons/fa";
// import './AuthModal.css';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next';


// const AuthModal = ({ show, handleClose, userAvatarUrl }) => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [info, setInfo] = useState('');
//     const [avatar, setAvatar] = useState(null); // File
//     const [avatarPreview, setAvatarPreview] = useState(null); // URL local
//     const { login, signup, resetPassword, updateAvatar } = useAuth();
//     const { t } = useTranslation();
   


//     // Traducere rapidă
//     // const t = (ro, en) => (navigator.language.startsWith('ro') ? ro : en);
//     // axios.post('http://localhost:5000/signup', data, {
//     //     withCredentials: true
//     //   });
      
   
    
//     // Când selectezi un fișier, setezi și preview local
//     const handleAvatarChange = (e) => {
//         if (e.target.files && e.target.files[0]) {
//             setAvatar(e.target.files[0]);
//             setAvatarPreview(URL.createObjectURL(e.target.files[0]));
//         }
        
//     };

//     // Submit login/signup
//     const handleSubmit = async (e) => {
//         try {
//             const response = await axios.post('http://localhost:5000/signup', userData, {
//                 withCredentials: true,
//             });

//             const data = response.data;
//             console.log('Răspuns:', data);

//             e.preventDefault();
//             setError('');
//             setInfo('');
//             setLoading(true);

//             try {
//                 if (isLogin) {
//                     await login(email, password);
//                     setLoading(false);
//                     handleClose();
//                 } else {
//                     let avatarUrl = null;
//                     if (avatar) {
//                         avatarUrl = await updateAvatar(avatar);
//                     }
//                     await signup(email, password, avatarUrl);
//                     setLoading(false);
//                     handleClose();
//                 }
//             } catch (err) {
//                 setLoading(false);
//                 setError(isLogin ? t('Email sau parolă incorectă.') : t('Eroare la crearea contului.'));
//             }
//         } catch (error) {
//             console.error('Eroare la trimiterea formularului:', error);
//             setError(t('A apărut o eroare. Încercați din nou.'));
//         }
//     };
    

//     // Resetare parolă
//     const handleResetPassword = async () => {
//         setError('');
//         setInfo('');
//         if (!email) {
//             setError(t('Te rugăm să introduci adresa de email pentru resetare.', 'Please enter your email for reset.'));
//             return;
//         }
//         try {
//             await resetPassword(email);
//             setInfo(t('Ți-am trimis un email pentru resetarea parolei.', 'We sent you a password reset email.'));
//         } catch (err) {
//             setError(t('A apărut o eroare la trimiterea emailului de resetare.', 'Error sending reset email.'));
//         }
//     };

//     // Ce avatar să afișezi?
//     let displayAvatar = avatarPreview || userAvatarUrl || null;

//     return (
//         <Modal show={show} onHide={handleClose} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>{isLogin ? t('Autentificare', 'Login') : t('Creează cont', 'Sign up')}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <div style={{
//                     width: 64, height: 64, borderRadius: "50%",
//                     background: "#eee", color: "#888",
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                     fontSize: 32, fontWeight: "bold", margin: "0 auto 16px auto",
//                     overflow: "hidden"
//                 }}>
//                     {displayAvatar ? (
//                         <img src={displayAvatar} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                     ) : (
//                         email ? email[0].toUpperCase() : <FaUserCircle size={32} color="#bbb" />
//                     )}
//                 </div>
//                 {/* Upload avatar la înregistrare sau schimbare după login */}
//                 {!isLogin && (
//                     <Form.Group controlId="formAvatar" className="mt-2 mb-2 text-center">
//                         <Form.Label style={{ cursor: "pointer", color: "#007bff", textDecoration: "underline" }}>
//                             {t('Alege un avatar (opțional)', 'Choose an avatar (optional)')}
//                         </Form.Label>
//                         <Form.Control
//                             type="file"
//                             accept="image/*"
//                             onChange={handleAvatarChange}
//                             style={{ display: "inline-block" }}
//                         />
//                     </Form.Group>
//                 )}
//                 {/* Buton de schimbare avatar după login */}
//                 {isLogin && userAvatarUrl && (
//                     <div className="text-center mb-2">
//                         <Button
//                             variant="link"
//                             style={{ padding: 0, fontSize: "1rem" }}
//                             onClick={() => { setIsLogin(false); setAvatar(null); setAvatarPreview(null); }}
//                         >
//                             {t('Schimbă avatarul', 'Change avatar')}
//                         </Button>
//                     </div>
//                 )}
//                 <Form onSubmit={handleSubmit}>
//                     {error && <Alert variant="danger">{error}</Alert>}
//                     {info && <Alert variant="success">{info}</Alert>}
//                     <Form.Group controlId="formBasicEmail">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder={t("Introduceți emailul", "Enter your email")}
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formBasicPassword" className="mt-3 auth-password-group">
//                         <Form.Label>{t('Parolă', 'Password')}</Form.Label>
//                         <div style={{ position: 'relative' }}>
//                             <Form.Control
//                                 className="auth-password-input"
//                                 type={showPassword ? 'text' : 'password'}
//                                 placeholder={t("Parolă", "Password")}
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                             <button
//                                 type="button"
//                                 className="auth-toggle-password-btn"
//                                 onClick={() => setShowPassword(v => !v)}
//                                 aria-label={showPassword ? t("Ascunde parola", "Hide password") : t("Arată parola", "Show password")}
//                                 title={showPassword ? t("Ascunde parola", "Hide password") : t("Arată parola", "Show password")}
//                                 tabIndex={-1}
//                             >
//                                 {showPassword ? "🙈" : "👁️"}
//                             </button>
//                         </div>
//                     </Form.Group>
//                     <div style={{ marginTop: "0.5rem" }}>
//                         <Button
//                             variant="link"
//                             type="button"
//                             onClick={handleResetPassword}
//                             style={{ padding: 0, fontSize: "1rem" }}
//                         >
//                             {t('Ai uitat parola?', 'Forgot password?')}
//                         </Button>
//                     </div>
//                     <Button
//                         variant="primary"
//                         type="submit"
//                         className="w-100 mt-4"
//                         disabled={loading}
//                     >
//                         {loading ? t('Se procesează...', 'Processing...') : (isLogin ? t('Autentifică-te', 'Login') : t('Creează cont', 'Sign up'))}
//                     </Button>
//                 </Form>
//                 <div className="text-center mt-3">
//                     {isLogin ? (
//                         <span>
//                             {t('Nu ai cont?', "Don't have an account?")}{" "}
//                             <Button variant="link" onClick={() => { setIsLogin(false); setError(''); setInfo(''); }}>
//                                 {t('Creează cont', 'Sign up')}
//                             </Button>
//                         </span>
//                     ) : (
//                         <span>
//                             {t('Ai deja cont?', "Already have an account?")}{" "}
//                             <Button variant="link" onClick={() => { setIsLogin(true); setError(''); setInfo(''); }}>
//                                 {t('Loghează-te', 'Login')}
//                             </Button>
//                         </span>
//                     )}
//                 </div>
//             </Modal.Body>
//         </Modal>
//     );
// };

// export default AuthModal;
