import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/mainPage/MainPage.css';
import Header from '../components/Header'
import '../styles/common.css'
import MainMovieList from '../components/mainPage/MainMovieList';
import ChooseAgeRange from '../components/mainPage/ChooseAgeRange';

const MainPage = () => {
    const [movieList, setMovieList] = useState([]);
    const [criterion, setCriterion] = useState("개인 추천");
    const [showCriterionModal, setShowCriterionModal] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [ageRange, setAgeRange] = useState(null);

    const openModal = () => setShowCriterionModal(true);

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowCriterionModal(false);
            setIsClosing(false);
        }, 300);
    };

    const toggleCriterionModal = () => {
        if (showCriterionModal) closeModal();
        else openModal();
    };

    const chooseAgeRangeButton = (criterion) => {
        if (criterion === "연령별 추천") {
            return <ChooseAgeRange ageRange={ageRange} setAgeRange={setAgeRange} />
        }
    }

    useEffect(() => {
        if(criterion !== "연령별 추천") {
            setAgeRange(null);
            fetch('data/mainPageData.json'/* ${criterion} */)
                .then((response) => response.json())
                .then((data) => {
                    const movieList = data.result.movies;
                    setMovieList(movieList);
                })
                .catch((error) => {
                    console.error('Error fetching movie data:', error);
            });
        } else {
            setAgeRange("10");
            fetch('data/mainPageData.json'/* ${criterion} /${ageRange} */)
                .then((response) => response.json())
                .then((data) => {
                    const movieList = data.result.movies;
                    setMovieList(movieList);
                })
                .catch((error) => {
                    console.error('Error fetching movie data:', error);
            });
        }
    }, [criterion]);

    return (
        <div className="main-page-wrapper">
            <Header />
            <div className="main-page-title-wrapper">
                <div className="main-page-title">
                    PopFri Recommend
                </div>
                <div className="main-page-criterion">
                    <button className="main-page-criterion-value" onClick={()=>toggleCriterionModal()}>
                        {criterion}
                        <img src="images/Vector.png" alt="vector" className="vector-icon" />
                    </button>
                    {showCriterionModal && (
                    <div className="main-page-criterion-modal-wrapper" onClick={closeModal}>
                        <div className={`main-page-criterion-modal ${isClosing ? 'slide-down' : 'slide-up'}`}>
                            <button className="main-page-criterion-option personal-recommend-option" onClick={() => { setCriterion("개인 추천"); closeModal(); }}>
                                <div className="personal-recommend-text">
                                    개인 추천
                                </div> 
                                <button className="criterion-info">
                                    <img src="images/criterion_info_icon.png" alt="tooltip" className="tooltip-icon" />
                                </button>
                            </button>
                            <button className="main-page-criterion-option" onClick={() => { setCriterion("전체 인기순"); closeModal(); }}>전체 인기순</button>
                            <button className="main-page-criterion-option" onClick={() => { setCriterion("남성 인기순"); closeModal(); }}>남성 인기순</button>
                            <button className="main-page-criterion-option" onClick={() => { setCriterion("여성 인기순"); closeModal(); }}>여성 인기순</button>
                            <button className="main-page-criterion-option" onClick={() => { setCriterion("연령별 추천"); closeModal(); }}>연령별 추천</button>
                        </div>
                    </div>
                    )}
                </div>
            </div>
            {chooseAgeRangeButton(criterion)}
            <MainMovieList movieList={movieList} />
        </div>
    );

}
export default MainPage;