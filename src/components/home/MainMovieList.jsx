import React from 'react';
import '../../styles/home/MainMovieList.css';
import { Link } from 'react-router-dom';

const MainMovieList = ({movieList}) => {
    const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className="main-movie-list-wrapper">
            <div className="main-movie-card">
                {movieList.map((movie, index) => (
                    <div className="main-movie-item" key={index}>
                        <div className="main-movie-wrapper">
                            <Link to={`/movie/${movie.movieId}`}>
                                <img src={baseImageUrl + movie.backgroundImageUrl} alt={movie.title} className="main-movie-item-background" />
                                <img src={baseImageUrl + movie.imageUrl} alt={movie.title} className="main-movie-item-poster" />
                                <p className="main-movie-item-title">{movie.title}</p>
                            </Link>
                        </div>
                        <div className="main-movie-item-overview">
                            {movie.overView
                            ? (movie.overView.length > 150 ? movie.overView.slice(0, 150) + "..." : movie.overView)
                            : "줄거리 정보 없음"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default MainMovieList;