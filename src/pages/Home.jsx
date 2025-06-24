import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home/MainPage.css';
import Header from '../components/Header'
import '../styles/common.css'
import MainMovieList from '../components/home/MainMovieList';
import ChooseAgeRange from '../components/home/ChooseAgeRange';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import LoadingPage from './LoadingPage';

const Home = () => {
    const { trackPageView } = useMatomo();
    const [isLoading, setIsLoading] = useState(true);
    const [userGender, setUserGender] = useState([]);
    const [userAge, setUserAge] = useState([]);
    const [movieList, setMovieList] = useState([]);
    const [criterion, setCriterion] = useState("개인 추천");
    const [type, setType] = useState("default"); 
    const [showCriterionModal, setShowCriterionModal] = useState(false);
    //const [showTooltip, setShowTooltip] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [ageRange, setAgeRange] = useState('10');
    const [user, setUser] = useState(null);
    const Server_IP = import.meta.env.VITE_SERVER_IP;
    const navigate = useNavigate();

    const calculateAgeGroup = (birthStr) => {
        const today = new Date();
        const birth = new Date(birthStr);

        // 생일 기준 나이 계산
        let age = today.getFullYear() - birth.getFullYear();
        const hasHadBirthdayThisYear =
        today.getMonth() > birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());

        if (!hasHadBirthdayThisYear) {
        age--;
        }

        // 나이 기준으로 연령대 분류
        if (age < 10) return "10";
        if (age < 20) return "10";
        if (age < 30) return "20";
        if (age < 40) return "30";
        return "40";
    };

    const loadUserData = async () => {
        try {
            const userRes = await fetch(`${Server_IP}/api/v1/user`, {
            method: 'GET',
            credentials: 'include'
            });
            const userData = await userRes.json();
        
            setUser(userData.result);
            if( userData.result.gender === 'MALE') {
                setUserGender("male");
            }else if (userData.result.gender === 'FEMALE') {
                setUserGender("female");
            }else {
                setUserGender("default");
            }
            setUserAge(calculateAgeGroup(userData.result.birth));

        } catch {
            navigate('/login');
        }
    };

    const loadMovieData = async (type) => {
        try {
                const res = await fetch(`${Server_IP}/sse/analysis/visit?date=month&type=${type}`, {
                    method: 'GET',
                });
                const data = await res.json();

                if (!res.ok || !data.isSuccess) {
                    alert(data.message); 
                    return;
                }

                const top10 = data.result.slice(0, 10);

                // 개별 영화 상세 정보 병렬 호출
                const detailPromises = top10.map(movie =>
                    fetch(`${Server_IP}/api/v1/movie/${movie.movieId}`, {
                        method: 'GET',
                        credentials: 'include',
                    })
                        .then(res => res.json())
                        .then(data => data.result)
                        .catch(() => {
                            return null; // 실패한 건 제외 처리
                        })
                );

                const movieDetails = await Promise.all(detailPromises);
                const filteredDetails = movieDetails.filter(detail => detail !== null);

                setMovieList(filteredDetails);
                setIsLoading(false);
        } catch {
            alert("데이터 로드 중 오류가 발생했습니다.");
        }
    };

    const loadPersonalMovieData = async () => {
    try {
        const genderRes = await fetch(`${Server_IP}/sse/analysis/visit?date=month&type=${userGender}`, {
            method: 'GET',
        });
        const ageRes = await fetch(`${Server_IP}/sse/analysis/visit?date=month&type=${userAge}`, {
            method: 'GET',
        });

        const [genderData, ageData] = await Promise.all([genderRes.json(), ageRes.json()]);

        if (!genderRes.ok || !genderData.isSuccess || !ageRes.ok || !ageData.isSuccess) {
            alert("추천 데이터 로드 실패");
            return;
        }

        const genderTop5 = genderData.result.slice(0, 10);

        const ageTop5 = ageData.result.slice(0, 10);

        const combined = [...genderTop5, ...ageTop5];

        const uniqueMovies = Array.from(new Map(combined.map(movie => [movie.movieId, movie])).values());

        const detailPromises = uniqueMovies.map(movie =>
            fetch(`${Server_IP}/api/v1/movie/${movie.movieId}`, {
                method: 'GET',
                credentials: 'include',
            })
                .then(res => res.json())
                .then(data => data.result)
                .catch(() => null)
        );

        const movieDetails = await Promise.all(detailPromises);
        const filteredDetails = movieDetails.filter(detail => detail !== null);

        setMovieList(filteredDetails);
        setIsLoading(false);
        } catch (e) {
            console.error(e);
            alert("데이터 로드 중 오류가 발생했습니다.");
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
        loadUserData()
    }, []);

    useEffect(()=>{
        if(user != null)
            trackPageView({
                customDimensions: [
                    {
                        id: 1,
                        value: null
                    },
                    {
                        id: 2,
                        value: user != null ? user.birth : "null"
                    },
                    {
                        id: 3,
                        value: user != null ? user.gender : "null"
                    },
                ],
            });
    }, [user])

    useEffect(() => {
        if(criterion === "개인 추천" && user) {
            setIsLoading(true);
            loadPersonalMovieData();
        } else if (criterion !== "연령별 추천") {
            setAgeRange('10'); 
            setIsLoading(true);
            loadMovieData(type);
        }else {
            setIsLoading(true);
            loadMovieData(ageRange);
        }
    }, [criterion, ageRange, type, user]);

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
                    <div className="main-page-criterion-modal-wrapper" onClick={() => {closeModal(); }}>
                        <div className={`main-page-criterion-modal ${isClosing ? 'slide-down' : 'slide-up'}`}>
                        <button className="main-page-criterion-close" onClick={() => { closeModal(); }}>

                        </button>
                            <button className="main-page-criterion-option personal-recommend-option" onClick={() => { setCriterion("개인 추천"); setType('default'); closeModal(); }} style={{color: `${optionColorPersonal}`}}>
                                <div className="personal-recommend-text">
                                    개인 추천
                                </div> 
                            </button>
                            <button className="main-page-criterion-option" onClick={() => { setCriterion("전체 인기순"); setType('default'); closeModal(); }} style={{color: `${optionColorAll}`}}>전체 인기순</button>
                            <button className="main-page-criterion-option" onClick={() => { setCriterion("남성 인기순"); setType('male'); closeModal(); }} style={{color: `${optionColorMale}`}}>남성 인기순</button>
                            <button className="main-page-criterion-option" onClick={() => { setCriterion("여성 인기순"); setType('female'); closeModal(); }} style={{color: `${optionColorFemale}`}}>여성 인기순</button>
                            <button className="main-page-criterion-option" onClick={() => { setCriterion("연령별 추천"); closeModal(); }} style={{color: `${optionColorAge}`}}>연령별 추천</button>
                        </div>
                    </div>
                    )}
                </div>
            </div>
            {chooseAgeRangeButton(criterion)}
            {isLoading ? (
                <LoadingPage page={'home'} />
            ) : (
                <MainMovieList movieList={movieList} />
            )}
        </div>
    );

}
export default Home;