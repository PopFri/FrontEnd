import React from 'react'
import MovieList from '../MovieList'
import movieDummy from '../../../public/data/movieDummy'

export default function RecTime() {
  const time = "점심"

  return (
    <div className='home-recResult'>
      <div className='recResult-title'>
        <p className='title-system'>시간별 추천 영화: </p>
        <p className='title-user'>
          {time}
        </p>
      </div>
      <MovieList movieList = {movieDummy.result} />
    </div>
  )
}
