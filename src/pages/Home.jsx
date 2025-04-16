import React from 'react'
import '../styles/home/home.css'
import RecSituation from '../components/home/recSituation'
import RecDate from '../components/home/RecDate'
import RecWeather from '../components/home/RecWeather'
import RecTime from '../components/home/RecTime'
import RecReview from '../components/home/RecReview'

export default function Home() {
  return (
    <div>
        <RecSituation></RecSituation>
        <RecDate></RecDate>
        <RecReview></RecReview>
        <RecWeather></RecWeather>
        <RecTime></RecTime>
    </div>
  )
}
