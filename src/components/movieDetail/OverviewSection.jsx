import React from 'react';
import '../../styles/movieDetail/OverviewSection.css';

const OverviewSection = ({ overView, genres }) => {
    if (!genres || !Array.isArray(genres)) return null;

    return (
        <div className="overview-wrapper">
            <h1 className="overview-title">Overview</h1>
            <p className="overview-content">{overView}</p>
            <h2 className="genres-inline">
                {genres.map((genre) => (
                    <span key={genre.id} className="genre-inline-item">
                        #{genre.name}{' '}
                    </span>
                ))}
            </h2>
        </div>
    );
};

export default OverviewSection;