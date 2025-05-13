import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '5rem 0',
        color: '#fff',
        textShadow: '1px 1px 4px #000',
      }}
    >
      <Container fluid className="text-center px-0">
        <h1 className="display-4 fw-bold">{t('heroTitle')}</h1>
        <p className="fs-5">{t('heroSubtitle')}</p>
      </Container>
    </div>
  );
};

export default HeroSection;
