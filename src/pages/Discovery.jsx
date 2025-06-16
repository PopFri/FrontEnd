import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/discovery/home.css'
import RecSituation from '../components/discovery/RecSituation'
import RecDate from '../components/discovery/RecDate'
import RecTime from '../components/discovery/RecTime'
import RecReview from '../components/discovery/RecReview'
import Header from '../components/Header'
import DiscoveryFilm from '../components/discovery/DiscoveryFilm'
import { useMatomo } from '@datapunt/matomo-tracker-react'

export default function Discovery() {
  const { trackPageView } = useMatomo()

  // Track page view
  React.useEffect(() => {
    trackPageView()
  }, [])
  
  const Server_IP = import.meta.env.VITE_SERVER_IP;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loadUserData = async () => {
      try {
          const userRes = await fetch(`${Server_IP}/api/v1/user`, {
          method: 'GET',
          credentials: 'include'
          });
          const userData = await userRes.json();
      
          setUser(userData.result);
      } catch {
          navigate('/login');
      }
  };
  useEffect(() => {
      loadUserData();
  }, []);
  return (
    <div className='home'>
        <Header user={user}/>
        <DiscoveryFilm />
        <RecSituation></RecSituation>
        <RecDate></RecDate>
        <RecReview></RecReview>
        <RecTime></RecTime>
    </div>
  )
}
