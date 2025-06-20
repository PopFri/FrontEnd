import React from 'react';
import '../../styles/discoveryFilm/DiscoveryResult.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../../pages/LoadingPage';
import BackgroundImageDiv from '../../BackgroundImageDiv';

const DiscoveryResult = ({resultList}) => {
    const navigate = useNavigate();

    return (
        <div className="discovery-result-wrapper">
            {resultList.length <= 0 ? (
                <LoadingPage page={'result'}/>
            ) : (
                <>
                    <div className="discovery-choosed-movie">
                    <p className="choosed-movie-title">내가 선호하는 영화</p>
                    <div className="discovery-movieList">
                        {Array.isArray(resultList.choosed) && resultList.choosed.map((movie, index) => {
                            const movieName = movie.name.length > 6 ? movie.name.slice(0, 6) + "..." : movie.name;
                            const movieUrl = `/movie/${movie.id || index}`;

                            return (
                                <Link key={movie.id || index} to={movieUrl} className="movieList-movie">
                                    <BackgroundImageDiv
                                    className="movie-image"
                                    imageUrl={`https://image.tmdb.org/t/p/w500${movie.imageUrl}`}
                                    />
                                    <div className="movie-name">
                                        <p className="name-text">{movieName}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    </div>
                    <div className="discovery-recommend-movie">
                        <p className="recommend-movie-title">추천 영화</p>
                        <div className="discovery-movieList">
                        {Array.isArray(resultList.recommend) && resultList.recommend.map((movie, index) => {
                            const movieName = movie.movieName.length > 6 ? movie.movieName.slice(0, 6) + "..." : movie.movieName;
                            const movieUrl = `/movie/${movie.movieId || index}`;

                            return (
                                <Link key={movie.movieId || index} to={movieUrl} className="movieList-movie">
                                    <BackgroundImageDiv
                                    className="movie-image"
                                    imageUrl={`https://image.tmdb.org/t/p/w500${movie.imageUrl}`}
                                    />
                                    <div className="movie-name">
                                        <p className="name-text">{movieName}</p>
                                    </div>
                                </Link>
                            );
                        })}
                        </div>
                    </div>
                    <div className="discovery-button-container">
                        <button className="discovery-button back-button" onClick={() => navigate('/discovery')}>
                            <span className="discovery-button-text" onClick={() => {localStorage.removeItem("discoveryResult"); navigate('/discovery');}}> 뒤로 가기</span>
                            <img src="/images/back-line.png" alt="뒤로가기" className="button-icon" />
                        </button>
                        <button className="discovery-button restart-button" onClick={() => {localStorage.removeItem("discoveryResult"); window.location.reload();}}>
                            <span className="discovery-button-text">재시작</span>
                            <img src="/images/restart-line.png" alt="재시작" className="button-icon" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
export default DiscoveryResult;