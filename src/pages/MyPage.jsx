import React from 'react'
import '../styles/myPage/myPage.css'
import Header from '../components/Header'
import Profile from '../components/myPage/Profile'
import PopFriHistory from '../components/myPage/PopFriHistory';
import ReviewHistory from '../components/myPage/ReviewHistory';
import VisitHistory from '../components/myPage/VisitHistory';

export default function MyPage() {

  return (
    <div className='myPage'>
        <Header />
        <Profile />
        <PopFriHistory />
        <ReviewHistory />
        <VisitHistory />
    </div>
  )
}
