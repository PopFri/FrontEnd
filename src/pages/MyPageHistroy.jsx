import React, { useState } from 'react'
import '../styles/myPageHistory/myPageHistory.css'
import Profile from '../components/myPage/Profile'
import Header from '../components/Header'
import { useLocation } from 'react-router-dom';
import PopFriHistory from '../components/myPageHistory/PopFriHistory';
import VisitHistory from '../components/myPageHistory/VisitHistory';
import ReviewHistory from '../components/myPageHistory/ReviewHistory';

export default function MyPageHistroy() {
  const [isSetting, setSetting] = useState(false);
  const location = useLocation().pathname;

  return (
    <div className='myPageHistory'>
        <Header />
        <Profile setSetting={setSetting}/>
        {location == "/mypage/popfri" ? <PopFriHistory /> : <></>}
        {location == "/mypage/review" ? <ReviewHistory /> : <></>}
        {location == "/mypage/visit" ? <VisitHistory /> : <></>}
    </div>
  )
}
