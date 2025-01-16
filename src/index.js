import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './index.css';
import HomePage from './pages/Home';
import SnakeGame from "./pages/SnakeGame";
import TicTac from './pages/TicTacToe';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tictac" element={<TicTac />} />
      <Route path="/snake" element={<SnakeGame />} />
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
