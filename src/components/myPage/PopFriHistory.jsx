import React, { useEffect, useState } from 'react'
import MovieList from '../MovieList'
import "../../styles/myPage/history.css";
import { Link } from 'react-router-dom';

export default function PopFriHistory() {
  const Server_IP = import.meta.env.VITE_SERVER_IP;
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetch(`${Server_IP}/api/v1/user/movie/recom?option=default`, {
        credentials: "include"
    })
      .then((response) => response.json())
      .then((data) => {
          const movieList = data.result.historyList;
          setMovieList(movieList);
      })
      .catch((error) => {
          console.error('Error fetching movie data:', error);
      });
  }, []);
  return (
    <div className='myPage-history'>
        <div className='history-title'>
            <p className='title-name'>PopFri History</p>
            <Link to="popfri" style={{textDecoration: 'none'}}>
              <p className='title-more'>더보기</p>
            </Link>
        </div>
        <MovieList movieList = {movieList[0]?.movieList || []} />
    </div>
  )
}
