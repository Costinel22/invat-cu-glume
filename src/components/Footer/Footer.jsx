import React from 'react';
import Container from 'react-bootstrap/Container';
import logo from '../../../public/logo.png';


const Footer = ({ theme }) => {
    return (
        <footer
            style={{
                backgroundColor: theme,
                color: theme === 'black' ? '#fff' : '#000',
                padding: '1rem 0',
                marginTop: 'auto',
                textAlign: 'center',
            }}
        >
            <Container className="text-center">
                <img
                    src={logo}
                    alt="Logo MG Costinel"
                    height="50"
                    className="mb-2"
                />
                <p className="mb-0">© 2025 MGCostinel – Invata inteligent prin glume. Toate drepturile rezervate.</p>
            </Container>
           
        </footer>
    );
};

export default Footer;
