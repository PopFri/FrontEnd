import React, { useState } from 'react'
import '../../styles/myPageHistory/popFriHistory.css'
import recomHistoryDummy from '../../../public/data/recomHistoryDummy'
import MovieList from '../MovieList'

export default function PopFriHistory() {
  const [select, setSelect] = useState('discovery')

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
            <p className='title-name'>Visit History</p>
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
