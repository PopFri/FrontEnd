import { useEffect, useState } from 'react';
import '../styles/myPage/myPage.css'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import Profile from '../components/myPage/Profile'
import PopFriHistory from '../components/myPage/PopFriHistory';
import ReviewHistory from '../components/myPage/ReviewHistory';
import VisitHistory from '../components/myPage/VisitHistory';
import { useMatomo } from '@datapunt/matomo-tracker-react';

export default function MyPage() {
  const { trackPageView } = useMatomo();

  // Track page view
  useEffect(() => {
    trackPageView();
  }, [])

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const Server_IP = import.meta.env.VITE_SERVER_IP;
  const loadUserData = async () => {
      try {
        const userRes = await fetch(`${Server_IP}/api/v1/user`, {
          method: 'GET',
          credentials: 'include'
        });
        const userData = await userRes.json();
    
        setUser(userData.result);
      } catch (err) {
        console.error(" 에러 발생:", err.message);
        console.error("전체 에러 객체:", err);
        navigate('/login');
      }
  };
    
  useEffect(() => {
      loadUserData();
  }, []);

  return (
    <div className='myPage'>
        <Header user={user}/>
        <Profile user={user} />
        <PopFriHistory />
        <ReviewHistory />
        <VisitHistory />
    </div>
  )
}
