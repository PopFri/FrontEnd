import React from 'react';
import MovieDetailPage from './pages/MovieDetailPage.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Discovery from "./pages/Discovery.jsx"
import RankingPage from "./pages/RankingPage"
import MyPage from './pages/MyPage.jsx';
import MyPageHistroy from './pages/MyPageHistroy.jsx';
import MovieDiscoveryPage from "./pages/MovieDiscoveryPage"
import Home from './pages/Home.jsx';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/discovery" element={<Discovery />} />
        <Route path="/discovery/discoveryfilm" element={<MovieDiscoveryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
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