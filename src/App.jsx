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
  urlBase: 'http://localhost/', // nginx 또는 matomo가 노출되는 주소
  siteId: 1,
  trackerUrl: 'http://localhost/matomo.php',
  srcUrl: 'http://localhost/js/container_D2fxXTpR.js',
  requestMethod: 'GET',
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
          <Route path="/movie/:movieId" element={<MovieDetailPage />} />
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