import React, { useState, useEffect } from 'react'
import '../../styles/myPageHistory/popfriHistory.css'
import MovieList from '../MovieList'
import { Link } from 'react-router-dom'

export default function PopFriHistory() {
  const [select, setSelect] = useState('discovery')
  const Server_IP = import.meta.env.VITE_SERVER_IP;
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetch(`${Server_IP}/api/v1/user/movie/recom?option=${select}`, {
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
  }, [select]);

  let discoveryColor = "#FFFFFF", situationColor = "#FFFFFF", timeColor = "#FFFFFF";
  switch (select) {
    case 'discovery':
      discoveryColor = "#1ED863"
      break;
    case 'situation':
      situationColor = "#1ED863"
      break;
    case 'time':
      timeColor = "#1ED863"
      break;
    default:
      break;
  }
  return (
    <div className='myPageHistory-history'>
        <div className='history-title'>
            <p className='title-name'>PopFri History</p>
            <Link to="/mypage" style={{textDecoration: 'none'}}>
                <p className='title-more'>뒤로가기</p>
            </Link>
        </div>
        <div className='popfriHistory-sort'>
            <div className='sort-container' onClick={()=>{setSelect("discovery")}}
              style={{borderColor: discoveryColor}}  
            >
              <p className='container-text' style={{color: discoveryColor}}>Discovery Film</p>
            </div>
            <div className='sort-container' onClick={() => setSelect("situation")}
              style={{borderColor: situationColor}}
              >
              <p className='container-text' style={{color: situationColor}}>상황별 추천 영화</p>
            </div>
            <div className='sort-container' onClick={() => setSelect("time")}
              style={{borderColor: timeColor}}
              >
              <p className='container-text' style={{color: timeColor}}>시간별 추천 영화</p>
            </div>
        </div>
        <div className='popfriHistory-result'>
          {movieList.length === 0 && (
            <div className='no-popfriHistory-container'>
              <p className='no-popfriHistory'>추천 기록이 없습니다.</p>
            </div>
          )}
          {movieList.length > 0 && movieList.map((movie, idx) => (
            <div key={idx}>
              <p className='result-date'>{movie.date}</p>
              <MovieList movieList={movie.movieList || []} />
            </div>
          ))}
        </div>
    </div>          
  )
}
