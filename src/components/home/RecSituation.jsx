import React, { useState } from 'react'
import '../../styles/home/recSituation.css'
import backImgsrc from '/images/recSituationBackground.png'
import movieDummy from '../../../public/data/movieDummy'
import { Link } from 'react-router-dom';

export default function RecSituation() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [userInput, setInput] = useState("");
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      setIsSubmit(true);
      setInput(e.target.value);
    }
  }
  return (
    <>
    {
      isSubmit?
      <div className='home-recResult'>
        <div className='recResult-title'>
          <p className='title-system'>상황별 추천 영화: </p>
          <p className='title-user'>
            {userInput.length > 20 ? userInput.slice(0, 20) + "..." : userInput}
          </p>
        </div>
        <div className='recResult-movieList'>
          { 
            movieDummy.result.map((movie) => {
              let movieName = movie.name;
              if(movieName.length > 6)
                movieName = movieName.slice(0, 6) + "...";

              const movieUrl = `/movie/${movie.id}`;

              return(
                <Link to={movieUrl} className='movieList-movie'>
                  <div className='movie-image' style={{backgroundImage: `url(${movie.imageUrl})`}} />
                  <div className='movie-name'>
                    <p className='name-text'>{movieName}</p>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>:
      <div className='home-recSituation' style={{backgroundImage: `url(${backImgsrc})`}}>
        <p className='recSituation-question'>Q. 지금 어떤 상황이신가요?</p>
        <div className='recSituation-container'>
          <textarea name="" id=""
          className='container-input'
          placeholder='당신의 현재 상황을 입력해보세요.'
          onKeyDown={(e) => {activeEnter(e)}}/>
        </div>
      </div>
    }
    </>
  )
}
