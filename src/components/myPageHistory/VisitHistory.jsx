import React, { useEffect, useState } from 'react';
import '../../styles/myPageHistory/visitHistory.css'
import MovieList from '../MovieList'
import { Link } from 'react-router-dom'

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
    <div className='myPageHistory-history'>
        <div className='history-title'>
            <p className='title-name'>Visit History</p>
            <Link to="/mypage" style={{textDecoration: 'none'}}>
                <p className='title-more'>뒤로가기</p>
            </Link>
        </div>
        <div className='visitHistory-result'>
            {movieList.length === 0 && (
                <div className='no-popfriHistory-container'>
                    <p className='no-popfriHistory'>방문 기록이 없습니다.</p>
                </div>
            )}
            {movieList.length > 0 && movieList.map((movie) => {
            return (
                <div>
                <p className='result-date'>{movie.date}</p>
                <MovieList movieList = {movie.movieList} />
                </div>
            );
            })}
        </div>
    </div> 
  )
}
