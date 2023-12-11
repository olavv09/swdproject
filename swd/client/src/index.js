import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Form'; // Import komponentu Form
import './index.css';
import Home from './Home';
import Results from './Results';
import reportWebVitals from './reportWebVitals';
import CreateSurvey from './CreateSurvey';

const root = ReactDOM.createRoot(document.getElementById('root'));

const navigate = () => { }; // Utwórz funkcję navigate

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/form"
          element={<Form navigate={navigate} />}
        />
        <Route
          path="/results"
          element={<Results />}
        />
        <Route path="/create-survey" element={<CreateSurvey />} /> {/* Nowa ścieżka */}
      </Routes>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();
