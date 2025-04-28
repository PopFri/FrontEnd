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
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';
import { RouteChangeTracker } from './RouteChangeTracker';

const instance = createInstance({
  urlBase: 'http://localhost:8080/',         // Matomo 서버 주소
  siteId: 1,                                 // 웹사이트 등록할 때 받은 Site ID
  trackerUrl: 'http://localhost:8080/matomo.php',
  srcUrl: 'http://localhost:8080/matomo.js',
});

function App() {
  return (
    <MatomoProvider value={instance}>
      <BrowserRouter>
        <RouteChangeTracker />
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