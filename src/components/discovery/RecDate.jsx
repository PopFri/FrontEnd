import React, { useEffect, useState } from 'react';
import backImgsrc from "/images/recSituationBackground.png";
import "../../styles/discovery/recDate.css";
import DateSelect from "./DateSelect";
import MovieList from "../MovieList";
import LoadingPage from '../../pages/LoadingPage';

export default function RecDate() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [inputDate, setDate] = useState();
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const Server_IP = import.meta.env.VITE_SERVER_IP;
    
    useEffect(() => {
        const saved = localStorage.getItem("recDateResult");
        if (saved) {
            const { resultList, inputDate } = JSON.parse(saved);
            setDate(inputDate);
            setMovieList(resultList); 
            setIsSubmit(true);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isSubmit || !inputDate) return;
        setIsLoading(true);
        fetch(`${Server_IP}/api/v1/movie/recom/boxoffice/${inputDate.day}`, {
            credentials: "include"
        })
            .then((response) => response.json())
            .then((data) => {
                const movieList = data.result;
                setMovieList(movieList);
                localStorage.setItem("recDateResult", JSON.stringify({
                    resultList: movieList,
                    inputDate: inputDate
                }));
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching movie data:', error);
            });
    }, [isSubmit, inputDate]);


    return (
        <>
            {isSubmit ? (
                <div className="home-recResult">
                    <div className="recResult-title">
                        <p className="title-system">그 시절 박스오피스: </p>
                        <p className="title-user">
                            {`${inputDate.year}년 ${inputDate.month}월 ${inputDate.week}주차`}
                        </p>
                        <button className="recResult-button" onClick={() => {localStorage.removeItem("recDateResult"); setIsSubmit(false); setDate(undefined); setMovieList([]);}}> 
                            <img src="/images/recom_restart_button.png" alt="재시작" className="recResult-restart-icon" />
                        </button>
                    </div>
                    {isLoading ? <LoadingPage page={'rec'} /> : <MovieList movieList={movieList} />}
                </div>
            ) : (
                <div
                    className="home-recDate"
                    style={{ backgroundImage: `url(${backImgsrc})` }}
                >
                    <p className="recDate-question">
                        Q. 확인하고 싶은 날짜를 선택해주세요!
                    </p>
                    <DateSelect setIsSubmit={setIsSubmit} setDate={setDate} />
                </div>
            )}
        </>
    );
}
