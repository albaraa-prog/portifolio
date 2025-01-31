import React from "react";
import ReactDOM from "react-dom/client";
import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import './index.css';
import HomePage from './pages/Home';

const App = () => (
  <Router basename="/portifolio">
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </Router>
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
