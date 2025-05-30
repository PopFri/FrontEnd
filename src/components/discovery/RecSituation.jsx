import React, { useState, useEffect, useRef } from 'react'
import '../../styles/discovery/recSituation.css'
import backImgsrc from '/images/recSituationBackground.png'
import MovieList from '../MovieList';

export default function RecSituation() {
  const Server_IP = import.meta.env.VITE_SERVER_IP;
  const [isSubmit, setIsSubmit] = useState(false);
  const [userInput, setInput] = useState("");
  const [movieList, setMovieList] = useState([]);
  const isFetched = useRef(false);

  const activeEnter = (e) => {
    if(e.key === "Enter") {
      setIsSubmit(true);
      setInput(e.target.value);
    }
  }

  useEffect(() => {
      const saved = localStorage.getItem("recSituationResult");
      if (saved) {
          const { movieList, userInput } = JSON.parse(saved);
          setInput(userInput); 
          setMovieList(movieList); 
          setIsSubmit(true);
          isFetched.current = true;
      }
  }, []);
  
  useEffect(() => {
      if (!isSubmit || isFetched.current ||!userInput) return;

      fetch(`${Server_IP}/api/v1/movie/recom/situation?situation=${userInput}`, {
          credentials: "include"
      })
          .then((response) => response.json())
          .then((data) => {
              const movieList = data.result;
              setMovieList(movieList);
              localStorage.setItem("recSituationResult", JSON.stringify({
                  movieList: movieList,
                  userInput: userInput
              }));
              isFetched.current = true;
          })
          .catch((error) => {
              console.error('Error fetching movie data:', error);
          });
  }, [isSubmit]);
  return (
    <>
    {
      isSubmit?
      <div className='home-recResult'>
        <div className='recResult-title'>
          <p className='title-system'>상황별 추천 영화: </p>
          <p className='title-user'>
            {userInput && userInput.length > 20 ? userInput.slice(0, 20) + "..." : userInput}
          </p>
          <button className="recResult-button" onClick={() => {localStorage.removeItem("recSituationResult"); setIsSubmit(false); setInput(undefined); setMovieList([]); isFetched.current = false;}} > 
              <img src="/images/recom_restart_button.png" alt="재시작" className="recResult-restart-icon" />
          </button>
        </div>
        <MovieList movieList = {movieList} />
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
