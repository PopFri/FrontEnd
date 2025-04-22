import React, { useState } from 'react'
import '../styles/myPage/myPage.css'
import Header from '../components/Header'
import Profile from '../components/myPage/Profile'
import PopFriHistory from '../components/myPage/PopFriHistory';
import ReviewHistory from '../components/myPage/ReviewHistory';
import VisitHistory from '../components/myPage/VisitHistory';

export default function MyPage() {
  const [isSetting, setSetting] = useState(false);

  return (
    <div className='myPage'>
        <Header />
        <Profile setSetting={setSetting}/>
        <PopFriHistory />
        <ReviewHistory />
        <VisitHistory />
    </div>
  )
}
