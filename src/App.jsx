import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmartNavbar from './components/NavBar/SmartNavbar';
import Footer from './components/Footer/Footer';
import Home from './components/Pages/Home';
import Jokes from './components/Jokes/Jokes';




function App() {
  const [theme, setTheme] = useState('black');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <SmartNavbar />

        {/* Aici se schimbă paginile în funcție de rută */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/jokes/:category" element={<Jokes />} />
            
          </Routes>
        </div>

        <Footer theme={theme} />
      </div>
    </Router>
  );
}

export default App;



