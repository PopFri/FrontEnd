import React, { useState, useEffect, useRef } from 'react'
import MovieList from '../MovieList'
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export default function RecTime() {
  const [timeOfDay, setTimeOfDay] = useState('');
  const Server_IP = import.meta.env.VITE_SERVER_IP;
  const [movieList, setMovieList] = useState([]);
  const isFetched = useRef(false);

  const getCurrentTimeOfDay = () => {
    const hour = dayjs().hour();
    if (hour >= 5 && hour < 12) return '아침';
    if (hour >= 12 && hour < 18) return '점심';
    if (hour >= 18 && hour < 23) return '저녁';
    return '새벽';
  };

  useEffect(() => {
    const calculated = getCurrentTimeOfDay();
    const stored = localStorage.getItem("recTimeResult");

    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.time === calculated) {
        setTimeOfDay(parsed.time);
        setMovieList(parsed.movieList);
        isFetched.current = true; 
        return;
      }
    }
    setTimeOfDay(calculated);
  }, []);
    
  useEffect(() => {
    if (!timeOfDay || isFetched.current) return;
    fetch(`${Server_IP}/api/v1/movie/recom/time`, {
      credentials: "include"
    })
      .then((response) => response.json())
      .then((data) => {
        const movieList = data.result;
        setMovieList(movieList);
        localStorage.setItem("recTimeResult", JSON.stringify({
          movieList: movieList,
          time: timeOfDay
        }));
        isFetched.current = true;
      })
    .catch((error) => {
      console.error('Error fetching movie data:', error);
    });
  }, [timeOfDay]);

  return (
    <div className='home-recResult'>
      <div className='recResult-title'>
        <p className='title-system'>시간별 추천 영화: </p>
        {timeOfDay && (
          <p className='title-user'>{timeOfDay}</p>
        )}
      </div>
      <MovieList movieList = {movieList} />
    </div>
  )
}
