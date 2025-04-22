import React from "react";
import { Link } from 'react-router-dom';
import "../styles/home/movieList.css";

export default function MovieList(props) {
    return (
        <div className="recResult-movieList">
            {props.movieList.result.map((movie) => {
                let movieName = movie.name;
                if (movieName.length > 6)
                    movieName = movieName.slice(0, 6) + "...";

                const movieUrl = `/movie/${movie.id}`;

                return (
                    <Link to={movieUrl} className="movieList-movie">
                        <div
                            className="movie-image"
                            style={{
                                backgroundImage: `url(${movie.imageUrl})`,
                            }}
                        />
                        <div className="movie-name">
                            <p className="name-text">{movieName}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
