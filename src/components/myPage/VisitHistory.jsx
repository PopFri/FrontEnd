import React, { useEffect, useState } from 'react';
import MovieList from '../MovieList'
import "../../styles/myPage/history.css";
import { Link } from 'react-router-dom';

export default function VisitHistory() {
  const Server_IP = import.meta.env.VITE_SERVER_IP;
  const [movieList, setMovieList] = useState([]);
  
  useEffect(() => {
      fetch(`${Server_IP}/api/v1/user/movie/visit`, {
          credentials: "include"
      })
          .then((response) => response.json())
          .then((data) => {
              const movieList = data.result;
              setMovieList(movieList);
          })
          .catch((error) => {
              console.error('Error fetching review data:', error);
          });
  }, []);
  return (
    <div className='myPage-history'>
        <div className='history-title'>
            <p className='title-name'>Visit History</p>
            <Link to="visit" style={{textDecoration: 'none'}}>
                <p className='title-more'>더보기</p>
            </Link>
        </div>
        {movieList.length === 0 && (
          <div className='no-history-container'>
            <p className='no-history'>방문 기록이 없습니다.</p>
          </div>
        )}
        {movieList.length > 0 && 
          <MovieList movieList = {movieList[0]?.movieList || []} />
        }
    </div>
  )
}
