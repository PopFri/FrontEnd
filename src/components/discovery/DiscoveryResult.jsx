import React from 'react';
import '../../styles/discovery/DiscoveryResult.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DiscoveryResult = ({resultList}) => {
    const navigate = useNavigate();

    return (
        <div className="discovery-result-wrapper">
            <div className="discovery-choosed-movie">
                <p className="choosed-movie-title">내가 선호하는 영화</p>
                <div className="discovery-movieList">
                    {resultList?.choosed?.map((movie, index) => {
                        const movieName = movie.name.length > 6 ? movie.name.slice(0, 6) + "..." : movie.name;
                        const movieUrl = `/movie/${movie.id || index}`;

                        return (
                            <Link key={movie.id || index} to={movieUrl} className="movieList-movie">
                            <div
                                className="movie-image"
                                style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.imageUrl})`,
                                }}
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
                {resultList?.recommend?.map((movie, index) => {
                    const movieName = movie.name.length > 6 ? movie.name.slice(0, 6) + "..." : movie.name;
                    const movieUrl = `/movie/${movie.id || index}`;

                    return (
                        <Link key={movie.id || index} to={movieUrl} className="movieList-movie">
                        <div
                            className="movie-image"
                            style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.imageUrl})`,
                            }}
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
                    <span className="discovery-button-text">뒤로 가기</span>
                    <img src="/images/back-line.png" alt="뒤로가기" className="button-icon" />
                </button>
                <button className="discovery-button restart-button" onClick={() => window.location.reload()}>
                    <span className="discovery-button-text">재시작</span>
                    <img src="/images/restart-line.png" alt="재시작" className="button-icon" />
                </button>
            </div>
        </div>
    );
}
export default DiscoveryResult;