import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home/MainPage.css';
import Header from '../components/Header'
import '../styles/common.css'
import MainMovieList from '../components/home/MainMovieList';
import ChooseAgeRange from '../components/home/ChooseAgeRange';
import { useMatomo } from '@datapunt/matomo-tracker-react';

const Home = () => {
    const { trackPageView } = useMatomo()

    // Track page view
    React.useEffect(() => {
        trackPageView()
    }, [])

    const [movieList, setMovieList] = useState([]);
    const [criterion, setCriterion] = useState("개인 추천");
    const [showCriterionModal, setShowCriterionModal] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [ageRange, setAgeRange] = useState(null);
    const [user, setUser] = useState(null);
    const Server_IP = import.meta.env.VITE_SERVER_IP;
    const navigate = useNavigate();
    const loadUserData = async () => {
        try {
            const userRes = await fetch(`${Server_IP}/api/v1/user`, {
            method: 'GET',
            credentials: 'include'
            });
            const userData = await userRes.json();
        
            setUser(userData.result);
        } catch {
            navigate('/login');
        }
    };

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

    const toggleTooltipModal = () => {
        setShowTooltip(!showTooltip);
    }

    const closeTooltipModal = () => {
        setShowTooltip(false);
    }

    const chooseAgeRangeButton = (criterion) => {
        if (criterion === "연령별 추천") {
            return <ChooseAgeRange ageRange={ageRange} setAgeRange={setAgeRange} />
        }
    }

    let optionColorPersonal = "#FFFFFF", optionColorAll = "#FFFFFF", optionColorMale = "#FFFFFF", optionColorFemale = "#FFFFFF", optionColorAge = "#FFFFFF";
    switch (criterion) {
        case "개인 추천":
            optionColorPersonal = "#1ED863"
            break;
        case "전체 인기순":
            optionColorAll = "#1ED863"
            break;
        case "남성 인기순":
            optionColorMale = "#1ED863"
            break;
        case "여성 인기순":
            optionColorFemale = "#1ED863"
            break;
        case "연령별 추천":
            optionColorAge = "#1ED863"
            break;
        default:
    }

    useEffect(() => {
        loadUserData();
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
            <Header user={user}/>
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
                    <div className="main-page-criterion-modal-wrapper" onClick={() => {closeModal(); closeTooltipModal();}}>
                        <div className={`main-page-criterion-modal ${isClosing ? 'slide-down' : 'slide-up'}`}>
                        <button className="main-page-criterion-close" onClick={() => { closeModal(); closeTooltipModal(); }}>

                        </button>
                            <button className="main-page-criterion-option personal-recommend-option" onClick={() => { setCriterion("개인 추천"); closeModal(); }} style={{color: `${optionColorPersonal}`}}>
                                <div className="personal-recommend-text">
                                    개인 추천
                                </div> 
                                <div className="criterion-info" onClick={(e) => {e.stopPropagation(); toggleTooltipModal();}}>
                                    <img src="images/criterion_info_icon.png" alt="tooltip" className="tooltip-icon" />
                                </div>
                                {showTooltip && (
                                    <div className="tooltip">
                                        <img src="images/CancelLogo.png" alt="close" className="tooltip-close-icon" onClick={(e) => {e.stopPropagation(); toggleTooltipModal();}} />
                                        <p className="tooltip-text">PopFri 내 활동을 기반으로 추천합니다.</p>
                                    </div>
                                )}
                            </button>
                            <button className="main-page-criterion-option" onClick={() => { setCriterion("전체 인기순"); closeModal(); closeTooltipModal(); }} style={{color: `${optionColorAll}`}}>전체 인기순</button>
                            <button className="main-page-criterion-option" onClick={() => { setCriterion("남성 인기순"); closeModal(); closeTooltipModal(); }} style={{color: `${optionColorMale}`}}>남성 인기순</button>
                            <button className="main-page-criterion-option" onClick={() => { setCriterion("여성 인기순"); closeModal(); closeTooltipModal(); }} style={{color: `${optionColorFemale}`}}>여성 인기순</button>
                            <button className="main-page-criterion-option" onClick={() => { setCriterion("연령별 추천"); closeModal(); closeTooltipModal(); }} style={{color: `${optionColorAge}`}}>연령별 추천</button>
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
export default Home;