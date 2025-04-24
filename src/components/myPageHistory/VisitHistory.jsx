import React from 'react'
import '../../styles/myPageHistory/visitHistory.css'
import recomHistoryDummy from '../../../public/data/recomHistoryDummy'
import MovieList from '../MovieList'
import { Link } from 'react-router-dom'

export default function VisitHistory() {
  return (
    <div className='myPageHistory-history'>
        <div className='history-title'>
            <p className='title-name'>Visit History</p>
            <Link to="/mypage" style={{textDecoration: 'none'}}>
                <p className='title-more'>뒤로가기</p>
            </Link>
        </div>
        <div className='visitHistory-result'>
            {recomHistoryDummy.result.map((result) => {
            return (
                <div>
                <p className='result-date'>{result.date}</p>
                <MovieList movieList = {result.movieList} />
                </div>
            );
            })}
        </div>
    </div> 
  )
}
