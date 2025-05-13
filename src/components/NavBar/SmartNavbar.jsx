import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container, Row, Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../../../public/logo.png';
import { FaSearch, FaRobot, FaTrophy } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import '../../index.css';
import AuthModal from '../AuthModal/AuthModal.jsx'; // nou
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import ScoreDropdown from '../../components/ScoreDropdown/ScoreDropdown.jsx';
import { FaUserCircle } from "react-icons/fa";






const themes = {
    black: "#000000",
    steel: "#708090",
    blush: "#E6B7C1",
    skyBlue: "#87CEEB",
    ivory: "#F8F5F2",
    softGold: "#C5A880",
    slateGray: "#2F4F4F",
    royalPurple: "#4B3F72",
    forestGreen: "#1B4332",
    deepBlue: "#1E2A38",
    midnight: "#121212",
    with: "#FFFFFF",
    light: "#F0F0F0",
};
const languageMap = {
    English: 'en',
    Română: 'ro'
};


const SmartNavbar = () => {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [theme, setTheme] = useState('black');
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const { language, changeLanguage } = useLanguage();
    const languages = Object.keys(languageMap);
    // const { t } = useTranslation();


    const { t, i18n } = useTranslation(); // 🔄 Mutat aici!
    const categoryObj = t('categories', { returnObjects: true });
    // const categories = Object.values(categoryObj);
    const [selectedCategory, setSelectedCategory] = useState(t('categoryTitle'));


    const categories = [
        t('categories.Matematica'),
        t('categories.Fizica'),
        t('categories.Chimie'),
        t('categories.Romana'),
        t('categories.Biologie'),
        t('categories.Geografie'),
        t('categories.Informatică'),
        t('categories.Istorie'),
        t('categories.Logica'),
        t('categories.Engleza')
    ];

    // Mapping între denumirea afișată și slug
    const categorySlugMap = {
        [t('categories.Matematica')]: 'matematica',
        [t('categories.Fizica')]: 'fizica',
        [t('categories.Chimie')]: 'chimie',
        [t('categories.Romana')]: 'romana',
        [t('categories.Biologie')]: 'biologie',
        [t('categories.Geografie')]: 'geografie',
        [t('categories.Informatică')]: 'informatica',
        [t('categories.Istorie')]: 'istorie',
        [t('categories.Logica')]: 'logica',
        [t('categories.Engleza')]: 'engleza'
    };
    const controlNavbar = () => {
        if (window.scrollY > lastScrollY) {
            setShow(false);
        } else {
            setShow(true);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    useEffect(() => {
        document.body.style.backgroundColor = themes[theme];
        document.body.style.color = theme === 'black' ? '#fff' : '#000';
    }, [theme]);

    useEffect(() => {
        setSelectedCategory(t('categoryTitle'));
    }, [i18n.language, t]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        const slug = categorySlugMap[category];
        if (!slug) return;
        navigate(`/jokes/${slug}`);
    };


    const handleLanguageSelectChange = (e) => {
        const selectedLang = e.target.value;
        i18n.changeLanguage(selectedLang);
        changeLanguage(selectedLang);
        localStorage.setItem('selectedLanguage', selectedLang); // Salvează limba în localStorage
    };

    const handleLanguageClick = (lang) => {
        const selectedLang = languageMap[lang];
        i18n.changeLanguage(selectedLang);
        changeLanguage(selectedLang);
        localStorage.setItem('selectedLanguage', selectedLang); // Salvează limba în localStorage
    };

    const darkenColor = (color, percent) => {
        const num = parseInt(color.replace("#", ""), 16),
            amt = Math.round(3.55 * percent),
            R = (num >> 16) - amt,
            G = ((num >> 8) & 0x00FF) - amt,
            B = (num & 0x0000FF) - amt;
        return "#" + (
            0x1000000 +
            (R < 0 ? 0 : R > 255 ? 255 : R) * 0x10000 +
            (G < 0 ? 0 : G > 255 ? 255 : G) * 0x100 +
            (B < 0 ? 0 : B > 255 ? 255 : B)
        ).toString(16).slice(1);
    };

    return (
        <Navbar
            expand="lg"
            fixed="top"
            className={`px-3 py-2 ${show ? 'd-flex' : 'd-none'}`}
            style={{
                backgroundColor: darkenColor(themes[theme], 20),
                transition: 'background-color 0.3s ease'
            }}
        >
            <Container fluid>
                <Navbar.Brand href="/" className="d-flex align-items-center text-light fw-bold">
                    <img src={logo} alt="Logo" height="50" className="d-inline-block align-top me-2" />
                    <span className="fs-4">{t('siteTitle')}</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                    <Nav className="me-auto align-items-center">
                        <Nav.Link href="/" className="text-light">{t('home')}</Nav.Link>
                        <div className="d-flex align-items-center">
                            <Dropdown className="mx-2">
                                <Dropdown.Toggle variant="secondary" id="category-dropdown">
                                    {selectedCategory}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {categories.map((cat, idx) => (
                                        <Dropdown.Item key={idx} onClick={() => handleCategoryClick(cat)}>
                                            {cat}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown className="me-2">
                                <Dropdown.Toggle variant="info">🌐 {t('language')}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {languages.map(lang => (
                                        <Dropdown.Item key={lang} onClick={() => handleLanguageClick(lang)}>
                                            {lang}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* <select onChange={handleLanguageSelectChange}>
                                <option value="ro">Română</option>
                                <option value="en">English</option>
                            </select> */}
                        </div>
                    </Nav>
                    <Form className="d-flex me-3 align-items-center">
                        <Form.Control
                            type="search"
                            placeholder={t('searchPlaceholder')}
                        />
                        <Button variant="outline-light"><FaSearch /></Button>
                    </Form>
                    <div className="d-flex align-items-center">
                        <Button variant="warning" className="me-2"><FaRobot /> {t('ai')}</Button>
                        <Button variant="success" className="me-2"><FaTrophy /> {t('score')}</Button>
                        <Dropdown className="me-2">
                            <Dropdown.Toggle variant="light">🎨 {t('theme')}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {Object.keys(themes).map(col => (
                                    <Dropdown.Item key={col} onClick={() => setTheme(col)}>{col}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        {user ? (
                            <>
                                <Nav.Link title={user.email} className="d-flex align-items-center text-light">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar.startsWith('/') ? `http://localhost:5000${user.avatar}` : user.avatar}
                                            alt="Avatar"
                                            style={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                marginRight: 8
                                            }}
                                        />
                                    ) : (
                                        <span style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: "50%",
                                            background: "#eee",
                                            color: "#888",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: "bold",
                                            fontSize: 18,
                                            marginRight: 8
                                        }}>
                                            {user.email ? user.email[0].toUpperCase() : <FaUserCircle size={18} color="#bbb" />}
                                        </span>
                                    )}
                                    <span>{user.displayName || user.email}</span>
                                </Nav.Link>
                                <Button variant="outline-light" onClick={logout} className="ms-2">
                                    {t('Deconectează-te', 'Logout')}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline-light" onClick={() => setShowAuthModal(true)}>
                                    {t('Autentificare', 'Login')}
                                </Button>
                                <AuthModal show={showAuthModal} handleClose={() => setShowAuthModal(false)} />
                            </>
                        )}

                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default SmartNavbar;


// import React, { useState, useEffect } from 'react';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import { Container, Row, Col } from 'react-bootstrap';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import logo from '../../../public/logo.png';
// import { FaSearch, FaRobot, FaTrophy } from 'react-icons/fa';
// import { useAuth } from '../../contexts/AuthProvider.jsx';
// import '../../index.css';
// import AuthModal from '../AuthModal/AuthModal.jsx'; // nou
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

// const categories = ["Matematică", "Fizică", "Chimie", "Română", "Biologie", "Geografie", "Informatică", "Istorie", "Logică", "Engleză"];
// const themes = {
//     black: "#000000",
//     steel: "#708090",
//     blush: "#E6B7C1",
//     skyBlue: "#87CEEB",
//     ivory: "#F8F5F2",
//     softGold: "#C5A880",
//     slateGray: "#2F4F4F",
//     royalPurple: "#4B3F72",
//     forestGreen: "#1B4332",
//     deepBlue: "#1E2A38",
//     midnight: "#121212",
// };

// const languages = ["English", "Română", "Italiano", "Deutsch", "中文", "Français", "Español", "Português", "Türkçe", "Magyar", "Polski"];
// const { t, i18n } = useTranslation();

// const SmartNavbar = () => {
//     const [show, setShow] = useState(true);
//     const [lastScrollY, setLastScrollY] = useState(0);
//     const [theme, setTheme] = useState('black');
//     const { user, login, logout } = useAuth();
//     const navigate = useNavigate();
//     const [showAuthModal, setShowAuthModal] = useState(false);

//     const controlNavbar = () => {
//         if (window.scrollY > lastScrollY) {
//             setShow(false);
//         } else {
//             setShow(true);
//         }
//         setLastScrollY(window.scrollY);
//     };

//     useEffect(() => {
//         window.addEventListener('scroll', controlNavbar);
//         return () => window.removeEventListener('scroll', controlNavbar);
//     }, [lastScrollY]);

//     useEffect(() => {
//         document.body.style.backgroundColor = themes[theme];
//         document.body.style.color = theme === 'black' ? '#fff' : '#000';
//     }, [theme]);


//     const handleCategoryClick = (category) => {
//         const route = `/jokes/${category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')}`;
//         navigate(route);
//     };
//     const darkenColor = (color, percent) => {
//         const num = parseInt(color.replace("#", ""), 16),
//             amt = Math.round(2.55 * percent),
//             R = (num >> 16) - amt,
//             G = ((num >> 8) & 0x00FF) - amt,
//             B = (num & 0x0000FF) - amt;

//         return "#" + (
//             0x1000000 +
//             (R < 0 ? 0 : R > 255 ? 255 : R) * 0x10000 +
//             (G < 0 ? 0 : G > 255 ? 255 : G) * 0x100 +
//             (B < 0 ? 0 : B > 255 ? 255 : B)
//         ).toString(16).slice(1);
//     };

//     return (
//         <Navbar
//             expand="lg"
//             fixed="top"
//             className={`px-3 py-2 ${show ? 'd-flex' : 'd-none'}`}
//             style={{
//                 backgroundColor: darkenColor(themes[theme], 20),
//                 transition: 'background-color 0.3s ease'
//             }}
//         >

//             <Container fluid>
//                 <Navbar.Brand href="/" className="d-flex align-items-center text-light fw-bold">
//                     <img
//                         src={logo}
//                         alt="Logo"
//                         height="50"
//                         className="d-inline-block align-top me-2"
//                     />
//                     <span className="fs-4">Învata Inteligent</span>
//                 </Navbar.Brand>

//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
//                     <Nav className="me-auto align-items-center">
//                         <Nav.Link href="/" className="text-light">Home</Nav.Link>
//                         <div className="d-flex align-items-center">
//                             <Dropdown className="mx-2">
//                                 <Dropdown.Toggle variant="secondary" id="category-dropdown">
//                                     Categorii
//                                 </Dropdown.Toggle>
//                                 <Dropdown.Menu>
//                                     {categories.map(cat => (
//                                         <Dropdown.Item key={cat} onClick={() => handleCategoryClick(cat)}>
//                                             {cat}
//                                         </Dropdown.Item>
//                                     ))}
//                                 </Dropdown.Menu>
//                             </Dropdown>
//                             <Dropdown className="me-2">
//                                 <Dropdown.Toggle variant="info">🌐 Limba</Dropdown.Toggle>
//                                 <Dropdown.Menu>
//                                     {languages.map(lang => (
//                                         <Dropdown.Item key={lang}>{lang}</Dropdown.Item>
//                                     ))}
//                                 </Dropdown.Menu>
//                             </Dropdown>
//                         </div>
//                     </Nav>

//                     <Form className="d-flex me-3 align-items-center">
//                         <Form.Control
//                             type="search"
//                             placeholder="Caută glume, formule..."
//                             className="me-2"
//                         />
//                         <Button variant="outline-light"><FaSearch /></Button>
//                     </Form>

//                     <div className="d-flex align-items-center">
//                         <Button variant="warning" className="me-2"><FaRobot /> AI</Button>
//                         <Button variant="success" className="me-2"><FaTrophy /> Scor</Button>

//                         <Dropdown className="me-2">
//                             <Dropdown.Toggle variant="light">🎨 Temă</Dropdown.Toggle>
//                             <Dropdown.Menu>
//                                 {Object.keys(themes).map(col => (
//                                     <Dropdown.Item key={col} onClick={() => setTheme(col)}>{col}</Dropdown.Item>
//                                 ))}
//                             </Dropdown.Menu>
//                         </Dropdown>
//                         {user ? (
//                             <>
//                                 <Nav.Link title={user.email} className="d-flex align-items-center text-light">
//                                     <img src={user.photoURL} alt="avatar" style={{ width: '30px', borderRadius: '50%' }} className="me-2" />
//                                     {user.displayName}
//                                 </Nav.Link>
//                                 <Button variant="outline-light" onClick={logout} className="ms-2">Logout</Button>
//                                 <span className="ms-3 text-white">🎯 Scor: 0</span>
//                             </>
//                         ) : (
//                             <>
//                                 <Button variant="outline-light" onClick={() => setShowAuthModal(true)}>Autentificare</Button>
//                                 <AuthModal show={showAuthModal} handleClose={() => setShowAuthModal(false)} />
//                             </>
//                         )}

//                     </div>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// };

// export default SmartNavbar;
