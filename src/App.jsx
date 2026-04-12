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

const userId = () => {
  const Server_IP = import.meta.env.VITE_SERVER_IP;
  return fetch(`${Server_IP}/api/v1/user/provide`, {
    method: 'GET',
    credentials: 'include'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data.result)
    .catch(error => {
      console.error('Error fetching user ID:', error);
      return undefined;
    });
}
const userProvideId = await userId();

const matomoUrl = import.meta.env.VITE_MATOMO_URL;

const instance = createInstance({
  urlBase: matomoUrl,
  siteId: 1,
  userId: `${userProvideId}`, // optional, default value: `undefined`.
  trackerUrl: `${matomoUrl}/matomo.php`,
  srcUrl: `${matomoUrl}/js/container_XPfB3WAc.js`,
  linkTracking: false,
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