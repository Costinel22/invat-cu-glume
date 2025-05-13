import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import heroImage from '../../../public/images/heroImage.png'

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        backgroundImage: {heroImage},
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
