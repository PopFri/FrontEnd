import React from 'react';
import MovieDetailPage from './pages/MovieDetailPage.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/Home"
import RankingPage from "./pages/RankingPage"
import MyPage from './pages/MyPage.jsx';
import MyPageHistroy from './pages/MyPageHistroy.jsx';
import MovieDiscoveryPage from "./pages/MovieDiscoveryPage"
import MainPage from './pages/MainPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<MainPage />} />
        <Route path="/discovery" element={<Home />} />
        <Route path="/discovery/discoveryfilm" element={<MovieDiscoveryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie" element={<MovieDetailPage />} />
        <Route path="/rank" element={<RankingPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path='/mypage/popfri' element={<MyPageHistroy />} />
        <Route path='/mypage/review' element={<MyPageHistroy />} />
        <Route path='/mypage/visit' element={<MyPageHistroy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;