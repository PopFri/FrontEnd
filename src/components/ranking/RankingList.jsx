import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ranking/RankingList.css';

const RankingList = ({rankingList, platform}) => {
    const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

    const rankingCount = (movie) => {
        if (platform === "boxoffice") {
            return <div className="ranking-count">
                <p className="ranking-total-count">{movie.total_count}</p>
                <p className="ranking-updown-count">({movie.up_down})</p>
                </div>;
        } else {
            return null;
        }
    }
    return (
        <div className="ranking-list-wrapper">
            <div className="ranking-card">
                {rankingList.map((movie, index) => (
                    <div className="ranking-item" key={index}>
                        <div className="movie-ranking-wrapper">
                            <h1 className="ranking-item-rank">{String(index + 1).padStart(2, '0')}</h1>
                            {rankingCount(movie)}
                            <img src={baseImageUrl + movie.backdrop_path} alt={movie.title} className="ranking-item-image" />
                            <Link to={`/movie`} className="ranking-item-title">
                                {movie.title}
                            </Link>
                        </div>
                        <div className="ranking-item-overview">{movie.overview}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default RankingList;