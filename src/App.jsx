import React from 'react';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'
import MovieDetailPage from './pages/MovieDetailPage.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Discovery from "./pages/Discovery.jsx"
import RankingPage from "./pages/RankingPage"
import MyPage from './pages/MyPage.jsx';
import MyPageHistroy from './pages/MyPageHistroy.jsx';
import MovieDiscoveryPage from "./pages/MovieDiscoveryPage"
import Home from './pages/Home.jsx';

const instance = createInstance({
  urlBase: 'http://43.203.83.109:8080',
  siteId: 1,
  userId: 'UID76903202', // optional, default value: `undefined`.
  trackerUrl: 'http://43.203.83.109:8080/matomo.php', // optional, default value: `${urlBase}matomo.php`
  srcUrl: 'http://localhost/js/container_XigVTZYK.js', // optional, default value: `${urlBase}matomo.js`
})

function App() {
  return (
    <MatomoProvider value={instance}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/discovery" element={<Discovery />} />
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
    </MatomoProvider>
  );
}

export default App;