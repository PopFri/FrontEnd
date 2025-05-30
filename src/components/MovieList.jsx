import React from "react";
import { Link } from 'react-router-dom';
import "../styles/discovery/movieList.css";

export default function MovieList(props) {
    return (
        <div className="recResult-movieList">
            {Array.isArray(props.movieList) && props.movieList.map((movie, index) => {
                let movieName = movie.movieName || "";
                if (movieName.length > 6)
                    movieName = movieName.slice(0, 6) + "...";

                const movieUrl = `/movie/${movie.movieId}`;
                const key = movie.rank ?? index;

                return (
                    <Link key={key} to={movieUrl} className="movieList-movie">
                        <div
                            className="movie-image"
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.imageUrl})`,
                            }}
                        />
                        {movie.rank && (
                            <div className="movie-rank">
                                <span className="rank-text">{movie.rank}위</span>
                            </div>
                        )}
                        <div className="movie-name">
                            <p className="name-text">{movieName}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
