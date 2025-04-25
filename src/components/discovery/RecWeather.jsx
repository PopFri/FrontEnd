import React from 'react'
import MovieList from '../MovieList'
import movieDummy from '../../../public/data/movieDummy'

export default function RecWeather() {
  const weather = "맑음"

  return (
    <div className='home-recResult'>
      <div className='recResult-title'>
        <p className='title-system'>날씨별 추천 영화: </p>
        <p className='title-user'>
          {weather}
        </p>
      </div>
      <MovieList movieList = {movieDummy.result} />
    </div>
  )
}
