import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import CityPlanningSimulator from './pages/CityPlanningSimulator';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/simulate" element={<CityPlanningSimulator />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
