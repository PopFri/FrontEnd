import React from 'react'
import movieDummy from '../../../public/data/movieDummy'
import MovieList from '../MovieList'
import "../../styles/myPage/history.css";
import { Link } from 'react-router-dom';

export default function VisitHistory() {
  return (
    <div className='myPage-history'>
        <div className='history-title'>
            <p className='title-name'>Visit History</p>
            <Link to="popfri" style={{textDecoration: 'none'}}>
                <p className='title-more'>더보기</p>
            </Link>
        </div>
        <MovieList movieList = {movieDummy.result} />
    </div>
  )
}
