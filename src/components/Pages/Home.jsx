// src/pages/Home.jsx
import React, { useState } from 'react';
import HeroSection from '../Hero/HeroSection';
import { useTranslation } from 'react-i18next';
import homeContent from '../../../data/homeContent.json';
import './home.css';

function FeatureCard({ title, image, active, link, onClick }) {
  const handleClick = () => {
    if (active && link) {
      window.open(link, '_blank');
    } else if (active && onClick) {
      onClick();
    } else {
      alert('New feature will come here');
    }
  };

  return (
    <div className="feature-card card p-2 mb-3 shadow-sm text-center" style={{ cursor: 'pointer' }} onClick={handleClick}>
      <img src={image} alt={title} width="80" className="mx-auto" />
      <h6 className="mt-2">{title}</h6>
    </div>
  );
}

function InfoCard({ title, description, image }) {
  return (
    <div className="card p-3 mb-3 shadow-sm">
      <img src={image} alt={title} width="80" className="mb-2" />
      <h6>{title}</h6>
      <p className="small">{description}</p>
    </div>
  );
}

function Home({ theme }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const [showMap, setShowMap] = useState(false);

  const section = (key) => homeContent[key];

  return (
    <main
      className="flex-grow-1"
      style={{
        backgroundColor: theme === 'black' ? '#f0f0f0' : '#fff',
        color: '#222',
        paddingTop: '120px',
        paddingBottom: '60px',
        minHeight: 'calc(100vh - 150px)',
      }}
    >
      <HeroSection />

      <div className="container-fluid text-center mb-5">
        <h1>{section('heroSection').welcomeMessage[lang]}</h1>
        <p>{section('heroSection').exploreFormulasJokes[lang]}</p>
      </div>

      <div className="container mb-5">
        <h2 className="text-center">{section('introSection').title[lang]}</h2>
        <p className="text-center lead">{section('introSection').description[lang]}</p>
      </div>

      <div className="container mb-5">
        <h2 className="text-center">{section('howToUse').title[lang]}</h2>
        <ul className="list-group list-group-flush mx-auto" style={{ maxWidth: '600px' }}>
          {section('howToUse').steps[lang].map((step, idx) => (
            <li className="list-group-item" key={idx}>{step}</li>
          ))}
        </ul>
      </div>

      {/* Nou: informații și features în stânga și dreapta */}
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-3">
            <InfoCard
              title={t('points.title')}
              description={t('points.description')}
              image="/images/puncte.png"
            />
            <InfoCard
              title={t('growth.title')}
              description={t('growth.description')}
              image="/images/dezvoltare.png"
            />
          </div>

          <div className="col-md-6">
            {/* Central content: Woalcon */}
            <div className="text-center">
              <h2>{t('woalcon.whatTitle')}</h2>
              <p>{t('woalcon.whatText')}</p>
              <h3>{t('woalcon.howTitle')}</h3>
              <p>{t('woalcon.howText')}</p>
            </div>
          </div>

          <div className="col-md-3">
            <FeatureCard
              title={t('features.codingPlatform')}
              image="/images/code_icon.png"
              active={false}
            />
            <FeatureCard
              title={t('features.codecademy')}
              image="/images/codecademy_icon.png"
              link="https://www.codecademy.com"
              active={true}
            />
            <FeatureCard
              title={t('features.mapTitle')}
              image="/images/map_icon.png"
              active={true}
              onClick={() => setShowMap(true)}
            />
            <FeatureCard
              title={t('features.biology')}
              image="/images/biology_icon.png"
              active={false}
            />
          </div>
        </div>
      </div>

      <div className="container text-center">
        <h2 className="mb-4">{section('learningThemes').title[lang]}</h2>
        <div className="row">
          {section('learningThemes').topics.map((topic, idx) => (
            <div className="col-md-4 col-lg-2 mb-4" key={idx}>
              <div className="card h-100 shadow-sm">
                <img
                  src={topic.image}
                  className="card-img-top"
                  alt={topic.title[lang]}
                  style={{ height: '100px', objectFit: 'contain', marginTop: '10px'}}
                />
                <div className="card-body">
                  <h6 className="card-title">{topic.title[lang]}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;


// // src/pages/Home.jsx
// import React from 'react';
// import HeroSection from '../Hero/HeroSection';
// import { useTranslation } from 'react-i18next';
// import homeContent from '../../../data/homeContent.json'; // importul conținutului
// import './home.css';

// function Home({ theme }) {
//   const { t, i18n } = useTranslation();
//   const lang = i18n.language || 'en';

//   const section = (key) => homeContent[key];

//   return (
//     <main
//       className="flex-grow-1"
//       style={{
//         backgroundColor: theme === 'black' ? '#f0f0f0' : '#fff',
//         color: '#222',
//         paddingTop: '120px',
//         paddingBottom: '60px',
//         minHeight: 'calc(100vh - 150px)',
//       }}
//     >
//       <HeroSection />

//       {/* Titlu și subtitlu existent */}
//       <div className="container-fluid text-center mb-5">
//         <h1>{section('heroSection').welcomeMessage[lang]}</h1>
//         <p>{section('heroSection').exploreFormulasJokes[lang]}</p>
//       </div>

//       {/* Intro: Ce este DevGlume */}
//       <div className="container mb-5">
//         <h2 className="text-center">{section('introSection').title[lang]}</h2>
//         <p className="text-center lead">{section('introSection').description[lang]}</p>
//       </div>

//       {/* Cum folosești */}
//       <div className="container mb-5">
//         <h2 className="text-center">{section('howToUse').title[lang]}</h2>
//         <ul className="list-group list-group-flush mx-auto" style={{ maxWidth: '600px' }}>
//           {section('howToUse').steps[lang].map((step, idx) => (
//             <li className="list-group-item" key={idx}>{step}</li>
//           ))}
//         </ul>
//       </div>

//       {/* Teme de învățare */}
//       <div className="container text-center">
//         <h2 className="mb-4">{section('learningThemes').title[lang]}</h2>
//         <div className="row">
//           {section('learningThemes').topics.map((topic, idx) => (
//             <div className="col-md-4 col-lg-2 mb-4" key={idx}>
//               <div className="card h-100 shadow-sm">
//                 <img
//                   src={topic.image}
//                   className="card-img-top"
//                   alt={topic.title[lang]}
//                   style={{ height: '100px', objectFit: 'contain', marginTop: '10px'}}
//                 />
//                 <div className="card-body">
//                   <h6 className="card-title">{topic.title[lang]}</h6>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

// export default Home;
