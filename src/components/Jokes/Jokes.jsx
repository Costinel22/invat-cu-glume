import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './MathJokes.css';

const Jokes = () => {
    const { category } = useParams();
    const [jokes, setJokes] = useState([]);
    const [current, setCurrent] = useState(0);
    const [selectedHearts, setSelectedHearts] = useState(0);
    const [showExample, setShowExample] = useState(false);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const selectedLanguage = i18n.language || "ro";

    const categoryNameMap = useCallback({
        matematica: t('categories.Matematica'),
        fizica: t('categories.Fizica'),
        chimie: t('categories.Chimie'),
        romana: t('categories.Romana'),
        biologie: t('categories.Biologie'),
        geografie: t('categories.Geografie'),
        informatica: t('categories.Informatica'),
        istorie: t('categories.Istorie'),
        logica: t('categories.Logica'),
        engleza: t('categories.Engleza')
    }, [t]);

    useEffect(() => {
        const fetchJokes = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/jokes/${category}`);
                setJokes(res.data);
            } catch (err) {
                console.error("Error loading jokes:", err);
            }
        };
        fetchJokes();
    }, [category]);

    const rateJoke = async (hearts) => {
        if (!jokes[current]) return;
        const id = jokes[current].id;
        try {
            await axios.post(`http://localhost:5000/api/jokes/${category}/${id}/rate`, { hearts });
            setSelectedHearts(hearts);
        } catch (err) {
            console.error("Error submitting rating:", err);
        }
    };

    const nextJoke = () => {
        setSelectedHearts(0);
        setShowExample(false);
        setCurrent((prev) => (prev + 1) % jokes.length);
    };

    const prevJoke = () => {
        setSelectedHearts(0);
        setShowExample(false);
        setCurrent((prev) => (prev - 1 + jokes.length) % jokes.length);
    };

    if (!jokes.length) return <p>{t('loadingJokes')}</p>;
    

    const joke = jokes[current];
    return (
        <div className="joke-container">
            <h2>{t('jokesCategory', { category: categoryNameMap[category] || category })}</h2>

            <div className="joke-box">
                <h3>{joke.formula}</h3>
                {joke.description && (
                    <p><strong>{t('description')}: </strong>{joke.description[selectedLanguage]}</p>
                )}
                <p><em>{joke.joke[selectedLanguage]}</em></p>

                <div className="hearts">
                    {[1, 2, 3, 4, 5, 6].map(n => (
                        <FaHeart
                            key={n}
                            className={`heart ${n <= selectedHearts ? 'active' : ''}`}
                            onClick={() => rateJoke(n)}
                        />
                    ))}
                </div>
                {showExample && (
                    <div className="example-box">
                        <p>{joke.example[selectedLanguage]}</p>
                        <img
                            src={joke.exampleImage}
                            alt="Example"
                            style={{ maxWidth: '100%', height: 'auto', marginTop: '1rem' }}
                        />
                    </div>
                )}
                <div className="button-group">
                    <button onClick={prevJoke}>
                        {t('previousJoke', 'Gluma anterioară')}
                    </button>
                    <button onClick={() => setShowExample(!showExample)}>
                        {showExample
                            ? t('hideExample', 'Ascunde explicația')
                            : t('showExample', 'Arată explicația')}
                    </button>
                    <button onClick={nextJoke}>
                        {t('nextJoke', 'Gluma următoare')}
                    </button>
                </div>
                {current === jokes.length - 1 && (
                    <div className="end-options">
                        <button onClick={() => setCurrent(0)}>
                            {t('restartJokes', 'Ia-o de la început')}
                        </button>
                        <button onClick={() => navigate('/')}>
                            {t('exitToHome', 'Înapoi la pagina principală')}
                        </button>
                    </div>

                )}
            </div>
        </div>
    );
};

export default Jokes;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaHeart } from 'react-icons/fa';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import './MathJokes.css';

// const Jokes = () => {
//     const { category } = useParams();
//     const [jokes, setJokes] = useState([]);
//     const [current, setCurrent] = useState(0);
//     const [selectedHearts, setSelectedHearts] = useState(0);
//     const [showExample, setShowExample] = useState(false);
//     const navigate = useNavigate();
//     const { t, i18n } = useTranslation(); // Hook pentru traduceri
//     const selectedLanguage = i18n.language || "ro"; // din i18n config

//     const categoryNameMap = {
//         matematica: t('categories.Matematica'),
//         fizica: t('categories.Fizica'),
//         chimie: t('categories.Chimie'),
//         romana: t('categories.Romana'),
//         biologie: t('categories.Biologie'),
//         geografie: t('categories.Geografie'),
//         informatica: t('categories.Informatica'),
//         istorie: t('categories.Istorie'),
//         logica: t('categories.Logica'),
//         engleza: t('categories.Engleza')
//     };

//     useEffect(() => {
//         axios.get(`http://localhost:5000/api/jokes/${category}`)
//             .then(res => setJokes(res.data))
//             .catch(err => console.error("Eroare la încărcarea glumelor:", err));
//     }, [category]);

//     const rateJoke = async (hearts) => {
//         if (!jokes[current]) return;
//         const id = jokes[current].id;
//         try {
//             await axios.post(`http://localhost:5000/api/jokes/${category}/${id}/rate`, { hearts });
//             setSelectedHearts(hearts);
//         } catch (err) {
//             console.error("Eroare la trimiterea ratingului:", err);
//         }
//     };

//     const nextJoke = () => {
//         setSelectedHearts(0);
//         setShowExample(false);
//         setCurrent((prev) => (prev + 1) % jokes.length);
//     };

//     const prevJoke = () => {
//         setSelectedHearts(0);
//         setShowExample(false);
//         setCurrent((prev) => (prev - 1 + jokes.length) % jokes.length);
//     };

//     if (!jokes.length) return <p>{t('loadingJokes')}</p>;

//     const joke = jokes[current];

//     return (
//         <div className="joke-container">
//             <h2>{t('jokesCategory', { category: categoryNameMap[category] || category })}</h2>

//             <div className="joke-box">
//                 <h3>{joke.formula}</h3>
//                 {joke.description && (
//                     <p><strong>{t('description')}: </strong>{joke.description[selectedLanguage]}</p>
//                 )}
//                 <p><em>{joke.joke[selectedLanguage]}</em></p>

//                 <div className="hearts">
//                     {[1, 2, 3, 4, 5, 6].map(n => (
//                         <FaHeart
//                             key={n}
//                             className={`heart ${n <= selectedHearts ? 'active' : ''}`}
//                             onClick={() => rateJoke(n)}
//                         />
//                     ))}
//                 </div>

//                 {showExample && (
//                     <div className="example-box">
//                         <p>{joke.example[selectedLanguage]}</p>
//                         <img
//                             src={joke.exampleImage}
//                             alt="Example"
//                             style={{ maxWidth: '100%', height: 'auto', marginTop: '1rem' }}
//                         />
//                     </div>
//                 )}

//                 <div className="button-group">
//                     <button onClick={prevJoke}>{t('previousJoke')}</button>
//                     <button onClick={() => setShowExample(!showExample)}>
//                         {showExample ? t('hideExample') : t('showExample')}
//                     </button>
//                     <button onClick={nextJoke}>{t('nextJoke')}</button>
//                 </div>

//                 {current === jokes.length - 1 && (
//                     <div className="end-options">
//                         <button onClick={() => setCurrent(0)}>{t('restartJokes')}</button>
//                         <button onClick={() => navigate('/')}>{t('exitToHome')}</button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Jokes;