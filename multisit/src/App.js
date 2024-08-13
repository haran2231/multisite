// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomeEN from './Pages/HomeEN';
import HomeBR from './Pages/HomeBR';
import HomeCN from './Pages/HomeCN';
import './i18n'; // Import the i18n configuration

function App() {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const response = await fetch('https://multisite-vebc.onrender.com/api/get-language');
        
        const data = await response.json();
        console.log(data);
        const language = data.language || 'en'; // Default to 'en'
        i18n.changeLanguage(language);
      } catch (error) {
        console.error('Error fetching language:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguage();
  }, [i18n]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loader component
  }

  return (
    <Routes>
      <Route path="/en" element={<HomeEN />} />
      <Route path="/br" element={<HomeBR />} />
      <Route path="/cn" element={<HomeCN />} />
      <Route path="/" element={<HomeEN />} /> {/* Default to English */}
    </Routes>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
