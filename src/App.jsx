import React from 'react';
import MovieDetailPage from './pages/MovieDetailPage.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/Home"
import RankingPage from "./pages/RankingPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie" element={<MovieDetailPage />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;