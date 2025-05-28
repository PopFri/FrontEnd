import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/myPageHistory/myPageHistory.css'
import Profile from '../components/myPage/Profile'
import Header from '../components/Header'
import { useLocation } from 'react-router-dom';
import PopFriHistory from '../components/myPageHistory/PopFriHistory';
import VisitHistory from '../components/myPageHistory/VisitHistory';
import ReviewHistory from '../components/myPageHistory/ReviewHistory';

export default function MyPageHistroy() {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const Server_IP = import.meta.env.VITE_SERVER_IP;
  const loadUserData = async () => {
      try {
        const userRes = await fetch(`${Server_IP}/api/v1/user`, {
          method: 'GET',
          headers: { Authorization: `Bearer` },
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
    <div className='myPageHistory'>
        <Header user={user}/>
        <Profile />
        {location == "/mypage/popfri" ? <PopFriHistory /> : <></>}
        {location == "/mypage/review" ? <ReviewHistory /> : <></>}
        {location == "/mypage/visit" ? <VisitHistory /> : <></>}
    </div>
  )
}
