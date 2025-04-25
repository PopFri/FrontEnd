import React from 'react'
import '../styles/discovery/home.css'
import RecSituation from '../components/discovery/RecSituation'
import RecDate from '../components/discovery/RecDate'
import RecTime from '../components/discovery/RecTime'
import RecReview from '../components/discovery/RecReview'
import Header from '../components/Header'
import DiscoveryFilm from '../components/discovery/DiscoveryFilm'

export default function Discovery() {
  return (
    <div className='home'>
        <Header />
        <DiscoveryFilm />
        <RecSituation></RecSituation>
        <RecDate></RecDate>
        <RecReview></RecReview>
        <RecTime></RecTime>
    </div>
  )
}
