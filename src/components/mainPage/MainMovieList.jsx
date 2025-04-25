import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/mainPage/MainMovieList.css';
import { Link } from 'react-router-dom';

const MainMovieList = ({movieList}) => {
    const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className="main-movie-list-wrapper">
            <div className="main-movie-card">
                {movieList.map((movie, index) => (
                    <div className="main-movie-item" key={index}>
                        <div className="main-movie-wrapper">
                            <Link to={`/movie`/*${movie.id} */}>
                                <img src={baseImageUrl + movie.backdrop_path} alt={movie.title} className="main-movie-item-background" />
                                <img src={baseImageUrl + movie.poster_path} alt={movie.title} className="main-movie-item-poster" />
                                <p className="main-movie-item-title">{movie.title}</p>
                            </Link>
                        </div>
                        <div className="main-movie-item-overview">{movie.overview.length > 150 ? movie.overview.slice(0, 150) + "..." : movie.overview}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default MainMovieList;