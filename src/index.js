import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import FluppyBird from "./Games/FluppyBird";
import SnakeGame from "./Games/SnakeGame";
import ThreeDGame from './Games/ThreeDGame';
import TicTac from './Games/TicTacToe';
import './index.css';
import HomePage from './pages/Home';


const App = () => (
  <Router basename="/portifolio">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tictac" element={<TicTac />} />
      <Route path="/snake" element={<SnakeGame />} />
      <Route path="/game" element={<ThreeDGame />} />
      <Route path="/FluppyBird" element={<FluppyBird />} />
    </Routes>
  </Router>
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
